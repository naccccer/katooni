import { StoreClient } from "@/components/store/StoreClient";
import {
  defaultFilters,
  parseFiltersFromSearchParams,
} from "@/lib/filters";

type StorePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  params: Promise<{ locale: string }>;
};

export default async function StorePage(props: StorePageProps) {
  const [search, p] = await Promise.all([props.searchParams, props.params]);
  const filters = parseFiltersFromSearchParams(search);
  const safe = { ...defaultFilters, ...filters };
  return <StoreClient filters={safe} locale={p.locale} />;
}
