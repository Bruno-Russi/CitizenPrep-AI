import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { CivicsCategory } from "@/types/supabase";

const CATEGORY_META: Record<CivicsCategory, { label: string; description: string; color: string }> = {
  principles_of_democracy:         { label: "Princípios da Democracia",       description: "Constituição, direitos fundamentais e sistema democrático",  color: "#3B82F6" },
  system_of_government:            { label: "Sistema de Governo",             description: "Poderes executivo, legislativo e judiciário",                color: "#06B6D4" },
  rights_and_responsibilities:     { label: "Direitos e Responsabilidades",   description: "Direitos dos cidadãos e deveres cívicos",                   color: "#8B5CF6" },
  colonial_period_and_independence:{ label: "Período Colonial e Independência", description: "Da chegada dos colonos à Declaração de Independência",    color: "#F59E0B" },
  the_1800s:                       { label: "Século XIX",                     description: "Guerra Civil, abolição da escravidão e expansão territorial", color: "#EF4444" },
  recent_american_history:         { label: "História Americana Recente",     description: "Século XX até os dias atuais",                              color: "#EC4899" },
  geography:                       { label: "Geografia",                      description: "Estados, capitais, oceanos e fronteiras",                   color: "#10B981" },
  symbols:                         { label: "Símbolos Nacionais",             description: "Bandeira, hino e monumentos americanos",                    color: "#F97316" },
  holidays:                        { label: "Feriados Nacionais",             description: "Datas comemorativas e seu significado",                     color: "#A78BFA" },
  integrated_civics:               { label: "Civismo Integrado",              description: "Economia, sistema político e papel do cidadão",             color: "#14B8A6" },
};

export default async function PracticePage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch question counts per category
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: questionRows } = await (supabase.from("civics_questions") as any)
    .select("id, category")
    .eq("format", "standard")
    .eq("active", true);

  const questions = (questionRows ?? []) as { id: number; category: CivicsCategory }[];
  const questionMap = new Map(questions.map((q) => [q.id, q.category]));

  const countMap: Record<string, number> = {};
  for (const q of questions) {
    countMap[q.category] = (countMap[q.category] ?? 0) + 1;
  }

  // Fetch user_progress for mastery % if logged in
  const masteryMap: Record<string, { correct: number; total: number }> = {};
  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: progressRows } = await (supabase.from("user_progress") as any)
      .select("question_id, attempts, correct_count")
      .eq("user_id", user.id);

    for (const p of (progressRows ?? []) as { question_id: number; attempts: number; correct_count: number }[]) {
      const cat = questionMap.get(p.question_id);
      if (!cat) continue;
      if (!masteryMap[cat]) masteryMap[cat] = { correct: 0, total: 0 };
      masteryMap[cat].correct += p.correct_count;
      masteryMap[cat].total += p.attempts;
    }
  }

  const categories = (Object.keys(CATEGORY_META) as CivicsCategory[]).map((cat) => ({
    category: cat,
    count: countMap[cat] ?? 0,
    mastery: masteryMap[cat] ?? null,
  }));

  const total = categories.reduce((s, c) => s + c.count, 0);

  return (
    <div className="max-w-3xl mx-auto space-y-7">

      <div className="animate-fade-up">
        <h1 className="text-[28px] font-bold text-white leading-tight tracking-tight">
          Praticar por Tópico
        </h1>
        <p className="text-white/45 text-sm mt-1">
          Escolha um tópico para praticar. A pergunta se repete até você acertar.
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap animate-fade-up animation-delay-100">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}
        >
          <span className="text-base font-bold font-mono text-blue-400">{total}</span>
          <span className="text-xs font-medium text-white/50">perguntas disponíveis</span>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}
        >
          <span className="text-base font-bold font-mono text-purple-400">{categories.length}</span>
          <span className="text-xs font-medium text-white/50">tópicos</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-up animation-delay-200">
        {categories.map(({ category, count, mastery }) => {
          const meta = CATEGORY_META[category];
          const pct = mastery && mastery.total > 0
            ? Math.round((mastery.correct / mastery.total) * 100)
            : null;

          return (
            <Link key={category} href={`/practice/${category}`}>
              <div
                className="group rounded-xl p-5 cursor-pointer transition-all h-full flex flex-col gap-3 hover:border-blue-500/25 hover:shadow-[0_4px_24px_rgba(59,130,246,0.08)]"
                style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full shrink-0 mt-2"
                    style={{ background: meta.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white leading-snug text-base">
                      {meta.label}
                    </p>
                    <p className="text-xs text-white/40 mt-1 leading-relaxed">
                      {meta.description}
                    </p>
                  </div>
                </div>

                {pct !== null && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-white/30 uppercase tracking-widest">Domínio</span>
                      <span className="text-[10px] font-mono text-white/40">{pct}%</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${meta.color}99, ${meta.color})` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/35 font-mono">{count} perguntas</span>
                  <ChevronRight size={14} className="text-white/20 group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
