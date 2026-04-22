import { CheckCircle, XCircle, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { SESSIONS } from "@/features/progress/mock-data";
import { StreakCalendar } from "@/components/progress/streak-calendar";
import { ScoreLineChart } from "@/components/progress/score-line-chart";

export default function HistoryPage() {
  const totalSessions = SESSIONS.length;
  const passed = SESSIONS.filter((s) => s.passed).length;
  const avgScore = Math.round(
    SESSIONS.reduce((acc, s) => acc + (s.score / s.total) * 100, 0) / SESSIONS.length
  );

  return (
    <div className="max-w-3xl mx-auto space-y-7">

      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-[28px] font-bold text-white leading-tight tracking-tight">Histórico</h1>
        <p className="text-white/45 text-sm mt-1">Suas sessões de prática e evolução ao longo do tempo.</p>
      </div>

      {/* Resumo */}
      <div
        className="grid grid-cols-3 animate-fade-up animation-delay-100"
        style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.75rem", overflow: "hidden" }}
      >
        {[
          { label: "Sessões",         value: totalSessions },
          { label: "Aprovações",      value: passed },
          { label: "Média de acerto", value: `${avgScore}%` },
        ].map((s, i) => (
          <div
            key={s.label}
            className="p-5 text-center"
            style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none" }}
          >
            <p className="text-2xl font-bold text-white font-mono">{s.value}</p>
            <p className="text-[11px] font-medium uppercase tracking-widest text-white/35 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Streak Calendar */}
      <StreakCalendar />

      {/* Score Line Chart */}
      <ScoreLineChart />

      {/* Lista de sessões */}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-widest text-white/30 mb-3">
          Todas as sessões
        </p>
        <div
          className="rounded-xl overflow-hidden animate-fade-up animation-delay-300"
          style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {SESSIONS.map((session, i) => {
            const pct = Math.round((session.score / session.total) * 100);
            return (
              <Link key={session.id} href={`/history/${session.id}`}>
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-white/[0.03] group"
                  style={{ borderBottom: i < SESSIONS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
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
    </div>
  );
}
