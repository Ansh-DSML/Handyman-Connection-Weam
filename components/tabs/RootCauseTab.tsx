"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import opsSignals from "@/data/ops-signals.json";
import { LocationOpsSignal } from "@/lib/types";
import { formatMonth } from "@/lib/format";
import { AlertTriangle } from "lucide-react";

const typedOps = opsSignals as LocationOpsSignal[];
const flagged = typedOps.find((o) => o.flagged) ?? typedOps[0];

export default function RootCauseTab() {
  const chartData = flagged.monthly.map((m) => ({
    ...m,
    monthLabel: formatMonth(m.month),
  }));

  const workloadData = flagged.craftsman_workload.map((w) => ({
    name: w.craftsman,
    jobs_per_day: w.jobs_per_day,
  }));

  return (
    <div>
      <p className="text-xs italic text-beacon-muted mb-5">
        This is the same signal layer from the Handyman Connection Hub&apos;s Health Monitor,
        condensed here to show where content strategy should start.
      </p>

      <h2 className="text-sm font-bold text-beacon-ink mb-3">
        {flagged.location}: sentiment vs scheduling conflicts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl border border-beacon-border bg-beacon-surface p-4 shadow-beacon">
          <p className="text-xs font-medium uppercase tracking-wide text-beacon-muted mb-2">
            Review sentiment
          </p>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={chartData}>
              <XAxis dataKey="monthLabel" tick={{ fontSize: 10, fill: "#6B7280" }} interval={1} />
              <Tooltip formatter={(value: number) => [value, "Sentiment score"]} />
              <Line
                type="monotone"
                dataKey="review_sentiment_score"
                stroke="#003DA5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-beacon-border bg-beacon-surface p-4 shadow-beacon">
          <p className="text-xs font-medium uppercase tracking-wide text-beacon-muted mb-2">
            Scheduling conflicts
          </p>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={chartData}>
              <XAxis dataKey="monthLabel" tick={{ fontSize: 10, fill: "#6B7280" }} interval={1} />
              <Tooltip formatter={(value: number) => [`${value}%`, "Conflict rate"]} />
              <Line
                type="monotone"
                dataKey="scheduling_conflict_rate"
                stroke="#EA580C"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h2 className="text-sm font-bold text-beacon-ink mb-3">
        Craftsman workload vs network average
      </h2>
      <div className="rounded-xl border border-beacon-border bg-beacon-surface p-4 shadow-beacon mb-6">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={workloadData} margin={{ left: 4, right: 44 }}>
            <CartesianGrid vertical={false} stroke="#E6E8EC" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} />
            <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} />
            <Tooltip formatter={(value: number) => [`${value} jobs/day`, ""]} />
            <ReferenceLine
              y={flagged.network_average_jobs_per_day}
              stroke="#6B7280"
              strokeDasharray="4 4"
              label={{
                value: `Avg ${flagged.network_average_jobs_per_day}`,
                position: "right",
                fill: "#6B7280",
                fontSize: 11,
              }}
            />
            <Bar dataKey="jobs_per_day" fill="#003DA5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl border-l-4 border-beacon-red bg-[#FEF2F2] p-4">
        <div className="flex gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 text-beacon-red mt-0.5" />
          <p className="text-sm text-beacon-ink">{flagged.correlation_note}</p>
        </div>
      </div>
    </div>
  );
}
