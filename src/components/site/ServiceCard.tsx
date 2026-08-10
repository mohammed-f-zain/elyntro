"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { useHydrationSafeReducedMotion } from "@/lib/motion";
import type { MouseEvent } from "react";
import { ServiceIcon } from "@/components/site/ServiceIcon";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
  index?: number;
  points?: string[];
  outcome?: string;
};

export function ServiceCard({
  title,
  description,
  icon,
  index = 0,
  points,
  outcome,
}: ServiceCardProps) {
  const reduce = useHydrationSafeReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(0,184,245,0.16), transparent 55%)`;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.25 } }}
      onMouseMove={onMove}
      className="glass group relative h-full overflow-hidden rounded-2xl p-6"
    >
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}
      <div className="relative">
        <motion.div
          className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/25 to-violet/20 text-cyan"
          whileHover={reduce ? undefined : { scale: 1.06 }}
          transition={{ duration: 0.3 }}
        >
          <ServiceIcon icon={icon} />
        </motion.div>
        <h3 className="mb-2 font-[family-name:var(--font-syne)] text-xl font-semibold text-off-white">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-cool-gray">{description}</p>
        {points && points.length > 0 && (
          <ul className="mt-4 space-y-2">
            {points.map((point) => (
              <li key={point} className="flex gap-2 text-sm text-cool-gray">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                {point}
              </li>
            ))}
          </ul>
        )}
        {outcome && (
          <p className="mt-5 rounded-xl border border-cyan/20 bg-cyan/5 px-3 py-2 text-xs leading-relaxed text-cyan">
            {outcome}
          </p>
        )}
        <div className="mt-5 h-px w-0 bg-gradient-to-r from-cyan to-violet transition-all duration-500 group-hover:w-full" />
      </div>
    </motion.article>
  );
}
