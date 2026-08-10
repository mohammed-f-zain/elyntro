"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { useHydrationSafeReducedMotion } from "@/lib/motion";
import type { MouseEvent } from "react";

const nodes = [
  { id: "code", label: "Software", x: "78%", y: "18%", icon: "</>", accent: "#00B8F5" },
  { id: "ai", label: "AI", x: "18%", y: "22%", icon: "✦", accent: "#725CFF" },
  { id: "sys", label: "Systems", x: "82%", y: "72%", icon: "▣", accent: "#246BFD" },
  { id: "auto", label: "Automation", x: "16%", y: "70%", icon: "◎", accent: "#00B8F5" },
];

function EnergyDot({ pathId, delay, color }: { pathId: string; delay: number; color: string }) {
  return (
    <circle r="3.5" fill={color} filter="url(#glow)">
      <animateMotion dur="3.2s" begin={`${delay}s`} repeatCount="indefinite" rotate="auto">
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  );
}

function StaticFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-visible bg-transparent">
      <div className="absolute h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
      <div className="relative flex gap-1.5">
        <span className="h-12 w-3 -skew-x-12 rounded-sm bg-violet" />
        <span className="h-14 w-3 -skew-x-12 rounded-sm bg-royal" />
        <span className="h-16 w-3 -skew-x-12 rounded-sm bg-cyan" />
      </div>
    </div>
  );
}

export function Hero3D() {
  const reduce = useHydrationSafeReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 120, damping: 18 });
  const springY = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  if (reduce) return <StaticFallback />;

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative h-full min-h-[420px] w-full overflow-visible bg-transparent [perspective:1400px]"
    >
      {/* Soft glows stay flat — do not tilt (avoids rectangular plane edges) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-[12%] h-52 w-52 rounded-full bg-violet/20 blur-3xl" />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full overflow-visible bg-transparent"
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full overflow-visible bg-transparent"
          aria-hidden
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00B8F5" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#725CFF" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {[
            { id: "p1", d: "M50 50 C 62 40, 70 28, 78 22", dur: "6s" },
            { id: "p2", d: "M50 50 C 38 40, 28 30, 18 24", dur: "7s" },
            { id: "p3", d: "M50 50 C 62 58, 72 66, 82 74", dur: "5.5s" },
            { id: "p4", d: "M50 50 C 38 58, 26 64, 16 72", dur: "6.5s" },
          ].map((path) => (
            <path
              key={path.id}
              id={path.id}
              d={path.d}
              fill="none"
              stroke="url(#pathGrad)"
              strokeWidth="0.45"
              strokeDasharray="1.2 1.2"
              opacity="0.85"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-24"
                dur={path.dur}
                repeatCount="indefinite"
              />
            </path>
          ))}

          <EnergyDot pathId="p1" delay={0} color="#00B8F5" />
          <EnergyDot pathId="p2" delay={0.7} color="#725CFF" />
          <EnergyDot pathId="p3" delay={1.2} color="#246BFD" />
          <EnergyDot pathId="p4" delay={1.8} color="#00B8F5" />
        </svg>

        <motion.div
          className="absolute left-1/2 top-1/2 z-20 w-[48%] max-w-[240px]"
          style={{ x: "-50%", y: "-50%", z: 48 }}
        >
          <div
            className="relative aspect-square border border-cyan/35 bg-gradient-to-br from-deep-navy via-midnight to-[#0a1630] p-5 shadow-[0_0_70px_rgba(0,184,245,0.4),0_20px_50px_rgba(0,0,0,0.45)]"
            style={{ borderRadius: "1.25rem" }}
          >
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,184,245,0.25),transparent_55%)]"
              style={{ borderRadius: "1.25rem" }}
            />
            <div className="relative flex h-full flex-col items-center justify-center gap-3">
              <div className="flex items-end gap-1.5">
                <span className="h-8 w-3 -skew-x-12 rounded-sm bg-violet" />
                <span className="h-10 w-3 -skew-x-12 rounded-sm bg-royal" />
                <span className="h-12 w-3 -skew-x-12 rounded-sm bg-cyan" />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cool-gray">
                Elyntro Core
              </p>
            </div>
            <motion.div
              className="absolute inset-3 border border-cyan/20"
              style={{ borderRadius: "0.9rem" }}
              animate={{ opacity: [0.25, 0.55, 0.25] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            className="absolute z-10 w-[30%] max-w-[148px]"
            style={{ left: node.x, top: node.y, x: "-50%", y: "-50%", z: 24 + i * 6 }}
            animate={{ opacity: [0.88, 1, 0.88] }}
            transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
          >
            <div
              className="border border-white/10 bg-midnight/75 p-3.5 backdrop-blur-md"
              style={{
                borderRadius: "0.85rem",
                boxShadow: `0 0 28px ${node.accent}33, 0 12px 40px rgba(0,0,0,0.35)`,
              }}
            >
              <div
                className="mb-2 grid h-10 w-10 place-items-center text-sm font-bold text-off-white"
                style={{
                  borderRadius: "0.65rem",
                  background: `linear-gradient(135deg, ${node.accent}55, transparent)`,
                }}
              >
                {node.icon}
              </div>
              <p className="text-xs font-semibold tracking-wide text-off-white">{node.label}</p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full w-1/2 rounded-full"
                  style={{ background: node.accent }}
                  animate={{ x: ["-120%", "220%"] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] rounded-full border border-cyan/15"
          style={{ x: "-50%", y: "-50%" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_12px_#00B8F5]" />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[88%] rounded-full border border-violet/10"
          style={{ x: "-50%", y: "-50%" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet shadow-[0_0_12px_#725CFF]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
