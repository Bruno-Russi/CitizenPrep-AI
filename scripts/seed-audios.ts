#!/usr/bin/env npx ts-node --esm
/**
 * Seed de áudios das perguntas USCIS.
 *
 * Uso:
 *   npm run seed:audios                  — gera onyx + nova para perguntas sem áudio
 *   npm run seed:audios -- --voice=echo  — gera só a voz echo (coluna futura)
 *   npm run seed:audios -- --force       — regenera mesmo se já existir
 *
 * Idempotente: se audio_url_{voice} já existe no banco E o objeto existe no
 * Storage, a pergunta é ignorada sem nenhuma chamada à OpenAI.
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../src/types/database";

// Carrega .env.local manualmente (ts-node não usa o loader do Next.js)
try {
  const envPath = resolve(process.cwd(), ".env.local");
  const lines = readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
} catch {
  // .env.local não existe — variáveis devem vir do ambiente
}

// ─── Config ──────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const BUCKET = "question-audios";

const VOICES = ["echo", "nova"] as const;
type Voice = (typeof VOICES)[number];

// Mapeamento voz → coluna no banco (coluna "onyx" mantida por compatibilidade com schema existente)
const VOICE_TO_COL: Record<Voice, "audio_url_onyx" | "audio_url_nova"> = {
  echo: "audio_url_onyx",
  nova: "audio_url_nova",
};

const args = process.argv.slice(2);
const forceRegen = args.includes("--force");
const voiceArg = args.find((a) => a.startsWith("--voice="))?.split("=")[1] as Voice | undefined;
const voicesToRun: Voice[] = voiceArg ? [voiceArg] : [...VOICES];

// ─── Clients ─────────────────────────────────────────────────────────────────

const supabase = createClient<Database>(SUPABASE_URL, SERVICE_ROLE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// ─── Helpers ─────────────────────────────────────────────────────────────────

function storagePath(questionId: number, voice: Voice) {
  return `${questionId}/${voice}.mp3`;
}

async function audioExistsInStorage(path: string): Promise<boolean> {
  const { data } = await supabase.storage.from(BUCKET).list(path.split("/")[0]);
  return (data ?? []).some((f) => f.name === path.split("/")[1]);
}

async function generateAndUpload(
  questionId: number,
  questionText: string,
  voice: Voice
): Promise<string> {
  console.log(`  [${voice}] Gerando MP3 para #${questionId}...`);

  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice,
    input: questionText,
    response_format: "mp3",
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  const path = storagePath(questionId, voice);

  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType: "audio/mpeg",
    upsert: true,
  });

  if (error) throw new Error(`Storage upload failed: ${error.message}`);

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return urlData.publicUrl;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !OPENAI_API_KEY) {
    console.error("❌  Defina NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY e OPENAI_API_KEY");
    process.exit(1);
  }

  console.log(`🎙  Seed de áudios — vozes: ${voicesToRun.join(", ")} | force: ${forceRegen}`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: rawQuestions, error } = await (supabase.from("civics_questions") as any)
    .select("id, question, audio_url_onyx, audio_url_nova")
    .eq("active", true)
    .order("id");

  if (error || !rawQuestions) {
    console.error("❌  Erro ao buscar perguntas:", (error as { message: string })?.message);
    process.exit(1);
  }

  type QuestionRecord = {
    id: number;
    question: string;
    audio_url_onyx: string | null;
    audio_url_nova: string | null;
  };
  const questions = rawQuestions as QuestionRecord[];

  console.log(`📋  ${questions.length} perguntas encontradas.`);

  let generated = 0;
  let skipped = 0;

  for (const q of questions) {
    console.log(`\n→ Pergunta #${q.id}: ${q.question.slice(0, 60)}...`);

    const updates: Record<string, string> = {};

    for (const voice of voicesToRun) {
      const urlCol = VOICE_TO_COL[voice];
      const existingUrl = q[urlCol];

      if (!forceRegen && existingUrl) {
        console.log(`  [${voice}] ✓ Já existe, pulando.`);
        skipped++;
        continue;
      }

      // Verifica também no Storage para evitar upload duplicado
      const path = storagePath(q.id, voice);
      const inStorage = await audioExistsInStorage(path);

      if (!forceRegen && inStorage && existingUrl) {
        console.log(`  [${voice}] ✓ Já no storage, pulando.`);
        skipped++;
        continue;
      }

      try {
        const url = await generateAndUpload(q.id, q.question, voice);
        updates[urlCol] = url;
        generated++;
        console.log(`  [${voice}] ✓ Upload concluído.`);
      } catch (err) {
        console.error(`  [${voice}] ✗ Erro:`, err);
      }
    }

    if (Object.keys(updates).length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("civics_questions") as any)
        .update(updates)
        .eq("id", q.id);
    }
  }

  console.log(`\n✅  Concluído — gerados: ${generated} | ignorados: ${skipped}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
