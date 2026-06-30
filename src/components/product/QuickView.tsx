"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Heart, X } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { WatchImage } from "@/components/common/WatchImage";
import { Price } from "@/components/common/Price";
import { Rating } from "@/components/common/Rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getWatch } from "@/lib/data/watches";
import { cn } from "@/lib/utils";

export function QuickView() {
  const { quickView, setQuickView, addToCart, isWishlisted, toggleWishlist, setCartOpen } =
    useStore();
  const reduce = useReducedMotion();
  const watch = quickView ? getWatch(quickView) : undefined;
  const [strapId, setStrapId] = useState<string | undefined>(undefined);

  /* reset chosen strap whenever a new piece is opened */
  useEffect(() => {
    if (watch) setStrapId(watch.straps[0]?.id);
  }, [watch]);

  const open = Boolean(watch);

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && setQuickView(null)}>
      <AnimatePresence>
        {open && watch && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="fixed inset-0 z-[190] bg-espresso/70 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              forceMount
              onOpenAutoFocus={(e) => e.preventDefault()}
              aria-describedby={undefined}
            >
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="fixed left-1/2 top-1/2 z-[190] flex w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden bg-cream shadow-luxe sm:flex-row"
              >
                <Dialog.Close
                  aria-label="Close quick view"
                  data-cursor-label="Close"
                  className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center bg-cream/80 text-ink backdrop-blur-sm transition-colors hover:text-oxblood sm:bg-transparent"
                >
                  <X className="h-5 w-5" strokeWidth={1.4} />
                </Dialog.Close>

                {/* image */}
                <div className="relative aspect-[4/5] w-full shrink-0 bg-parchment sm:aspect-auto sm:w-[44%]">
                  <WatchImage
                    src={watch.images[0]}
                    alt={watch.name}
                    sizes="(max-width: 640px) 100vw, 44vw"
                    className="h-full w-full"
                  />
                  <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
                    {watch.isNew && <Badge variant="solid">New</Badge>}
                    {watch.limited && <Badge variant="gold">Limited</Badge>}
                  </div>
                </div>

                {/* body */}
                <div className="flex flex-1 flex-col p-7 sm:p-10">
                  <Dialog.Title asChild>
                    <h2 className="font-display text-3xl font-light leading-tight text-ink">
                      {watch.name}
                    </h2>
                  </Dialog.Title>
                  <p className="label-gold mt-2 text-[9px]">{watch.collectionName}</p>

                  <div className="mt-4">
                    <Rating value={watch.rating} count={watch.reviewCount} size={13} />
                  </div>

                  <p className="mt-5 font-serif text-[15px] leading-relaxed text-ink-muted">
                    {watch.shortDescription}
                  </p>

                  <Price amount={watch.price} className="mt-6 font-serif text-2xl text-ink" />

                  {/* strap swatches */}
                  <div className="mt-7">
                    <p className="font-sans text-2xs uppercase tracking-luxe text-ink-faint">Strap</p>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {watch.straps.map((s) => {
                        const selected = s.id === strapId;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setStrapId(s.id)}
                            aria-pressed={selected}
                            aria-label={s.name}
                            data-cursor-label={s.name}
                            className={cn(
                              "h-8 w-8 rounded-full ring-1 ring-inset ring-black/15 transition-all duration-300",
                              selected
                                ? "ring-2 ring-offset-2 ring-offset-cream ring-ink"
                                : "hover:scale-105",
                            )}
                            style={{
                              background: s.swatch2
                                ? `linear-gradient(135deg, ${s.swatch} 0 50%, ${s.swatch2} 50% 100%)`
                                : s.swatch,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-3 pt-9">
                    <Button
                      type="button"
                      variant="primary"
                      size="lg"
                      disabled={!watch.inStock}
                      onClick={() => {
                        addToCart(watch, strapId);
                        setQuickView(null);
                        setCartOpen(true);
                      }}
                    >
                      {watch.inStock ? "Add to Selection" : "Currently Unavailable"}
                    </Button>
                    <div className="flex items-center justify-between gap-4">
                      <Link
                        href={`/watches/${watch.slug}`}
                        onClick={() => setQuickView(null)}
                        data-cursor-label="View"
                        className="group inline-flex items-center gap-2.5 font-sans text-2xs uppercase tracking-luxe text-ink-soft transition-colors hover:text-oxblood"
                      >
                        Full Details
                        <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(watch.slug)}
                        aria-pressed={isWishlisted(watch.slug)}
                        data-cursor-label={isWishlisted(watch.slug) ? "Saved" : "Save"}
                        className="inline-flex items-center gap-2 font-sans text-2xs uppercase tracking-luxe text-ink-soft transition-colors hover:text-oxblood"
                      >
                        {isWishlisted(watch.slug) ? (
                          <>
                            <Check className="h-4 w-4" strokeWidth={1.6} /> Saved
                          </>
                        ) : (
                          <>
                            <Heart className="h-4 w-4" strokeWidth={1.6} /> Save
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
