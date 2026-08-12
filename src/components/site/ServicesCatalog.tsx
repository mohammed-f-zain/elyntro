"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { ServiceIcon } from "@/components/site/ServiceIcon";
import { useHydrationSafeReducedMotion } from "@/lib/motion";
import type { ServiceOffering } from "@/lib/company";
import { cn } from "@/lib/utils";

type ServicesCatalogProps = {
  services: ServiceOffering[];
};

const accents: Record<ServiceOffering["treatment"], { a: string; b: string; glow: string }> = {
  featured: { a: "#00B8F5", b: "#246BFD", glow: "rgba(0,184,245,0.35)" },
  split: { a: "#246BFD", b: "#725CFF", glow: "rgba(36,107,253,0.4)" },
  panel: { a: "#725CFF", b: "#00B8F5", glow: "rgba(114,92,255,0.35)" },
  compact: { a: "#00B8F5", b: "#725CFF", glow: "rgba(0,184,245,0.3)" },
  dynamic: { a: "#725CFF", b: "#00B8F5", glow: "rgba(114,92,255,0.45)" },
  strategic: { a: "#94A3B8", b: "#00B8F5", glow: "rgba(0,184,245,0.2)" },
  stable: { a: "#246BFD", b: "#00B8F5", glow: "rgba(36,107,253,0.3)" },
};

