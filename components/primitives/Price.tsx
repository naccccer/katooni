import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/pricing";
import { useLocale } from "next-intl";

type PriceProps = {
  valueUsd: number;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function Price({ valueUsd, className, size = "md" }: PriceProps) {
  const locale = useLocale();
  const sizeClass =
    size === "sm" ? "text-sm" : size === "lg" ? "text-2xl font-semibold" : "text-base";
  return (
    <span className={cn("tabular-nums", sizeClass, className)}>
      {formatPrice(valueUsd, locale)}
    </span>
  );
}
