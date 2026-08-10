"use client";

import { motion } from "framer-motion";

import { useHydrationSafeReducedMotion } from "@/lib/motion";

const capabilities = [
  {
    title: "Product engineering",
    body: "Web apps, APIs, and internal platforms built for reliability, speed, and long-term ownership.",
  },
  {
    title: "AI & automation",
    body: "Practical agents and workflows that reduce manual work and surface decisions faster.",
  },
  {
    title: "Cloud & integrations",
    body: "Secure cloud architecture, data pipelines, and system integrations that stay maintainable.",
  },
];

const stack = ["TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL", "AWS", "Docker", "CI/CD"];

const delivery = [
  { label: "Avg. first release", value: "4–6 wks" },
  { label: "Engagement model", value: "Squad-based" },
  { label: "Coverage", value: "Build → Run" },
];

export function CapabilityPanel() {
  const reduce = useHydrationSafeReducedMotion();

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6 md:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan/10 blur-3xl" />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">Delivery snapshot</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {delivery.map((item, index) => (
          <motion.div
            key={item.label}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="rounded-2xl border border-border bg-midnight/50 px-3 py-4"
          >
            <p className="font-[family-name:var(--font-syne)] text-lg font-bold text-off-white">{item.value}</p>
            <p className="mt-1 text-xs text-cool-gray">{item.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {capabilities.map((item, index) => (
          <motion.div
            key={item.title}
            initial={reduce ? false : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + index * 0.07 }}
            className="border-l-2 border-cyan/40 pl-4"
          >
            <h3 className="font-[family-name:var(--font-syne)] text-base font-semibold text-off-white">
              {item.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-cool-gray">{item.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="rounded-lg border border-border bg-deep-navy/60 px-2.5 py-1 text-xs font-medium text-cool-gray"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
