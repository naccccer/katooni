import { StoreClient } from "@/components/store/StoreClient";
import {
  defaultFilters,
  parseFiltersFromSearchParams,
} from "@/lib/filters";

type StorePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function StorePage({ searchParams }: StorePageProps) {
  const params = await searchParams;
  const filters = parseFiltersFromSearchParams(params);

  // Defensive: if a filter arrives with bad values, fall back to defaults.
  const safe = {
    ...defaultFilters,
    ...filters,
  };

  return <StoreClient filters={safe} />;
}
