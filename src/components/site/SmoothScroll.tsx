"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useHydrationSafeReducedMotion } from "@/lib/motion";

type SmoothScrollProps = {
  children: ReactNode;
};

/**
 * Site-wide smooth scrolling (Lenis). Skipped when prefers-reduced-motion.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduce = useHydrationSafeReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
