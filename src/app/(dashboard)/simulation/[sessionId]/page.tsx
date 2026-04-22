import { notFound, redirect } from "next/navigation";
import { InterviewClient } from "./InterviewClient";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getRandomQuestions } from "@/lib/supabase/queries";

type PageProps = {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ format?: string; voice?: string }>;
};

export default async function InterviewSessionPage({ params, searchParams }: PageProps) {
  const { sessionId } = await params;
  const sp = await searchParams;

  const format = sp.format === "2025" ? "2025" : "standard";
  const voice = sp.voice === "nova" ? "nova" : "onyx";

  // Validate session belongs to the current user
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
  const { data: questions, error } = await getRandomQuestions(
    sessionFormat === "2025" ? "2025" : "standard",
    10
  );
  if (error || !questions || questions.length === 0) {
    redirect("/simulation?error=no_questions");
  }

  return (
    <InterviewClient
      sessionId={sessionId}
      questions={questions}
      voice={voice}
    />
  );
}
