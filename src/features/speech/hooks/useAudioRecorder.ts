"use client";

import { useRef, useState, useCallback } from "react";

type RecorderState = "idle" | "recording" | "processing";

export function useAudioRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [state, setState] = useState<RecorderState>("idle");

  const start = useCallback(async (): Promise<void> => {
    if (state === "recording") return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.start();
    setState("recording");
  }, [state]);

  const stop = useCallback((): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder || recorder.state === "inactive") {
        reject(new Error("Recorder not active"));
        return;
      }

      setState("processing");

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        recorder.stream.getTracks().forEach((t) => t.stop());
        mediaRecorderRef.current = null;
        chunksRef.current = [];
        setState("idle");
        resolve(blob);
      };

      recorder.stop();
    });
  }, []);

  const transcribe = useCallback(async (audioBlob: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");

    const res = await fetch("/api/speech/transcribe", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(err.error ?? "Transcription failed");
    }

    const { transcript } = await res.json();
    return transcript as string;
  }, []);

  return { state, start, stop, transcribe };
}
