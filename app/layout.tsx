import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Outfit } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals-root.css";
import "./styles/globals.css";
import "./styles/fonts.css";

const outfit = Outfit({
  variable: "--font-cabinet",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "OVALA — Curated Sneakers",
  description: "OVALA · کیوریتد فروشگاه کفش‌های منتخب",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${GeistSans.variable} ${GeistMono.variable} ${outfit.variable}`}
    >
      <body className="bg-ink-0 text-paper-1 antialiased">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
