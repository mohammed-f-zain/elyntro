"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useHydrationSafeReducedMotion } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

type GlassStackProps = {
  className?: string;
  size?: number;
};

const LAYERS = [
  { id: "code", label: "CODE", accent: "#00B8F5" },
  { id: "build", label: "BUILD", accent: "#246BFD" },
  { id: "ship", label: "SHIP", accent: "#725CFF" },
  { id: "ai", label: "AI", accent: "#00B8F5" },
  { id: "sys", label: "SYS", accent: "#246BFD" },
] as const;

const STEP = 16;
const ARC_MS = 1100;
const HOLD_MS = 1500;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Half-circle: top → side → bottom (θ: 0 → π). */
function arcPoint(t: number, height: number, radius: number) {
  const theta = Math.PI * t;
  return {
    x: radius * Math.sin(theta),
    y: (height / 2) * (1 - Math.cos(theta)),
  };
}

/** Smooth 0→1 over [edge0, edge1]. */
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Isometric glass deck — top card arcs down a half-circle and
 * tucks under the stack in one continuous motion (no landing hitch).
 */
export function GlassStack({ className = "", size = 240 }: GlassStackProps) {
  const reduce = useHydrationSafeReducedMotion();
  const pausedRef = useRef(false);
  const busyRef = useRef(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // order[0] = top, order[n-1] = bottom
  const [order, setOrder] = useState(() => LAYERS.map((_, i) => i));
  const orderRef = useRef(order);
  orderRef.current = order;

  // Which card is in flight (null = none). Rest of stack reflows once when this sets.
  const [flying, setFlying] = useState<number | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 120, damping: 18 });
  const springY = useSpring(my, { stiffness: 120, damping: 18 });
  const tiltX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const n = LAYERS.length;
  const stackHeight = (n - 1) * STEP;
  const arcRadius = size * 0.28;

  useEffect(() => {
    if (reduce) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let raf = 0;

    const applyFlightTransform = (layerIndex: number, t: number) => {
      const el = cardRefs.current[layerIndex];
      if (!el) return;

      const p = arcPoint(t, stackHeight, arcRadius);
      const rot = -16 * Math.sin(Math.PI * t);
      const scale = 1.08 - 0.1 * t;

      // Stay in front while leaving, then smoothly pass under (no hard cut).
      const under = smoothstep(0.42, 0.72, t);
      const z = 56 * (1 - under) + 2 * under;
      const zIndex = Math.round(80 * (1 - under));

      el.style.transform = `translateX(${p.x}px) translateY(${p.y}px) translateZ(${z}px) rotate(${rot}deg) scale(${scale})`;
      el.style.opacity = "1";
      el.style.zIndex = String(zIndex);
    };

    const runCycle = () => {
      if (cancelled || pausedRef.current || busyRef.current) {
        timer = setTimeout(runCycle, 250);
        return;
      }

      const top = orderRef.current[0];
      busyRef.current = true;
      setFlying(top);
      applyFlightTransform(top, 0);

      // Resting cards reflow once; flight stays on the rAF path (no per-frame setState).
      requestAnimationFrame(() => {
        if (cancelled) return;
        const start = performance.now();

        const tick = (now: number) => {
          if (cancelled) return;
          const raw = Math.min(1, (now - start) / ARC_MS);
          const t = easeInOutCubic(raw);
          applyFlightTransform(top, t);

          if (raw < 1) {
            raf = requestAnimationFrame(tick);
            return;
          }

          // Pin at bottom pose, then commit React state so Framer doesn't catch up.
          const el = cardRefs.current[top];
          if (el) {
            el.style.transform = `translateX(0px) translateY(${stackHeight}px) translateZ(0px) rotate(0deg) scale(${0.985 - (n - 1) * 0.008})`;
            el.style.zIndex = "1";
            el.style.opacity = String(Math.max(0.55, 0.9 - (n - 1) * 0.08));
          }

          setOrder((prev) => [...prev.slice(1), prev[0]]);
          setFlying(null);
          busyRef.current = false;
          timer = setTimeout(runCycle, HOLD_MS);
        };

        raf = requestAnimationFrame(tick);
      });
    };

    timer = setTimeout(runCycle, HOLD_MS);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [reduce, stackHeight, arcRadius]);

  function onEnter() {
    pausedRef.current = true;
  }
  function onLeave() {
    pausedRef.current = false;
    mx.set(0);
    my.set(0);
  }
  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !pausedRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  const restOrder = flying === null ? order : order.filter((i) => i !== flying);

  return (
    <div
      className={`relative mx-auto w-full max-w-full ${className}`}
      style={{ width: `min(100%, ${size}px)`, aspectRatio: "1 / 1" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-[12%] rounded-[28%] bg-cyan/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-[28%] rounded-[28%] bg-violet/15 blur-2xl" />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: 1400,
          rotateX: reduce ? -18 : tiltX,
          rotateY: reduce ? 18 : tiltY,
        }}
      >
        <div
          className="relative h-[72%] w-[78%]"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(58deg) rotateZ(-32deg)",
          }}
        >
          {LAYERS.map((layer, layerIndex) => {
            const isFlying = flying === layerIndex;
            const position = isFlying ? -1 : restOrder.indexOf(layerIndex);
            const isTop = !isFlying && position === 0;
            const stackY = Math.max(0, position) * STEP;
            const stackZ = (n - 1 - Math.max(0, position)) * 14;
            const scale = isTop ? 1.03 : 0.985 - Math.max(0, position) * 0.008;
            const opacity = isTop ? 1 : Math.max(0.55, 0.9 - Math.max(0, position) * 0.08);
            const zIndex = isFlying ? 80 : n - Math.max(0, position);

            return (
              <motion.div
                key={layer.id}
                ref={(el) => {
                  cardRefs.current[layerIndex] = el;
                }}
                className="absolute inset-x-[4%] top-[14%] h-[58%] will-change-transform"
                initial={false}
                animate={
                  isFlying
                    ? false
                    : {
                        x: 0,
                        y: stackY,
                        z: stackZ,
                        rotate: 0,
                        scale,
                        opacity,
                      }
                }
                transition={
                  isFlying
                    ? { duration: 0 }
                    : position === n - 1
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 170, damping: 26, mass: 0.75 }
                }
                style={{
                  transformStyle: "preserve-3d",
                  zIndex,
                }}
              >
                <div
                  className="relative h-full w-full overflow-hidden rounded-2xl border backdrop-blur-md"
                  style={{
                    borderColor:
                      isTop || isFlying ? `${layer.accent}99` : "rgba(0,184,245,0.22)",
                    background:
                      isTop || isFlying
                        ? `linear-gradient(135deg, ${layer.accent}33, rgba(11,30,58,0.88) 55%, rgba(114,92,255,0.22))`
                        : "linear-gradient(145deg, rgba(11,30,58,0.82), rgba(7,20,38,0.9))",
                    boxShadow:
                      isTop || isFlying
                        ? `0 18px 40px rgba(0,0,0,0.35), 0 0 28px ${layer.accent}44, inset 0 1px 0 rgba(255,255,255,0.12)`
                        : "0 10px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.14]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0,184,245,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,245,0.5) 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                  />

                  <div className="relative flex h-full flex-col justify-between p-[clamp(0.65rem,3vw,1rem)]">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background: layer.accent,
                          boxShadow: `0 0 10px ${layer.accent}`,
                        }}
                      />
                      <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-cool-gray/80 sm:text-[10px]">
                        Layer{" "}
                        {String(isFlying ? n : Math.max(1, position + 1)).padStart(2, "0")}
                      </span>
                    </div>

                    <div>
                      <p
                        className="font-[family-name:var(--font-syne)] text-[clamp(0.95rem,3.2vw,1.25rem)] font-bold tracking-[0.14em]"
                        style={{
                          color: isTop || isFlying ? layer.accent : "#F5F8FF",
                        }}
                      >
                        {layer.label}
                      </p>
                      <div
                        className="mt-2 h-px w-12 origin-left"
                        style={{
                          background: `linear-gradient(90deg, ${layer.accent}, transparent)`,
                          transform: isTop || isFlying ? "scaleX(1)" : "scaleX(0.45)",
                          transition: "transform 0.45s ease",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-[8%] left-1/2 h-3 w-[55%] -translate-x-1/2 rounded-full bg-cyan/20 blur-xl" />
    </div>
  );
}

export const PrismCrystal = GlassStack;
export const SpinCube = GlassStack;
