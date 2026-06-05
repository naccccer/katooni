"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const labels: Record<Locale, string> = {
  fa: "فا",
  en: "EN",
};

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const current = useLocale() as Locale;

  function switchTo(target: Locale) {
    if (target === current) return;
    // Replace the leading /fa or /en segment
    const next = pathname.replace(/^\/(fa|en)(?=\/|$)/, `/${target}`);
    router.replace(next || `/${target}`);
  }

  return (
    <div
      className="inline-flex h-10 items-center rounded-pill border border-ink-3 bg-ink-1/60 p-1"
      role="group"
      aria-label="Language switcher"
    >
      {routing.locales.map((loc) => {
        const active = loc === current;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            aria-pressed={active}
            className={cn(
              "inline-flex h-8 items-center justify-center rounded-pill px-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors",
              active
                ? "bg-volt-500 text-ink-0"
                : "text-paper-2 hover:text-paper-1",
            )}
          >
            {labels[loc]}
          </button>
        );
      })}
    </div>
  );
}
