"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { useHydrationSafeReducedMotion } from "@/lib/motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale" | "blur";
};

export function SectionReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const reduce = useHydrationSafeReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const initial =
    direction === "left"
      ? { opacity: 0, x: -40, filter: "blur(8px)" }
      : direction === "right"
        ? { opacity: 0, x: 40, filter: "blur(8px)" }
        : direction === "scale"
          ? { opacity: 0, scale: 0.92, filter: "blur(6px)" }
          : direction === "blur"
            ? { opacity: 0, y: 16, filter: "blur(12px)" }
            : { opacity: 0, y: 40, filter: "blur(8px)" };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.22, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxBlock({
  children,
  className,
  speed = 40,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useHydrationSafeReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
