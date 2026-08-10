"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useHydrationSafeReducedMotion } from "@/lib/motion";
import { SectionReveal } from "@/components/site/SectionReveal";

type HomeCtaProps = {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
};

export function HomeCta({
  title = "Ready to build what comes next?",
  subtitle = "Tell us where you are headed. We will map the stack, the squad, and the first release.",
  primaryLabel = "Start a Project",
  secondaryLabel = "Talk to us",
}: HomeCtaProps) {
  const reduce = useHydrationSafeReducedMotion();

  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 20% 40%, rgba(36,107,253,0.45), transparent 55%), radial-gradient(ellipse 70% 80% at 85% 60%, rgba(114,92,255,0.5), transparent 50%), linear-gradient(135deg, #0B1E3A 0%, #071426 55%, #0a1630 100%)",
        }}
      />
      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-royal/40 blur-3xl"
            animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-violet/45 blur-3xl"
            animate={{ opacity: [0.4, 0.65, 0.4], x: [0, -12, 0] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
        </>
      )}

      <div className="relative mx-auto max-w-3xl text-center">
        <SectionReveal direction="up">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-transparent bg-clip-text bg-gradient-to-r from-royal to-violet">
            Next step
          </p>
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold leading-tight text-off-white sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cool-gray md:text-lg">
            {subtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-royal to-violet px-6 py-3.5 text-sm font-semibold text-off-white shadow-[0_12px_40px_rgba(36,107,253,0.35)] transition hover:brightness-110"
            >
              {primaryLabel}
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-xl border border-violet/40 bg-violet/10 px-6 py-3.5 text-sm font-semibold text-off-white backdrop-blur-sm transition hover:border-royal/50 hover:bg-royal/15"
            >
              {secondaryLabel}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
