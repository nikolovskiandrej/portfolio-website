"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Discreet confirmation toast (e.g. "added to your selection"). */
export function FlashToast() {
  const { flash, cartOpen, setCartOpen } = useStore();
  const reduce = useReducedMotion();
  const show = Boolean(flash) && !cartOpen;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, x: "-50%" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed bottom-7 left-1/2 z-[185] flex items-center gap-4 border border-line bg-cream/95 px-6 py-4 shadow-luxe backdrop-blur-md"
          role="status"
          aria-live="polite"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
            <Check className="h-4 w-4" strokeWidth={1.6} />
          </span>
          <p className="font-serif text-sm text-ink">{flash}</p>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="link-underline ml-2 font-sans text-2xs uppercase tracking-luxe text-oxblood"
          >
            View Selection
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
