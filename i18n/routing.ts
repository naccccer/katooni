import { defineRouting } from "next-intl/routing";

// Katooni ships Farsi-only. EN text remains in messages/en.json for
// aesthetic / decorative use but is not routed.
export const routing = defineRouting({
  locales: ["fa"] as const,
  defaultLocale: "fa",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const RTL_LOCALES: ReadonlyArray<Locale> = ["fa"];
export function isRtl(locale: string): boolean {
  return (RTL_LOCALES as ReadonlyArray<string>).includes(locale);
}
