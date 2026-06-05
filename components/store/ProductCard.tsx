// Library: motion/react only. Hover state.
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Price } from "@/components/primitives/Price";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/product-types";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-card border border-ink-3 bg-ink-1 transition-colors hover:border-volt-500/40",
        className,
      )}
    >
      <Link
        href={`/store?category=${product.category}`}
        className="block"
        aria-label={`View ${product.name}`}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-0/50 via-transparent to-transparent" />
          {product.badge && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-pill bg-ink-0/70 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-paper-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-volt-500" />
              {product.badge === "new-drop"
                ? "New drop"
                : product.badge === "restock"
                  ? "Restock"
                  : "Last pairs"}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-3">
              {product.category}
            </p>
            <Price value={product.price} className="text-paper-1" />
          </div>
          <h3 className="font-display text-xl font-bold tracking-tighter text-paper-1 transition-colors group-hover:text-volt-500">
            {product.name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5">
            {product.colorways.slice(0, 4).map((c) => (
              <span
                key={c.hex}
                className="h-3 w-3 rounded-pill border border-ink-3"
                style={{ backgroundColor: c.hex }}
                aria-label={c.name}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
