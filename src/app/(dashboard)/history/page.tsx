import { CheckCircle, XCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getSessionHistory } from "@/features/progress/actions";
import { StreakCalendar } from "@/components/progress/streak-calendar";
import { ScoreLineChart } from "@/components/progress/score-line-chart";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function HistoryPage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [sessions, streakRaw] = await Promise.all([
    getSessionHistory(30),
    user
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? (supabase.from("streaks") as any)
          .select("current_streak, longest_streak")
          .eq("user_id", user.id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const streak = streakRaw.data as { current_streak: number; longest_streak: number } | null;

  const totalSessions = sessions.length;
  const passed = sessions.filter((s) => s.passed).length;
  const avgScore = totalSessions > 0
    ? Math.round(sessions.reduce((acc, s) => acc + (s.score / s.total) * 100, 0) / totalSessions)
    : 0;

  // Activity map: count sessions per day
  const activityDates: Record<string, number> = {};
  for (const s of sessions) {
    const day = s.startedAt.slice(0, 10);
    activityDates[day] = (activityDates[day] ?? 0) + 1;
  }

  // Score history for chart (oldest first, last 10)
  const recentScores = sessions
    .slice(0, 10)
    .reverse()
    .map((s) => ({
      date: new Date(s.startedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      score: s.total ? Math.round((s.score / s.total) * 100) : 0,
      passed: s.passed,
    }));

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
          { label: "Média de acerto", value: totalSessions ? `${avgScore}%` : "—" },
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

      {/* Streak Calendar com dados reais */}
      <StreakCalendar
        activityDates={activityDates}
        currentStreak={streak?.current_streak ?? 0}
        longestStreak={streak?.longest_streak ?? 0}
      />

      {/* Score Line Chart com dados reais */}
      <ScoreLineChart data={recentScores} />

      {/* Lista de sessões */}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-widest text-white/30 mb-3">
          Todas as sessões
        </p>

        {sessions.length === 0 ? (
          <div
            className="rounded-xl p-10 text-center animate-fade-up animation-delay-200"
            style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="text-white/25 text-sm">Nenhuma sessão concluída ainda.</p>
            <Link href="/simulation" className="inline-block mt-4 text-xs text-blue-400 hover:text-blue-300 transition-colors">
              Iniciar primeira simulação →
            </Link>
          </div>
        ) : (
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
                      style={{ background: session.passed ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)" }}
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
                      <p className="text-xs text-white/30 mt-0.5">{session.dateLabel}</p>
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
        )}
      </div>
    </div>
  );
}
