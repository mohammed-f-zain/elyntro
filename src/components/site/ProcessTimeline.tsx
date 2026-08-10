"use client";

import { motion } from "framer-motion";

import { useHydrationSafeReducedMotion } from "@/lib/motion";
import { processSteps } from "@/lib/company";

export function ProcessTimeline({ title = "How engagements run" }: { title?: string }) {
  const reduce = useHydrationSafeReducedMotion();

  return (
    <section className="mt-20">
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-[family-name:var(--font-syne)] text-3xl font-bold text-off-white"
      >
        {title}
      </motion.h2>
      <div className="relative mt-10 grid gap-5 md:grid-cols-4">
        <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-cyan/0 via-cyan/40 to-violet/0 md:block" />
        {processSteps.map((item, index) => (
          <motion.article
            key={item.step}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative rounded-2xl p-5"
          >
            <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 text-sm font-bold text-cyan">
              {item.step}
            </span>
            <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-off-white">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cool-gray">{item.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
