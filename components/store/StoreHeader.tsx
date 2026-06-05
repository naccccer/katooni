import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import type { FilterState } from "@/lib/filters";
import { activeFilterCount } from "@/lib/filters";
import { SortDropdown } from "./SortDropdown";
import { useTranslations } from "next-intl";

type StoreHeaderProps = {
  filters: FilterState;
  resultCount: number;
  totalCount: number;
  onChangeSort: (sort: FilterState["sort"]) => void;
  onOpenMobileFilters: () => void;
};

export function StoreHeader({
  filters,
  resultCount,
  totalCount,
  onChangeSort,
  onOpenMobileFilters,
}: StoreHeaderProps) {
  const active = activeFilterCount(filters);
  const t = useTranslations("store");
  const tNav = useTranslations("nav");
  const activeLabels: string[] = [];
  if (filters.category.length) activeLabels.push(...filters.category.map((c) => t(`category.${c}`)));
  if (filters.gender.length) activeLabels.push(...filters.gender.map((g) => t(`gender.${g}`)));
  if (filters.size.length) activeLabels.push(...filters.size.map((s) => `EU ${s}`));
  if (filters.color.length) activeLabels.push(...filters.color);

  return (
    <div className="border-b border-ink-3 bg-ink-0">
      <Container className="py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <h1 className="text-display-md font-display mt-3 text-paper-1">
                {t("title")}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenMobileFilters}
                className="inline-flex h-11 items-center gap-2 rounded-pill border border-ink-3 px-5 text-sm text-paper-1 transition-colors hover:border-paper-2 hover:bg-ink-1 lg:hidden"
                aria-label={t("filterCategory")}
              >
                {tNav("store")}
                {active > 0 && (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-pill bg-volt-500 px-1.5 font-mono text-[11px] text-ink-0">
                    {active}
                  </span>
                )}
              </button>
              <SortDropdown value={filters.sort} onChange={onChangeSort} />
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-paper-3">
            <span>
              {t("resultCount", { shown: resultCount, total: totalCount })}
            </span>
            {activeLabels.length > 0 && (
              <>
                <span aria-hidden className="h-1 w-1 rounded-full bg-paper-3" />
                <span className="truncate text-paper-2">
                  {activeLabels.slice(0, 4).join(" / ")}
                </span>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
