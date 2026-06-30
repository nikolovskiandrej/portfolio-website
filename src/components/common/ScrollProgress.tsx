"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      className="fixed left-0 top-0 z-[200] h-[2px] w-full origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
