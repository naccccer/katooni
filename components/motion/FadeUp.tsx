// Library: motion/react only. Never coexists with gsap in the same file.
"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { fadeUp, fadeIn, EASE_OUT_EXPO } from "@/lib/motion-variants";
import { cn } from "@/lib/cn";

type FadeUpProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span" | "p" | "li" | "section" | "article" | "header";
};

export function FadeUp({
  children,
  className,
  delay = 0,
  as = "div",
}: FadeUpProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }
  const variants: Variants = {
    hidden: fadeUp.hidden ?? { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay },
    },
  };
  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
    >
      {children}
    </Tag>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  const variants: Variants = {
    hidden: fadeIn.hidden ?? { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, delay } },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
