import { notFound, redirect } from "next/navigation";
import { InterviewClient } from "./InterviewClient";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getRandomQuestions, getQuestionsByCategory } from "@/lib/supabase/queries";
import type { CivicsCategory } from "@/types/supabase";

type PageProps = {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ mode?: string; category?: string }>;
};

export default async function InterviewSessionPage({ params, searchParams }: PageProps) {
  const { sessionId } = await params;
  const sp = await searchParams;

  const mode = sp.mode === "practice" ? "practice" : "simulation";
  const category = sp.category as CivicsCategory | undefined;

  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: session } = await (supabase.from("sessions") as any)
    .select("id, format")
    .eq("id", sessionId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!session) notFound();

  const sessionFormat = (session as { id: string; format: string }).format;
  const fmt = sessionFormat === "2025" ? "2025" : "standard";

  const { data: questions, error } = category
    ? await getQuestionsByCategory(fmt, category)
    : await getRandomQuestions(fmt, 10);

  if (error || !questions || questions.length === 0) {
    redirect("/simulation?error=no_questions");
  }

  return (
    <InterviewClient
      sessionId={sessionId}
      questions={questions}
      mode={mode}
    />
  );
}
