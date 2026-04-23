"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { calcLevel } from "@/features/progress/xp";
import type { CivicsCategory } from "@/types/supabase";

const XP_PER_SESSION = 10;
const XP_PER_CORRECT = 5;

// ─── Streak ──────────────────────────────────────────────────────────────────

function localDateStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Upserts streak table after a session is completed. */
export async function updateStreak(userId: string): Promise<void> {
  const supabase = await getSupabaseServerClient();
  const today = localDateStr();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: existing } = await (supabase.from("streaks") as any)
    .select("current_streak, longest_streak, last_activity_date")
    .eq("user_id", userId)
    .maybeSingle();

  const row = existing as {
    current_streak: number;
    longest_streak: number;
    last_activity_date: string | null;
  } | null;

  const last = row?.last_activity_date ?? null;
  const yesterday = localDateStr(new Date(Date.now() - 86_400_000));

  let current = row?.current_streak ?? 0;

  if (last === today) {
    // Already practiced today — no change needed
    return;
  } else if (last === yesterday) {
    current += 1;
  } else {
    // Gap — reset
    current = 1;
  }

  const longest = Math.max(current, row?.longest_streak ?? 0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase.from("streaks") as any).upsert({
    user_id: userId,
    current_streak: current,
    longest_streak: longest,
    last_activity_date: today,
    updated_at: new Date().toISOString(),
  });
}

// ─── XP ──────────────────────────────────────────────────────────────────────

/** Adds XP to the user's profile after a session. */
export async function addXP(
  userId: string,
  correctAnswers: number
): Promise<void> {
  const supabase = await getSupabaseServerClient();
  const gained = XP_PER_SESSION + correctAnswers * XP_PER_CORRECT;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile } = await (supabase.from("profiles") as any)
    .select("xp")
    .eq("id", userId)
    .maybeSingle();

  const prev = (profile as { xp: number | null } | null)?.xp ?? 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase.from("profiles") as any)
    .update({ xp: prev + gained, updated_at: new Date().toISOString() })
    .eq("id", userId);
}

// ─── Dashboard stats ─────────────────────────────────────────────────────────

export type DashboardStats = {
  name: string;
  xp: number;
  level: number;
  xpInLevel: number;
  xpToNext: number;
  streak: number;
  longestStreak: number;
  totalSessions: number;
  accuracy: number;
  dominated: number;
  weakCategories: { category: CivicsCategory; label: string; pct: number }[];
  topicMastery: { category: CivicsCategory; label: string; correct: number; total: number; color: string }[];
  activityDates: Record<string, number>;
  recentScores: { date: string; score: number; passed: boolean }[];
};

const CATEGORY_LABELS: Record<CivicsCategory, string> = {
  principles_of_democracy: "Princípios da Democracia",
  system_of_government: "Sistema de Governo",
  rights_and_responsibilities: "Direitos e Responsabilidades",
  colonial_period_and_independence: "Período Colonial",
  the_1800s: "Século XIX",
  recent_american_history: "História Recente",
  geography: "Geografia",
  symbols: "Símbolos Nacionais",
  holidays: "Feriados",
  integrated_civics: "Civismo Integrado",
};

const CATEGORY_COLORS: Record<CivicsCategory, string> = {
  principles_of_democracy: "#3B82F6",
  system_of_government: "#06B6D4",
  rights_and_responsibilities: "#8B5CF6",
  colonial_period_and_independence: "#F59E0B",
  the_1800s: "#EF4444",
  recent_american_history: "#EC4899",
  geography: "#10B981",
  symbols: "#F97316",
  holidays: "#A78BFA",
  integrated_civics: "#14B8A6",
};

