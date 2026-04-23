import { QUESTION_PT } from "@/features/civics/question-translations";

type QuestionCardProps = {
  question: string;
  current: number;
  total: number;
};

export function QuestionCard({ question, current, total }: QuestionCardProps) {
  const questionPt = QUESTION_PT[question];

  return (
    <div
      className="w-full rounded-xl p-4 space-y-2 text-center"
      style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <p className="text-[10px] font-medium uppercase tracking-widest text-blue-400/70">
        Pergunta {current} de {total}
      </p>
      <p className="text-base font-semibold text-white leading-snug">{question}</p>
      {questionPt && (
        <p className="text-sm text-white/45 leading-snug">{questionPt}</p>
      )}
    </div>
  );
}
