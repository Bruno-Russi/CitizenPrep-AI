"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Mic,
  History,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton } from "./user-button";

const links = [
  { href: "/dashboard",  label: "Dashboard", icon: LayoutDashboard },
  { href: "/practice",   label: "Praticar",  icon: BookOpen },
  { href: "/simulation", label: "Simular",   icon: Mic },
  { href: "/history",    label: "Histórico", icon: History },
  { href: "/settings",   label: "Config",    icon: Settings },
];

interface SidebarProps {
  user: { name: string; email: string; initials: string };
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="hidden lg:flex flex-col w-60 min-h-screen shrink-0"
      style={{
        background: "#111827",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div
        className="px-5 pt-6 pb-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-opacity group-hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)" }}
          >
            <span className="font-bold text-white text-xs tracking-tight">CP</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm leading-none tracking-tight">
              CitizenPrep
            </span>
            <span className="text-cyan-400 text-[10px] font-medium tracking-wide mt-0.5">
              AI
            </span>
          </div>
        </Link>
      </div>

      {/* Section label */}
      <div className="px-5 pt-5 pb-2">
        <span className="text-[10px] font-medium tracking-widest text-white/20 uppercase">
          Menu
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "text-blue-400"
                  : "text-white/45 hover:text-white/80"
              )}
              style={
                active
                  ? { background: "rgba(59,130,246,0.12)" }
                  : undefined
              }
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "";
                }
              }}
            >
              <Icon
                size={16}
                className={cn(
                  "shrink-0",
                  active ? "text-blue-400" : "text-white/35"
                )}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div
        className="mx-5 mb-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      />

      {/* User */}
      <div className="p-3 pb-5">
        <UserButton {...user} />
      </div>
    </aside>
  );
}
