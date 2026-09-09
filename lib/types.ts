export type ReviewTheme =
  | "no_show"
  | "pricing_dispute"
  | "craftsmanship_praise"
  | "reliability_praise"
  | "communication_gap"
  | "incomplete_work";

export type Sentiment = "positive" | "negative";

export interface Review {
  id: string;
  location: string;
  source: string;
  rating: number;
  theme: ReviewTheme;
  sentiment: Sentiment;
  date: string;
  snippet_summary: string;
}

export interface Competitor {
  name: string;
  primary_pillars: string[];
  notes: string;
}

export type OpportunitySize = "high" | "medium" | "low";

export interface PositioningPillar {
  pillar: string;
  covered: boolean;
  evidence: string;
  competitor_using_it: string[];
  opportunity_size: OpportunitySize;
}

export type CoverageLevel = "low" | "medium" | "high";

export interface Cohort {
  name: string;
  size_estimate: string;
  resonant_pillar: string;
  current_coverage: CoverageLevel;
  note: string;
}

export interface MonthlyOpsSignal {
  month: string;
  review_sentiment_score: number;
  scheduling_conflict_rate: number;
}

export interface CraftsmanWorkload {
  craftsman: string;
  jobs_per_day: number;
}

export interface LocationOpsSignal {
  location: string;
  flagged: boolean;
  network_average_jobs_per_day: number;
  craftsman_workload: CraftsmanWorkload[];
  monthly: MonthlyOpsSignal[];
  correlation_note: string;
}

export interface ComplianceCheck {
  rule: string;
  pass: boolean;
  note?: string;
}

export interface ComplianceReport {
  score: number;
  checks: ComplianceCheck[];
}

export interface ContentConcept {
  id: string;
  headline: string;
  triggered_by_signal: string;
  addresses_pillar: string;
  target_cohort: string;
  compliance: ComplianceReport;
}

export type PushStatus = "not_pushed" | "pushed";

export interface Franchisee {
  name: string;
  location: string;
  star_rating: number;
  phone: string;
  health_score: number;
  push_status: PushStatus;
}
