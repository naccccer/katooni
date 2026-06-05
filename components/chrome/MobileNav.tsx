// Library: motion/react only. Sheet open/close animation.
"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/cn";

type Item = { label: string; href: string };

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  items: Item[];
};

export function MobileNav({ open, onClose, items }: MobileNavProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] lg:hidden"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="absolute inset-0 bg-ink-0/80 backdrop-blur-md"
          />
          <motion.div
            className="absolute inset-x-0 top-0 flex h-[100dvh] flex-col bg-ink-0"
            initial={reduce ? false : { y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container-x flex h-[72px] items-center justify-between">
              <span className="font-display text-2xl font-extrabold tracking-tighter">
                Katooni
              </span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-ink-3 text-paper-1"
                aria-label="Close menu"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>

            <nav className="container-x flex flex-1 flex-col justify-center gap-2">
              {items.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.04 * i, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "font-display block text-5xl font-bold tracking-tighter text-paper-1 transition-colors hover:text-volt-500",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="container-x pb-12">
              <Link
                href="/store"
                onClick={onClose}
                className="inline-flex h-12 items-center justify-center rounded-pill bg-volt-500 px-6 text-sm font-medium text-ink-0 transition-colors hover:bg-volt-600"
              >
                Find a pair
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
