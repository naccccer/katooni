// Library: motion/react only. Never coexists with gsap in the same file.
"use client";

import { motion, useReducedMotion } from "motion/react";
import { charRise, stagger as staggerVariant } from "@/lib/motion-variants";

type SplitRevealProps = {
  text: string;
  className?: string;
  perChar?: boolean;
  delayChildren?: number;
  staggerChildren?: number;
};

export function SplitReveal({
  text,
  className,
  perChar = false,
  delayChildren = 0,
  staggerChildren = 0.018,
}: SplitRevealProps) {
  const reduce = useReducedMotion();
  const tokens = perChar ? Array.from(text) : text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      variants={staggerVariant(delayChildren, staggerChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      aria-label={text}
    >
      {tokens.map((t, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-baseline"
          style={{ paddingBottom: perChar && /[gyjpq]/.test(t) ? "0.08em" : undefined }}
        >
          <motion.span variants={charRise} className="inline-block">
            {t === " " ? " " : t}
            {perChar ? "" : i < tokens.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
