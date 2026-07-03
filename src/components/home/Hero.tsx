"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/motion";
import { WatchImage } from "@/components/common/WatchImage";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 90]);
  const contentY = useTransform(scrollY, [0, 600], [0, 120]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [1, 0.55]);

  return (
    <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-espresso">
      {/* Background */}
      <motion.div className="absolute -inset-y-[8%] inset-x-0" style={reduce ? undefined : { y }}>
        <motion.div
          className="h-full w-full"
          initial={reduce ? { scale: 1 } : { scale: 1.16 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 2.2, ease: EASE }}
        >
          <WatchImage
            src="/images/hero/main.jpg"
            alt="A Barro mechanical timepiece, hand-finished in Milano"
            priority
            treatment="deep"
            sizes="100vw"
            className="h-full w-full"
          />
        </motion.div>
      </motion.div>

      {/* Tonal overlays for legibility */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/25 to-espresso/85"
        style={reduce ? undefined : { opacity: overlayOpacity }}
      />
      <div className="grain pointer-events-none absolute inset-0 grain-light" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full items-center"
        style={reduce ? undefined : { y: contentY }}
      >
        <Container size="wide" className="w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <span className="h-px w-12 bg-gold" />
              <span className="font-sans text-2xs uppercase tracking-luxe text-gold-pale">
                Alta Orologeria Italiana · Milano 1947
              </span>
            </motion.div>

            <h1 className="mt-7 font-display text-display-lg font-light leading-[0.95] text-cream">
              <TextReveal text="Crafted for Those" delay={0.35} className="block" onMount />
              <TextReveal
                text="Who Value Time."
                delay={0.6}
                className="block italic text-gold-pale"
                onMount
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 1 }}
              className="mt-8 max-w-xl text-pretty font-serif text-lg leading-relaxed text-cream/80"
            >
              Seventy-eight years of unbroken craft, distilled into mechanical timepieces
              finished entirely by hand. Each Barro is conceived to outlast the moment —
              and the generation that wears it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 1.2 }}
              className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button variant="onDarkGold" size="lg" asChild>
                <Link href="/collections">Explore the Collections</Link>
              </Button>
              <Button variant="onDark" size="lg" asChild>
                <Link href="/about">Discover the Maison</Link>
              </Button>
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="font-sans text-[9px] uppercase tracking-luxe text-cream/60">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-cream/20">
          <span className="absolute inset-x-0 top-0 h-1/2 w-px animate-scroll-indicator bg-gold" />
        </span>
      </motion.div>
    </section>
  );
}
