import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Outfit } from "next/font/google";
import { MotionConfig } from "motion/react";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-cabinet",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Katooni - Footwear for the ones who run first",
  description:
    "Volt-soled, ink-built sneakers and trainers engineered for the long mile. Shop the current drop and the full catalog.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Katooni",
    description: "Footwear for the ones who run first.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${outfit.variable}`}
    >
      <body className="bg-ink-0 text-paper-1 antialiased">
        <MotionConfig reducedMotion="user">
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionConfig>
      </body>
    </html>
  );
}
