import Link from "next/link";
import { XCircle, RotateCcw, Home, Trophy } from "lucide-react";
import { ResultCard } from "@/components/interview/result-card";
import { StudyTip } from "@/components/interview/study-tip";
import { CIVICS_QUESTIONS, MOCK_ANSWERS } from "@/features/interview/mock-data";

type PageProps = {
  searchParams: Promise<{ score?: string; total?: string }>;
};

export default async function ResultPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const score = Number(params.score ?? 8);
  const total = Number(params.total ?? 10);
  const passed = score >= Math.ceil(total * 0.6);
  const pct = Math.round((score / total) * 100);

  const wrongAnswers = MOCK_ANSWERS.filter((a) => !a.correct);
  const tipsToShow = wrongAnswers
    .map((a) => CIVICS_QUESTIONS.find((q) => q.id === a.questionId))
    .filter(Boolean)
    .slice(0, 2);

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

      {/* Study tips */}
      {tipsToShow.length > 0 && (
        <div className="space-y-3">
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/30">
            Estude mais
          </p>
          <div className="space-y-2">
            {tipsToShow.map((q) =>
              q ? <StudyTip key={q.id} tip={q.tip} category={q.category} /> : null
            )}
          </div>
        </div>
      )}

      {/* Per-question review */}
      <div className="space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-widest text-white/30">
          Revisão completa
        </p>
        <div className="space-y-2">
          {CIVICS_QUESTIONS.map((q, i) => {
            const answer = MOCK_ANSWERS.find((a) => a.questionId === q.id);
            if (!answer) return null;
            return (
              <ResultCard
                key={q.id}
                questionNumber={i + 1}
                question={q.question}
                userAnswer={answer.transcript}
                correctAnswer={q.correctAnswers[0]}
                correct={answer.correct}
              />
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Link
          href="/simulation/session-mock"
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
