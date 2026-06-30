"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Heart, Minus, Plus, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { Button } from "@/components/ui/button";
import type { Watch } from "@/lib/types";
import { cn } from "@/lib/utils";

const REASSURANCE = [
  { icon: Truck, label: "Complimentary insured delivery" },
  { icon: RefreshCw, label: "14-day return assurance" },
  { icon: ShieldCheck, label: "Five-year Maison warranty" },
];

export function ProductPurchase({ watch }: { watch: Watch }) {
  const { addToCart, isWishlisted, toggleWishlist, setCartOpen } = useStore();
  const reduce = useReducedMotion();
  const [strapId, setStrapId] = useState(watch.straps[0]?.id);
  const [dial, setDial] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const wished = isWishlisted(watch.slug);

  const handleAdd = () => {
    if (!watch.inStock) return;
    addToCart(watch, strapId, qty);
    setCartOpen(true);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-9">
      {/* Strap */}
      <Selector
        label="Strap & Bracelet"
        value={watch.straps.find((s) => s.id === strapId)?.name}
      >
        <div className="flex flex-wrap gap-2.5">
          {watch.straps.map((s) => {
            const selected = s.id === strapId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStrapId(s.id)}
                aria-pressed={selected}
                data-cursor-label={s.name}
                className={cn(
                  "group flex items-center gap-3 border px-4 py-3 transition-colors duration-300",
                  selected
                    ? "border-ink bg-ink/[0.03]"
                    : "border-line hover:border-ink/45",
                )}
              >
                <span
                  className="h-5 w-5 rounded-full ring-1 ring-inset ring-black/15"
                  style={{
                    background: s.swatch2
                      ? `linear-gradient(135deg, ${s.swatch} 0 50%, ${s.swatch2} 50% 100%)`
                      : s.swatch,
                  }}
                />
                <span className="font-sans text-[10px] uppercase tracking-luxe text-ink-soft">
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>
      </Selector>

      {/* Dial */}
      {watch.dialColors && watch.dialColors.length > 0 && (
        <Selector label="Dial" value={watch.dialColors[dial]?.name}>
          <div className="flex flex-wrap items-center gap-3">
            {watch.dialColors.map((d, i) => {
              const selected = i === dial;
              return (
                <button
                  key={d.name}
                  type="button"
                  onClick={() => setDial(i)}
                  aria-pressed={selected}
                  aria-label={`${d.name} dial`}
                  data-cursor-label={d.name}
                  className={cn(
                    "relative h-9 w-9 rounded-full ring-1 ring-inset ring-black/15 transition-transform duration-300",
                    selected
                      ? "ring-2 ring-offset-2 ring-offset-ivory ring-ink"
                      : "hover:scale-105",
                  )}
                  style={{ background: d.hex }}
                />
              );
            })}
          </div>
        </Selector>
      )}

      {/* Quantity + Add */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
        <div className="flex items-center border border-line">
          <StepBtn
            label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
          >
            <Minus className="h-4 w-4" strokeWidth={1.5} />
          </StepBtn>
          <span className="w-12 text-center font-sans text-sm tnum text-ink" aria-live="polite">
            {qty}
          </span>
          <StepBtn
            label="Increase quantity"
            onClick={() => setQty((q) => Math.min(5, q + 1))}
            disabled={qty >= 5}
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
          </StepBtn>
        </div>

        <motion.div className="flex-1" whileTap={reduce || !watch.inStock ? undefined : { scale: 0.99 }}>
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleAdd}
            disabled={!watch.inStock}
            className="w-full"
          >
            {!watch.inStock ? (
              "Currently Unavailable"
            ) : added ? (
              <>
                <Check className="h-4 w-4" strokeWidth={2} /> Added to Selection
              </>
            ) : (
              "Add to Selection"
            )}
          </Button>
        </motion.div>
      </div>

      {/* Wishlist + appointment */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => toggleWishlist(watch.slug)}
          aria-pressed={wished}
          className="flex-1"
        >
          <Heart
            className={cn("h-4 w-4 transition-colors", wished && "fill-oxblood text-oxblood")}
            strokeWidth={1.6}
          />
          {wished ? "Saved" : "Add to Wishlist"}
        </Button>
        <Button variant="ghost" size="lg" asChild className="flex-1 border border-transparent hover:border-line">
          <a href="/contact">Book an Appointment</a>
        </Button>
      </div>

      {/* Reassurance */}
      <ul className="mt-1 flex flex-col gap-3.5 border-t border-line pt-7">
        {REASSURANCE.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3.5">
            <Icon className="h-[18px] w-[18px] shrink-0 text-gold-dark" strokeWidth={1.4} />
            <span className="font-serif text-sm text-ink-muted">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── bits ─────────────────────────────────────────────────── */

function Selector({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-sans text-2xs uppercase tracking-luxe text-ink-muted">{label}</span>
        {value && <span className="font-serif text-sm italic text-ink-soft">{value}</span>}
      </div>
      {children}
    </div>
  );
}

function StepBtn({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-12 w-12 items-center justify-center text-ink transition-colors duration-300 hover:text-oxblood disabled:opacity-30"
    >
      {children}
    </button>
  );
}
