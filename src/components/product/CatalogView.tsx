"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/common/Container";
import type { Gender, StrapType, Watch } from "@/lib/types";
import { collections } from "@/lib/data/collections";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "New Arrivals" },
  { value: "price-asc", label: "Price · Low to High" },
  { value: "price-desc", label: "Price · High to Low" },
];

const GENDER_LABEL: Record<Gender, string> = { men: "Men", women: "Women", unisex: "Unisex" };
const STRAP_LABEL: Record<StrapType, string> = { leather: "Leather", metal: "Metal" };

interface CatalogViewProps {
  watches: Watch[];
  showGenderFilter?: boolean;
  showStrapFilter?: boolean;
  showCollectionFilter?: boolean;
}

export function CatalogView({
  watches,
  showGenderFilter,
  showStrapFilter,
  showCollectionFilter,
}: CatalogViewProps) {
  const reduce = useReducedMotion();
  const [sort, setSort] = useState<SortKey>("featured");
  const [genders, setGenders] = useState<Set<Gender>>(new Set());
  const [straps, setStraps] = useState<Set<StrapType>>(new Set());
  const [colls, setColls] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);

  /* facet values actually present in this set */
  const facets = useMemo(() => {
    const g = new Set<Gender>();
    const s = new Set<StrapType>();
    const c = new Set<string>();
    for (const w of watches) {
      g.add(w.gender);
      s.add(w.strapType);
      c.add(w.collection);
    }
    return {
      genders: (["men", "women", "unisex"] as Gender[]).filter((x) => g.has(x)),
      straps: (["leather", "metal"] as StrapType[]).filter((x) => s.has(x)),
      collections: collections.filter((col) => c.has(col.slug)),
    };
  }, [watches]);

  const filtered = useMemo(() => {
    const list = watches.filter(
      (w) =>
        (genders.size === 0 || genders.has(w.gender)) &&
        (straps.size === 0 || straps.has(w.strapType)) &&
        (colls.size === 0 || colls.has(w.collection)),
    );
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
        break;
      default:
        sorted.sort(
          (a, b) =>
            Number(b.featured ?? false) - Number(a.featured ?? false) || b.rating - a.rating,
        );
    }
    return sorted;
  }, [watches, genders, straps, colls, sort]);

  const activeCount = genders.size + straps.size + colls.size;

  const toggle = <T,>(set: Set<T>, update: (s: Set<T>) => void, value: T) => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    update(next);
  };

  const reset = () => {
    setGenders(new Set());
    setStraps(new Set());
    setColls(new Set());
  };

  const hasFacets =
    (showGenderFilter && facets.genders.length > 1) ||
    (showStrapFilter && facets.straps.length > 1) ||
    (showCollectionFilter && facets.collections.length > 1);

  const signature = `${sort}-${[...genders].join()}-${[...straps].join()}-${[...colls].join()}`;

  return (
    <section className="bg-ivory py-12 sm:py-16">
      <Container size="wide">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <div className="flex items-center gap-5">
            <span className="font-sans text-2xs uppercase tracking-luxe text-ink-muted tnum">
              {filtered.length} {filtered.length === 1 ? "Timepiece" : "Timepieces"}
            </span>
            {hasFacets && (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="inline-flex items-center gap-2.5 font-sans text-2xs uppercase tracking-luxe text-ink-soft transition-colors hover:text-oxblood"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
                Refine
                {activeCount > 0 && (
                  <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-oxblood px-1 text-[9px] text-cream tnum">
                    {activeCount}
                  </span>
                )}
              </button>
            )}
          </div>

          <label className="flex items-center gap-3">
            <span className="font-sans text-2xs uppercase tracking-luxe text-ink-faint">Sort</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort timepieces"
                className="cursor-pointer appearance-none border-b border-ink/30 bg-transparent py-1.5 pr-7 font-sans text-2xs uppercase tracking-luxe text-ink transition-colors hover:border-ink focus:border-ink focus:outline-none"
              >
                {SORTS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-ink-faint">
                ▾
              </span>
            </div>
          </label>
        </div>

        {/* Filter panel */}
        <AnimatePresence initial={false}>
          {hasFacets && open && (
            <motion.div
              initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-6 py-8">
                {showCollectionFilter && facets.collections.length > 1 && (
                  <FacetGroup label="Collection">
                    {facets.collections.map((c) => (
                      <Chip
                        key={c.slug}
                        active={colls.has(c.slug)}
                        onClick={() => toggle(colls, setColls, c.slug)}
                      >
                        {c.name}
                      </Chip>
                    ))}
                  </FacetGroup>
                )}
                {showGenderFilter && facets.genders.length > 1 && (
                  <FacetGroup label="For">
                    {facets.genders.map((g) => (
                      <Chip key={g} active={genders.has(g)} onClick={() => toggle(genders, setGenders, g)}>
                        {GENDER_LABEL[g]}
                      </Chip>
                    ))}
                  </FacetGroup>
                )}
                {showStrapFilter && facets.straps.length > 1 && (
                  <FacetGroup label="Strap">
                    {facets.straps.map((s) => (
                      <Chip key={s} active={straps.has(s)} onClick={() => toggle(straps, setStraps, s)}>
                        {STRAP_LABEL[s]}
                      </Chip>
                    ))}
                  </FacetGroup>
                )}
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex w-fit items-center gap-2 font-sans text-2xs uppercase tracking-luxe text-oxblood transition-opacity hover:opacity-70"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={1.6} /> Clear all
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {filtered.length > 0 ? (
          <motion.div
            key={signature}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 lg:grid-cols-3 lg:gap-y-16"
          >
            {filtered.map((w, i) => (
              <ProductCard
                key={w.id}
                watch={w}
                priority={i < 3}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 31vw"
              />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-28 text-center">
            <p className="font-display text-3xl font-light text-ink">Nothing matches just yet.</p>
            <p className="max-w-sm font-serif text-ink-muted">
              Adjust your refinements to reveal more of the collection.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-2 font-sans text-2xs uppercase tracking-luxe text-oxblood transition-opacity hover:opacity-70"
            >
              Clear all filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

/* ── bits ─────────────────────────────────────────────────── */

function FacetGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
      <span className="w-24 shrink-0 font-sans text-2xs uppercase tracking-luxe text-ink-faint">
        {label}
      </span>
      <div className="flex flex-wrap gap-2.5">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-4 py-2 font-sans text-2xs uppercase tracking-luxe transition-colors duration-300",
        active
          ? "border-ink bg-ink text-cream"
          : "border-line text-ink-soft hover:border-ink/50",
      )}
    >
      {children}
    </button>
  );
}
