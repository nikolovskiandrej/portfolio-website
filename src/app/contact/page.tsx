import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { WatchImage } from "@/components/common/WatchImage";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact & Boutiques",
  description:
    "Speak with the Barro concierge or visit one of our boutiques in Milano, Roma, Genève and London. Book an appointment to discover the Maison in person.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Concierge & Boutiques"
        title="Come and see us."
        description="Whether you are choosing your first Barro or caring for one carried for years, our concierge is at your service — by message, by telephone, or in person."
        image="/images/story/storefront.jpg"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        size="md"
      />

      {/* Form + details */}
      <section className="bg-ivory py-section-sm">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[1.55fr_1fr] lg:gap-24">
            <Reveal dir="up">
              <p className="label-gold mb-4">Write to the Maison</p>
              <h2 className="mb-9 max-w-xl font-display text-display-sm font-light leading-[1.04] text-ink">
                Tell us how we may help.
              </h2>
              <ContactForm />
            </Reveal>

            <Reveal dir="up" delay={0.1}>
              <div className="flex flex-col gap-10 lg:border-l lg:border-line lg:pl-16">
                <Detail icon={Mail} label="Concierge">
                  <a
                    href={`mailto:${site.email}`}
                    className="link-underline text-ink-soft transition-colors hover:text-oxblood"
                  >
                    {site.email}
                  </a>
                </Detail>
                <Detail icon={Phone} label="By Telephone">
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="link-underline text-ink-soft transition-colors hover:text-oxblood"
                  >
                    {site.phone}
                  </a>
                </Detail>
                <Detail icon={Clock} label="Concierge Hours">
                  <span className="text-ink-soft">Monday – Saturday</span>
                  <span className="text-ink-muted">10.00 – 19.00 CET</span>
                </Detail>
                <Detail icon={MapPin} label="Head Office">
                  <span className="text-ink-soft">{site.address.street}</span>
                  <span className="text-ink-muted">
                    {site.address.zip} {site.address.city}, {site.address.country}
                  </span>
                </Detail>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Boutiques */}
      <section className="bg-cream py-section-sm">
        <Container size="wide">
          <Reveal>
            <p className="label-gold mb-4">The Boutiques</p>
            <h2 className="max-w-2xl font-display text-display-sm font-light leading-[1.04] text-ink">
              Four addresses, one welcome.
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {site.boutiques.map((b) => (
              <StaggerItem key={b.city}>
                <div className="flex h-full flex-col border-t border-line-strong pt-6">
                  <h3 className="font-display text-3xl font-light text-ink">{b.city}</h3>
                  <p className="mt-3 font-serif text-[15px] leading-relaxed text-ink-muted">
                    {b.address}
                  </p>
                  <a
                    href={`tel:${b.phone.replace(/\s/g, "")}`}
                    className="mt-4 font-sans text-2xs uppercase tracking-luxe text-ink-faint transition-colors hover:text-oxblood"
                  >
                    {b.phone}
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Flagship band */}
      <section className="relative overflow-hidden bg-espresso">
        <div className="relative grid lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-[560px]">
            <WatchImage
              src="/images/story/storefront.jpg"
              alt={`The Barro flagship boutique, ${site.address.street}, ${site.city}`}
              treatment="deep"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="absolute inset-0 h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-espresso/60 lg:to-espresso" />
          </div>
          <div className="flex items-center bg-espresso px-7 py-16 text-cream sm:px-12 lg:py-24">
            <Reveal dir="up">
              <p className="label mb-6 text-gold">Il Flagship · Milano</p>
              <h2 className="max-w-md font-display text-display-sm font-light leading-[1.04] text-cream">
                {site.address.street}
              </h2>
              <p className="mt-6 max-w-md text-pretty font-serif text-lg leading-relaxed text-cream/75">
                Our flagship sits in the heart of the Quadrilatero della Moda, a few steps from the
                workshop where every Barro is born. Appointments are warmly encouraged, though never
                required.
              </p>
              <p className="mt-8 font-sans text-2xs uppercase tracking-luxe text-cream/55">
                {site.address.zip} {site.address.city} · {site.address.country}
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" strokeWidth={1.4} />
      <div className="flex flex-col gap-1">
        <span className="font-sans text-2xs uppercase tracking-luxe text-ink-faint">{label}</span>
        <div className="flex flex-col gap-0.5 font-serif text-lg">{children}</div>
      </div>
    </div>
  );
}
