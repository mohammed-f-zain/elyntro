"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

import { useHydrationSafeReducedMotion } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import { ServiceIcon } from "@/components/site/ServiceIcon";

type Stat = {
  label: string;
  value: string;
  icon?: string;
};

function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { numeric: null as number | null, suffix: value };
  return { numeric: Number(match[1]), suffix: match[2] ?? "" };
}

function StatValue({ value }: { value: string }) {
  const { numeric, suffix } = parseStat(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 70, damping: 20 });
  const reduce = useHydrationSafeReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (numeric == null || !mounted || reduce) return;
    if (inView) {
      motionValue.set(0);
      motionValue.set(numeric);
    }
  }, [inView, motionValue, numeric, mounted, reduce]);

  useEffect(() => {
    if (numeric == null || !mounted || reduce) return;
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
    });
  }, [numeric, spring, suffix, mounted, reduce]);

  return <span ref={ref}>{value}</span>;
}

const iconFor = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("satisf")) return "spark";
  if (l.includes("secur")) return "cube";
  if (l.includes("support")) return "network";
  return "code";
};

export function TrustStats({ stats }: { stats: Stat[] }) {
  const reduce = useHydrationSafeReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-0 lg:overflow-hidden lg:rounded-2xl lg:border lg:border-border lg:bg-deep-navy/45">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: index * 0.08, duration: 0.45 }}
          className="group relative flex items-center gap-3 rounded-2xl border border-border bg-deep-navy/50 px-3.5 py-4 sm:gap-4 sm:px-4 sm:py-5 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-5 lg:py-6"
        >
          {index > 0 && (
            <div className="pointer-events-none absolute inset-y-4 left-0 hidden w-px bg-gradient-to-b from-transparent via-border to-transparent lg:block" />
          )}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan transition group-hover:bg-cyan/20 group-hover:shadow-[0_0_24px_rgba(0,184,245,0.25)] sm:h-11 sm:w-11">
            <ServiceIcon icon={stat.icon ?? iconFor(stat.label)} className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0">
            <p className="font-[family-name:var(--font-syne)] text-lg font-bold leading-none text-off-white sm:text-2xl md:text-3xl">
              <StatValue value={stat.value} />
            </p>
            <p className="mt-1 text-[11px] leading-snug text-cool-gray sm:text-sm">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
