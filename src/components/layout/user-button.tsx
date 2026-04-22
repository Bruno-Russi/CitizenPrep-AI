"use client";

import { LogOut } from "lucide-react";
import { signOut } from "@/features/auth/actions";

interface UserButtonProps {
  name: string;
  email: string;
  initials: string;
}

export function UserButton({ name, email, initials }: UserButtonProps) {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all group text-left"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "";
        }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
          style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)" }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{name}</p>
          <p className="text-[11px] text-white/35 truncate">{email}</p>
        </div>
        <LogOut
          size={13}
          className="text-white/25 group-hover:text-white/55 shrink-0 transition-colors"
        />
      </button>
    </form>
  );
}
