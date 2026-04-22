"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Mic, History, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/practice", label: "Praticar", icon: BookOpen },
  { href: "/simulation", label: "Simular", icon: Mic },
  { href: "/history", label: "Histórico", icon: History },
  { href: "/settings", label: "Config.", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border">
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all min-w-0",
                active ? "text-[--color-navy]" : "text-[--color-gray-secondary]"
              )}
            >
              <Icon
                size={20}
                className={cn(
                  "transition-colors",
                  active ? "text-[--color-sky]" : ""
                )}
              />
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
