import { CheckCircle2, XCircle } from "lucide-react";

type ResultCardProps = {
  questionNumber: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
};

export function ResultCard({ questionNumber, question, userAnswer, correctAnswer, correct }: ResultCardProps) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {correct
          ? <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          : <XCircle size={15} className="text-red-400 shrink-0" />
        }
        <p className="text-[10px] font-medium uppercase tracking-widest text-white/35">
          Pergunta {questionNumber}
        </p>
      </div>

      <div className="px-4 py-3 space-y-3">
        <p className="text-sm font-medium text-white">{question}</p>

        <div className="space-y-1.5">
          <div className="flex gap-2 text-xs">
            <span className="text-white/30 shrink-0 w-24">Você disse:</span>
            <span className={correct ? "text-emerald-400" : "text-red-400"}>
              "{userAnswer}"
            </span>
          </div>
          {!correct && (
            <div className="flex gap-2 text-xs">
              <span className="text-white/30 shrink-0 w-24">Correto:</span>
              <span className="text-white font-medium">{correctAnswer}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
