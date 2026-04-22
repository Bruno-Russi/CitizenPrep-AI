/**
 * Endpoint de TTS dinâmico — APENAS para textos com dados variáveis do usuário.
 *
 * REGRA DE OURO: perguntas do banco NUNCA passam por aqui.
 * Os MP3s das perguntas são pré-gerados pelo script seed:audios e servidos
 * diretamente do Supabase Storage.
 *
 * Este endpoint existe SOMENTE para:
 *   - Cumprimento inicial: "Good morning, {name}"
 *   - Encerramento: "Thank you, {name}, the interview is complete."
 *   - Qualquer outro texto dinâmico curto que contenha dados do usuário
 *
 * Defesa em profundidade: se o texto enviado bater com uma pergunta do banco,
 * a request é rejeitada com 400, independente de quem chamou.
 */

import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Textos dinâmicos permitidos — templates com {name}
const ALLOWED_PATTERNS = [
  /^good (morning|afternoon|evening),?\s+\w+\.?$/i,
  /^thank you,?\s+\w+\.?\s*(the interview is (complete|over|finished)\.?)?$/i,
  /^welcome back,?\s+\w+\.?$/i,
  /^let('s| us) (begin|start)\.?$/i,
  /^please (speak|answer) (clearly|now)\.?$/i,
];

const MAX_TEXT_LENGTH = 120;

export async function POST(request: Request) {
  // Autenticação obrigatória
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.text || typeof body.text !== "string") {
    return NextResponse.json({ error: "Missing text" }, { status: 400 });
  }

  const text: string = body.text.trim();
  const voice: string = body.voice === "nova" ? "nova" : "echo";

  // Tamanho máximo — textos longos são suspeitos
  if (text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json(
      { error: "Text too long for dynamic TTS. Use pre-generated audio for questions." },
      { status: 400 }
    );
  }

  // Defesa em profundidade: verifica se o texto bate com alguma pergunta do banco
  const { data: matchingQuestion } = await supabase
    .from("civics_questions")
    .select("id")
    .ilike("question", text)
    .limit(1)
    .maybeSingle();

  if (matchingQuestion) {
    return NextResponse.json(
      { error: "This question has pre-generated audio. Use audio_url from the database instead." },
      { status: 400 }
    );
  }

  // Valida contra os padrões de texto dinâmico permitidos
  const isAllowed = ALLOWED_PATTERNS.some((p) => p.test(text));
  if (!isAllowed) {
    return NextResponse.json(
      { error: "Text does not match any allowed dynamic TTS pattern." },
      { status: 400 }
    );
  }

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice as "echo" | "nova",
      input: text,
      response_format: "mp3",
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[TTS] OpenAI error:", err);
    return NextResponse.json({ error: "TTS generation failed" }, { status: 500 });
  }
}
