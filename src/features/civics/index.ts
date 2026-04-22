"use server";

import { getRandomQuestions, getQuestionsByCategory } from "@/lib/supabase/queries";
import type { CivicsFormat, CivicsCategory } from "@/types/supabase";

export const QUESTIONS_PER_SESSION = { standard: 10, "2025": 10 } as const;
export const PASSING_SCORE = 6;

export const CATEGORY_LABELS: Record<CivicsCategory, string> = {
  principles_of_democracy:       "Principles of Democracy",
  system_of_government:          "System of Government",
  rights_and_responsibilities:   "Rights & Responsibilities",
  colonial_period_and_independence: "Colonial Period & Independence",
  the_1800s:                     "The 1800s",
  recent_american_history:       "Recent American History",
  geography:                     "Geography",
  symbols:                       "Symbols",
  holidays:                      "Holidays",
  integrated_civics:             "Integrated Civics",
};

export async function getSessionQuestions(format: CivicsFormat) {
  return getRandomQuestions(format, QUESTIONS_PER_SESSION[format]);
}

export async function getPracticeQuestions(format: CivicsFormat, category: CivicsCategory) {
  return getQuestionsByCategory(format, category);
}

export function isAnswerCorrect(userAnswer: string, acceptedAnswers: string[]): boolean {
  const normalized = userAnswer.trim().toLowerCase();
  return acceptedAnswers.some((a) => a.toLowerCase().includes(normalized) || normalized.includes(a.toLowerCase()));
}

export function calculateResult(correct: number, total: number) {
  return {
    score: correct,
    total,
    passed: correct >= PASSING_SCORE,
    percentage: Math.round((correct / total) * 100),
  };
}
