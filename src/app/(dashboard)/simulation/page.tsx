"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Mic, BookOpen, Clock, Target, Loader2 } from "lucide-react";
import { startSession } from "@/features/interview/actions";

const modes = [
  {
    id: "simulation" as const,
    label: "Simulação Oficial",
    description: "10 perguntas aleatórias, exatamente como na entrevista real. Você precisa acertar 6 para passar.",
    icon: Target,
    duration: "~15 min",
    questions: 10,
    badge: "Recomendado",
    badgeColor: "#34D399",
    badgeBg: "rgba(16,185,129,0.1)",
    badgeBorder: "rgba(16,185,129,0.25)",
    iconBg: "rgba(59,130,246,0.15)",
    iconColor: "#60A5FA",
  },
  {
    id: "practice" as const,
    label: "Modo Prática",
    description: "Repete a pergunta até você acertar. Ideal para fixar o conteúdo antes da entrevista.",
    icon: BookOpen,
    duration: "~20 min",
    questions: 10,
    badge: "Aprendizado",
    badgeColor: "#A78BFA",
    badgeBg: "rgba(139,92,246,0.1)",
    badgeBorder: "rgba(139,92,246,0.25)",
    iconBg: "rgba(139,92,246,0.15)",
    iconColor: "#A78BFA",
  },
];

export default function SimulationPage() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [selectedMode, setSelectedMode] = useState<"simulation" | "practice">("simulation");
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setError(null);
    startTransition(async () => {
      const result = await startSession("standard", selectedMode);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      router.push(`/simulation/${result.sessionId}?mode=${selectedMode}`);
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      <div className="animate-fade-up">
        <h1 className="text-[28px] font-bold text-white leading-tight tracking-tight">
          Simular Entrevista
        </h1>
        <p className="text-white/45 text-sm mt-1">
          Escolha o modo para começar sua simulação por voz.
        </p>
      </div>

      <div className="space-y-3 animate-fade-up animation-delay-100">
        <p className="text-[11px] font-medium uppercase tracking-widest text-white/30">
          Modo de simulação
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {modes.map((mode) => {
            const active = selectedMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedMode(mode.id)}
                className="text-left rounded-xl p-5 transition-all relative overflow-hidden"
                style={{
                  background: active ? "rgba(59,130,246,0.08)" : "#111827",
                  border: active ? "2px solid rgba(59,130,246,0.4)" : "2px solid rgba(255,255,255,0.07)",
                  boxShadow: active ? "0 0 24px rgba(59,130,246,0.1)" : "none",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: mode.iconBg }}
                  >
                    <mode.icon size={16} style={{ color: mode.iconColor }} />
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ color: mode.badgeColor, background: mode.badgeBg, border: `1px solid ${mode.badgeBorder}` }}
                  >
                    {mode.badge}
                  </span>
                </div>

                <p className="font-semibold text-white text-base leading-snug mb-1.5">{mode.label}</p>
                <p className="text-xs text-white/45 leading-relaxed mb-4">{mode.description}</p>

                <div className="flex items-center gap-4 text-[11px] text-white/30 font-mono">
                  <span className="flex items-center gap-1.5"><Clock size={11} />{mode.duration}</span>
                  <span className="flex items-center gap-1.5"><Target size={11} />{mode.questions} perguntas</span>
                </div>

                {active && (
                  <div
                    className="absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(59,130,246,0.3)", border: "2px solid #3B82F6" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="animate-fade-up animation-delay-300 space-y-3">
        {error && <p className="text-center text-sm text-red-400">{error}</p>}
        <button
          type="button"
          onClick={handleStart}
          disabled={pending}
          className="w-full h-14 rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
            boxShadow: "0 4px 24px rgba(59,130,246,0.35)",
          }}
        >
          {pending ? <Loader2 size={18} className="animate-spin" /> : <Mic size={18} />}
          {pending ? "Preparando sessão..." : "Iniciar Simulação"}
        </button>
        <p className="text-center text-[11px] text-white/30 tracking-wide">
          Certifique-se de que seu microfone está habilitado
        </p>
      </div>
    </div>
  );
}
