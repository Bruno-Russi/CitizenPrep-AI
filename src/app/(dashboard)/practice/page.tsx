import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { CivicsCategory } from "@/types/supabase";

const CATEGORY_META: Record<CivicsCategory, { label: string; description: string }> = {
  principles_of_democracy:        { label: "Princípios da Democracia",       description: "Constituição, direitos fundamentais e sistema democrático" },
  system_of_government:           { label: "Sistema de Governo",             description: "Poderes executivo, legislativo e judiciário" },
  rights_and_responsibilities:    { label: "Direitos e Responsabilidades",   description: "Direitos dos cidadãos e deveres cívicos" },
  colonial_period_and_independence:{ label: "Período Colonial e Independência", description: "Da chegada dos colonos à Declaração de Independência" },
  the_1800s:                      { label: "Século XIX",                     description: "Guerra Civil, abolição da escravidão e expansão territorial" },
  recent_american_history:        { label: "História Americana Recente",     description: "Século XX até os dias atuais" },
  geography:                      { label: "Geografia",                      description: "Estados, capitais, oceanos e fronteiras" },
  symbols:                        { label: "Símbolos Nacionais",             description: "Bandeira, hino e monumentos americanos" },
  holidays:                       { label: "Feriados Nacionais",             description: "Datas comemorativas e seu significado" },
  integrated_civics:              { label: "Civismo Integrado",              description: "Economia, sistema político e papel do cidadão" },
};

type CategoryCount = { category: CivicsCategory; count: number };

export default async function PracticePage() {
  const supabase = await getSupabaseServerClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: rows } = await (supabase.from("civics_questions") as any)
    .select("category")
    .eq("format", "standard")
    .eq("active", true);

  // Count per category
  const countMap: Record<string, number> = {};
  for (const row of (rows ?? []) as { category: string }[]) {
    countMap[row.category] = (countMap[row.category] ?? 0) + 1;
  }

  const categories: CategoryCount[] = (Object.keys(CATEGORY_META) as CivicsCategory[]).map((cat) => ({
    category: cat,
    count: countMap[cat] ?? 0,
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
        {categories.map(({ category, count }) => {
          const meta = CATEGORY_META[category];
          return (
            <Link key={category} href={`/practice/${category}`}>
              <div
                className="group rounded-xl p-5 cursor-pointer transition-all h-full flex flex-col gap-4 hover:border-blue-500/25 hover:shadow-[0_4px_24px_rgba(59,130,246,0.08)]"
                style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex-1">
                  <p className="font-semibold text-white leading-snug text-base">
                    {meta.label}
                  </p>
                  <p className="text-xs text-white/40 mt-1 leading-relaxed">
                    {meta.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/35 font-mono">{count} perguntas</span>
                  <ChevronRight
                    size={14}
                    className="text-white/20 group-hover:text-blue-400 transition-colors"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
