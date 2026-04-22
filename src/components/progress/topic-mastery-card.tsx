import { TopicMastery } from "@/features/progress/mock-data";

type TopicMasteryCardProps = {
  mastery: TopicMastery;
};

export function TopicMasteryCard({ mastery }: TopicMasteryCardProps) {
  const pct = Math.round((mastery.correct / mastery.total) * 100);
  const level = pct >= 80 ? "Avançado" : pct >= 50 ? "Intermediário" : "Iniciante";
  const levelColor = pct >= 80 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444";

  return (
    <div
      className="rounded-xl px-4 py-3.5 flex items-center gap-4"
      style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Color dot */}
      <div
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: mastery.color, boxShadow: `0 0 8px ${mastery.color}60` }}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-sm font-medium text-white">{mastery.topic}</p>
          <div className="flex items-center gap-2">
            <span
              className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full"
              style={{ color: levelColor, background: `${levelColor}18`, border: `1px solid ${levelColor}30` }}
            >
              {level}
            </span>
            <span className="text-sm font-bold text-white font-mono">{pct}%</span>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${mastery.color}99, ${mastery.color})`,
            }}
          />
        </div>

        <p className="text-[10px] text-white/20 mt-1">
          {mastery.correct} de {mastery.total} corretas
        </p>
      </div>
    </div>
  );
}
