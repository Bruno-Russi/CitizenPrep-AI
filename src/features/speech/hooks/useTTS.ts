"use client";

import { useRef, useState, useCallback } from "react";

type Voice = "echo" | "nova";

/**
 * Hook de TTS para a simulação.
 *
 * REGRA DE OURO:
 * - Perguntas do banco → `playQuestionAudio(url)` — toca o MP3 do Supabase Storage
 *   diretamente, sem nenhuma chamada à OpenAI.
 * - Textos dinâmicos (cumprimento, encerramento) → `speakDynamic(text)` — chama
 *   /api/tts apenas para textos com dados variáveis do usuário.
 */
export function useTTS(voice: Voice = "echo") {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlaying(false);
  }, []);

  /** Toca o áudio pré-gerado da pergunta — lê do Supabase Storage via URL. */
  const playQuestionAudio = useCallback(async (audioUrl: string): Promise<void> => {
    stop();
    return new Promise((resolve) => {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      setPlaying(true);
      audio.onended = () => { setPlaying(false); resolve(); };
      audio.onerror = () => { setPlaying(false); resolve(); };
      audio.play().catch(() => { setPlaying(false); resolve(); });
    });
  }, [stop]);

  /**
   * TTS dinâmico — APENAS para textos curtos com dados do usuário.
   * Ex: "Good morning, Maria." / "Thank you, the interview is complete."
   * NUNCA chamar com texto de uma pergunta do banco.
   */
  const speakDynamic = useCallback(async (text: string): Promise<void> => {
    stop();
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice }),
    });

    if (!res.ok) {
      console.error("[TTS] Dynamic TTS failed:", await res.text());
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    return new Promise((resolve) => {
      const audio = new Audio(url);
      audioRef.current = audio;
      setPlaying(true);
      audio.onended = () => { setPlaying(false); URL.revokeObjectURL(url); resolve(); };
      audio.onerror = () => { setPlaying(false); URL.revokeObjectURL(url); resolve(); };
      audio.play().catch(() => { setPlaying(false); resolve(); });
    });
  }, [stop, voice]);

  return { playing, playQuestionAudio, speakDynamic, stop };
}