export async function getDashboardStats(): Promise<DashboardStats | null> {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Fetch in parallel
  const [profileRes, streakRes, sessionsRes, progressRes] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase.from("profiles") as any)
      .select("name, xp")
      .eq("id", user.id)
      .maybeSingle(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase.from("streaks") as any)
      .select("current_streak, longest_streak, last_activity_date")
      .eq("user_id", user.id)
      .maybeSingle(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase.from("sessions") as any)
      .select("id, score, total, passed, started_at, ended_at")
      .eq("user_id", user.id)
      .order("started_at", { ascending: false })
      .limit(50),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase.from("user_progress") as any)
      .select("question_id, attempts, correct_count")
      .eq("user_id", user.id),
  ]);

  const profile = profileRes.data as { name: string | null; xp: number | null } | null;
  const streak = streakRes.data as { current_streak: number; longest_streak: number; last_activity_date: string | null } | null;
  const sessions = (sessionsRes.data ?? []) as { id: string; score: number | null; total: number | null; passed: boolean | null; started_at: string }[];
  const progress = (progressRes.data ?? []) as { question_id: number; attempts: number; correct_count: number }[];

  const xp = profile?.xp ?? 0;
  const { level, xpInLevel, xpToNext } = calcLevel(xp);

  // Sessions stats
  const completedSessions = sessions.filter((s) => s.score !== null && s.total !== null);
  const totalSessions = completedSessions.length;
  const totalCorrect = completedSessions.reduce((a, s) => a + (s.score ?? 0), 0);
  const totalAnswers = completedSessions.reduce((a, s) => a + (s.total ?? 0), 0);
  const accuracy = totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0;

  // Dominated questions: correct_count / attempts >= 0.8
  const dominated = progress.filter((p) => p.attempts > 0 && p.correct_count / p.attempts >= 0.8).length;

  // Recent scores for line chart (last 10 completed sessions, oldest first)
  const recentScores = completedSessions
    .slice(0, 10)
    .reverse()
    .map((s) => ({
      date: new Date(s.started_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      score: s.total ? Math.round(((s.score ?? 0) / s.total) * 100) : 0,
      passed: s.passed ?? false,
    }));

  // Activity dates: count sessions per day
  const activityDates: Record<string, number> = {};
  for (const s of sessions) {
    const day = s.started_at.slice(0, 10);
    activityDates[day] = (activityDates[day] ?? 0) + 1;
  }

  // Topic mastery: need to join user_progress with civics_questions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: questionsRaw } = await (supabase.from("civics_questions") as any)
    .select("id, category")
    .eq("format", "standard")
    .eq("active", true);

  const questions = (questionsRaw ?? []) as { id: number; category: CivicsCategory }[];
  const questionMap = new Map(questions.map((q) => [q.id, q.category]));

  // Aggregate per category
  const categoryStats: Record<string, { correct: number; total: number }> = {};
  for (const p of progress) {
    const cat = questionMap.get(p.question_id);
    if (!cat) continue;
    if (!categoryStats[cat]) categoryStats[cat] = { correct: 0, total: 0 };
    categoryStats[cat].correct += p.correct_count;
    categoryStats[cat].total += p.attempts;
  }

  const topicMastery = (Object.keys(CATEGORY_LABELS) as CivicsCategory[])
    .filter((cat) => categoryStats[cat]?.total > 0)
    .map((cat) => ({
      category: cat,
      label: CATEGORY_LABELS[cat],
      correct: categoryStats[cat].correct,
      total: categoryStats[cat].total,
      color: CATEGORY_COLORS[cat],
    }))
    .sort((a, b) => b.correct / b.total - a.correct / a.total);

  // Weak categories: lowest accuracy, min 1 attempt
  const weakCategories = [...topicMastery]
    .sort((a, b) => a.correct / a.total - b.correct / b.total)
    .slice(0, 3)
    .map((t) => ({
      category: t.category,
      label: t.label,
      pct: Math.round((t.correct / t.total) * 100),
    }));

  return {
    name: profile?.name ?? "Estudante",
    xp,
    level,
    xpInLevel,
    xpToNext,
    streak: streak?.current_streak ?? 0,
    longestStreak: streak?.longest_streak ?? 0,
    totalSessions,
    accuracy,
    dominated,
    weakCategories,
    topicMastery,
    activityDates,
    recentScores,
  };
}

// ─── History list ─────────────────────────────────────────────────────────────

export type SessionSummary = {
  id: string;
  mode: string;
  score: number;
  total: number;
  passed: boolean;
  startedAt: string;
  dateLabel: string;
};

export async function getSessionHistory(limit = 30): Promise<SessionSummary[]> {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase.from("sessions") as any)
    .select("id, mode, score, total, passed, started_at")
    .eq("user_id", user.id)
    .not("score", "is", null)
    .order("started_at", { ascending: false })
    .limit(limit);

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

  return ((data ?? []) as {
    id: string;
    mode: string;
    score: number;
    total: number;
    passed: boolean;
    started_at: string;
  }[]).map((s) => {
    const day = s.started_at.slice(0, 10);
    const time = new Date(s.started_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    let dateLabel: string;
    if (day === todayStr) dateLabel = `Hoje, ${time}`;
    else if (day === yesterday) dateLabel = `Ontem, ${time}`;
    else dateLabel = new Date(s.started_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });

    return {
      id: s.id,
      mode: s.mode === "simulation" ? "Simulação" : "Prática",
      score: s.score,
      total: s.total,
      passed: s.passed,
      startedAt: s.started_at,
      dateLabel,
    };
  });
}

// ─── Session detail ───────────────────────────────────────────────────────────

export type SessionDetail = SessionSummary & {
  answers: {
    questionId: number;
    question: string;
    category: CivicsCategory;
    transcript: string | null;
    correct: boolean;
    feedback: string | null;
    acceptedAnswers: string[];
  }[];
};

export async function getSessionDetail(sessionId: string): Promise<SessionDetail | null> {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Fetch session
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: sessionRaw } = await (supabase.from("sessions") as any)
    .select("id, mode, score, total, passed, started_at")
    .eq("id", sessionId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!sessionRaw) return null;
  const s = sessionRaw as { id: string; mode: string; score: number; total: number; passed: boolean; started_at: string };

  // Fetch answers joined with questions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: answersRaw } = await (supabase.from("session_answers") as any)
    .select("question_id, transcript, correct, feedback, civics_questions(question, category, answers)")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  const answers = ((answersRaw ?? []) as {
    question_id: number;
    transcript: string | null;
    correct: boolean;
    feedback: string | null;
    civics_questions: { question: string; category: CivicsCategory; answers: string[] } | null;
  }[]).map((a) => ({
    questionId: a.question_id,
    question: a.civics_questions?.question ?? "",
    category: a.civics_questions?.category ?? ("principles_of_democracy" as CivicsCategory),
    transcript: a.transcript,
    correct: a.correct,
    feedback: a.feedback,
    acceptedAnswers: a.civics_questions?.answers ?? [],
  }));

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const day = s.started_at.slice(0, 10);
  const time = new Date(s.started_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  let dateLabel: string;
  if (day === todayStr) dateLabel = `Hoje, ${time}`;
  else if (day === yesterday) dateLabel = `Ontem, ${time}`;
  else dateLabel = new Date(s.started_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });

  return {
    id: s.id,
    mode: s.mode === "simulation" ? "Simulação" : "Prática",
    score: s.score,
    total: s.total,
    passed: s.passed,
    startedAt: s.started_at,
    dateLabel,
    answers,
  };
}
