// Library: motion/react only. Native-feeling custom select.
"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import type { FilterState } from "@/lib/filters";
import { cn } from "@/lib/cn";

const options: { value: FilterState["sort"]; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "popularity", label: "Most popular" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
];

type SortDropdownProps = {
  value: FilterState["sort"];
  onChange: (value: FilterState["sort"]) => void;
};

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex h-11 items-center gap-2 rounded-pill border border-ink-3 px-5 text-sm text-paper-1 transition-colors hover:border-paper-2 hover:bg-ink-1"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-3">
          Sort
        </span>
        <span>{current.label}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={cn("transition-transform", open && "rotate-180")}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-30 mt-2 w-60 overflow-hidden rounded-card border border-ink-3 bg-ink-1 py-1"
          >
            {options.map((o) => (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-ink-2",
                    o.value === value ? "text-volt-500" : "text-paper-1",
                  )}
                >
                  {o.label}
                  {o.value === value && (
                    <span className="h-1.5 w-1.5 rounded-full bg-volt-500" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
