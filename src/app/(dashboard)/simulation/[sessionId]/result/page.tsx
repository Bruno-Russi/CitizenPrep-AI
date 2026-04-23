import Link from "next/link";
import { notFound } from "next/navigation";
import { XCircle, RotateCcw, Home, Trophy, CheckCircle2 } from "lucide-react";
import { getSessionDetail } from "@/features/progress/actions";
import { QUESTION_PT } from "@/features/civics/question-translations";

type PageProps = {
  params: Promise<{ sessionId: string }>;
};

export default async function ResultPage({ params }: PageProps) {
  const { sessionId } = await params;
  const session = await getSessionDetail(sessionId);

  if (!session) notFound();

  const { score, total, passed, answers } = session;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const wrongAnswers = answers.filter((a) => !a.correct);

  return (
    <div className="max-w-lg mx-auto space-y-6 pb-10 px-4 pt-6">

      {/* Hero */}
      <div
        className="rounded-2xl p-6 text-center space-y-4"
        style={
          passed
            ? { background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }
            : { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)" }
        }
      >
        <div className="flex justify-center">
          {passed
            ? <Trophy size={44} className="text-emerald-400" />
            : <XCircle size={44} className="text-red-400" />
          }
        </div>
        <div>
          <p className="text-white font-bold text-2xl tracking-tight">
            {passed ? "Aprovado!" : "Reprovado"}
          </p>
          <p className="text-white/55 text-sm mt-1">
            {passed
              ? "Parabéns! Você está pronto para a entrevista."
              : "Continue praticando. Você precisa de 6/10 para passar."}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          {[
            { value: `${score}/${total}`, label: "respostas corretas" },
            { value: `${pct}%`, label: "de acerto" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl px-5 py-3 text-center"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <p className="text-3xl font-bold text-white font-mono">{item.value}</p>
              <p className="text-xs text-white/40 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Erros para estudar */}
      {wrongAnswers.length > 0 && (
        <div className="space-y-3">
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/30">
            Estude mais
          </p>
          <div className="space-y-2">
            {wrongAnswers.slice(0, 3).map((a) => (
              <div
                key={a.questionId}
                className="rounded-xl p-4 space-y-1"
                style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.15)" }}
              >
                <p className="text-xs font-semibold text-amber-400/80 uppercase tracking-wide">{a.category.replace(/_/g, " ")}</p>
                <p className="text-sm text-white/80 leading-snug">{a.question}</p>
                {QUESTION_PT[a.question] && (
                  <p className="text-xs text-white/35 leading-snug">{QUESTION_PT[a.question]}</p>
                )}
                <p className="text-xs text-emerald-400/70 mt-1">✓ {a.acceptedAnswers[0]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Revisão completa */}
      <div className="space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-widest text-white/30">
          Revisão completa
        </p>
        <div className="space-y-2">
          {answers.map((a, i) => (
            <div
              key={a.questionId}
              className="rounded-xl p-4"
              style={{
                background: a.correct ? "rgba(16,185,129,0.06)" : "rgba(239,68,68,0.06)",
                border: `1px solid ${a.correct ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)"}`,
              }}
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  {a.correct
                    ? <CheckCircle2 size={15} className="text-emerald-400" />
                    : <XCircle size={15} className="text-red-400" />
                  }
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-xs text-white/35 font-mono">P{i + 1}</p>
                  <p className="text-sm text-white/85 leading-snug">{a.question}</p>
                  {a.transcript && (
                    <p className="text-xs text-white/40 italic">"{a.transcript}"</p>
                  )}
                  {!a.correct && a.acceptedAnswers[0] && (
                    <p className="text-xs text-emerald-400/70">✓ {a.acceptedAnswers[0]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Link
          href="/simulation"
          className="flex items-center justify-center gap-2 h-12 rounded-xl font-semibold text-sm text-white transition-all"
          style={{ background: "linear-gradient(135deg, #3B82F6, #2563EB)", boxShadow: "0 1px 20px rgba(59,130,246,0.3)" }}
        >
          <RotateCcw size={15} />
          Tentar novamente
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 h-12 rounded-xl font-semibold text-sm text-white/60 transition-all hover:text-white"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Home size={15} />
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
