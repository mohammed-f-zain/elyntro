"use client";

import { motion } from "framer-motion";

import { useHydrationSafeReducedMotion } from "@/lib/motion";
import type { ReactNode } from "react";
import { GlassStack } from "@/components/site/GlassStack";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  showCube?: boolean;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, subtitle, showCube = true, children }: PageHeroProps) {
  const reduce = useHydrationSafeReducedMotion();

  return (
    <div className="grid items-center gap-8 md:grid-cols-[1.15fr_minmax(0,280px)] md:gap-10">
      <div className="min-w-0">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-cyan"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-[family-name:var(--font-syne)] text-[2.1rem] font-bold leading-tight text-off-white sm:text-4xl md:text-5xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.55 }}
            className="mt-4 max-w-2xl text-base text-cool-gray sm:mt-5 sm:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
      {showCube && (
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.55 }}
          className="mx-auto w-full max-w-[200px] sm:max-w-[240px] md:max-w-none md:justify-self-end"
        >
          <GlassStack size={260} />
        </motion.div>
      )}
    </div>
  );
}
