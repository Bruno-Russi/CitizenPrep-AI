import { Lightbulb } from "lucide-react";

type StudyTipProps = {
  tip: string;
  category: string;
};

export function StudyTip({ tip, category }: StudyTipProps) {
  return (
    <div
      className="rounded-xl px-4 py-3 flex gap-3"
      style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" }}
    >
      <Lightbulb size={16} className="text-amber-400 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-amber-400 mb-0.5">{category}</p>
        <p className="text-xs text-white/55 leading-relaxed">{tip}</p>
      </div>
    </div>
  );
}
