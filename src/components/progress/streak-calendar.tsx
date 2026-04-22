"use client";

import { ACTIVITY_DATES } from "@/features/progress/mock-data";

function getLastNWeeks(n: number) {
  const weeks: string[][] = [];
  const today = new Date("2026-04-22");

  // Start from the Sunday of the week (n-1) weeks ago
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - today.getDay() - (n - 1) * 7);

  for (let w = 0; w < n; w++) {
    const week: string[] = [];
    for (let d = 0; d < 7; d++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + w * 7 + d);
      const iso = day.toISOString().split("T")[0];
      week.push(iso);
    }
    weeks.push(week);
  }
  return weeks;
}

function getColor(count: number) {
  if (count === 0) return "rgba(255,255,255,0.05)";
  if (count === 1) return "rgba(59,130,246,0.3)";
  if (count === 2) return "rgba(59,130,246,0.6)";
  return "rgba(59,130,246,0.9)";
}

const DAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function StreakCalendar() {
  const weeks = getLastNWeeks(12);

  // Month labels: find first occurrence of each month in the grid
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const month = new Date(week[0]).getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ label: MONTHS[month], col: wi });
      lastMonth = month;
    }
  });

  return (
    <div
      className="rounded-xl p-5 animate-fade-up animation-delay-100"
      style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-medium uppercase tracking-widest text-white/30">
          Atividade — últimas 12 semanas
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/20">menos</span>
          {[0, 1, 2, 3].map((lvl) => (
            <div
              key={lvl}
              className="w-2.5 h-2.5 rounded-sm"
              style={{ background: getColor(lvl) }}
            />
          ))}
          <span className="text-[10px] text-white/20">mais</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div style={{ minWidth: 280 }}>
          {/* Month labels */}
          <div className="flex mb-1" style={{ paddingLeft: 22 }}>
            {weeks.map((_, wi) => {
              const label = monthLabels.find((m) => m.col === wi);
              return (
                <div key={wi} className="flex-1 text-[9px] text-white/20 text-center">
                  {label ? label.label : ""}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div className="flex gap-0">
            {/* Day labels */}
            <div className="flex flex-col gap-0.5 mr-1 shrink-0">
              {DAYS.map((d, i) => (
                <div key={i} className="h-3 flex items-center text-[9px] text-white/15 w-4 justify-end">
                  {i % 2 === 1 ? d : ""}
                </div>
              ))}
            </div>

            {/* Weeks */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-0.5 flex-1">
                {week.map((iso) => {
                  const count = ACTIVITY_DATES[iso] ?? 0;
                  const isFuture = iso > "2026-04-22";
                  return (
                    <div
                      key={iso}
                      className="h-3 rounded-sm transition-all"
                      style={{
                        background: isFuture ? "transparent" : getColor(count),
                        border: isFuture ? "none" : count === 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      }}
                      title={`${iso}: ${count} sessão(ões)`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="text-center">
          <p className="text-base font-bold text-white font-mono">7</p>
          <p className="text-[10px] text-white/25 mt-0.5">streak atual</p>
        </div>
        <div className="text-center">
          <p className="text-base font-bold text-white font-mono">14</p>
          <p className="text-[10px] text-white/25 mt-0.5">maior streak</p>
        </div>
        <div className="text-center">
          <p className="text-base font-bold text-white font-mono">
            {Object.keys(ACTIVITY_DATES).length}
          </p>
          <p className="text-[10px] text-white/25 mt-0.5">dias ativos</p>
        </div>
      </div>
    </div>
  );
}
