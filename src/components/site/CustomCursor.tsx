"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useHydrationSafeReducedMotion } from "@/lib/motion";

/**
 * Dot + thin ring cursor with a soft brand glow trail.
 * Desktop / fine pointer only — native cursor kept on touch.
 */
export function CustomCursor() {
  const reduce = useHydrationSafeReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const dotX = useSpring(rawX, { stiffness: 900, damping: 40, mass: 0.2 });
  const dotY = useSpring(rawY, { stiffness: 900, damping: 40, mass: 0.2 });
  const ringX = useSpring(rawX, { stiffness: 280, damping: 28, mass: 0.45 });
  const ringY = useSpring(rawY, { stiffness: 280, damping: 28, mass: 0.45 });
  const glowX = useSpring(rawX, { stiffness: 120, damping: 28, mass: 0.8 });
  const glowY = useSpring(rawY, { stiffness: 120, damping: 28, mass: 0.8 });

  useEffect(() => {
    if (reduce) return;

    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor");

    function onMove(e: MouseEvent) {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    }

    function onLeave() {
      setVisible(false);
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, input, textarea, select, label, [role='button'], [data-cursor='hover']",
      );
      setHovering(Boolean(interactive));
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled || reduce) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      aria-hidden
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s ease" }}
    >
      {/* Soft glow trail */}
      <motion.div
        className="absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: glowX,
          top: glowY,
          background:
            "radial-gradient(circle, rgba(0,184,245,0.28) 0%, rgba(114,92,255,0.18) 42%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-off-white/90"
        style={{
          left: ringX,
          top: ringY,
          width: hovering ? 44 : 32,
          height: hovering ? 44 : 32,
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.2s ease",
          opacity: hovering ? 0.55 : 0.95,
          boxShadow: hovering
            ? "0 0 20px rgba(0,184,245,0.35)"
            : "0 0 12px rgba(245,248,255,0.15)",
        }}
      />

      {/* Center dot */}
      <motion.div
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-off-white"
        style={{
          left: dotX,
          top: dotY,
          boxShadow: "0 0 8px rgba(245,248,255,0.65)",
          scale: hovering ? 0.65 : 1,
        }}
      />
    </div>
  );
}
