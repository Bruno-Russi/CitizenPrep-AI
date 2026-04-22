"use client";

import Link from "next/link";
import { useState } from "react";
import { Mic, BookOpen, Clock, Target, User } from "lucide-react";

const modes = [
  {
    id: "simulation",
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
    id: "practice",
    label: "Modo Prática",
    description: "Responda sem pressão. Veja o feedback imediato e repita as que errou até dominar.",
    icon: BookOpen,
    duration: "~20 min",
    questions: 20,
    badge: "Aprendizado",
    badgeColor: "#A78BFA",
    badgeBg: "rgba(139,92,246,0.1)",
    badgeBorder: "rgba(139,92,246,0.25)",
    iconBg: "rgba(139,92,246,0.15)",
    iconColor: "#A78BFA",
  },
];

const officers = [
  { id: "james", name: "Agente James", accent: "Neutro americano",  initials: "AJ" },
  { id: "sarah", name: "Agente Sarah", accent: "Sul americano",     initials: "AS" },
  { id: "carlos",name: "Agente Carlos",accent: "Sotaque hispânico", initials: "AC" },
];

export default function SimulationPage() {
  const [selectedMode, setSelectedMode] = useState("simulation");
  const [selectedOfficer, setSelectedOfficer] = useState("james");

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-[28px] font-bold text-white leading-tight tracking-tight">
          Simular Entrevista
        </h1>
        <p className="text-white/45 text-sm mt-1">
          Escolha o modo e o oficial para começar sua simulação por voz.
        </p>
      </div>

      {/* Modo */}
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
                  background: active
                    ? "rgba(59,130,246,0.08)"
                    : "#111827",
                  border: active
                    ? "2px solid rgba(59,130,246,0.4)"
                    : "2px solid rgba(255,255,255,0.07)",
                  boxShadow: active ? "0 0 24px rgba(59,130,246,0.1)" : "none",
                }}
              >
                {/* Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: mode.iconBg }}
                  >
                    <mode.icon size={16} style={{ color: mode.iconColor }} />
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      color: mode.badgeColor,
                      background: mode.badgeBg,
                      border: `1px solid ${mode.badgeBorder}`,
                    }}
                  >
                    {mode.badge}
                  </span>
                </div>

                <p className="font-semibold text-white text-base leading-snug mb-1.5">
                  {mode.label}
                </p>
                <p className="text-xs text-white/45 leading-relaxed mb-4">
                  {mode.description}
                </p>

                <div className="flex items-center gap-4 text-[11px] text-white/30 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} />
                    {mode.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Target size={11} />
                    {mode.questions} perguntas
                  </span>
                </div>

                {/* Active indicator ring */}
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

      {/* Oficial */}
      <div className="space-y-3 animate-fade-up animation-delay-200">
        <p className="text-[11px] font-medium uppercase tracking-widest text-white/30">
          Oficial entrevistador
        </p>

        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {officers.map((officer, i) => {
            const active = selectedOfficer === officer.id;
            return (
              <button
                key={officer.id}
                type="button"
                onClick={() => setSelectedOfficer(officer.id)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors"
                style={{
                  background: active ? "rgba(59,130,246,0.06)" : "transparent",
                  borderBottom: i < officers.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                  style={{
                    background: active
                      ? "linear-gradient(135deg, #3B82F6, #06B6D4)"
                      : "rgba(255,255,255,0.06)",
                    border: active ? "none" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {active ? (
                    <span>{officer.initials}</span>
                  ) : (
                    <User size={14} className="text-white/40" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{officer.name}</p>
                  <p className="text-xs text-white/35 mt-0.5">{officer.accent}</p>
                </div>

                {/* Radio indicator */}
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all"
                  style={{
                    border: active ? "2px solid #3B82F6" : "2px solid rgba(255,255,255,0.15)",
                    background: "transparent",
                  }}
                >
                  {active && (
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "#3B82F6" }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="animate-fade-up animation-delay-300 space-y-3">
        <Link href="/simulation/session-mock">
          <button
            type="button"
            className="w-full h-14 rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
              boxShadow: "0 4px 24px rgba(59,130,246,0.35)",
            }}
          >
            <Mic size={18} />
            Iniciar Simulação
          </button>
        </Link>
        <p className="text-center text-[11px] text-white/30 tracking-wide">
          Certifique-se de que seu microfone está habilitado
        </p>
      </div>
    </div>
  );
}
