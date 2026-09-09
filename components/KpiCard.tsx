interface KpiCardProps {
  label: string;
  value: string;
  detail: string;
  accent?: "red" | "green" | "blue" | "orange";
}

const ACCENT_CLASS: Record<NonNullable<KpiCardProps["accent"]>, string> = {
  red: "text-beacon-red",
  green: "text-beacon-green",
  blue: "text-beacon-blue",
  orange: "text-beacon-orange",
};

export default function KpiCard({ label, value, detail, accent = "green" }: KpiCardProps) {
  return (
    <div className="rounded-xl border border-beacon-border bg-beacon-surface p-4 shadow-beacon">
      <p className="text-xs font-medium uppercase tracking-wide text-beacon-muted">{label}</p>
      <p className={`mt-1 text-lg font-bold ${ACCENT_CLASS[accent]}`}>{value}</p>
      <p className="mt-1 text-xs text-beacon-muted">{detail}</p>
    </div>
  );
}
