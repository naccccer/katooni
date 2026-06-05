import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { useTranslations } from "next-intl";

type SiteFooterProps = { locale: string };

export function SiteFooter({ locale }: SiteFooterProps) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-ink-3 bg-ink-0">
      <Container className="py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-3xl font-extrabold tracking-tighter">
              Katooni
            </div>
            <p className="mt-4 max-w-[28ch] text-sm text-paper-2">
              {t("tagline")}
            </p>
            <Eyebrow className="mt-8">Run log</Eyebrow>
            <p className="mt-2 font-mono text-xs text-paper-3">
              v0.4.0 - build 0218
            </p>
          </div>

          <FooterCol title={t("shop")}>
            <FooterLink href={`/${locale}/store`}>{tNav("store")}</FooterLink>
            <FooterLink href={`/${locale}/store?category=running`}>
              {tNav("running")}
            </FooterLink>
            <FooterLink href={`/${locale}/store?category=trail`}>
              {tNav("trail")}
            </FooterLink>
            <FooterLink href={`/${locale}/store?category=track`}>
              {tNav("track")}
            </FooterLink>
            <FooterLink href={`/${locale}/store?category=court`}>
              {tNav("court")}
            </FooterLink>
            <FooterLink href={`/${locale}/store?category=lifestyle`}>
              {tNav("lifestyle")}
            </FooterLink>
          </FooterCol>

          <FooterCol title={t("help")}>
            <FooterLink href="#">{t("helpLinks.sizing")}</FooterLink>
            <FooterLink href="#">{t("helpLinks.shipping")}</FooterLink>
            <FooterLink href="#">{t("helpLinks.returns")}</FooterLink>
            <FooterLink href="#">{t("helpLinks.care")}</FooterLink>
            <FooterLink href="#">{t("helpLinks.warranty")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("about")}>
            <FooterLink href="#">{t("aboutLinks.lab")}</FooterLink>
            <FooterLink href="#">{t("aboutLinks.materials")}</FooterLink>
            <FooterLink href="#">{t("aboutLinks.press")}</FooterLink>
            <FooterLink href="#">{t("aboutLinks.careers")}</FooterLink>
            <FooterLink href="#">{t("aboutLinks.stockists")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("connect")}>
            <FooterLink href="#">{t("connectLinks.instagram")}</FooterLink>
            <FooterLink href="#">{t("connectLinks.strava")}</FooterLink>
            <FooterLink href="#">{t("connectLinks.newsletter")}</FooterLink>
            <FooterLink href="#">{t("connectLinks.support")}</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-ink-3 pt-8 text-xs text-paper-3 md:flex-row md:items-center">
          <p>{t("copyright")}</p>
          <div className="flex items-center gap-4 font-mono uppercase tracking-[0.18em]">
            <span>{t("location")}</span>
            <span className="h-1 w-1 rounded-full bg-paper-3" />
            <span>{t("madeIn")}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Eyebrow className="mb-4">{title}</Eyebrow>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-paper-2 transition-colors hover:text-volt-500"
      >
        {children}
      </Link>
    </li>
  );
}
