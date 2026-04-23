"use client";

import { LogOut } from "lucide-react";
import { signOut } from "@/features/auth/actions";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-red-500/5 group"
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "rgba(239,68,68,0.1)" }}
        >
          <LogOut size={15} className="text-red-400" />
        </div>
        <p className="text-sm font-medium text-red-400">Sair da conta</p>
      </button>
    </form>
  );
}
