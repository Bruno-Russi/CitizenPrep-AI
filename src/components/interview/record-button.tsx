"use client";

import { Mic, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type RecordState = "idle" | "recording" | "processing";

type RecordButtonProps = {
  state: RecordState;
  onPressStart: () => void;
  onPressEnd: () => void;
};

export function RecordButton({ state, onPressStart, onPressEnd }: RecordButtonProps) {
  const isRecording = state === "recording";
  const isProcessing = state === "processing";

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isProcessing) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    onPressStart();
  };

  const handlePointerUp = () => {
    if (!isRecording) return;
    onPressEnd();
  };

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <button
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        disabled={isProcessing}
        className={cn(
          "w-24 h-24 rounded-full flex items-center justify-center ring-8 transition-all duration-150 touch-none",
          isRecording
            ? "ring-red-500/40 scale-110"
            : "ring-blue-500/20 active:scale-95",
        )}
        style={
          isProcessing
            ? { background: "rgba(255,255,255,0.08)", boxShadow: "none" }
            : isRecording
            ? { background: "linear-gradient(135deg, #EF4444, #DC2626)", boxShadow: "0 0 40px rgba(239,68,68,0.5)" }
            : { background: "linear-gradient(135deg, #3B82F6, #2563EB)", boxShadow: "0 0 32px rgba(59,130,246,0.4)" }
        }
        aria-label={isProcessing ? "Processando..." : isRecording ? "Solte para enviar" : "Segure para falar"}
      >
        {isProcessing
          ? <Loader2 size={32} className="text-white/50 animate-spin" />
          : <Mic size={32} className="text-white" />
        }
      </button>

      <p className="text-xs text-white/40 text-center pointer-events-none">
        {isProcessing
          ? "Processando resposta..."
          : isRecording
          ? "Solte para enviar"
          : "Segure para falar"
        }
      </p>
    </div>
  );
}
