"use client";

import { Mic, Loader2, Square } from "lucide-react";
import { cn } from "@/lib/utils";

export type RecordState = "idle" | "recording" | "processing";

type RecordButtonProps = {
  state: RecordState;
  onClick: () => void;
  disabled?: boolean;
};

const CONFIG = {
  idle: {
    label: "Toque para responder",
    icon: Mic,
    style: { background: "linear-gradient(135deg, #3B82F6, #2563EB)", boxShadow: "0 0 32px rgba(59,130,246,0.4)" },
    ring: "ring-blue-500/20",
    iconClass: "text-white",
  },
  recording: {
    label: "Gravando... toque para parar",
    icon: Square,
    style: { background: "linear-gradient(135deg, #EF4444, #DC2626)", boxShadow: "0 0 32px rgba(239,68,68,0.4)" },
    ring: "ring-red-500/30 animate-pulse",
    iconClass: "text-white fill-white",
  },
  processing: {
    label: "Processando resposta...",
    icon: Loader2,
    style: { background: "rgba(255,255,255,0.08)", boxShadow: "none" },
    ring: "ring-transparent",
    iconClass: "text-white/50 animate-spin",
  },
} as const;

export function RecordButton({ state, onClick, disabled }: RecordButtonProps) {
  const cfg = CONFIG[state];
  const Icon = cfg.icon;

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={onClick}
        disabled={disabled || state === "processing"}
        className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center ring-8 transition-all duration-200 active:scale-95",
          cfg.ring
        )}
        style={cfg.style as React.CSSProperties}
        aria-label={cfg.label}
      >
        <Icon size={30} className={cfg.iconClass} />
      </button>
      <p className="text-xs text-white/40 text-center">{cfg.label}</p>
    </div>
  );
}
