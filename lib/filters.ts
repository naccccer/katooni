import type { Category, Gender } from "./product-types";

export type SortKey = "newest" | "price-asc" | "price-desc" | "popularity";

export type FilterState = {
  category: Category[];
  gender: Gender[];
  size: number[];
  color: string[]; // hex values
  priceMin: number;
  priceMax: number;
  sort: SortKey;
  page: number;
};

export const PAGE_SIZE = 12;

export const defaultFilters: FilterState = {
  category: [],
  gender: [],
  size: [],
  color: [],
  priceMin: 0,
  priceMax: 500,
  sort: "newest",
  page: 1,
};

const SORT_VALUES: SortKey[] = ["newest", "price-asc", "price-desc", "popularity"];

export function parseFiltersFromSearchParams(
  params: Record<string, string | string[] | undefined>,
): FilterState {
  const get = (key: string): string[] => {
    const v = params[key];
    if (!v) return [];
    return Array.isArray(v) ? v : v.split(",").filter(Boolean);
  };

  const getOne = (key: string): string | undefined => {
    const v = params[key];
    if (Array.isArray(v)) return v[0];
    return v;
  };

  const sortRaw = getOne("sort");
  const sort: SortKey = SORT_VALUES.includes(sortRaw as SortKey)
    ? (sortRaw as SortKey)
    : "newest";

  return {
    category: get("category") as Category[],
    gender: get("gender") as Gender[],
    size: get("size")
      .map((s) => Number(s))
      .filter((n) => !Number.isNaN(n)),
    color: get("color"),
    priceMin: Number(getOne("priceMin") ?? 0) || 0,
    priceMax: Number(getOne("priceMax") ?? 500) || 500,
    sort,
    page: Number(getOne("page") ?? 1) || 1,
  };
}

export function filtersToSearchParams(f: FilterState): URLSearchParams {
  const p = new URLSearchParams();
  if (f.category.length) p.set("category", f.category.join(","));
  if (f.gender.length) p.set("gender", f.gender.join(","));
  if (f.size.length) p.set("size", f.size.join(","));
  if (f.color.length) p.set("color", f.color.join(","));
  if (f.priceMin !== defaultFilters.priceMin)
    p.set("priceMin", String(f.priceMin));
  if (f.priceMax !== defaultFilters.priceMax)
    p.set("priceMax", String(f.priceMax));
  if (f.sort !== defaultFilters.sort) p.set("sort", f.sort);
  if (f.page !== defaultFilters.page) p.set("page", String(f.page));
  return p;
}

export function isDefault(f: FilterState): boolean {
  return JSON.stringify(f) === JSON.stringify(defaultFilters);
}

export function activeFilterCount(f: FilterState): number {
  return (
    f.category.length +
    f.gender.length +
    f.size.length +
    f.color.length +
    (f.priceMin !== defaultFilters.priceMin ||
    f.priceMax !== defaultFilters.priceMax
      ? 1
      : 0)
  );
}
