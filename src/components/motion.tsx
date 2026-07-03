"use client";

import { createElement, useRef, useState, type ElementType, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type Dir = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  dir?: Dir;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number;
}

/** Scroll-triggered fade/slide reveal. */
export function Reveal({
  children,
  className,
  dir = "up",
  delay = 0,
  duration = 0.9,
  distance = 42,
  once = true,
  amount = 0.3,
}: RevealProps) {
  const reduce = useReducedMotion();
  const offset: Record<Dir, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };
  /* Always render a motion element (consistent element type across SSR/clients)
     so Framer actively writes the resting style on mount. Under reduced motion
     it starts already-visible, which also clears any hidden state baked into the
     prerendered HTML. */
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset[dir] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={reduce ? { duration: 0 } : { duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its <StaggerItem> children into view. */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        show: {
          transition: reduce
            ? { staggerChildren: 0, delayChildren: 0 }
            : { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

const staggerItemReduced: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? staggerItemReduced : staggerItemVariants}>
      {children}
    </motion.div>
  );
}

/** Vertical parallax driven by the element's progress through the viewport. */
export function Parallax({
  children,
  className,
  speed = 0.18,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range = speed * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`${-range}%`, `${range}%`]);
  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/** Slow-zoom image inside an overflow-hidden parent, scaling as it scrolls through view. */
export function ParallaxZoom({
  children,
  className,
  from = 1.18,
  to = 1,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.6], [from, to]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div className="h-full w-full" style={reduce ? undefined : { scale, y }}>
        {children}
      </motion.div>
    </div>
  );
}

/** Word-by-word mask reveal for headlines. Keeps an accessible label.
 *  Set `onMount` for above-the-fold headlines (e.g. the hero): they animate on
 *  mount instead of on scroll-into-view. `whileInView` relies on an
 *  IntersectionObserver that can fail to fire for already-visible content
 *  (notably React Strict Mode's dev double-mount with `once`), which would
 *  leave the words parked at y:115% — clipped by the overflow-hidden mask and
 *  invisible. */
export function TextReveal({
  text,
  className,
  as = "span",
  delay = 0,
  stagger = 0.055,
  once = true,
  onMount = false,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  once?: boolean;
  onMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return createElement(
    as,
    { className, "aria-label": text },
    words.map((word, i) => (
      <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom">
        <motion.span
          className="inline-block"
          initial={reduce ? { y: 0 } : { y: "115%" }}
          {...(onMount ? { animate: { y: 0 } } : { whileInView: { y: 0 }, viewport: { once } })}
          transition={
            reduce ? { duration: 0 } : { duration: 0.95, ease: EASE, delay: delay + i * stagger }
          }
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      </span>
    )),
  );
}

/** Magnetic hover wrapper for buttons & icons. */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({
          x: (e.clientX - (r.left + r.width / 2)) * strength,
          y: (e.clientY - (r.top + r.height / 2)) * strength,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 160, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

/** Infinite horizontal marquee. */
export function Marquee({
  children,
  className,
  duration = 38,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className={cn("group relative flex w-full overflow-hidden mask-fade-x", className)}>
      <div
        className="flex min-w-full shrink-0 items-center"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
