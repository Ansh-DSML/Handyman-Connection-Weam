"use client";

import Image from "next/image";
import { Check, X, Target, Radio as SignalIcon } from "lucide-react";
import contentConcepts from "@/data/content-concepts.json";
import positioningPillars from "@/data/positioning-pillars.json";
import cohorts from "@/data/cohorts.json";
import { ContentConcept, PositioningPillar, Cohort, CoverageLevel, OpportunitySize } from "@/lib/types";
import EngineFlow from "@/components/EngineFlow";

const typedConcepts = contentConcepts as ContentConcept[];
const typedPillars = positioningPillars as PositioningPillar[];
const typedCohorts = cohorts as Cohort[];

const topConcept = typedConcepts[0];

const OPPORTUNITY_DOT: Record<OpportunitySize, string> = {
  high: "bg-beacon-blue",
  medium: "bg-beacon-blue/50",
  low: "bg-beacon-muted/50",
};

const COVERAGE_DOT: Record<CoverageLevel, string> = {
  low: "bg-beacon-red",
  medium: "bg-beacon-orange",
  high: "bg-beacon-green",
};

export default function ContentEngineTab() {
  return (
    <div className="space-y-8">
      {/* Section 0 — How it works */}
      <section>
        <EngineFlow />
      </section>

      {/* Section A — Generated concept */}
      <section>
        <h2 className="text-sm font-bold text-beacon-ink mb-3">Generated concept</h2>
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl shadow-beacon">
          <Image
            src="/ads/service-van-driveway-web.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-beacon-ink/90 via-beacon-ink/30 to-beacon-ink/5" />
          <div className="relative flex min-h-[320px] flex-col justify-end p-8">
            <p className="font-serif text-3xl font-semibold tracking-tight text-white max-w-lg drop-shadow-sm">
              {topConcept.headline}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                <SignalIcon className="h-3 w-3" />
                Triggered by: {topConcept.triggered_by_signal}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                <Target className="h-3 w-3" />
                Targets: {topConcept.target_cohort}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section B — Positioning pillar coverage */}
      <section>
        <h2 className="text-sm font-bold text-beacon-ink mb-3">Positioning pillar coverage</h2>
        <div className="rounded-xl border border-beacon-border bg-beacon-surface divide-y divide-beacon-border shadow-beacon">
          {typedPillars.map((p) => (
            <div
              key={p.pillar}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4"
            >
              <p className="flex-1 text-sm font-medium text-beacon-ink">{p.pillar}</p>
              <span
                className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  p.covered
                    ? "bg-green-50 text-beacon-green"
                    : "bg-red-50 text-beacon-red"
                }`}
              >
                {p.covered ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                {p.covered ? "Covered" : "Not covered"}
              </span>
              <div className="flex flex-wrap gap-1">
                {p.competitor_using_it.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-beacon-bg border border-beacon-border px-2 py-0.5 text-xs text-beacon-muted"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-beacon-muted w-fit sm:ml-auto">
                <span className={`h-2 w-2 rounded-full ${OPPORTUNITY_DOT[p.opportunity_size]}`} />
                {p.opportunity_size} opportunity
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Section C — Cohort analysis */}
      <section>
        <h2 className="text-sm font-bold text-beacon-ink mb-3">Cohort analysis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {typedCohorts.map((c) => (
            <div
              key={c.name}
              className="rounded-xl border border-beacon-border bg-beacon-surface p-4 shadow-beacon"
            >
              <p className="text-sm font-bold text-beacon-ink">{c.name}</p>
              <p className="mt-1 text-lg font-bold text-beacon-blue">{c.size_estimate}</p>
              <p className="mt-2 text-xs text-beacon-muted">
                Resonant pillar: <span className="text-beacon-ink">{c.resonant_pillar}</span>
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-beacon-muted">
                <span className={`h-2 w-2 rounded-full ${COVERAGE_DOT[c.current_coverage]}`} />
                {c.current_coverage} current coverage
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section D — Meta compliance score */}
      <section>
        <h2 className="text-sm font-bold text-beacon-ink mb-3">Meta compliance score</h2>
        <div className="rounded-xl border border-beacon-border bg-beacon-surface p-5 shadow-beacon">
          <p className="text-3xl font-bold text-beacon-blue">{topConcept.compliance.score}/100</p>
          <ul className="mt-4 space-y-3">
            {topConcept.compliance.checks.map((check) => (
              <li key={check.rule} className="flex items-start gap-2">
                {check.pass ? (
                  <Check className="h-4 w-4 shrink-0 text-beacon-green mt-0.5" />
                ) : (
                  <X className="h-4 w-4 shrink-0 text-beacon-red mt-0.5" />
                )}
                <div>
                  <p className="text-sm text-beacon-ink">{check.rule}</p>
                  {!check.pass && check.note && (
                    <p className="text-xs text-beacon-muted">{check.note}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
