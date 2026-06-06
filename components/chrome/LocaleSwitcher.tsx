"use client";

import { cn } from "@/lib/cn";

export function LocaleSwitcher() {
  return (
    <div
      className="inline-flex h-10 items-center rounded-pill border border-ink-3 bg-ink-1/60 p-1"
      aria-label="Language"
    >
      <span
        className={cn(
          "inline-flex h-8 items-center justify-center rounded-pill bg-volt-500 px-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-0",
        )}
      >
        فا
      </span>
    </div>
  );
}
