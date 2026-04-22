import { CheckCircle, XCircle, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const sessions = [
  { id: "1", date: "Hoje, 14:32", mode: "Simulação", score: 8, total: 10, passed: true, duration: "12min" },
  { id: "2", date: "Ontem, 09:15", mode: "Prática", score: 15, total: 20, passed: true, duration: "18min" },
  { id: "3", date: "21 abr", mode: "Simulação", score: 5, total: 10, passed: false, duration: "14min" },
  { id: "4", date: "20 abr", mode: "Prática", score: 17, total: 20, passed: true, duration: "22min" },
  { id: "5", date: "18 abr", mode: "Simulação", score: 7, total: 10, passed: true, duration: "11min" },
  { id: "6", date: "16 abr", mode: "Prática", score: 12, total: 20, passed: true, duration: "20min" },
  { id: "7", date: "15 abr", mode: "Simulação", score: 4, total: 10, passed: false, duration: "13min" },
  { id: "8", date: "13 abr", mode: "Prática", score: 9, total: 20, passed: false, duration: "16min" },
];

export default function HistoryPage() {
  const totalSessions = sessions.length;
  const passed = sessions.filter((s) => s.passed).length;
  const avgScore = Math.round(
    sessions.reduce((acc, s) => acc + (s.score / s.total) * 100, 0) / sessions.length
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[--color-navy]">Histórico</h1>
        <p className="text-[--color-gray-secondary] text-sm mt-1">
          Suas últimas sessões de prática e simulação.
        </p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Sessões", value: totalSessions },
          { label: "Aprovações", value: passed },
          { label: "Média de acerto", value: `${avgScore}%` },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border p-4 text-center">
            <p className="text-xl font-bold text-[--color-navy]">{s.value}</p>
            <p className="text-xs text-[--color-gray-secondary] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Gráfico de evolução (mockado visual) */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-[--color-navy]">Evolução de score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-24">
            {sessions
              .slice()
              .reverse()
              .map((s, i) => {
                const pct = Math.round((s.score / s.total) * 100);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md transition-all"
                      style={{
                        height: `${pct}%`,
                        backgroundColor: s.passed ? "var(--color-sage)" : "var(--color-amber)",
                      }}
                    />
                  </div>
                );
              })}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-xs text-[--color-gray-secondary]">
              <div className="w-3 h-3 rounded-sm bg-[--color-sage]" /> Aprovado
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[--color-gray-secondary]">
              <div className="w-3 h-3 rounded-sm bg-[--color-amber]" /> Reprovado
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Lista de sessões */}
      <div className="space-y-2">
        {sessions.map((session) => {
          const pct = Math.round((session.score / session.total) * 100);
          return (
            <Link key={session.id} href={`/history/${session.id}`}>
              <Card className="hover:shadow-sm transition-all cursor-pointer hover:border-[--color-sky]/20 group">
                <CardContent className="py-4 flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${session.passed ? "bg-[--color-sage]/10" : "bg-red-50"}`}>
                    {session.passed
                      ? <CheckCircle size={18} className="text-[--color-sage]" />
                      : <XCircle size={18} className="text-red-400" />
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[--color-navy]">{session.mode}</p>
                      <Badge
                        variant="secondary"
                        className={`text-xs border-0 ${session.passed ? "bg-[--color-sage]/10 text-[--color-sage]" : "bg-red-50 text-red-500"}`}
                      >
                        {session.passed ? "Aprovado" : "Reprovado"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-[--color-gray-secondary]">
                      <span>{session.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {session.duration}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-[--color-navy]">
                      {session.score}/{session.total}
                    </p>
                    <p className="text-xs text-[--color-gray-secondary]">{pct}%</p>
                  </div>

                  <ChevronRight size={14} className="text-[--color-gray-secondary] group-hover:text-[--color-sky] transition-colors shrink-0" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
