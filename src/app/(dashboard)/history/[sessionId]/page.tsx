import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Clock, Trophy, RotateCcw } from "lucide-react";
import { SESSIONS } from "@/features/progress/mock-data";
import { ResultCard } from "@/components/interview/result-card";
import { StudyTip } from "@/components/interview/study-tip";

type PageProps = {
  params: Promise<{ sessionId: string }>;
};

export default async function SessionReviewPage({ params }: PageProps) {
  const { sessionId } = await params;
  const session = SESSIONS.find((s) => s.id === sessionId);

  if (!session) notFound();

  const pct = Math.round((session.score / session.total) * 100);
  const wrongAnswers = session.answers.filter((a) => !a.correct);
  const tipsToShow = wrongAnswers.filter((a) => a.tip).slice(0, 2);

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
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: session.passed ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.12)",
              }}
            >
              {session.passed
                ? <Trophy size={22} className="text-emerald-400" />
                : <XCircle size={22} className="text-red-400" />
              }
            </div>
            <div>
              <p className="text-white font-bold text-lg">
                {session.passed ? "Aprovado" : "Reprovado"}
              </p>
              <p className="text-white/40 text-sm mt-0.5">{session.mode} · {session.date}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-3xl font-bold text-white font-mono">{session.score}/{session.total}</p>
            <p className="text-sm text-white/35 font-mono">{pct}%</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            { label: "Duração",   value: session.duration, icon: <Clock size={12} /> },
            { label: "Corretas",  value: `${session.score}`, icon: <CheckCircle size={12} className="text-emerald-400" /> },
            { label: "Erradas",   value: `${session.total - session.score}`, icon: <XCircle size={12} className="text-red-400" /> },
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

      {/* Study tips */}
      {tipsToShow.length > 0 && (
        <div className="space-y-3 animate-fade-up animation-delay-200">
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/30">
            Pontos a estudar
          </p>
          <div className="space-y-2">
            {tipsToShow.map((a, i) => (
              <StudyTip key={i} tip={a.tip!} category={a.category} />
            ))}
          </div>
        </div>
      )}

      {/* Per-question review */}
      {session.answers.length > 0 && (
        <div className="space-y-3 animate-fade-up animation-delay-300">
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/30">
            Revisão completa
          </p>
          <div className="space-y-2">
            {session.answers.map((answer, i) => (
              <ResultCard
                key={answer.questionId}
                questionNumber={i + 1}
                question={answer.question}
                userAnswer={answer.userAnswer}
                correctAnswer={answer.correctAnswer}
                correct={answer.correct}
              />
            ))}
          </div>
        </div>
      )}

      {session.answers.length === 0 && (
        <div
          className="rounded-xl p-8 text-center animate-fade-up animation-delay-200"
          style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-white/25 text-sm">Detalhes de resposta não disponíveis para esta sessão.</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 animate-fade-up animation-delay-400">
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
