"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Mic,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/practice", label: "Praticar", icon: BookOpen },
  { href: "/simulation", label: "Simular", icon: Mic },
  { href: "/history", label: "Histórico", icon: History },
  { href: "/settings", label: "Configurações", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-[--color-navy] text-white shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[--color-sky] flex items-center justify-center font-bold text-sm shadow-lg">
            CP
          </div>
          <span className="font-bold text-lg tracking-tight">
            CitizenPrep <span className="text-[--color-sky]">AI</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-[--color-sky]/20 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon
                size={18}
                className={active ? "text-[--color-sky]" : ""}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Usuário */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-[--color-sky]/30 flex items-center justify-center text-xs font-bold text-white shrink-0">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-white/50 truncate">john@email.com</p>
          </div>
          <LogOut size={14} className="text-white/40 group-hover:text-white/70 shrink-0 transition-colors" />
        </div>
      </div>
    </aside>
  );
}
