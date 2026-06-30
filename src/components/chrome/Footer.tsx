import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Reveal, Marquee } from "@/components/motion";
import { footerNav, socials } from "@/lib/data/navigation";
import { site } from "@/lib/data/site";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-espresso text-cream">
      {/* Marquee divider */}
      <div className="border-b border-cream/10 py-5">
        <Marquee duration={44} className="text-cream/30">
          {["Alta Orologeria Italiana", "Since 1947", "Crafted in Milano", "Made to Outlast Generations"].map(
            (t) => (
              <span
                key={t}
                className="mx-8 inline-flex items-center gap-8 font-display text-2xl font-light italic"
              >
                {t}
                <span className="h-1 w-1 rounded-full bg-gold" />
              </span>
            ),
          )}
        </Marquee>
      </div>

      {/* Newsletter */}
      <Container size="wide" className="border-b border-cream/10 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <div>
              <span className="label text-gold">The Maison Correspondence</span>
              <h2 className="mt-5 max-w-xl font-display text-display-sm font-light leading-[1.05] text-cream">
                Receive private viewings, new arrivals & the stories behind the craft.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:justify-self-end lg:pb-2">
            <NewsletterForm tone="cream" />
            <p className="mt-4 max-w-md font-serif text-sm text-cream/45">
              By subscribing you agree to the Barro Privacy Policy. Unsubscribe at any time.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* Link columns */}
      <Container size="wide" className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + boutiques */}
          <div className="lg:col-span-4">
            <p className="font-display text-4xl font-medium tracking-[0.2em] text-cream">BARRO</p>
            <p className="mt-4 max-w-xs font-serif text-cream/55">
              {site.legalName} — {site.tagline}. Hand-finished mechanical timepieces, conceived in {site.city} since {site.founded}.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {site.boutiques.map((b) => (
                <div key={b.city}>
                  <p className="font-sans text-2xs uppercase tracking-luxe text-gold/80">{b.city}</p>
                  <p className="mt-1 font-serif text-sm text-cream/55">{b.address}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {Object.values(footerNav).map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <p className="label text-cream/45">{col.heading}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="font-serif text-cream/70 transition-colors duration-300 hover:text-gold-pale"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <Container size="wide" className="flex flex-col items-center justify-between gap-6 py-7 md:flex-row">
          <p className="order-2 font-sans text-2xs tracking-wide text-cream/40 md:order-1">
            © {site.founded}–{year} {site.legalName}. All rights reserved.
          </p>
          <div className="order-1 flex items-center gap-6 md:order-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="font-sans text-2xs uppercase tracking-luxe text-cream/55 transition-colors hover:text-gold-pale"
              >
                {s.label}
              </a>
            ))}
          </div>
          <p className="order-3 font-sans text-2xs uppercase tracking-luxe text-cream/40">
            Crafted in Milano · Italia
          </p>
        </Container>
      </div>
    </footer>
  );
}
