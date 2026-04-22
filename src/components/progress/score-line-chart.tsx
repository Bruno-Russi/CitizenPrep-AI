"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { SCORE_HISTORY } from "@/features/progress/mock-data";

type TooltipPayload = {
  value: number;
  payload: { passed: boolean };
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const score = payload[0].value;
  const passed = payload[0].payload.passed;
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs"
      style={{
        background: "#1F2937",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      <p className="text-white/40 mb-0.5">{label}</p>
      <p className="font-bold font-mono" style={{ color: passed ? "#34D399" : "#F87171" }}>
        {score}%
      </p>
    </div>
  );
}

export function ScoreLineChart() {
  return (
    <div
      className="rounded-xl overflow-hidden animate-fade-up animation-delay-200"
      style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/30">
            Evolução de score
          </p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-white/30">
              <div className="w-2.5 h-0.5 bg-emerald-400 rounded" /> Meta (60%)
            </span>
          </div>
        </div>
      </div>

      <div className="px-2 py-4">
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={SCORE_HISTORY} margin={{ top: 8, right: 16, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9, fill: "rgba(255,255,255,0.2)" }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 9, fill: "rgba(255,255,255,0.2)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }} />
            <ReferenceLine y={60} stroke="rgba(52,211,153,0.3)" strokeDasharray="4 4" />
            <Line
              type="monotone"
              dataKey="score"
              stroke="url(#scoreGradient)"
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;
                return (
                  <circle
                    key={`dot-${cx}-${cy}`}
                    cx={cx}
                    cy={cy}
                    r={3}
                    fill={payload.passed ? "#34D399" : "#F87171"}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={1}
                  />
                );
              }}
              activeDot={{ r: 5, fill: "#3B82F6", stroke: "rgba(59,130,246,0.3)", strokeWidth: 4 }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
