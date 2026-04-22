type SessionProgressProps = {
  current: number;
  total: number;
  correctCount: number;
};

export function SessionProgress({ current, total, correctCount }: SessionProgressProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="space-y-1.5 min-w-[120px]">
      <div className="flex justify-between text-[10px] text-white/40">
        <span>{current}/{total}</span>
        <span className="text-emerald-400 font-medium">{correctCount} corretas</span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
          }}
        />
      </div>
    </div>
  );
}
