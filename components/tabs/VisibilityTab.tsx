"use client";

import networkHealth from "@/data/network-health.json";
import { NetworkHealth } from "@/lib/types";
import {
  countByStatus,
  networkAverageHealth,
  topAtRisk,
  topHealthy,
} from "@/lib/aggregate";
import KpiCard from "@/components/KpiCard";
import { AlertTriangle } from "lucide-react";

const typedLocations = networkHealth as NetworkHealth[];

const STATUS_LABEL: Record<NetworkHealth["status"], string> = {
  healthy: "Healthy",
  watch: "Watch",
  at_risk: "At risk",
};

const STATUS_BAR_COLOR: Record<NetworkHealth["status"], string> = {
  healthy: "bg-beacon-green",
  watch: "bg-beacon-orange",
  at_risk: "bg-beacon-red",
};

function LocationTable({
  title,
  rows,
  emphasis,
}: {
  title: string;
  rows: NetworkHealth[];
  emphasis: "red" | "green";
}) {
  return (
    <div className="rounded-xl border border-beacon-border bg-beacon-surface shadow-beacon overflow-hidden">
      <p className="px-4 pt-4 text-xs font-medium uppercase tracking-wide text-beacon-muted">
        {title}
      </p>
      <div className="divide-y divide-beacon-border mt-2">
        {rows.map((row) => (
          <div key={row.location} className="flex items-center gap-3 px-4 py-3">
            <p className="flex-1 min-w-0 truncate text-sm font-medium text-beacon-ink">
              {row.location}
            </p>
            <span
              className={`shrink-0 text-sm font-bold ${
                emphasis === "red" ? "text-beacon-red" : "text-beacon-green"
              }`}
            >
              {row.health_score}
            </span>
            <p className="hidden sm:block flex-1 truncate text-xs text-beacon-muted">
              {row.primary_signal}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VisibilityTab() {
  const avgHealth = networkAverageHealth(typedLocations);
  const healthyCount = countByStatus(typedLocations, "healthy");
  const watchCount = countByStatus(typedLocations, "watch");
  const atRiskCount = countByStatus(typedLocations, "at_risk");
  const total = typedLocations.length;

  const atRisk = topAtRisk(typedLocations, 3).filter((l) => l.status !== "healthy");
  const healthy = topHealthy(typedLocations, 5).filter((l) => l.status === "healthy");

  return (
    <div>
      <p className="text-xs italic text-beacon-muted mb-5">
        Network-wide rollup from the Handyman Connection Hub&apos;s Health Monitor: review
        sentiment, callback reliability, and scheduling data across every tracked location.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard
          label="Locations tracked"
          value={String(total)}
          detail="Onboarded to the Hub"
          accent="blue"
        />
        <KpiCard
          label="Network avg health"
          value={String(avgHealth)}
          detail="Composite score, 0 to 100"
          accent={avgHealth >= 60 ? "green" : "orange"}
        />
        <KpiCard
          label="Healthy"
          value={String(healthyCount)}
          detail={`${Math.round((healthyCount / total) * 100)}% of locations`}
          accent="green"
        />
        <KpiCard
          label="Needs attention"
          value={String(watchCount + atRiskCount)}
          detail={`${atRiskCount} at risk, ${watchCount} watch`}
          accent="red"
        />
      </div>

      <div className="rounded-xl border border-beacon-border bg-beacon-surface p-4 shadow-beacon mb-6">
        <p className="text-xs font-medium uppercase tracking-wide text-beacon-muted mb-1">
          Network health by location
        </p>
        <p className="text-xs text-beacon-muted mb-3">
          Composite score: review sentiment + scheduling reliability + callback rate
        </p>
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-beacon-bg">
          {(["healthy", "watch", "at_risk"] as const).map((status) => {
            const count = countByStatus(typedLocations, status);
            if (count === 0) return null;
            return (
              <div
                key={status}
                className={STATUS_BAR_COLOR[status]}
                style={{ width: `${(count / total) * 100}%` }}
                title={`${STATUS_LABEL[status]}: ${count}`}
              />
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-beacon-muted">
          {(["healthy", "watch", "at_risk"] as const).map((status) => (
            <span key={status} className="inline-flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${STATUS_BAR_COLOR[status]}`} />
              {STATUS_LABEL[status]} ({countByStatus(typedLocations, status)})
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <LocationTable title="Locations needing action" rows={atRisk} emphasis="red" />
        <LocationTable title="Top performing locations" rows={healthy} emphasis="green" />
      </div>

      <div className="rounded-xl border-l-4 border-beacon-red bg-[#FEF2F2] p-4">
        <div className="flex gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 text-beacon-red mt-0.5" />
          <p className="text-sm text-beacon-ink">
            Jacksonville and Kansas City share a pattern: scheduling reliability well below
            network average, which is dragging review sentiment down with it. See the Root Cause
            tab for the Jacksonville deep-dive.
          </p>
        </div>
      </div>
    </div>
  );
}
