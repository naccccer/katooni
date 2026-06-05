import { cn } from "@/lib/cn";

type PriceProps = {
  value: number;
  currency?: "USD";
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function Price({
  value,
  currency = "USD",
  className,
  size = "md",
}: PriceProps) {
  const sizeClass =
    size === "sm" ? "text-sm" : size === "lg" ? "text-2xl font-semibold" : "text-base";

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);

  return (
    <span className={cn("font-mono tabular-nums", sizeClass, className)}>
      {formatted}
    </span>
  );
}
