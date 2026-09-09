import { NetworkHealth, NetworkHealthStatus, Review, ReviewTheme, Sentiment } from "./types";

export const THEME_LABELS: Record<ReviewTheme, string> = {
  no_show: "No-shows",
  pricing_dispute: "Pricing disputes",
  craftsmanship_praise: "Craftsmanship praise",
  reliability_praise: "Reliability praise",
  communication_gap: "Communication gaps",
  incomplete_work: "Incomplete work",
};

export interface ThemeCount {
  theme: ReviewTheme;
  label: string;
  count: number;
  sentiment: Sentiment;
}

export function aggregateByTheme(reviews: Review[]): ThemeCount[] {
  const counts = new Map<ReviewTheme, { count: number; sentiment: Sentiment }>();

  for (const review of reviews) {
    const existing = counts.get(review.theme);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(review.theme, { count: 1, sentiment: review.sentiment });
    }
  }

  return Array.from(counts.entries())
    .map(([theme, { count, sentiment }]) => ({
      theme,
      label: THEME_LABELS[theme],
      count,
      sentiment,
    }))
    .sort((a, b) => b.count - a.count);
}

export function topComplaint(themeCounts: ThemeCount[], total: number) {
  const negative = themeCounts.filter((t) => t.sentiment === "negative");
  const top = negative[0];
  if (!top) return null;
  return { ...top, percentage: Math.round((top.count / total) * 100) };
}

export function topPraise(themeCounts: ThemeCount[], total: number) {
  const positive = themeCounts.filter((t) => t.sentiment === "positive");
  const top = positive[0];
  if (!top) return null;
  return { ...top, percentage: Math.round((top.count / total) * 100) };
}

export function networkAverageHealth(locations: NetworkHealth[]): number {
  if (locations.length === 0) return 0;
  const sum = locations.reduce((acc, l) => acc + l.health_score, 0);
  return Math.round(sum / locations.length);
}

export function countByStatus(
  locations: NetworkHealth[],
  status: NetworkHealthStatus
): number {
  return locations.filter((l) => l.status === status).length;
}

export function topAtRisk(locations: NetworkHealth[], limit = 5): NetworkHealth[] {
  return [...locations].sort((a, b) => a.health_score - b.health_score).slice(0, limit);
}

export function topHealthy(locations: NetworkHealth[], limit = 5): NetworkHealth[] {
  return [...locations].sort((a, b) => b.health_score - a.health_score).slice(0, limit);
}
