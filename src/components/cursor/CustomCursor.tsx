"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Additive cursor: a lagging gold ring + a precise dot.
 * The native cursor is intentionally NOT hidden (accessibility); this layers on top.
 * Disabled on touch / coarse pointers and for reduced-motion users.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea, select, label",
      );
      setHovering(!!el);
      setLabel(el?.getAttribute("data-cursor-label") ?? "");
    };
    const downH = () => setDown(true);
    const upH = () => setDown(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", downH);
    window.addEventListener("mouseup", upH);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", downH);
      window.removeEventListener("mouseup", upH);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block" aria-hidden>
      {/* ring */}
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-gold/70"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 64 : 34,
          height: hovering ? 64 : 34,
          opacity: 1,
          backgroundColor: hovering ? "rgba(169,137,63,0.08)" : "rgba(169,137,63,0)",
          scale: down ? 0.82 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.4 }}
      >
        <AnimatePresence>
          {hovering && label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="select-none font-sans text-[9px] uppercase tracking-luxe text-gold-dark"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      {/* dot */}
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hovering ? 0 : 1 }}
      />
    </div>
  );
}
