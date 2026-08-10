"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Same as Framer's useReducedMotion, but always `false` on the server and
 * during the first client render so SSR HTML matches hydration.
 * After mount it switches to the real prefers-reduced-motion value.
 */
export function useHydrationSafeReducedMotion() {
  const prefersReduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready ? Boolean(prefersReduced) : false;
}
