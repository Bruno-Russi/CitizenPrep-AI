import { CheckCircle, XCircle, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

const sessions = [
  { id: "1", date: "Hoje, 14:32",   mode: "Simulação", score: 8,  total: 10, passed: true,  duration: "12min" },
  { id: "2", date: "Ontem, 09:15",  mode: "Prática",   score: 15, total: 20, passed: true,  duration: "18min" },
  { id: "3", date: "21 abr",        mode: "Simulação", score: 5,  total: 10, passed: false, duration: "14min" },
  { id: "4", date: "20 abr",        mode: "Prática",   score: 17, total: 20, passed: true,  duration: "22min" },
  { id: "5", date: "18 abr",        mode: "Simulação", score: 7,  total: 10, passed: true,  duration: "11min" },
  { id: "6", date: "16 abr",        mode: "Prática",   score: 12, total: 20, passed: true,  duration: "20min" },
  { id: "7", date: "15 abr",        mode: "Simulação", score: 4,  total: 10, passed: false, duration: "13min" },
  { id: "8", date: "13 abr",        mode: "Prática",   score: 9,  total: 20, passed: false, duration: "16min" },
];

export default function HistoryPage() {
  const totalSessions = sessions.length;
  const passed = sessions.filter((s) => s.passed).length;
  const avgScore = Math.round(
    sessions.reduce((acc, s) => acc + (s.score / s.total) * 100, 0) / sessions.length
  );

  return (
    <div className="max-w-3xl mx-auto space-y-7">

      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-[28px] font-bold text-white leading-tight tracking-tight">Histórico</h1>
        <p className="text-white/45 text-sm mt-1">Suas últimas sessões de prática e simulação.</p>
      </div>

      {/* Resumo */}
      <div
        className="grid grid-cols-3 divide-x animate-fade-up animation-delay-100"
        style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.75rem", overflow: "hidden" }}
      >
        {[
          { label: "Sessões",        value: totalSessions },
          { label: "Aprovações",     value: passed },
          { label: "Média de acerto",value: `${avgScore}%` },
        ].map((s) => (
          <div key={s.label} className="p-5 text-center" style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-2xl font-bold text-white font-mono">{s.value}</p>
            <p className="text-[11px] font-medium uppercase tracking-widest text-white/35 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Gráfico de evolução */}
      <div
        className="rounded-xl overflow-hidden animate-fade-up animation-delay-200"
        style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/30">Evolução de score</p>
        </div>
        <div className="px-5 py-4">
          <div className="flex items-end gap-1.5 h-20">
            {sessions.slice().reverse().map((s, i) => {
              const pct = Math.round((s.score / s.total) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t transition-all"
                    style={{
                      height: `${pct}%`,
                      background: s.passed
                        ? "linear-gradient(180deg, #34D399, #10B981)"
                        : "linear-gradient(180deg, #F87171, #EF4444)",
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-xs text-white/35">
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400" /> Aprovado
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/35">
              <div className="w-2.5 h-2.5 rounded-sm bg-red-400" /> Reprovado
            </span>
          </div>
        </div>
      </div>

      {/* Lista de sessões */}
      <div
        className="rounded-xl overflow-hidden animate-fade-up animation-delay-300"
        style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {sessions.map((session, i) => {
          const pct = Math.round((session.score / session.total) * 100);
          return (
            <Link key={session.id} href={`/history/${session.id}`}>
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-white/[0.03] group"
                style={{ borderBottom: i < sessions.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: session.passed ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)",
                  }}
                >
                  {session.passed
                    ? <CheckCircle size={16} className="text-emerald-400" />
                    : <XCircle size={16} className="text-red-400" />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{session.mode}</p>
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={session.passed
                        ? { color: "#34D399", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }
                        : { color: "#F87171", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }
                      }
                    >
                      {session.passed ? "Aprovado" : "Reprovado"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-white/30">
                    <span>{session.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {session.duration}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-base font-bold text-white font-mono">{session.score}/{session.total}</p>
                  <p className="text-xs text-white/35 font-mono">{pct}%</p>
                </div>

                <ChevronRight size={14} className="text-white/15 group-hover:text-blue-400 transition-colors shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
