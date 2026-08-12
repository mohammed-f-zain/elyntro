"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

import { useHydrationSafeReducedMotion } from "@/lib/motion";
import { processSteps as defaultProcessSteps } from "@/lib/company";
import { cn } from "@/lib/utils";

type ProcessStep = {
  step: string;
  title: string;
  body: string;
};

function StepDot({
  index,
  total,
  progress,
  reduce,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const threshold = total <= 1 ? 1 : index / (total - 1);
  const lit = useTransform(progress, (v) =>
    reduce ? 1 : Math.min(1, Math.max(0, (v - threshold + 0.14) / 0.14)),
  );
  const glowOpacity = useTransform(lit, [0, 1], [0.2, 0.85]);
  const glowScale = useTransform(lit, [0, 1], [0.7, 1]);
  const coreBg = useTransform(lit, [0, 1], ["rgba(0,184,245,0.55)", "#00B8F5"]);

  return (
    <div className="relative z-10 flex h-5 w-5 items-center justify-center">
      {/* Soft circular halo — radial only, never clipped to a box */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          opacity: glowOpacity,
          scale: glowScale,
          background:
            "radial-gradient(circle, rgba(0,184,245,0.55) 0%, rgba(0,184,245,0.18) 35%, rgba(0,184,245,0) 70%)",
        }}
      />
      <motion.span
        className="relative h-2.5 w-2.5 rounded-full"
        style={{
          backgroundColor: coreBg,
          boxShadow: "0 0 10px rgba(0,184,245,0.65)",
        }}
      />
    </div>
  );
}

function StepNumber({
  step,
  index,
  total,
  progress,
  reduce,
}: {
  step: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const threshold = total <= 1 ? 1 : index / (total - 1);
  const lit = useTransform(progress, (v) =>
    reduce ? 1 : Math.min(1, Math.max(0, (v - threshold + 0.14) / 0.14)),
  );
  const color = useTransform(lit, [0, 1], ["rgba(148,163,184,0.75)", "#00B8F5"]);

  return (
    <motion.span
      className="font-[family-name:var(--font-syne)] text-xs font-bold tracking-[0.24em]"
      style={{ color }}
    >
      {step}
    </motion.span>
  );
}

export function ProcessTimeline({
  title = "How engagements run",
  steps = defaultProcessSteps,
  className,
}: {
  title?: string;
  steps?: ProcessStep[];
  className?: string;
}) {
  const reduce = useHydrationSafeReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "center 0.45"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });
  const lineScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className={cn("overflow-visible", className ?? "mt-20")}>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan">Process</p>
        <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-bold leading-tight text-off-white md:text-4xl lg:text-[2.75rem]">
          <span className="gradient-text">{title}</span>
        </h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-cyan via-royal to-transparent" />
      </motion.div>

      {/* Desktop / tablet — LTR columns; line continues past the last dot */}
      <div className="relative mt-20 hidden overflow-visible md:block md:mt-24">
        <div className="relative">
          {/* Gray base + primary fill: from first dot through past the last */}
          <div
            className="pointer-events-none absolute right-0 top-[9px] h-px bg-white/15"
            style={{ left: 10 }}
          />
          <motion.div
            className="pointer-events-none absolute right-0 top-[9px] h-px origin-left bg-gradient-to-r from-cyan via-royal to-cyan"
            style={{
              left: 10,
              scaleX: reduce ? 1 : lineScale,
              boxShadow: "0 0 14px rgba(0,184,245,0.45)",
            }}
          />

          <div className="grid grid-cols-4 gap-10 lg:gap-12">
            {steps.map((item, index) => (
              <motion.article
                key={item.step}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-start text-left"
              >
                <div className="mb-10 flex w-full justify-start">
                  <StepDot index={index} total={steps.length} progress={progress} reduce={!!reduce} />
                </div>
                <StepNumber
                  step={item.step}
                  index={index}
                  total={steps.length}
                  progress={progress}
                  reduce={!!reduce}
                />
                <h3 className="mt-4 font-[family-name:var(--font-syne)] text-2xl font-semibold tracking-tight text-off-white">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[15.5rem] text-sm leading-relaxed text-[#B8C4D8]">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile vertical — LTR text */}
      <div className="relative mt-16 overflow-visible md:hidden">
        <div className="absolute bottom-0 left-[9px] top-2 w-px bg-white/15" />
        <motion.div
          className="absolute bottom-0 left-[9px] top-2 w-px origin-top bg-gradient-to-b from-cyan via-royal to-cyan"
          style={{
            scaleY: reduce ? 1 : lineScale,
            boxShadow: "0 0 12px rgba(0,184,245,0.45)",
          }}
        />
        <ol className="relative space-y-14 pb-6">
          {steps.map((item, index) => (
            <li key={item.step} className="grid grid-cols-[1.25rem_1fr] items-start gap-4">
              <div className="relative z-10 flex justify-center pt-0.5">
                <StepDot index={index} total={steps.length} progress={progress} reduce={!!reduce} />
              </div>
              <div className="text-left">
                <StepNumber
                  step={item.step}
                  index={index}
                  total={steps.length}
                  progress={progress}
                  reduce={!!reduce}
                />
                <h3 className="mt-3 font-[family-name:var(--font-syne)] text-xl font-semibold text-off-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#B8C4D8]">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
