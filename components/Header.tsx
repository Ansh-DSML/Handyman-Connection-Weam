export default function Header() {
  return (
    <header className="border-b border-beacon-border bg-beacon-surface">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-beacon-blue text-beacon-yellow text-base font-black">
            H
          </span>
          <h1 className="text-lg font-bold tracking-tight text-beacon-ink">
            Handyman Connection{" "}
            <span className="text-beacon-muted font-medium">Hub</span>
          </h1>
        </div>
        <span className="rounded-full border border-beacon-border bg-beacon-bg px-3 py-1 text-xs font-medium text-beacon-muted">
          Illustrative data
        </span>
      </div>
    </header>
  );
}
