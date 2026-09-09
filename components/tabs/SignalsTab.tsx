"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import reviews from "@/data/reviews.json";
import competitors from "@/data/competitors.json";
import positioningPillars from "@/data/positioning-pillars.json";
import { Review, PositioningPillar } from "@/lib/types";
import { aggregateByTheme, topComplaint, topPraise } from "@/lib/aggregate";
import KpiCard from "@/components/KpiCard";
import { Lightbulb } from "lucide-react";

const typedReviews = reviews as Review[];
const typedPillars = positioningPillars as PositioningPillar[];

export default function SignalsTab() {
  const themeCounts = aggregateByTheme(typedReviews);
  const complaint = topComplaint(themeCounts, typedReviews.length);
  const praise = topPraise(themeCounts, typedReviews.length);

  const gapPillars = typedPillars.filter(
    (p) => !p.covered && p.competitor_using_it.length > 0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left column */}
      <section>
        <h2 className="text-sm font-bold text-beacon-ink mb-3">Review sentiment by theme</h2>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {complaint && (
            <KpiCard
              label="Top complaint"
              value={complaint.label}
              detail={`${complaint.percentage}% of all reviews`}
              accent="red"
            />
          )}
          {praise && (
            <KpiCard
              label="Top praise"
              value={praise.label}
              detail={`${praise.percentage}% of all reviews`}
              accent="green"
            />
          )}
        </div>

        <div className="rounded-xl border border-beacon-border bg-beacon-surface p-4 shadow-beacon">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={themeCounts} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid horizontal={false} stroke="#E6E8EC" />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
              <YAxis
                type="category"
                dataKey="label"
                width={140}
                tick={{ fontSize: 12, fill: "#0B0F1A" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.03)" }}
                formatter={(value: number) => [`${value} reviews`, ""]}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {themeCounts.map((entry) => (
                  <Cell
                    key={entry.theme}
                    fill={entry.sentiment === "negative" ? "#DC2626" : "#16A34A"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Right column */}
      <section>
        <h2 className="text-sm font-bold text-beacon-ink mb-3">Competitor positioning scan</h2>

        <div className="space-y-3 mb-4">
          {competitors.map((c) => (
            <div
              key={c.name}
              className="rounded-xl border border-beacon-border bg-beacon-surface p-4 shadow-beacon"
            >
              <p className="text-sm font-bold text-beacon-ink">{c.name}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {c.primary_pillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="rounded-full bg-beacon-bg border border-beacon-border px-2.5 py-0.5 text-xs font-medium text-beacon-muted"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs text-beacon-muted">{c.notes}</p>
            </div>
          ))}
        </div>

        {gapPillars.length > 0 && (
          <div className="rounded-xl border-l-4 border-beacon-yellow bg-[#FFFBEB] p-4">
            <div className="flex gap-2">
              <Lightbulb className="h-4 w-4 shrink-0 text-beacon-orange mt-0.5" />
              <p className="text-sm text-beacon-ink">
                Competitors are already winning on{" "}
                <strong>{gapPillars.map((p) => p.pillar).join(", ")}</strong>, pillars our own
                positioning doesn&apos;t currently address.{" "}
                {complaint && (
                  <>
                    That gap lines up directly with our #1 complaint theme:{" "}
                    <strong>{complaint.label.toLowerCase()}</strong>.
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
