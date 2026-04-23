import Link from "next/link";
import { Flame, Zap, Mic, BookOpen, TrendingUp, ChevronRight, Award, BarChart3, AlertCircle } from "lucide-react";
import { AchievementBadge } from "@/components/progress/achievement-badge";
import { getDashboardStats } from "@/features/progress/actions";
import type { Achievement } from "@/features/progress/mock-data";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-white/30 text-sm">Erro ao carregar dados.</p>
      </div>
    );
  }

  const xpPercent = (stats.xpInLevel / stats.xpToNext) * 100;

  const achievements: Achievement[] = [
    {
      id: "first-sim",
      title: "Primeira Simulação",
      description: "Completou sua primeira entrevista simulada",
      icon: "🎯",
      unlocked: stats.totalSessions >= 1,
      unlockedAt: stats.totalSessions >= 1 ? "Desbloqueado" : undefined,
    },
    {
      id: "streak-7",
      title: "Semana Perfeita",
      description: "7 dias consecutivos de prática",
      icon: "🔥",
      unlocked: stats.longestStreak >= 7,
      unlockedAt: stats.longestStreak >= 7 ? "Desbloqueado" : undefined,
    },
    {
      id: "first-pass",
      title: "Aprovado!",
      description: "Passou em uma simulação com 60%+",
      icon: "✅",
      unlocked: stats.recentScores.some((s) => s.passed),
      unlockedAt: stats.recentScores.some((s) => s.passed) ? "Desbloqueado" : undefined,
    },
    {
      id: "perfect",
      title: "Nota Máxima",
      description: "10/10 em uma simulação",
      icon: "⭐",
      unlocked: stats.recentScores.some((s) => s.score === 100),
      unlockedAt: stats.recentScores.some((s) => s.score === 100) ? "Desbloqueado" : undefined,
    },
    {
      id: "streak-30",
      title: "Mês de Dedicação",
      description: "30 dias consecutivos de prática",
      icon: "🏆",
      unlocked: stats.longestStreak >= 30,
      unlockedAt: stats.longestStreak >= 30 ? "Desbloqueado" : undefined,
    },
    {
      id: "master",
      title: "Mestre da Cidadania",
      description: "100% de domínio em todos os tópicos",
      icon: "🎓",
      unlocked: stats.dominated >= 100,
      unlockedAt: stats.dominated >= 100 ? "Desbloqueado" : undefined,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-7">

      {/* ── Header ── */}
      <div className="flex items-start justify-between animate-fade-up">
        <div>
          <h1 className="text-[28px] font-bold text-white leading-tight tracking-tight">
            Olá, {stats.name} 👋
          </h1>
          <p className="text-white/45 text-sm mt-1">
            {stats.totalSessions === 0
              ? "Faça sua primeira simulação para começar!"
              : "Continue de onde parou. Você está indo bem!"}
          </p>
        </div>
        {/* Streak badge */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold"
          style={{
            background: "rgba(251,146,60,0.12)",
            border: "1px solid rgba(251,146,60,0.2)",
            color: "#FB923C",
          }}
        >
          <Flame size={15} />
          <span>{stats.streak} {stats.streak === 1 ? "dia" : "dias"}</span>
        </div>
      </div>

      {/* ── XP / Progress ── */}
      <div
        className="rounded-xl p-5 animate-fade-up animation-delay-100"
        style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.15)" }}
            >
              <Zap size={16} className="text-blue-400" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-white/35">
                Nível {stats.level}
              </p>
              <p className="text-base font-bold text-white">{stats.xp} XP</p>
            </div>
          </div>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(59,130,246,0.12)",
              color: "#93C5FD",
              border: "1px solid rgba(59,130,246,0.2)",
            }}
          >
            Nível {stats.level}
          </span>
        </div>

        <div
          className="relative h-2 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
            style={{
              width: `${xpPercent}%`,
              background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] font-mono text-white/30">{stats.xpInLevel} XP</span>
          <span className="text-[10px] text-white/30">
            +{stats.xpToNext - stats.xpInLevel} para Nível {stats.level + 1}
          </span>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-3 gap-3 animate-fade-up animation-delay-200">
        {[
          { label: "Simulações",     value: stats.totalSessions,              icon: Mic,      iconBg: "rgba(59,130,246,0.12)",  iconColor: "#60A5FA" },
          { label: "Taxa de acerto", value: stats.totalSessions ? `${stats.accuracy}%` : "—", icon: TrendingUp, iconBg: "rgba(16,185,129,0.12)", iconColor: "#34D399" },
          { label: "Dominadas",      value: stats.dominated,                  icon: Award,    iconBg: "rgba(251,146,60,0.12)",  iconColor: "#FB923C" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-5"
            style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
              style={{ background: s.iconBg }}
            >
              <s.icon size={16} style={{ color: s.iconColor }} />
            </div>
            <p className="text-3xl font-bold text-white font-mono">{s.value}</p>
            <p className="text-[11px] font-medium uppercase tracking-widest text-white/35 mt-1.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-up animation-delay-300">
        <Link href="/simulation">
          <div
            className="group rounded-xl p-5 cursor-pointer transition-all relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(6,182,212,0.08) 100%)",
              border: "1px solid rgba(59,130,246,0.25)",
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
              style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(6,182,212,0.12) 100%)" }}
              aria-hidden="true"
            />
            <div className="relative flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(59,130,246,0.25)" }}>
                <Mic size={18} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white leading-snug">Iniciar Simulação</p>
                <p className="text-xs text-white/45 mt-0.5">Entrevista completa com oficial virtual</p>
              </div>
              <ChevronRight size={16} className="text-blue-400/50 group-hover:text-blue-400 transition-colors" />
            </div>
          </div>
        </Link>

        <Link href="/practice">
          <div
            className="group rounded-xl p-5 cursor-pointer transition-all hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.08)]"
            style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(16,185,129,0.12)" }}>
                <BookOpen size={18} className="text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white leading-snug">Praticar por Tópico</p>
                <p className="text-xs text-white/45 mt-0.5">Foque nas suas dificuldades</p>
              </div>
              <ChevronRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />
            </div>
          </div>
        </Link>
      </div>

      {/* ── Weak categories tip ── */}
      {stats.weakCategories.length > 0 && (
        <div
          className="rounded-xl p-4 flex items-start gap-3 animate-fade-up animation-delay-350"
          style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.15)" }}
        >
          <AlertCircle size={15} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-400 mb-1">Tópicos para reforçar</p>
            <p className="text-xs text-white/50">
              {stats.weakCategories.map((c) => `${c.label} (${c.pct}%)`).join(" · ")}
            </p>
          </div>
        </div>
      )}

      {/* ── Topic Progress ── */}
      {stats.topicMastery.length > 0 && (
        <div
          className="rounded-xl animate-fade-up animation-delay-400 overflow-hidden"
          style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 size={15} className="text-blue-400" />
              <span className="text-sm font-semibold text-white">Domínio por Tópico</span>
            </div>
            <Link href="/practice" className="text-[11px] font-medium text-white/35 hover:text-blue-400 transition-colors">
              Ver todos
            </Link>
          </div>

          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {stats.topicMastery.slice(0, 5).map((t) => {
              const pct = Math.round((t.correct / t.total) * 100);
              return (
                <div key={t.category} className="px-5 py-4 flex items-center gap-4" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: t.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm font-medium text-white/80">{t.label}</span>
                      <span className="text-xs font-mono text-white/40 ml-3 shrink-0">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${t.color}99, ${t.color})` }}
                      />
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-white/25 shrink-0">{t.total}q</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Conquistas (ainda mockadas — serão calculadas no M9 final) ── */}
      <div
        className="rounded-xl animate-fade-up animation-delay-500 overflow-hidden"
        style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2.5">
            <Award size={15} className="text-amber-400" />
            <span className="text-sm font-semibold text-white">Conquistas</span>
          </div>
          <span className="text-[11px] text-white/30">
            {achievements.filter((a) => a.unlocked).length}/{achievements.length}
          </span>
        </div>
        <div className="px-5 py-5">
          <div className="grid grid-cols-6 gap-3">
            {achievements.map((a) => (
              <AchievementBadge key={a.id} achievement={a} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
