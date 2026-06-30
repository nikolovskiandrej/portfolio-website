"use client";

import { useEffect } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";

/** Locks page scroll (Lenis + native fallback) while an overlay is open. */
export function useScrollLock(active: boolean) {
  const lenis = useLenis();
  useEffect(() => {
    if (!active) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
    };
  }, [active, lenis]);
}
