import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[88vh] items-center bg-espresso py-section text-cream">
      <div className="absolute inset-0 bg-radial-gold" aria-hidden />
      <Container size="narrow" className="relative z-10 text-center">
        <p className="label mb-7 text-gold">Errore 404</p>
        <p className="font-display text-display-xl font-light leading-none text-cream/90">404</p>
        <h1 className="mx-auto mt-6 max-w-xl text-balance font-display text-display-sm font-light leading-[1.05] text-cream">
          This page has slipped beyond the hour.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-pretty font-serif text-lg leading-relaxed text-cream/70">
          The piece you were looking for may have been moved, sold, or never existed. Allow us to
          return you to safer ground.
        </p>
        <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="onDarkGold" size="lg" asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button variant="onDark" size="lg" asChild>
            <Link href="/collections">Browse the Collections</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
