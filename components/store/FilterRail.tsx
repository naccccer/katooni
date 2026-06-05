// Library: motion/react only.
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import {
  filtersToSearchParams,
  isDefault,
  type FilterState,
} from "@/lib/filters";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";

const SIZES = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];

const COLORS = [
  { name: "Volt", hex: "#D7FF1E" },
  { name: "Ink", hex: "#0A0A0B" },
  { name: "Slate", hex: "#3A3D44" },
  { name: "Carbon", hex: "#161619" },
  { name: "Smoke", hex: "#1F1F24" },
  { name: "Bone", hex: "#E6E2D6" },
];

type FilterRailProps = {
  filters: FilterState;
  className?: string;
  variant?: "rail" | "sheet";
  onApply?: () => void;
  locale: string;
};

export function FilterRail({
  filters,
  className,
  variant = "rail",
  onApply,
  locale,
}: FilterRailProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("store");
  const tCommon = useTranslations("common");

  const update = useCallback(
    (next: FilterState) => {
      const params = filtersToSearchParams(next);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  const toggle = <K extends "category" | "gender" | "size" | "color">(
    key: K,
    value: NonNullable<FilterState[K]>[number],
  ) => {
    const list = filters[key] as Array<typeof value>;
    const exists = list.includes(value);
    const nextList = exists ? list.filter((v) => v !== value) : [...list, value];
    update({ ...filters, [key]: nextList, page: 1 });
  };

  const reset = () => {
    router.replace(pathname, { scroll: false });
  };

  const categories = [
    { value: "running" as const, label: t("category.running") },
    { value: "trail" as const, label: t("category.trail") },
    { value: "track" as const, label: t("category.track") },
    { value: "court" as const, label: t("category.court") },
    { value: "lifestyle" as const, label: t("category.lifestyle") },
  ];

  const genders = [
    { value: "mens" as const, label: t("gender.mens") },
    { value: "womens" as const, label: t("gender.womens") },
    { value: "unisex" as const, label: t("gender.unisex") },
  ];

  return (
    <aside
      className={cn(
        variant === "rail"
          ? "sticky top-[88px] hidden h-[calc(100dvh-104px)] w-[280px] flex-shrink-0 overflow-y-auto border-e border-ink-3 ps-6 lg:block"
          : "flex h-full flex-col gap-8",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="eyebrow">{tCommon("filters")}</p>
        <button
          type="button"
          onClick={reset}
          disabled={isDefault(filters)}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-3 transition-colors hover:text-volt-500 disabled:opacity-30"
        >
          {tCommon("reset")}
        </button>
      </div>

      <FilterSection title={t("filterCategory")}>
        <div className="space-y-1">
          {categories.map((c) => (
            <CheckRow
              key={c.value}
              label={c.label}
              checked={filters.category.includes(c.value)}
              onChange={() => toggle("category", c.value)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title={t("filterGender")}>
        <div className="flex flex-wrap gap-1.5">
          {genders.map((g) => {
            const active = filters.gender.includes(g.value);
            return (
              <button
                key={g.value}
                type="button"
                onClick={() => toggle("gender", g.value)}
                className={cn(
                  "h-9 rounded-pill border px-4 text-xs uppercase tracking-[0.14em] transition-colors",
                  active
                    ? "border-volt-500 bg-volt-500 text-ink-0"
                    : "border-ink-3 bg-transparent text-paper-1 hover:border-paper-2",
                )}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title={t("filterSize")}>
        <div className="grid grid-cols-6 gap-1.5">
          {SIZES.map((s) => {
            const active = filters.size.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggle("size", s)}
                className={cn(
                  "h-9 rounded-input text-xs font-mono transition-colors",
                  active
                    ? "bg-volt-500 text-ink-0"
                    : "bg-ink-2 text-paper-1 hover:bg-ink-3",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title={t("filterColor")}>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => {
            const active = filters.color.includes(c.hex);
            return (
              <button
                key={c.hex}
                type="button"
                onClick={() => toggle("color", c.hex)}
                aria-label={c.name}
                className={cn(
                  "relative h-8 w-8 rounded-pill border transition-transform",
                  active
                    ? "border-volt-500 scale-110"
                    : "border-ink-3 hover:scale-110",
                )}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title={t("filterPrice")}>
        <div className="flex items-center gap-3 font-mono text-sm text-paper-1">
          <span>{filters.priceMin}</span>
          <span aria-hidden className="h-px flex-1 bg-ink-3" />
          <span>{filters.priceMax}</span>
        </div>
        <div className="mt-3 flex gap-2">
          <input
            type="number"
            value={filters.priceMin}
            min={0}
            max={filters.priceMax}
            onChange={(e) =>
              update({
                ...filters,
                priceMin: Number(e.target.value) || 0,
                page: 1,
              })
            }
            className="h-10 w-full rounded-input border border-ink-3 bg-ink-1 px-3 text-sm text-paper-1 focus:border-volt-500 focus:outline-none"
            aria-label="Minimum price"
          />
          <input
            type="number"
            value={filters.priceMax}
            min={filters.priceMin}
            onChange={(e) =>
              update({
                ...filters,
                priceMax: Number(e.target.value) || 500,
                page: 1,
              })
            }
            className="h-10 w-full rounded-input border border-ink-3 bg-ink-1 px-3 text-sm text-paper-1 focus:border-volt-500 focus:outline-none"
            aria-label="Maximum price"
          />
        </div>
      </FilterSection>

      {variant === "sheet" && (
        <div className="mt-auto border-t border-ink-3 pt-6">
          <button
            type="button"
            onClick={onApply}
            className="inline-flex h-12 w-full items-center justify-center rounded-pill bg-volt-500 text-sm font-medium text-ink-0 transition-colors hover:bg-volt-600"
          >
            {tCommon("apply")}
          </button>
        </div>
      )}
    </aside>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-3">
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-paper-1">
      <span
        className={cn(
          "inline-flex h-4 w-4 items-center justify-center rounded-input border transition-colors",
          checked ? "border-volt-500 bg-volt-500" : "border-ink-3 bg-ink-1",
        )}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4l3 3 5-6"
              stroke="#0A0A0B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {label}
    </label>
  );
}
