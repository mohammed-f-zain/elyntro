"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

import { useHydrationSafeReducedMotion } from "@/lib/motion";
import { useRef } from "react";
import { Hero3D } from "@/components/site/Hero3D";

type HeroSectionProps = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export function HeroSection({
  eyebrow,
  titleLead,
  titleAccent,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: HeroSectionProps) {
  const reduce = useHydrationSafeReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.12 },
    },
  };

  const item = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section ref={sectionRef} className="relative overflow-x-clip overflow-y-visible">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-30" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 animate-pulse-glow rounded-full bg-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 animate-pulse-glow rounded-full bg-violet/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-6xl items-center gap-8 px-5 py-10 pb-16 sm:gap-10 sm:py-12 md:grid-cols-2 md:gap-8 md:px-8 md:py-16 md:pb-16">
        <motion.div
          style={reduce ? undefined : { y: textY, opacity: textOpacity }}
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 min-w-0 md:order-1"
        >
          <motion.p
            variants={item}
            className="mb-4 font-[family-name:var(--font-syne)] text-sm font-semibold uppercase tracking-[0.28em] text-cyan"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={item}
            className="font-[family-name:var(--font-syne)] text-[2.15rem] font-bold leading-[1.05] tracking-tight text-off-white sm:text-5xl lg:text-6xl"
          >
            <span className="block">{titleLead}</span>
            <span className="gradient-text shimmer-text block">{titleAccent}</span>
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-cool-gray sm:mt-6 md:text-lg">
            {subtitle}
          </motion.p>
          <motion.div variants={item} className="relative z-10 mt-7 flex flex-wrap gap-3 sm:mt-8">
            <Link href="/contact" className="btn-primary magnetic-btn">
              {ctaPrimary}
              <span aria-hidden>→</span>
            </Link>
            <Link href="/solutions" className="btn-ghost magnetic-btn">
              {ctaSecondary}
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative order-1 mx-auto h-[min(360px,70vw)] w-full max-w-lg sm:h-[420px] md:order-2 md:mx-0 md:h-[560px] md:max-w-none md:min-h-[560px]"
          style={reduce ? undefined : { y: visualY, scale: visualScale, opacity: visualOpacity }}
          initial={reduce ? false : { opacity: 0, scale: 0.96, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <Hero3D />
        </motion.div>
      </div>

      {!reduce && (
        <motion.div
          className="pointer-events-none absolute bottom-3 left-1/2 z-0 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-cool-gray md:bottom-6 md:flex"
          animate={{ y: [0, 6, 0], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>Scroll</span>
          <span className="h-8 w-px bg-gradient-to-b from-cyan to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
