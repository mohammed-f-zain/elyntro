"use client";

import { motion } from "framer-motion";

import { useHydrationSafeReducedMotion } from "@/lib/motion";

type OrbitSpec = {
  top: string;
  left: string;
  size: number;
  duration: number;
  reverse?: boolean;
  opacity: number;
  color: "cyan" | "violet" | "royal";
  dashed?: boolean;
};

/** Kept sparse and mostly below the hero so Elyntro Core rings stay the focus. */
const orbits: OrbitSpec[] = [
  { top: "52%", left: "-6%", size: 300, duration: 52, reverse: true, opacity: 0.4, color: "violet", dashed: true },
  { top: "68%", left: "70%", size: 340, duration: 58, opacity: 0.38, color: "cyan" },
  { top: "86%", left: "18%", size: 220, duration: 40, reverse: true, opacity: 0.42, color: "royal" },
];

const floaters = [
  { top: "55%", left: "88%", size: 8, color: "#00B8F5", delay: 0.4 },
  { top: "72%", left: "8%", size: 9, color: "#725CFF", delay: 1.2 },
  { top: "90%", left: "48%", size: 7, color: "#246BFD", delay: 2 },
];

const accentFor = (color: OrbitSpec["color"]) =>
  color === "cyan" ? "#00B8F5" : color === "violet" ? "#725CFF" : "#246BFD";

const borderFor = (color: OrbitSpec["color"]) =>
  color === "cyan"
    ? "rgba(0,184,245,0.45)"
    : color === "violet"
      ? "rgba(114,92,255,0.4)"
      : "rgba(36,107,253,0.4)";

export function AmbientOrbits() {
  const reduce = useHydrationSafeReducedMotion();

  if (reduce) {
    return (
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        <div className="absolute -right-16 top-[55%] h-64 w-64 rounded-full bg-violet/10 blur-3xl" />
        <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div className="absolute -right-20 top-[50%] h-[24rem] w-[24rem] rounded-full bg-violet/[0.07] blur-3xl" />
      <div className="absolute -left-24 bottom-[-5%] h-[22rem] w-[22rem] rounded-full bg-cyan/[0.07] blur-3xl" />

      {orbits.map((orbit, index) => (
        <div
          key={`orbit-${index}`}
          className="absolute"
          style={{
            top: orbit.top,
            left: orbit.left,
            width: orbit.size,
            height: orbit.size,
            opacity: orbit.opacity,
          }}
        >
          <div
            className={`absolute inset-0 rounded-full ${orbit.reverse ? "animate-orbit-reverse" : "animate-orbit"}`}
            style={{
              border: `${orbit.dashed ? "1.5px dashed" : "1.5px solid"} ${borderFor(orbit.color)}`,
              animationDuration: `${orbit.duration}s`,
            }}
          >
            <span
              className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: accentFor(orbit.color),
                boxShadow: `0 0 14px ${accentFor(orbit.color)}`,
              }}
            />
          </div>
        </div>
      ))}

      {floaters.map((dot, index) => (
        <motion.span
          key={`dot-${index}`}
          className="absolute rounded-full"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            background: dot.color,
            boxShadow: `0 0 14px ${dot.color}`,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 7 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
}
