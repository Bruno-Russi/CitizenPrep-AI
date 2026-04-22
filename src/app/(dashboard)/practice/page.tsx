import Link from "next/link";
import { ChevronRight, CheckCircle2 } from "lucide-react";

const topics = [
  {
    id: "government",
    label: "Governo Federal",
    description: "Poderes executivo, legislativo e judiciário",
    questions: 23,
    progress: 80,
  },
  {
    id: "history",
    label: "História Americana",
    description: "Da independência até os dias atuais",
    questions: 27,
    progress: 55,
  },
  {
    id: "rights",
    label: "Direitos e Deveres",
    description: "Direitos dos cidadãos e responsabilidades",
    questions: 14,
    progress: 90,
  },
  {
    id: "judiciary",
    label: "Sistema Judiciário",
    description: "Cortes federais, Suprema Corte e leis",
    questions: 18,
    progress: 40,
  },
  {
    id: "geography",
    label: "Geografia e Símbolos",
    description: "Estados, capitais, bandeira e hino",
    questions: 12,
    progress: 65,
  },
  {
    id: "economy",
    label: "Economia e Sociedade",
    description: "Sistema econômico, população e cultura",
    questions: 6,
    progress: 20,
  },
];

function masteryLabel(progress: number): { label: string; color: string; bg: string; border: string } {
  if (progress >= 80) return { label: "Dominado", color: "#34D399", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" };
  if (progress >= 50) return { label: "Em progresso", color: "#60A5FA", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)" };
  return { label: "Iniciante", color: "#9CA3AF", bg: "rgba(107,114,128,0.1)", border: "rgba(107,114,128,0.2)" };
}

function progressGradient(progress: number): string {
  if (progress >= 80) return "linear-gradient(90deg, #10B981, #06B6D4)";
  if (progress >= 50) return "linear-gradient(90deg, #3B82F6, #06B6D4)";
  return "linear-gradient(90deg, #6B7280, #3B82F6)";
}

export default function PracticePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-7">

      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-[28px] font-bold text-white leading-tight tracking-tight">
          Praticar por Tópico
        </h1>
        <p className="text-white/45 text-sm mt-1">
          Escolha um tópico para praticar as perguntas da entrevista USCIS.
        </p>
      </div>

      {/* Summary chips */}
      <div className="flex items-center gap-3 flex-wrap animate-fade-up animation-delay-100">
        {[
          { label: "Total de perguntas", value: "100", color: "#60A5FA", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
          { label: "Dominadas", value: "38", color: "#34D399", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
          { label: "Para revisar", value: "62", color: "#9CA3AF", bg: "rgba(107,114,128,0.08)", border: "rgba(107,114,128,0.15)" },
        ].map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: s.bg, border: `1px solid ${s.border}` }}
          >
            <span className="text-base font-bold font-mono" style={{ color: s.color }}>
              {s.value}
            </span>
            <span className="text-xs font-medium text-white/50">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Topic grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-up animation-delay-200">
        {topics.map((topic) => {
          const mastery = masteryLabel(topic.progress);
          const mastered = topic.progress >= 80;
          return (
            <Link key={topic.id} href={`/practice/${topic.id}`}>
              <div
                className="group rounded-xl p-5 cursor-pointer transition-all h-full flex flex-col gap-4 hover:border-blue-500/25 hover:shadow-[0_4px_24px_rgba(59,130,246,0.08)]"
                style={{
                  background: "#111827",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{
                      color: mastery.color,
                      background: mastery.bg,
                      border: `1px solid ${mastery.border}`,
                    }}
                  >
                    {mastery.label}
                  </span>
                  {mastered && (
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                  )}
                </div>

                {/* Title */}
                <div className="flex-1">
                  <p className="font-semibold text-white leading-snug text-base">
                    {topic.label}
                  </p>
                  <p className="text-xs text-white/40 mt-1 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                {/* Progress */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-white/35">
                      {topic.questions} perguntas
                    </span>
                    <span className="text-xs font-mono font-medium text-white/60">
                      {topic.progress}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${topic.progress}%`,
                        background: progressGradient(topic.progress),
                      }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end">
                  <ChevronRight
                    size={14}
                    className="text-white/20 group-hover:text-blue-400 transition-colors"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
