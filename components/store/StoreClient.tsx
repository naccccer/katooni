// Library: motion/react only. Client wrapper that owns the filter sheet
// and wires the sort dropdown to the URL.
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { StoreHeader } from "./StoreHeader";
import { FilterRail } from "./FilterRail";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { ProductGrid } from "./ProductGrid";
import { filtersToSearchParams, type FilterState, type SortKey } from "@/lib/filters";
import { products } from "@/lib/products";
import type { Product } from "@/lib/product-types";

function applyFilters(filters: FilterState): Product[] {
  let result = products.slice();

  if (filters.category.length) {
    result = result.filter((p) => filters.category.includes(p.category));
  }
  if (filters.gender.length) {
    result = result.filter((p) => filters.gender.includes(p.gender));
  }
  if (filters.size.length) {
    result = result.filter((p) =>
      p.sizes.some((s) => filters.size.includes(s)),
    );
  }
  if (filters.color.length) {
    result = result.filter((p) =>
      p.colorways.some((c) => filters.color.includes(c.hex)),
    );
  }
  result = result.filter(
    (p) => p.price >= filters.priceMin && p.price <= filters.priceMax,
  );

  switch (filters.sort) {
    case "newest":
      result.sort(
        (a, b) =>
          new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime(),
      );
      break;
    case "popularity":
      result.sort((a, b) => b.popularity - a.popularity);
      break;
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
  }

  return result;
}

type StoreClientProps = {
  filters: FilterState;
};

export function StoreClient({ filters }: StoreClientProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const filtered = applyFilters(filters);

  function update(next: FilterState) {
    const params = filtersToSearchParams(next);
    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `/store?${qs}` : "/store", { scroll: false });
    });
  }

  function onChangeSort(sort: SortKey) {
    update({ ...filters, sort, page: 1 });
  }

  return (
    <>
      <StoreHeader
        filters={filters}
        resultCount={filtered.length}
        totalCount={products.length}
        onChangeSort={onChangeSort}
        onOpenMobileFilters={() => setMobileOpen(true)}
      />

      <div className="container-x py-12">
        <div className="flex gap-10">
          <FilterRail filters={filters} />
          <div className="flex-1">
            <ProductGrid products={filtered} pending={pending} />
          </div>
        </div>
      </div>

      <MobileFilterSheet
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        filters={filters}
      />
    </>
  );
}
