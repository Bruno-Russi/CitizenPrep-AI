"use server";

import { getSupabaseServerClient } from "./server";
import type { CivicsFormat, CivicsCategory } from "@/types/supabase";

export async function getRandomQuestions(format: CivicsFormat, count: number) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("civics_questions")
    .select("id, question, answers, category, format")
    .eq("format", format)
    .eq("active", true)
    .order("id");

  if (error || !data) return { data: null, error: error?.message ?? "Erro ao buscar perguntas" };

  const shuffled = data.sort(() => Math.random() - 0.5).slice(0, count);
  return { data: shuffled, error: null };
}

export async function getQuestionsByCategory(format: CivicsFormat, category: CivicsCategory) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("civics_questions")
    .select("id, question, answers, category, format")
    .eq("format", format)
    .eq("category", category)
    .eq("active", true)
    .order("id");

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function getUserProgress(userId: string) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("user_progress")
    .select("question_id, attempts, correct_count, last_seen")
    .eq("user_id", userId);

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function getUserSessions(userId: string, limit = 20) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("sessions")
    .select("id, mode, format, score, total, passed, started_at, ended_at")
    .eq("user_id", userId)
    .order("started_at", { ascending: false })
    .limit(limit);

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function getUserStreak(userId: string) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("streaks")
    .select("current_streak, longest_streak, last_activity_date")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}
