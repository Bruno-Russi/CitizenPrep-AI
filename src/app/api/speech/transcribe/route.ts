import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const audioFile = formData.get("audio");
  if (!audioFile || !(audioFile instanceof Blob)) {
    return NextResponse.json({ error: "Missing audio file" }, { status: 400 });
  }

  // Whisper requires a supported extension in the filename to detect format.
  // Chrome records webm/opus; we send it as .webm which Whisper accepts.
  // If the browser reports a different mime type (e.g. video/webm), still use .webm.
  const mimeType = audioFile.type || "audio/webm";
  const ext = mimeType.includes("ogg") ? "ogg" : mimeType.includes("mp4") ? "mp4" : "webm";
  const file = new File([audioFile], `audio.${ext}`, { type: mimeType });

  try {
    const transcription = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file,
      language: "en",
      response_format: "text",
    });

    // response_format "text" returns a plain string
    return NextResponse.json({ transcript: transcription as unknown as string });
  } catch (err) {
    console.error("[Transcribe] OpenAI error:", err);
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}
