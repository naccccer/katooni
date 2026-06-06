import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Outfit } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { MotionConfig } from "motion/react";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { routing, isRtl } from "@/i18n/routing";
import "./globals.css";
import "./fonts.css";

const outfit = Outfit({
  variable: "--font-cabinet",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: `Katooni - ${t("line1")} ${t("line2")} ${t("line3")}`,
    description: t("sub"),
    metadataBase: new URL("http://localhost:3000"),
    openGraph: {
      title: "Katooni",
      description: t("sub"),
      type: "website",
    },
  };
}

const VIDEO_PRELOAD = [
  { href: "/video/orbit.mp4", as: "video", type: "video/mp4" },
];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${GeistSans.variable} ${GeistMono.variable} ${outfit.variable}`}
    >
      <head>
        {VIDEO_PRELOAD.map((l) => (
          <link key={l.href} rel="preload" as={l.as} type={l.type} href={l.href} />
        ))}
      </head>
      <body className="bg-ink-0 text-paper-1 antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <MotionConfig reducedMotion="user">
            <SiteHeader locale={locale} />
            <main id="main">{children}</main>
            <SiteFooter locale={locale} />
          </MotionConfig>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
