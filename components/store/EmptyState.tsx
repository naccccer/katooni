// Server component. No filters match.
import Link from "next/link";

export function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-card border border-dashed border-ink-3 bg-ink-1/50 px-6 py-24 text-center">
      <span className="eyebrow">No matches</span>
      <h2 className="font-display mt-3 text-3xl font-bold tracking-tighter text-paper-1">
        Nothing in the catalog fits that.
      </h2>
      <p className="mt-3 max-w-[44ch] text-sm text-paper-2">
        Try removing a filter, or take a look at the full set of pairs.
      </p>
      <Link
        href="/store"
        className="mt-8 inline-flex h-11 items-center rounded-pill bg-volt-500 px-5 text-sm font-medium text-ink-0 transition-colors hover:bg-volt-600"
      >
        Reset filters
      </Link>
    </div>
  );
}
