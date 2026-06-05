import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium select-none transition-[transform,background-color,color,border-color] duration-150 active:translate-y-px disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-volt-500 text-ink-0 hover:bg-volt-600 border border-transparent",
  secondary:
    "bg-transparent text-paper-1 border border-ink-3 hover:border-paper-2 hover:bg-ink-1",
  ghost: "bg-transparent text-paper-1 hover:text-volt-500 border border-transparent",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AsButton = CommonProps & ComponentPropsWithoutRef<"button"> & { href?: never };
type AsLink = CommonProps & { href: string } & Omit<
  ComponentPropsWithoutRef<"a">,
  "href"
>;

export function Button(props: AsButton | AsLink) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;
  const cls = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest;
    return (
      <Link href={href} className={cls} {...anchorRest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
