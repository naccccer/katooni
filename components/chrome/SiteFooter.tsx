import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All", href: "/store" },
      { label: "Running", href: "/store?category=running" },
      { label: "Trail", href: "/store?category=trail" },
      { label: "Track", href: "/store?category=track" },
      { label: "Court", href: "/store?category=court" },
      { label: "Lifestyle", href: "/store?category=lifestyle" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Sizing", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Care guide", href: "#" },
      { label: "Warranty", href: "#" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "The lab", href: "#" },
      { label: "Materials", href: "#" },
      { label: "Press", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Stockists", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "#" },
      { label: "Strava club", href: "#" },
      { label: "Newsletter", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-3 bg-ink-0">
      <Container className="py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-3xl font-extrabold tracking-tighter">
              Katooni
            </div>
            <p className="mt-4 max-w-[28ch] text-sm text-paper-2">
              Footwear engineered for the long mile. Built in Kyoto, run
              everywhere.
            </p>
            <Eyebrow className="mt-8">Run log</Eyebrow>
            <p className="mt-2 font-mono text-xs text-paper-3">
              v0.4.0 - build 0218
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <Eyebrow className="mb-4">{col.title}</Eyebrow>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper-2 transition-colors hover:text-volt-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-ink-3 pt-8 text-xs text-paper-3 md:flex-row md:items-center">
          <p>© 2026 Katooni Athletic Co. All rights reserved.</p>
          <div className="flex items-center gap-4 font-mono uppercase tracking-[0.18em]">
            <span>JP / Kyoto</span>
            <span className="h-1 w-1 rounded-full bg-paper-3" />
            <span>Made to be run in</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
