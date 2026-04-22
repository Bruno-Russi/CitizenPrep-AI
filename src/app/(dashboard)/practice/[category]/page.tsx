import { redirect } from "next/navigation";
import { startPracticeByCategory } from "@/features/interview/actions";
import type { CivicsCategory } from "@/types/supabase";

type PageProps = {
  params: Promise<{ category: string }>;
};

const VALID_CATEGORIES: CivicsCategory[] = [
  "principles_of_democracy",
  "system_of_government",
  "rights_and_responsibilities",
  "colonial_period_and_independence",
  "the_1800s",
  "recent_american_history",
  "geography",
  "symbols",
  "holidays",
  "integrated_civics",
];

export default async function PracticeCategoryPage({ params }: PageProps) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category as CivicsCategory)) {
    redirect("/practice");
  }

  const result = await startPracticeByCategory(category as CivicsCategory);

  if ("error" in result) {
    redirect(`/practice?error=${encodeURIComponent(result.error)}`);
  }

  redirect(`/simulation/${result.sessionId}?mode=practice&category=${category}`);
}
