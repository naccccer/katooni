import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function EmptyState() {
  const t = useTranslations("store");
  const locale = useLocale();
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-card border border-dashed border-ink-3 bg-ink-1/50 px-6 py-24 text-center">
      <span className="eyebrow">Empty</span>
      <h2 className="font-display mt-3 text-3xl font-bold tracking-tighter text-paper-1">
        {t("empty")}
      </h2>
      <p className="mt-3 max-w-[44ch] text-sm text-paper-2">
        {t("emptyBody")}
      </p>
      <Link
        href={`/${locale}/store`}
        className="mt-8 inline-flex h-11 items-center rounded-pill bg-volt-500 px-5 text-sm font-medium text-ink-0 transition-colors hover:bg-volt-600"
      >
        {t("resetFilters")}
      </Link>
    </div>
  );
}
