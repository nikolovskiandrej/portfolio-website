import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Price } from "@/components/common/Price";
import { Rating } from "@/components/common/Rating";
import { Reveal } from "@/components/motion";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { getWatch, watches } from "@/lib/data/watches";
import { site } from "@/lib/data/site";

export function generateStaticParams() {
  return watches.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const watch = getWatch(slug);
  if (!watch) return { title: "Timepiece Not Found" };

  const title = `${watch.name} — ${watch.collectionName}`;
  const description = `${watch.shortDescription} ${watch.specs.movement}, ${watch.specs.caliber}. ${
    watch.limited ? `Limited to ${watch.limitedCount} numbered pieces. ` : ""
  }Hand-finished by Barro in Milano.`;

  return {
    title,
    description,
    alternates: { canonical: `/watches/${watch.slug}` },
    openGraph: {
      type: "website",
      title: `${title} · ${site.name}`,
      description,
      url: `/watches/${watch.slug}`,
      images: [{ url: watch.images[0], width: 1200, height: 1500, alt: watch.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
      images: [watch.images[0]],
    },
  };
}

export default async function WatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const watch = getWatch(slug);
  if (!watch) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${site.name} ${watch.name}`,
    image: watch.images.map((src) => `${site.url}${src}`),
    description: watch.description,
    sku: watch.reference,
    mpn: watch.reference,
    category: `Luxury Watches > ${watch.collectionName}`,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      url: `${site.url}/watches/${watch.slug}`,
      priceCurrency: "EUR",
      price: watch.price,
      availability: `https://schema.org/${watch.inStock ? "InStock" : "OutOfStock"}`,
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: site.legalName },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: watch.rating,
      reviewCount: watch.reviewCount,
      bestRating: 5,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Detail */}
      <section className="bg-ivory pb-section-sm pt-28 sm:pt-32">
        <Container size="wide">
          <div className="flex items-center justify-between gap-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: watch.collectionName, href: `/collections/${watch.collection}` },
                { label: watch.name },
              ]}
            />
            <Link
              href={`/collections/${watch.collection}`}
              data-cursor-label="Back"
              className="group hidden items-center gap-2 font-sans text-2xs uppercase tracking-luxe text-ink-faint transition-colors hover:text-oxblood sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:-translate-x-1" />
              {watch.collectionName}
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] xl:gap-x-24">
            {/* Gallery */}
            <Reveal dir="none" duration={1}>
              <ProductGallery watch={watch} />
            </Reveal>

            {/* Info + purchase */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal dir="up">
                <p className="label-gold">{watch.collectionName}</p>
                <h1 className="mt-4 font-display text-display-sm font-light leading-[1.0] text-ink">
                  {watch.name}
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <Rating value={watch.rating} count={watch.reviewCount} size={14} />
                  <span className="font-sans text-2xs uppercase tracking-luxe text-ink-faint">
                    Ref. {watch.reference}
                  </span>
                </div>

                <Price amount={watch.price} className="mt-7 block font-display text-4xl font-light text-ink" />

                {watch.limited && (
                  <p className="mt-4 inline-flex items-center gap-2.5 border border-gold/40 bg-gold/[0.06] px-4 py-2 font-sans text-2xs uppercase tracking-luxe text-gold-dark">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Edizione Limitata — {watch.limitedCount} numbered pieces
                  </p>
                )}

                <p className="mt-7 max-w-prose2 text-pretty font-serif text-lg leading-relaxed text-ink-muted">
                  {watch.description}
                </p>

                <div className="hairline my-9" />

                <ProductPurchase watch={watch} />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Specifications */}
      <section className="bg-cream py-section-sm">
        <Container size="wide">
          <Reveal>
            <p className="label-gold mb-3">The Detail</p>
            <h2 className="max-w-2xl font-display text-display-sm font-light leading-[1.04] text-ink">
              Measured to the hundredth of a millimetre.
            </h2>
          </Reveal>
          <div className="mt-12">
            <ProductSpecs watch={watch} />
          </div>
        </Container>
      </section>

      {/* Maker's mark */}
      <section className="bg-espresso py-section-sm text-cream">
        <Container size="narrow" className="text-center">
          <Reveal>
            <p className="label mb-7 text-gold">Inciso a Mano · Hand-Engraved</p>
            <blockquote className="mx-auto max-w-3xl text-balance font-display text-3xl font-light italic leading-[1.25] text-cream/90 sm:text-4xl">
              “Every {watch.name} leaves the bench signed, numbered and answerable to the name on
              the dial.”
            </blockquote>
            <p className="mt-8 font-sans text-2xs uppercase tracking-luxe text-cream/55">
              The Atelier · Milano
            </p>
          </Reveal>
        </Container>
      </section>

      <RelatedProducts slug={watch.slug} />
    </>
  );
}