function StageArt({ service, reduce }: { service: ServiceOffering; reduce: boolean }) {
  const accent = accents[service.treatment];

  if (service.treatment === "dynamic") {
    return (
      <div className="relative h-full w-full">
        <div
          className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: `radial-gradient(circle, ${accent.glow}, transparent 70%)` }}
        />
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute left-1/2 top-1/2 rounded-full border"
            style={{
              width: `${42 + ring * 18}%`,
              height: `${42 + ring * 18}%`,
              x: "-50%",
              y: "-50%",
              borderColor: ring % 2 ? "rgba(114,92,255,0.35)" : "rgba(0,184,245,0.35)",
            }}
            animate={reduce ? undefined : { rotate: ring % 2 ? 360 : -360 }}
            transition={{ duration: 18 + ring * 6, repeat: Infinity, ease: "linear" }}
          />
        ))}
        {!reduce &&
          Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            return (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
                style={{ background: i % 2 ? accent.a : accent.b }}
                animate={{
                  x: [Math.cos(angle) * 40, Math.cos(angle) * 110, Math.cos(angle) * 40],
                  y: [Math.sin(angle) * 40, Math.sin(angle) * 110, Math.sin(angle) * 40],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{ duration: 3.2 + (i % 4) * 0.4, repeat: Infinity, ease: "easeInOut" }}
              />
            );
          })}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-midnight/50 text-cyan backdrop-blur-md"
            animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
            transition={{ duration: 2.8, repeat: Infinity }}
          >
            <ServiceIcon icon={service.icon} className="h-9 w-9" />
          </motion.div>
        </div>
      </div>
    );
  }

  if (service.treatment === "split") {
    return (
      <div className="relative flex h-full items-center justify-center gap-4 px-6">
        {[0, 1].map((phone) => (
          <motion.div
            key={phone}
            className="relative h-[70%] w-[38%] max-w-[150px] overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-b from-royal/25 to-midnight/80"
            initial={reduce ? false : { y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: phone * 0.1 }}
            style={{
              boxShadow: `0 30px 80px ${accent.glow}`,
              marginTop: phone ? 0 : 16,
              marginBottom: phone ? 16 : 0,
            }}
          >
            <div className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-white/20" />
            <div className="mt-6 space-y-2 px-3">
              <div className="h-2 rounded bg-cyan/40" />
              <div className="h-2 w-[80%] rounded bg-white/15" />
              <div className="mt-4 aspect-[4/3] rounded-xl bg-gradient-to-br from-cyan/30 to-violet/30" />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="h-10 rounded-lg bg-white/10" />
                <div className="h-10 rounded-lg bg-royal/30" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (service.treatment === "panel") {
    return (
      <div className="relative flex h-full items-center justify-center overflow-hidden px-6 py-8">
        <div className="relative h-[78%] w-full max-w-md">
          {[0, 1, 2].map((layer) => (
            <motion.div
              key={layer}
              className="absolute inset-x-0 rounded-2xl border border-violet/35 bg-deep-navy/75 backdrop-blur-sm"
              style={{
                height: "58%",
                top: `${12 + layer * 14}%`,
                left: `${8 + layer * 5}%`,
                right: `${8 + (2 - layer) * 5}%`,
                zIndex: layer + 1,
                boxShadow:
                  layer === 2
                    ? `0 28px 70px ${accent.glow}`
                    : "0 12px 30px rgba(0,0,0,0.25)",
              }}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: layer * 0.1, duration: 0.45 }}
            >
              <div className="flex h-full flex-col p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet/80" />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan/60" />
                    <span className="h-1.5 w-1.5 rounded-full bg-royal/50" />
                  </div>
                  <span className="text-[0.6rem] uppercase tracking-[0.18em] text-cool-gray">
                    {layer === 2 ? "CRM" : layer === 1 ? "Ops" : "Data"}
                  </span>
                </div>
                <div className="grid flex-1 grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-md bg-white/[0.06]"
                      style={{
                        opacity: 0.45 + ((i + layer) % 3) * 0.2,
                      }}
                    />
                  ))}
                </div>
                {layer === 2 && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-white/10">
                      <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-violet to-cyan" />
                    </div>
                    <ServiceIcon icon={service.icon} className="h-4 w-4 text-violet" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (service.treatment === "compact") {
    return (
      <div className="relative flex h-full flex-col items-center justify-center px-10">
        <motion.div
          className="w-full max-w-md overflow-hidden rounded-2xl border border-cyan/30 bg-midnight/70"
          style={{ boxShadow: `0 0 80px ${accent.glow}` }}
          initial={reduce ? false : { scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="relative h-28 bg-gradient-to-r from-cyan/40 via-royal/30 to-violet/40">
            {!reduce && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              />
            )}
          </div>
          <div className="space-y-3 p-5">
            <div className="h-3 w-1/2 rounded bg-off-white/25" />
            <div className="h-2 w-full rounded bg-white/10" />
            <div className="h-2 w-[80%] rounded bg-white/10" />
            <div className="mt-2 flex justify-center">
              <div className="h-9 w-36 rounded-xl bg-gradient-to-r from-cyan to-violet" />
            </div>
          </div>
        </motion.div>
        <div className="mt-6 flex w-full max-w-md items-end justify-between gap-2 px-2">
          {["Visit", "Engage", "Convert"].map((label, i) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-2">
              <motion.div
                className="w-full rounded-t-md bg-gradient-to-t from-cyan/50 to-violet/30"
                style={{ height: 28 + i * 22 }}
                animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              />
              <span className="text-[0.6rem] uppercase tracking-[0.18em] text-cool-gray">{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (service.treatment === "strategic") {
    return (
      <div className="relative flex h-full items-center justify-center">
        <svg viewBox="0 0 400 320" className="h-[85%] w-[85%] opacity-90" aria-hidden>
          <defs>
            <linearGradient id="consult-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00B8F5" />
              <stop offset="100%" stopColor="#725CFF" />
            </linearGradient>
          </defs>
          <motion.path
            d="M40 260 L140 120 L220 180 L320 60"
            fill="none"
            stroke="url(#consult-line)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0 : 1.4, ease: "easeInOut" }}
          />
          {[
            [40, 260],
            [140, 120],
            [220, 180],
            [320, 60],
          ].map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="7"
              fill="#071426"
              stroke="#00B8F5"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: reduce ? 0 : 0.2 + i * 0.15 }}
            />
          ))}
          <text x="330" y="52" fill="#94A3B8" fontSize="11">
            roadmap
          </text>
        </svg>
        <div className="absolute bottom-10 left-10 right-10 grid grid-cols-3 gap-3">
          {["Audit", "Advise", "Align"].map((label) => (
            <div
              key={label}
              className="border border-white/10 bg-midnight/40 px-3 py-2 text-center text-xs tracking-[0.16em] text-cool-gray uppercase"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (service.treatment === "stable") {
    return (
      <div className="relative flex h-full items-center justify-center px-8">
        <div className="relative w-full max-w-lg">
          <div className="mb-8 flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.22em] text-cyan">System health</span>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs text-cyan"
              animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              Stable
            </motion.span>
          </div>
          <div className="space-y-4">
            {[
              { label: "Uptime", value: 92 },
              { label: "Security", value: 88 },
              { label: "Performance", value: 84 },
            ].map((row, i) => (
              <div key={row.label}>
                <div className="mb-1.5 flex justify-between text-xs text-cool-gray">
                  <span>{row.label}</span>
                  <span className="text-off-white">{row.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan to-royal"
                    initial={{ width: 0 }}
                    animate={{ width: `${row.value}%` }}
                    transition={{ duration: reduce ? 0 : 0.9, delay: i * 0.12 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-4 gap-2">
            {["Fix", "Patch", "Backup", "Ship"].map((label) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-deep-navy/50 py-3 text-center text-[0.65rem] uppercase tracking-[0.14em] text-[#B8C4D8]"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // featured — website
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-6 py-8">
      <motion.div
        className="relative w-full max-w-xl overflow-hidden rounded-[1.5rem] border border-cyan/25 bg-deep-navy/70"
        style={{ boxShadow: `0 40px 120px ${accent.glow}` }}
        initial={reduce ? false : { y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 h-5 flex-1 rounded-md bg-white/5" />
        </div>
        <div className="grid grid-cols-[0.9fr_1.1fr] gap-0">
          <div className="space-y-3 border-r border-white/10 p-5">
            <div className="h-8 w-24 rounded bg-gradient-to-r from-cyan/50 to-royal/40" />
            <div className="h-2 w-full rounded bg-white/10" />
            <div className="h-2 w-[80%] rounded bg-white/10" />
            <div className="h-2 w-[60%] rounded bg-white/10" />
            <div className="mt-4 h-9 w-28 rounded-lg bg-cyan/30" />
          </div>
          <div className="relative min-h-[200px] overflow-hidden bg-gradient-to-br from-cyan/20 via-royal/10 to-violet/25 p-4">
            {!reduce && (
              <motion.div
                className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-cyan/30 blur-2xl"
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            )}
            <div className="relative mt-6 grid grid-cols-2 gap-3">
              <div className="h-20 rounded-xl bg-midnight/40" />
              <div className="h-20 rounded-xl bg-midnight/40" />
              <div className="col-span-2 h-16 rounded-xl bg-midnight/50" />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-[10%] hidden h-28 w-44 rounded-xl border border-violet/30 bg-midnight/80 p-3 backdrop-blur md:block"
      >
        <div className="mb-2 text-[0.6rem] uppercase tracking-[0.2em] text-violet">SEO · Speed</div>
        <div className="h-2 rounded bg-violet/40" />
        <div className="mt-2 h-2 w-[66%] rounded bg-white/15" />
      </motion.div>
    </div>
  );
}

export function ServicesCatalog({ services }: ServicesCatalogProps) {
  const reduce = useHydrationSafeReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = services[active] ?? services[0];
  const accent = accents[current.treatment];

  const go = useCallback(
    (next: number) => {
      setActive((next + services.length) % services.length);
    },
    [services.length],
  );

  useEffect(() => {
    function syncFromHash() {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      const idx = services.findIndex((s) => s.slug === hash);
      if (idx >= 0) {
        setPaused(true);
        setActive(idx);
      }
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [services]);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => go(active + 1), 6500);
    return () => window.clearInterval(id);
  }, [active, go, paused, reduce]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        setPaused(true);
        go(active + 1);
      }
      if (e.key === "ArrowLeft") {
        setPaused(true);
        go(active - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  if (!current) return null;

  const selectorStrip = (
    <div className="mt-0 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {services.map((service, index) => {
        const isActive = index === active;
        const a = accents[service.treatment];
        return (
          <button
            key={service.slug}
            type="button"
            onClick={() => {
              setPaused(true);
              setActive(index);
            }}
            className={cn(
              "group relative min-w-[9.5rem] flex-1 overflow-hidden rounded-2xl border px-3 py-3 text-left transition md:min-w-0",
              isActive
                ? "border-cyan/50 bg-deep-navy/80"
                : "border-white/10 bg-midnight/40 hover:border-white/25",
            )}
            style={isActive ? { boxShadow: `0 0 28px ${a.glow}` } : undefined}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-lg transition",
                  isActive ? "text-cyan" : "text-cool-gray group-hover:text-off-white",
                )}
                style={
                  isActive
                    ? { background: `linear-gradient(135deg, ${a.a}33, ${a.b}22)` }
                    : { background: "rgba(255,255,255,0.04)" }
                }
              >
                <ServiceIcon icon={service.icon} className="h-4 w-4" />
              </span>
              <span className="font-[family-name:var(--font-syne)] text-[0.65rem] font-bold tracking-widest text-white/30">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <span
              className={cn(
                "block text-xs font-semibold leading-snug md:text-[0.8rem]",
                isActive ? "text-off-white" : "text-cool-gray",
              )}
            >
              {service.title}
            </span>
            {isActive && (
              <motion.span
                layoutId="service-active-bar"
                className="absolute inset-x-3 bottom-0 h-0.5 rounded-full"
                style={{ background: `linear-gradient(90deg, ${a.a}, ${a.b})` }}
              />
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <section
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan">Interactive catalog</p>
          <h2 className="mt-2 font-[family-name:var(--font-syne)] text-2xl font-bold text-off-white md:text-3xl">
            Explore what Elyntro builds
          </h2>
        </div>
        <p className="max-w-xs text-sm text-[#B8C4D8]">
          Select a capability — the stage transforms. Tap a service above the stage to explore.
        </p>
      </div>

      <div className="mb-6">{selectorStrip}</div>

      {/* Immersive stage */}
      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/10"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 70% 40%, rgba(11,30,58,0.9), #071426 70%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-80 transition-colors duration-700"
          style={{
            background: `radial-gradient(ellipse 55% 50% at 72% 45%, ${accent.glow}, transparent 65%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at 70% 50%, black 20%, transparent 75%)",
          }}
        />

        <div className="relative grid min-h-[34rem] lg:min-h-[38rem] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          {/* Copy panel */}
          <div className="relative z-10 flex flex-col justify-between p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={reduce ? false : { opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: 12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 text-cyan"
                    style={{ background: `linear-gradient(135deg, ${accent.a}33, ${accent.b}22)` }}
                  >
                    <ServiceIcon icon={current.icon} />
                  </span>
                  <span className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-[0.2em] text-white/35">
                    {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-syne)] text-3xl font-bold leading-tight text-off-white md:text-4xl lg:text-[2.6rem]">
                  {current.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[#B8C4D8] md:text-base">
                  {current.description}
                </p>

                <div className="mt-8">
                  <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-cool-gray">
                    What we deliver
                  </p>
                  <ul className="space-y-2.5">
                    {current.points.map((point, i) => (
                      <motion.li
                        key={point}
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.06 }}
                        className="flex items-start gap-3 text-sm text-[#C5D0E0]"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: accent.a, boxShadow: `0 0 10px ${accent.a}` }}
                        />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <p className="mt-7 max-w-md text-sm italic leading-relaxed text-off-white/90">
                  {current.outcome}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/contact?service=${current.slug}`}
                    data-future-href={current.href}
                    className="btn-primary !py-2.5 text-sm"
                  >
                    Discuss this service →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Visual stage */}
          <div className="relative min-h-[22rem] overflow-hidden border-t border-white/10 lg:min-h-0 lg:border-l lg:border-t-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <StageArt service={current} reduce={!!reduce} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
          <motion.div
            key={`${current.slug}-progress`}
            className="h-full origin-left"
            style={{ background: `linear-gradient(90deg, ${accent.a}, ${accent.b})` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused || reduce ? 0 : 1 }}
            transition={{ duration: paused || reduce ? 0 : 6.5, ease: "linear" }}
          />
        </div>
      </div>

      {/* Deep-link targets */}
      <div className="sr-only" aria-hidden>
        {services.map((s) => (
          <div key={s.slug} id={s.slug} />
        ))}
      </div>
    </section>
  );
}
