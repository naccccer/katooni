import { ProductCard } from "./ProductCard";
import { EmptyState } from "./EmptyState";
import type { Product } from "@/lib/product-types";

type ProductGridProps = {
  products: Product[];
  pending?: boolean;
  locale: string;
};

export function ProductGrid({ products, pending, locale }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6"
        aria-busy={pending}
      >
        <EmptyState />
      </div>
    );
  }
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6"
      aria-busy={pending}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
