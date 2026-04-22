"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Mic, History, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard",  label: "Home",      icon: LayoutDashboard },
  { href: "/practice",   label: "Praticar",  icon: BookOpen },
  { href: "/simulation", label: "Simular",   icon: Mic },
  { href: "/history",    label: "Histórico", icon: History },
  { href: "/settings",   label: "Config",    icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "#111827",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center justify-around px-1 pt-2 pb-safe">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 min-w-0 rounded-lg transition-all min-h-[44px] min-w-[44px] justify-center",
                active ? "text-blue-400" : "text-white/35 hover:text-white/60"
              )}
            >
              {active && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg, #3B82F6, #06B6D4)" }}
                />
              )}
              <Icon
                size={18}
                className={cn(
                  "transition-colors",
                  active ? "text-blue-400" : "text-white/35"
                )}
              />
              <span className={cn(
                "text-[9px] font-medium leading-none uppercase tracking-wide",
                active ? "text-blue-400" : "text-white/35"
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
