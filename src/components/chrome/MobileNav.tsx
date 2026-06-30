"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Search, User, X } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { useScrollLock } from "@/lib/useScrollLock";
import { mobileNav, socials } from "@/lib/data/navigation";
import { CURRENCIES, type CurrencyCode } from "@/lib/utils";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

export function MobileNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { menuOpen, setMenuOpen, setSearchOpen, currency, setCurrency } = useStore();

  useScrollLock(menuOpen);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMenuOpen]);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={reduce ? { opacity: 0 } : { x: "-100%" }}
          animate={{ x: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { x: "-100%" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grain fixed inset-0 z-[180] flex flex-col overflow-y-auto bg-espresso text-cream lg:hidden"
          data-lenis-prevent
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-6">
            <Logo tone="cream" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-cream transition-colors hover:text-gold-pale"
            >
              <X className="h-6 w-6" strokeWidth={1.3} />
            </button>
          </div>

          {/* Primary links */}
          <motion.nav
            aria-label="Mobile"
            variants={reduce ? undefined : listVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-1 flex-col justify-center px-6 py-4"
          >
            <ul className="flex flex-col">
              {mobileNav.map((item, i) => (
                <motion.li
                  key={item.href}
                  variants={reduce ? undefined : itemVariants}
                  className="border-b border-cream/10"
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-3.5"
                  >
                    <span className="font-sans text-[10px] tracking-luxe text-gold/70 tnum">
                      0{i + 1}
                    </span>
                    <span className="font-display text-4xl font-light leading-none text-cream transition-colors duration-300 group-hover:text-gold-pale sm:text-5xl">
                      {item.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* Footer actions */}
          <div className="border-t border-cream/10 px-6 py-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="inline-flex items-center gap-2.5 font-sans text-2xs uppercase tracking-luxe text-cream/85 hover:text-gold-pale"
                >
                  <Search className="h-4 w-4" strokeWidth={1.4} /> Search
                </button>
                <Link
                  href="/account"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2.5 font-sans text-2xs uppercase tracking-luxe text-cream/85 hover:text-gold-pale"
                >
                  <User className="h-4 w-4" strokeWidth={1.4} /> Account
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2.5 font-sans text-2xs uppercase tracking-luxe text-cream/85 hover:text-gold-pale"
                >
                  <Heart className="h-4 w-4" strokeWidth={1.4} /> Wishlist
                </Link>
              </div>
            </div>

            {/* Currency + socials */}
            <div className="mt-7 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrency(code)}
                    className={cn(
                      "font-sans text-2xs uppercase tracking-wide transition-colors tnum",
                      currency === code ? "text-gold" : "text-cream/45 hover:text-cream",
                    )}
                  >
                    {code}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                {socials.slice(0, 3).map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-2xs uppercase tracking-luxe text-cream/55 hover:text-gold-pale"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
