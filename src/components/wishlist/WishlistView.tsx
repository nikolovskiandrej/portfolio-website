"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { useMounted } from "@/lib/hooks";
import { getWatch } from "@/lib/data/watches";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Button } from "@/components/ui/button";
import type { Watch } from "@/lib/types";

export function WishlistView() {
  const { wishlist } = useStore();
  const mounted = useMounted();
  const items: Watch[] = mounted
    ? wishlist.map((slug) => getWatch(slug)).filter((w): w is Watch => Boolean(w))
    : [];

  return (
    <section className="min-h-[70vh] bg-ivory pb-section-sm pt-28 sm:pt-32">
      <Container size="wide">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <p className="label-gold mb-3">Saved for Later</p>
            <h1 className="font-display text-display-sm font-light leading-[1.02] text-ink">
              Your Wishlist
            </h1>
          </div>
          {mounted && items.length > 0 && (
            <span className="font-sans text-2xs uppercase tracking-luxe text-ink-faint tnum">
              {items.length} {items.length === 1 ? "piece" : "pieces"}
            </span>
          )}
        </div>

        {!mounted ? (
          <div className="py-32" aria-hidden />
        ) : items.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 lg:grid-cols-3 lg:gap-y-16">
            {items.map((w) => (
              <ProductCard
                key={w.id}
                watch={w}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 31vw"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 py-28 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-parchment text-gold-dark">
              <Heart className="h-6 w-6" strokeWidth={1.4} />
            </span>
            <h2 className="font-display text-3xl font-light text-ink">Nothing saved yet.</h2>
            <p className="max-w-sm font-serif text-lg leading-relaxed text-ink-muted">
              Tap the heart on any timepiece to keep it here while you decide. Your selections are
              remembered on this device.
            </p>
            <Button variant="primary" size="lg" asChild className="mt-3">
              <Link href="/collections">Explore the Collections</Link>
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
