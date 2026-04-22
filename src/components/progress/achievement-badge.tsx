import { Achievement } from "@/features/progress/mock-data";
import { Lock } from "lucide-react";

type AchievementBadgeProps = {
  achievement: Achievement;
  size?: "sm" | "md";
};

export function AchievementBadge({ achievement, size = "md" }: AchievementBadgeProps) {
  const isSmall = size === "sm";

  return (
    <div
      className="flex flex-col items-center gap-2 text-center transition-all"
      style={{ opacity: achievement.unlocked ? 1 : 0.4 }}
    >
      <div
        className="relative flex items-center justify-center rounded-2xl"
        style={{
          width: isSmall ? 44 : 56,
          height: isSmall ? 44 : 56,
          background: achievement.unlocked
            ? "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.15))"
            : "rgba(255,255,255,0.04)",
          border: achievement.unlocked
            ? "1px solid rgba(59,130,246,0.3)"
            : "1px solid rgba(255,255,255,0.07)",
          boxShadow: achievement.unlocked
            ? "0 0 16px rgba(59,130,246,0.15)"
            : "none",
        }}
      >
        <span style={{ fontSize: isSmall ? 20 : 26 }}>{achievement.icon}</span>
        {!achievement.unlocked && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-2xl"
            style={{ background: "rgba(10,15,30,0.6)" }}
          >
            <Lock size={12} className="text-white/20" />
          </div>
        )}
      </div>

      <div>
        <p
          className="font-semibold leading-tight"
          style={{
            fontSize: isSmall ? 10 : 11,
            color: achievement.unlocked ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)",
          }}
        >
          {achievement.title}
        </p>
        {achievement.unlocked && achievement.unlockedAt && (
          <p className="text-[9px] text-white/20 mt-0.5">{achievement.unlockedAt}</p>
        )}
      </div>
    </div>
  );
}
