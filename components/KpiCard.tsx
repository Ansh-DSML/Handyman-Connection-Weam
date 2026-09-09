interface KpiCardProps {
  label: string;
  value: string;
  detail: string;
  accent?: "red" | "green";
}

export default function KpiCard({ label, value, detail, accent = "green" }: KpiCardProps) {
  const accentClass = accent === "red" ? "text-beacon-red" : "text-beacon-green";
  return (
    <div className="rounded-xl border border-beacon-border bg-beacon-surface p-4 shadow-beacon">
      <p className="text-xs font-medium uppercase tracking-wide text-beacon-muted">{label}</p>
      <p className={`mt-1 text-lg font-bold ${accentClass}`}>{value}</p>
      <p className="mt-1 text-xs text-beacon-muted">{detail}</p>
    </div>
  );
}
