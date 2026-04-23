import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";
import { getSessionDetail } from "@/features/progress/actions";
import { QUESTION_PT } from "@/features/civics/question-translations";

type PageProps = {
  params: Promise<{ sessionId: string }>;
};

export default async function SessionReviewPage({ params }: PageProps) {
  const { sessionId } = await params;
  const session = await getSessionDetail(sessionId);

  if (!session) notFound();

  const pct = Math.round((session.score / session.total) * 100);
  const wrongAnswers = session.answers.filter((a) => !a.correct);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-10">

      {/* Back */}
      <Link
        href="/history"
        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors animate-fade-up"
      >
        <ArrowLeft size={14} />
        Histórico
      </Link>

      {/* Hero card */}
      <div
        className="rounded-2xl p-6 animate-fade-up animation-delay-100"
        style={
          session.passed
            ? { background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }
            : { background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }
        }
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: session.passed ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.12)" }}
            >
              {session.passed
                ? <Trophy size={20} className="text-emerald-400" />
                : <XCircle size={20} className="text-red-400" />
              }
            </div>
            <div>
              <p className="text-white font-bold text-base sm:text-lg">
                {session.passed ? "Aprovado" : "Reprovado"}
              </p>
              <p className="text-white/40 text-xs sm:text-sm mt-0.5">{session.mode} · {session.dateLabel}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-2xl sm:text-3xl font-bold text-white font-mono">{session.score}/{session.total}</p>
            <p className="text-sm text-white/35 font-mono">{pct}%</p>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            { label: "Corretas",  value: `${session.score}`,                    icon: <CheckCircle size={12} className="text-emerald-400" /> },
            { label: "Erradas",   value: `${session.total - session.score}`,     icon: <XCircle size={12} className="text-red-400" /> },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-white/30">{item.icon}</span>
              <div>
                <p className="text-sm font-bold text-white font-mono">{item.value}</p>
                <p className="text-[10px] text-white/25">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weak areas tip */}
      {wrongAnswers.length > 0 && (
        <div
          className="rounded-xl p-4 animate-fade-up animation-delay-150"
          style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.15)" }}
        >
          <p className="text-xs font-semibold text-amber-400 mb-1">Pontos a estudar</p>
          <p className="text-xs text-white/50">
            {wrongAnswers
              .map((a) => a.feedback)
              .filter(Boolean)
              .slice(0, 2)
              .join(" · ")}
          </p>
        </div>
      )}

      {/* Per-question review */}
      {session.answers.length > 0 ? (
        <div className="space-y-3 animate-fade-up animation-delay-200">
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/30">
            Revisão completa
          </p>
          <div className="space-y-2">
            {session.answers.map((answer, i) => (
              <div
                key={answer.questionId}
                className="rounded-xl p-4"
                style={{
                  background: answer.correct ? "rgba(16,185,129,0.06)" : "rgba(239,68,68,0.06)",
                  border: `1px solid ${answer.correct ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)"}`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: answer.correct ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.12)" }}
                  >
                    {answer.correct
                      ? <CheckCircle size={13} className="text-emerald-400" />
                      : <XCircle size={13} className="text-red-400" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 font-mono mb-1">#{i + 1}</p>
                    <p className="text-sm font-medium text-white leading-snug">{answer.question}</p>
                    {QUESTION_PT[answer.question] && (
                      <p className="text-xs text-white/35 mt-0.5">{QUESTION_PT[answer.question]}</p>
                    )}

                    {answer.transcript && (
                      <div className="mt-2">
                        <p className="text-[10px] uppercase tracking-widest text-white/25 mb-1">Sua resposta</p>
                        <p className="text-xs text-white/60 italic">&ldquo;{answer.transcript}&rdquo;</p>
                      </div>
                    )}

                    {!answer.correct && answer.acceptedAnswers.length > 0 && (
                      <div className="mt-2">
                        <p className="text-[10px] uppercase tracking-widest text-white/25 mb-1">Resposta aceita</p>
                        <p className="text-xs text-emerald-400/80">{answer.acceptedAnswers.slice(0, 3).join(" · ")}</p>
                      </div>
                    )}

                    {answer.feedback && (
                      <p className="text-xs text-white/40 mt-2 leading-relaxed">{answer.feedback}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="rounded-xl p-8 text-center animate-fade-up animation-delay-200"
          style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-white/25 text-sm">Detalhes de resposta não disponíveis para esta sessão.</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 animate-fade-up animation-delay-300">
        <Link
          href="/simulation"
          className="flex items-center justify-center gap-2 h-12 rounded-xl font-semibold text-sm text-white transition-all"
          style={{ background: "linear-gradient(135deg, #3B82F6, #2563EB)", boxShadow: "0 1px 20px rgba(59,130,246,0.3)" }}
        >
          <RotateCcw size={15} />
          Nova simulação
        </Link>
        <Link
          href="/history"
          className="flex items-center justify-center gap-2 h-12 rounded-xl font-semibold text-sm text-white/50 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <ArrowLeft size={15} />
          Voltar ao histórico
        </Link>
      </div>
    </div>
  );
}
