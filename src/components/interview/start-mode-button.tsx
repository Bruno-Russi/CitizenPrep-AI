"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ChevronRight } from "lucide-react";
import { startSession } from "@/features/interview/actions";
import type { SessionMode } from "@/types/supabase";

type Props = {
  mode: SessionMode;
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  description: string;
  style?: React.CSSProperties;
  className?: string;
};

export function StartModeButton({ mode, icon, iconBg, label, description, style, className }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const result = await startSession("standard", mode);
      if ("error" in result) return;
      router.push(`/simulation/${result.sessionId}?mode=${mode}`);
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={`group w-full rounded-xl p-5 text-left transition-all disabled:opacity-60 ${className ?? ""}`}
      style={style}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: iconBg }}>
          {pending ? <Loader2 size={18} className="text-white animate-spin" /> : icon}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white leading-snug">{label}</p>
          <p className="text-xs text-white/45 mt-0.5">{description}</p>
        </div>
        <ChevronRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
      </div>
    </button>
  );
}
