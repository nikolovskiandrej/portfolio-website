import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Reveal, ParallaxZoom } from "@/components/motion";
import { WatchImage } from "@/components/common/WatchImage";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/data/site";

export function Invitation() {
  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden bg-espresso text-cream">
      <ParallaxZoom className="absolute inset-0 h-full w-full" from={1.12} to={1}>
        <WatchImage
          src="/images/story/storefront.jpg"
          alt={`The Barro boutique, ${site.address.street}, ${site.city}`}
          treatment="deep"
          sizes="100vw"
          className="h-full w-full"
        />
      </ParallaxZoom>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/55 to-espresso/30" />
      <div className="grain grain-light pointer-events-none absolute inset-0" />

      <Container size="wide" className="relative z-10 py-section">
        <div className="max-w-2xl">
          <Reveal>
            <span className="label text-gold">An Invitation</span>
            <h2 className="mt-6 font-display text-display-md font-light leading-[1.02] text-cream">
              Experience Barro <span className="italic text-gold-pale">in person</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-xl text-pretty font-serif text-lg leading-relaxed text-cream/80">
              Reserve a private appointment at one of our four boutiques — Milano, Roma, Genève
              and London. Handle the calibres, meet a watchmaker, and find the piece that will
              keep your time for a lifetime.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button variant="onDarkGold" size="lg" asChild>
                <Link href="/contact">Book an Appointment</Link>
              </Button>
              <Button variant="onDark" size="lg" asChild>
                <Link href="/contact">Find a Boutique</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
