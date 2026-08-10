"use client";

import { motion, useScroll, useSpring } from "framer-motion";

import { useHydrationSafeReducedMotion } from "@/lib/motion";

export function ScrollProgress() {
  const reduce = useHydrationSafeReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan via-royal to-violet"
      style={{ scaleX }}
    />
  );
}
