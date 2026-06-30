import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Reveal, ParallaxZoom } from "@/components/motion";
import { WatchImage } from "@/components/common/WatchImage";
import { Price } from "@/components/common/Price";
import { Rating } from "@/components/common/Rating";
import { Button } from "@/components/ui/button";
import { getWatch } from "@/lib/data/watches";

export function SignaturePiece() {
  const watch = getWatch("tourbillon-eterno");
  if (!watch) return null;
  const s = watch.specs;

  const specRows: [string, string][] = [
    ["Movement", s.movement],
    ["Calibre", s.caliber],
    ["Power Reserve", s.powerReserve],
    ["Frequency", s.frequency],
    ["Case", `${s.caseMaterial} · ${s.diameter}`],
    ["Water Resistance", s.waterResistance],
  ];

  return (
    <section className="relative overflow-hidden bg-parchment py-section">
      <Container size="wide">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <Reveal dir="left">
            <div className="relative">
              <ParallaxZoom className="aspect-[4/5] w-full bg-espresso shadow-luxe">
                <WatchImage
                  src={watch.images[0]}
                  alt={watch.name}
                  treatment="deep"
                  vignette
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="h-full w-full"
                />
              </ParallaxZoom>
              {watch.limited && (
                <div className="absolute left-0 top-8 bg-gold px-5 py-3 text-espresso shadow-soft">
                  <p className="font-sans text-2xs uppercase tracking-luxe">Edizione Limitata</p>
                  {watch.limitedCount && (
                    <p className="mt-0.5 font-display text-lg font-medium leading-none tnum">
                      {watch.limitedCount} pieces worldwide
                    </p>
                  )}
                </div>
              )}
            </div>
          </Reveal>

          {/* Detail */}
          <div>
            <Reveal>
              <span className="label-gold">The Maison Icon</span>
              <h2 className="mt-5 font-display text-display-sm font-light leading-[1.02] text-ink">
                {watch.name}
              </h2>
              <div className="mt-4 flex items-center gap-5">
                <Rating value={watch.rating} count={watch.reviewCount} size={14} />
                <span className="font-sans text-2xs uppercase tracking-luxe text-ink-faint">
                  Ref. {watch.reference}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 max-w-prose2 text-pretty font-serif text-lg leading-relaxed text-ink-muted">
                {watch.description}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <dl className="mt-10 grid grid-cols-1 gap-x-10 border-t border-line-strong pt-2 sm:grid-cols-2">
                {specRows.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
                  >
                    <dt className="font-sans text-2xs uppercase tracking-luxe text-ink-faint">{k}</dt>
                    <dd className="text-right font-serif text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
                <div>
                  <p className="font-sans text-2xs uppercase tracking-luxe text-ink-faint">From</p>
                  <Price amount={watch.price} className="font-display text-3xl font-light text-ink" />
                </div>
                <Button variant="primary" size="lg" asChild>
                  <Link href={`/watches/${watch.slug}`}>
                    Discover the Piece
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
