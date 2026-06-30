"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { useScrollLock } from "@/lib/useScrollLock";
import { watches } from "@/lib/data/watches";
import { collections } from "@/lib/data/collections";
import { WatchImage } from "@/components/common/WatchImage";
import { Price } from "@/components/common/Price";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const POPULAR = ["Tourbillon", "Eredità 1947", "Diver", "Rose Gold", "Skeleton"];

export function SearchModal() {
  const { searchOpen, setSearchOpen } = useStore();
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useScrollLock(searchOpen);

  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return watches
      .filter((w) =>
        [w.name, w.collectionName, w.reference, w.shortDescription, w.gender]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 6);
  }, [query]);

  const hasQuery = query.trim().length >= 2;

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[180]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
            className="absolute inset-0 cursor-default bg-espresso/55 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search timepieces"
            initial={reduce ? { opacity: 0 } : { y: "-100%" }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: "-100%" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative max-h-[88vh] overflow-y-auto bg-ivory pb-14 shadow-luxe"
            data-lenis-prevent
          >
            <Container size="wide" className="pt-28">
              <div className="flex items-center justify-between">
                <span className="label-gold">Search the Maison</span>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  data-cursor-label="Close"
                  className="inline-flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-oxblood"
                >
                  <X className="h-5 w-5" strokeWidth={1.4} />
                </button>
              </div>

              {/* Input */}
              <div className="mt-6 flex items-center gap-5 border-b border-ink/20 pb-6">
                <Search className="h-7 w-7 shrink-0 text-ink-faint" strokeWidth={1.2} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, reference or collection…"
                  className="w-full bg-transparent font-display text-3xl font-light text-ink placeholder:text-ink-faint/70 focus:outline-none sm:text-5xl"
                  aria-label="Search query"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="shrink-0 font-sans text-2xs uppercase tracking-luxe text-ink-faint hover:text-oxblood"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Results */}
              {hasQuery ? (
                <div className="mt-10">
                  <p className="label mb-6">
                    {results.length
                      ? `${results.length} ${results.length === 1 ? "result" : "results"}`
                      : "No timepieces match — try another term"}
                  </p>
                  <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {results.map((w) => (
                      <Link
                        key={w.id}
                        href={`/watches/${w.slug}`}
                        onClick={() => setSearchOpen(false)}
                        data-cursor-label="View"
                        className="group flex items-center gap-5 border-b border-line/70 py-4 transition-colors hover:border-ink/30"
                      >
                        <WatchImage
                          src={w.images[0]}
                          alt={w.name}
                          width={72}
                          height={88}
                          fill={false}
                          treatment="heritage"
                          sizes="72px"
                          className="h-[88px] w-[72px] shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="label-gold text-[9px]">{w.collectionName}</p>
                          <p className="mt-1 truncate font-display text-2xl font-light text-ink group-hover:text-oxblood">
                            {w.name}
                          </p>
                          <p className="mt-0.5 font-serif text-sm text-ink-faint">
                            <Price amount={w.price} />
                          </p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 shrink-0 -translate-x-1 text-ink-faint opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-oxblood group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-12 grid gap-12 md:grid-cols-[1fr_1.2fr]">
                  <div>
                    <p className="label mb-6">Popular Searches</p>
                    <div className="flex flex-wrap gap-3">
                      {POPULAR.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setQuery(term)}
                          className="border border-ink/20 px-4 py-2 font-sans text-2xs uppercase tracking-luxe text-ink-soft transition-colors hover:border-ink hover:bg-ink hover:text-cream"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="label mb-6">Collections</p>
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                      {collections.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/collections/${c.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="link-underline font-display text-xl font-light text-ink hover:text-oxblood"
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </Container>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
