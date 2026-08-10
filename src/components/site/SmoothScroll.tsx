"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useHydrationSafeReducedMotion } from "@/lib/motion";

type SmoothScrollProps = {
  children: ReactNode;
};

function scrollWindowTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/** Resets scroll on route change and refresh (Lenis-aware when available). */
function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }
    scrollWindowTop();
  }, [pathname, lenis]);

  return null;
}

/**
 * Site-wide smooth scrolling (Lenis). Skipped when prefers-reduced-motion.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduce = useHydrationSafeReducedMotion();

  if (reduce) {
    return (
      <>
        <ScrollToTop />
        {children}
      </>
    );
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
      <ScrollToTop />
      {children}
    </ReactLenis>
  );
}
