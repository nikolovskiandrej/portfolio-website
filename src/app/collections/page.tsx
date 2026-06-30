import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { WatchImage } from "@/components/common/WatchImage";
import { Reveal } from "@/components/motion";
import { CatalogView } from "@/components/product/CatalogView";
import { collections } from "@/lib/data/collections";
import { getWatchesByCollection, watches } from "@/lib/data/watches";

export const metadata: Metadata = {
  title: "The Collections",
  description:
    "Five families of hand-finished Italian timepieces — Classico, Sportivo, Eredità, Moderno and Edizione Limitata. Explore the complete Barro catalogue.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="The Maison"
        title={
          <>
            Five families,
            <br />
            one obsession.
          </>
        }
        description="Every Barro belongs to one of five collections — each a distinct answer to the same question the Maison has asked since 1947: how should a watch made entirely by hand feel on the wrist?"
        image="/images/collections/heritage.jpg"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Collections" }]}
        meta={`${watches.length} timepieces · ${collections.length} collections`}
        size="lg"
      />

      {/* Family rows */}
      <section className="bg-ivory py-section-sm">
        <Container size="wide">
          <div className="flex flex-col gap-24 sm:gap-32">
            {collections.map((c, i) => {
              const count = getWatchesByCollection(c.slug).length;
              const flip = i % 2 === 1;
              return (
                <div
                  key={c.slug}
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
                >
                  <Reveal
                    dir="none"
                    duration={1}
                    className={flip ? "lg:order-2" : undefined}
                  >
                    <Link
                      href={`/collections/${c.slug}`}
                      data-cursor-label={`View ${c.name}`}
                      className="group relative block aspect-[5/4] overflow-hidden bg-parchment"
                    >
                      <WatchImage
                        src={c.image}
                        alt={c.name}
                        sizes="(max-width: 1024px) 92vw, 46vw"
                        className="h-full w-full"
                        imgClassName="transition-transform duration-1500 ease-luxe group-hover:scale-105"
                      />
                      <span className="absolute left-6 top-6 font-display text-6xl font-light italic text-cream/85 mix-blend-soft-light">
                        {c.index}
                      </span>
                    </Link>
                  </Reveal>

                  <Reveal dir="up" className={flip ? "lg:order-1" : undefined}>
                    <p className="label-gold mb-4">
                      Collezione {c.index} · {count} {count === 1 ? "piece" : "pieces"}
                    </p>
                    <h2 className="font-display text-display-sm font-light leading-[1.02] text-ink">
                      {c.name}
                    </h2>
                    <p className="mt-3 font-serif text-xl italic text-oxblood">{c.tagline}</p>
                    <p className="mt-6 max-w-prose2 text-pretty font-serif text-lg leading-relaxed text-ink-muted">
                      {c.description}
                    </p>
                    <Link
                      href={`/collections/${c.slug}`}
                      data-cursor-label="Explore"
                      className="group mt-8 inline-flex items-center gap-3 font-sans text-2xs uppercase tracking-luxe text-ink-soft transition-colors hover:text-oxblood"
                    >
                      Explore {c.name}
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1.5" />
                    </Link>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Full catalogue */}
      <div className="border-t border-line bg-ivory">
        <Container size="wide" className="pt-section-sm">
          <Reveal>
            <p className="label-gold mb-4">The Complete Catalogue</p>
            <h2 className="max-w-2xl font-display text-display-sm font-light leading-[1.04] text-ink">
              Every Barro, in one place.
            </h2>
          </Reveal>
        </Container>
        <CatalogView watches={watches} showCollectionFilter showGenderFilter showStrapFilter />
      </div>
    </>
  );
}
