// Library: motion/react only.
"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { FilterRail } from "./FilterRail";
import type { FilterState } from "@/lib/filters";
import { useTranslations } from "next-intl";

type MobileFilterSheetProps = {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  locale: string;
};

export function MobileFilterSheet({
  open,
  onClose,
  filters,
  locale,
}: MobileFilterSheetProps) {
  const reduce = useReducedMotion();
  const tCommon = useTranslations("common");
  const t = useTranslations("store");

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
            aria-label={tCommon("close")}
            className="absolute inset-0 bg-ink-0/80 backdrop-blur-md"
          />
          <motion.div
            initial={reduce ? false : { y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 bottom-0 flex h-[92dvh] flex-col rounded-t-card border-t border-ink-3 bg-ink-0"
          >
            <div className="flex items-center justify-between border-b border-ink-3 px-6 py-4">
              <span className="font-display text-xl font-bold tracking-tighter text-paper-1">
                {tCommon("filters")}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-pill border border-ink-3 text-paper-1"
                aria-label={tCommon("close")}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <FilterRail
                filters={filters}
                variant="sheet"
                onApply={onClose}
                locale={locale}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
