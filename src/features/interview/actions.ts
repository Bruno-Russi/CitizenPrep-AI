"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getRandomQuestions, getQuestionsByCategory } from "@/lib/supabase/queries";
import { updateStreak, addXP } from "@/features/progress/actions";
import type { CivicsFormat, CivicsCategory, SessionMode } from "@/types/supabase";

export type SessionStartResult =
  | { sessionId: string; questions: Awaited<ReturnType<typeof getRandomQuestions>>["data"] }
  | { error: string };

/** Creates a session row in the DB and returns questions + sessionId. */
export async function startSession(
  format: CivicsFormat,
  mode: SessionMode
): Promise<SessionStartResult> {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { data: questions, error } = await getRandomQuestions(format, 10);
  if (error || !questions) return { error: error ?? "Failed to fetch questions" };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: session, error: sessionError } = await (supabase.from("sessions") as any)
    .insert({ user_id: user.id, mode, format })
    .select("id")
    .single();

  if (sessionError || !session) return { error: sessionError?.message ?? "Failed to create session" };

  return { sessionId: (session as { id: string }).id, questions };
}

/** Creates a practice session for a specific category. */
export async function startPracticeByCategory(
  category: CivicsCategory,
  format: CivicsFormat = "standard"
): Promise<SessionStartResult> {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { data: questions, error } = await getQuestionsByCategory(format, category);
  if (error || !questions || questions.length === 0) {
    return { error: error ?? "No questions found for this category" };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: session, error: sessionError } = await (supabase.from("sessions") as any)
    .insert({ user_id: user.id, mode: "practice", format })
    .select("id")
    .single();

  if (sessionError || !session) return { error: sessionError?.message ?? "Failed to create session" };

  return { sessionId: (session as { id: string }).id, questions };
}

type AnswerPayload = {
  sessionId: string;
  questionId: number;
  transcript: string;
  correct: boolean;
  feedback: string;
};

/** Saves one answer to the session_answers table and updates user_progress. */
export async function saveAnswer(payload: AnswerPayload): Promise<{ error?: string }> {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: insertError } = await (supabase.from("session_answers") as any).insert({
    session_id: payload.sessionId,
    question_id: payload.questionId,
    transcript: payload.transcript,
    correct: payload.correct,
    feedback: payload.feedback,
  });

  if (insertError) return { error: (insertError as { message: string }).message };

  // Upsert user_progress: increment attempts + correct_count
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: existing } = await (supabase.from("user_progress") as any)
    .select("attempts, correct_count")
    .eq("user_id", user.id)
    .eq("question_id", payload.questionId)
    .maybeSingle();

  const prev = existing as { attempts: number; correct_count: number } | null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase.from("user_progress") as any).upsert({
    user_id: user.id,
    question_id: payload.questionId,
    attempts: (prev?.attempts ?? 0) + 1,
    correct_count: (prev?.correct_count ?? 0) + (payload.correct ? 1 : 0),
    last_seen: new Date().toISOString(),
  });

  return {};
}

/** Closes the session with final score — recalculates score server-side from session_answers. */
export async function finalizeSession(
  sessionId: string
): Promise<{ error?: string }> {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  // Recalculate score server-side — never trust client-supplied values
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: answers } = await (supabase.from("session_answers") as any)
    .select("correct")
    .eq("session_id", sessionId);

  const answersArr = (answers ?? []) as { correct: boolean }[];
  const total = answersArr.length;
  const score = answersArr.filter((a) => a.correct).length;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("sessions") as any)
    .update({
      score,
      total,
      passed: score >= 6,
      ended_at: new Date().toISOString(),
    })
    .eq("id", sessionId)
    .eq("user_id", user.id);

  if (error) return { error: (error as { message: string }).message };

  // Update streak and XP in parallel (non-blocking failures)
  await Promise.all([
    updateStreak(user.id).catch(() => null),
    addXP(user.id, score).catch(() => null),
  ]);

  return {};
}
