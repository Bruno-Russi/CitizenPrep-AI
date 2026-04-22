"use client";

import { cn } from "@/lib/utils";

type AudioWaveformProps = {
  isActive: boolean;
  variant?: "officer" | "user";
};

const BAR_HEIGHTS = [40, 65, 50, 80, 55, 90, 45, 70, 60, 85, 50, 65, 40];

export function AudioWaveform({ isActive, variant = "officer" }: AudioWaveformProps) {
  const gradient = variant === "officer"
    ? "linear-gradient(180deg, #3B82F6, #06B6D4)"
    : "linear-gradient(180deg, #10B981, #06B6D4)";

  return (
    <div className="flex items-center justify-center gap-[3px] h-12">
      {BAR_HEIGHTS.map((height, i) => (
        <div
          key={i}
          style={{
            height: isActive ? `${height}%` : "20%",
            animationDelay: isActive ? `${i * 60}ms` : "0ms",
            background: gradient,
            borderRadius: "99px",
          }}
          className={cn("w-1 transition-all", isActive && "animate-bounce")}
        />
      ))}
    </div>
  );
}
