// Library: motion/react only.
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { OvalaLogo } from "./OvalaLogo";
import { cn } from "@/lib/cn";

const navItems = [
  { label: "خانه", href: "#home" },
  { label: "مردانه", href: "#men" },
  { label: "زنانه", href: "#women" },
  { label: "کالکشن‌ها", href: "#collections" },
  { label: "مجله", href: "#journal" },
];

export function OvalaNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        dir="rtl"
        className="fixed inset-x-0 top-0 z-50 px-6 pt-6 md:px-10 md:pt-7"
      >
        <div className="relative flex items-center justify-between">
          {/* Burger — visually top-left in RTL (the "start" position) */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="باز کردن منو"
            className="inline-flex h-10 w-10 items-center justify-center text-paper-1 transition-opacity hover:opacity-70"
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
              <path d="M0 1h22M0 7h22M0 13h22" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          {/* Center Persian nav (desktop) — absolutely centered */}
          <nav
            aria-label="Primary"
            className="pointer-events-auto absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative text-sm text-paper-1 transition-colors hover:text-volt-500"
              >
                {item.label}
                <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-right scale-x-0 bg-volt-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* OVALA — visually top-right in RTL (the "end" position) */}
          <a
            href="#home"
            aria-label="OVALA"
            className="block text-paper-1 transition-opacity hover:opacity-80"
          >
            <OvalaLogo className="h-7 w-auto md:h-8" />
          </a>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-ink-0/85 backdrop-blur-xl"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.aside
            key="panel"
            dir="rtl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className={cn(
              "fixed left-0 top-0 z-[70] h-full w-[min(420px,86vw)] bg-ink-1 p-10",
              "flex flex-col",
            )}
            role="dialog"
            aria-label="منو"
          >
            <div className="flex items-center justify-between">
              <OvalaLogo className="h-7 w-auto text-paper-1" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="بستن منو"
                className="inline-flex h-10 w-10 items-center justify-center text-paper-1 transition-opacity hover:opacity-70"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            <nav className="mt-16 flex flex-col gap-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-3xl font-bold tracking-tight text-paper-1 transition-colors hover:text-volt-500"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto pt-10 text-xs text-paper-3">
              <p className="font-mono uppercase tracking-[0.2em]">OVALA · کیوریتد</p>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
