"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { useScrollLock } from "@/lib/useScrollLock";
import { WatchImage } from "@/components/common/WatchImage";
import { Price } from "@/components/common/Price";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    cartCount,
    cartTotal,
    lineKey,
    updateQuantity,
    removeFromCart,
  } = useStore();
  const reduce = useReducedMotion();

  useScrollLock(cartOpen);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCartOpen]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          className="fixed inset-0 z-[180]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 cursor-default bg-espresso/55 backdrop-blur-md"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your selection"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-ivory shadow-luxe"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-7 py-6">
              <div className="flex items-baseline gap-3">
                <h2 className="font-display text-2xl font-light text-ink">Your Selection</h2>
                <span className="font-sans text-2xs tracking-luxe text-ink-faint tnum">
                  {cartCount} {cartCount === 1 ? "piece" : "pieces"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                data-cursor-label="Close"
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-oxblood"
              >
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>

            {/* Body */}
            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-10 text-center">
                <ShoppingBag className="h-10 w-10 text-ink-faint" strokeWidth={1} />
                <div>
                  <p className="font-display text-2xl font-light text-ink">
                    Your selection is empty
                  </p>
                  <p className="mt-2 font-serif text-ink-muted">
                    Discover timepieces worthy of a lifetime.
                  </p>
                </div>
                <Button variant="primary" onClick={() => setCartOpen(false)} asChild>
                  <Link href="/collections">Explore Collections</Link>
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-7" data-lenis-prevent>
                  {cart.map((line) => {
                    const key = lineKey(line.watchId, line.strapId);
                    return (
                      <li key={key} className="flex gap-5 py-6">
                        <Link
                          href={`/watches/${line.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="shrink-0"
                        >
                          <WatchImage
                            src={line.image}
                            alt={line.name}
                            width={88}
                            height={108}
                            fill={false}
                            sizes="88px"
                            className="h-[108px] w-[88px]"
                          />
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="label-gold text-[9px]">{line.collectionName}</p>
                              <Link
                                href={`/watches/${line.slug}`}
                                onClick={() => setCartOpen(false)}
                                className="mt-1 block truncate font-display text-xl font-light text-ink hover:text-oxblood"
                              >
                                {line.name}
                              </Link>
                              <p className="mt-0.5 font-serif text-sm text-ink-faint">
                                {line.strapName}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(key)}
                              aria-label={`Remove ${line.name}`}
                              className="shrink-0 font-sans text-2xs uppercase tracking-luxe text-ink-faint transition-colors hover:text-oxblood"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="mt-auto flex items-end justify-between pt-3">
                            <Stepper
                              value={line.quantity}
                              onDec={() => updateQuantity(key, line.quantity - 1)}
                              onInc={() => updateQuantity(key, line.quantity + 1)}
                            />
                            <Price
                              amount={line.price * line.quantity}
                              className="font-serif text-lg text-ink"
                            />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Footer */}
                <div className="border-t border-line bg-cream px-7 py-6">
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-2xs uppercase tracking-luxe text-ink-muted">
                      Subtotal
                    </span>
                    <Price amount={cartTotal} className="font-display text-3xl font-light text-ink" />
                  </div>
                  <p className="mt-2 font-serif text-sm text-ink-faint">
                    Complimentary insured delivery & 5-year international warranty.
                  </p>
                  <div className="mt-5 flex flex-col gap-3">
                    <Button variant="primary" size="lg" className="w-full" asChild>
                      <Link href="/checkout" onClick={() => setCartOpen(false)}>
                        Proceed to Checkout
                      </Link>
                    </Button>
                    <button
                      type="button"
                      onClick={() => setCartOpen(false)}
                      className="link-underline mx-auto font-sans text-2xs uppercase tracking-luxe text-ink-soft"
                    >
                      Continue Browsing
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stepper({
  value,
  onDec,
  onInc,
}: {
  value: number;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <div className="inline-flex items-center border border-ink/20">
      <button
        type="button"
        onClick={onDec}
        aria-label="Decrease quantity"
        className="inline-flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-ink hover:text-cream"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
      <span className="w-9 text-center font-sans text-xs tabular-nums text-ink tnum">{value}</span>
      <button
        type="button"
        onClick={onInc}
        aria-label="Increase quantity"
        className="inline-flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-ink hover:text-cream"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
