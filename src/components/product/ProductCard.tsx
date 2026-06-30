"use client";

import Link from "next/link";
import { Eye, Heart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useStore } from "@/components/providers/StoreProvider";
import { WatchImage } from "@/components/common/WatchImage";
import { Rating } from "@/components/common/Rating";
import { Price } from "@/components/common/Price";
import { Badge } from "@/components/ui/badge";
import type { Watch } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  watch: Watch;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function ProductCard({
  watch,
  priority,
  sizes = "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw",
  className,
}: ProductCardProps) {
  const { isWishlisted, toggleWishlist, setQuickView } = useStore();
  const reduce = useReducedMotion();
  const wished = isWishlisted(watch.slug);
  const hoverImage = watch.images[1] ?? watch.images[0];

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-parchment">
        {/* primary + hover image crossfade */}
        <WatchImage
          src={watch.images[0]}
          alt={watch.name}
          priority={priority}
          sizes={sizes}
          className="absolute inset-0 h-full w-full"
          imgClassName="transition-[transform,opacity] duration-1200 ease-luxe group-hover:scale-[1.04] group-hover:opacity-0"
        />
        <WatchImage
          src={hoverImage}
          alt=""
          sizes={sizes}
          treatment="deep"
          className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1200 ease-luxe group-hover:opacity-100"
          imgClassName="scale-[1.04]"
        />

        {/* badges */}
        <div className="absolute left-4 top-4 z-20 flex flex-col items-start gap-2">
          {watch.isNew && <Badge variant="solid">New</Badge>}
          {watch.limited && <Badge variant="gold">Limited</Badge>}
          {!watch.inStock && <Badge variant="muted" className="bg-cream/90 px-2.5 py-1.5">Sold Out</Badge>}
        </div>

        {/* wishlist */}
        <button
          type="button"
          onClick={() => toggleWishlist(watch.slug)}
          aria-label={wished ? `Remove ${watch.name} from wishlist` : `Add ${watch.name} to wishlist`}
          aria-pressed={wished}
          data-cursor-label={wished ? "Saved" : "Save"}
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center text-ink/80 transition-colors duration-300 hover:text-oxblood"
        >
          <Heart
            className={cn("h-[18px] w-[18px] transition-all", wished && "fill-oxblood text-oxblood")}
            strokeWidth={1.5}
          />
        </button>

        {/* quick view */}
        <div className="absolute inset-x-3 bottom-3 z-20 translate-y-3 opacity-0 transition-all duration-500 ease-luxe group-hover:translate-y-0 group-hover:opacity-100">
          <motion.button
            type="button"
            onClick={() => setQuickView(watch.slug)}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            data-cursor-label="Quick View"
            className="flex w-full items-center justify-center gap-2.5 bg-ink/92 py-3.5 font-sans text-[10px] uppercase tracking-luxe text-cream backdrop-blur-sm transition-colors hover:bg-oxblood"
          >
            <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
            Quick View
          </motion.button>
        </div>
      </div>

      {/* info */}
      <div className="flex flex-1 flex-col items-start pt-5">
        <span className="label-gold text-[9px]">{watch.collectionName}</span>
        <h3 className="mt-2 font-display text-2xl font-light leading-tight text-ink transition-colors duration-300 group-hover:text-oxblood">
          {watch.name}
        </h3>
        <p className="mt-1.5 font-serif text-sm text-ink-faint">{watch.shortDescription}</p>
        <div className="mt-3 flex w-full items-center justify-between gap-4">
          <Price amount={watch.price} className="font-serif text-lg text-ink" />
          <Rating value={watch.rating} showValue={false} size={12} />
        </div>
      </div>

      {/* stretched navigational link (kept beneath the interactive buttons) */}
      <Link
        href={`/watches/${watch.slug}`}
        aria-label={`View ${watch.name}`}
        data-cursor-label="View"
        className="absolute inset-0 z-10"
      />
    </article>
  );
}
