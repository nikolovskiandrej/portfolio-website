"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { WatchImage } from "@/components/common/WatchImage";
import { Badge } from "@/components/ui/badge";
import type { Watch } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductGallery({ watch }: { watch: Watch }) {
  const reduce = useReducedMotion();
  const images = watch.images;
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [lightbox, setLightbox] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  const step = useCallback(
    (dir: number) => setActive((a) => (a + dir + images.length) % images.length),
    [images.length],
  );

  const zoomable = !reduce;

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-5">
      {/* Thumbnail rail */}
      <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar lg:w-[84px] lg:flex-col lg:overflow-visible lg:pb-0">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1} of ${images.length}`}
            aria-current={i === active}
            data-cursor-label="View"
            className={cn(
              "relative aspect-[4/5] w-16 shrink-0 overflow-hidden bg-parchment transition-all duration-500 ease-luxe lg:w-full",
              i === active
                ? "opacity-100 shadow-[inset_0_0_0_1.5px_rgba(30,26,22,0.85)]"
                : "opacity-55 hover:opacity-90",
            )}
          >
            <WatchImage src={src} alt="" sizes="84px" className="h-full w-full" />
          </button>
        ))}
      </div>

      {/* Main stage */}
      <div className="relative flex-1">
        <div
          className={cn(
            "relative aspect-[4/5] overflow-hidden bg-parchment shadow-soft",
            zoomable && "cursor-zoom-in",
          )}
          onMouseEnter={() => zoomable && setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={zoomable ? onMove : undefined}
          onClick={() => setLightbox(true)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 transition-transform duration-500 ease-out"
                style={
                  zoom
                    ? { transform: "scale(2.1)", transformOrigin: `${origin.x}% ${origin.y}%` }
                    : undefined
                }
              >
                <WatchImage
                  src={images[active]}
                  alt={`${watch.name} — ${watch.collectionName}`}
                  priority
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* badges */}
          <div className="pointer-events-none absolute left-5 top-5 z-10 flex flex-col items-start gap-2">
            {watch.isNew && <Badge variant="solid">New</Badge>}
            {watch.limited && <Badge variant="gold">Edizione Limitata</Badge>}
          </div>

          {/* expand */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(true);
            }}
            aria-label="Open full-screen gallery"
            data-cursor-label="Expand"
            className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center bg-cream/85 text-ink backdrop-blur-sm transition-colors duration-300 hover:bg-ink hover:text-cream"
          >
            <Expand className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* counter */}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-sans text-2xs uppercase tracking-luxe text-ink-faint">
            {watch.reference}
          </span>
          <span className="font-sans text-2xs tracking-luxe text-ink-faint tnum">
            {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <Lightbox
        open={lightbox}
        onOpenChange={setLightbox}
        watch={watch}
        active={active}
        setActive={setActive}
        step={step}
      />
    </div>
  );
}

/* ── Full-screen lightbox ─────────────────────────────────── */

function Lightbox({
  open,
  onOpenChange,
  watch,
  active,
  setActive,
  step,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  watch: Watch;
  active: number;
  setActive: (i: number) => void;
  step: (dir: number) => void;
}) {
  const images = watch.images;
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[200] bg-espresso/96 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className="fixed inset-0 z-[200] flex flex-col focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
        >
          <VisuallyHidden>
            <Dialog.Title>{watch.name} — image gallery</Dialog.Title>
          </VisuallyHidden>

          <div className="flex items-center justify-between px-6 py-6 sm:px-10">
            <span className="font-display text-xl font-light text-cream">{watch.name}</span>
            <Dialog.Close
              aria-label="Close gallery"
              data-cursor-label="Close"
              className="inline-flex h-11 w-11 items-center justify-center text-cream/80 transition-colors hover:text-gold"
            >
              <X className="h-5 w-5" strokeWidth={1.4} />
            </Dialog.Close>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 sm:px-16">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute left-3 z-10 inline-flex h-12 w-12 items-center justify-center text-cream/70 transition-colors hover:text-gold sm:left-8"
            >
              <ChevronLeft className="h-7 w-7" strokeWidth={1.2} />
            </button>

            <div className="relative aspect-[4/5] h-full max-h-[72vh] w-auto max-w-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <WatchImage
                    src={images[active]}
                    alt={`${watch.name} — view ${active + 1}`}
                    sizes="80vw"
                    treatment="none"
                    className="h-full w-full"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute right-3 z-10 inline-flex h-12 w-12 items-center justify-center text-cream/70 transition-colors hover:text-gold sm:right-8"
            >
              <ChevronRight className="h-7 w-7" strokeWidth={1.2} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 px-6 py-7">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "relative aspect-[4/5] w-12 overflow-hidden transition-opacity duration-300 sm:w-14",
                  i === active ? "opacity-100 ring-1 ring-gold" : "opacity-45 hover:opacity-80",
                )}
              >
                <WatchImage src={src} alt="" sizes="56px" className="h-full w-full" />
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
