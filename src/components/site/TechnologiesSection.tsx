"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useHydrationSafeReducedMotion } from "@/lib/motion";
import { techNodes } from "@/lib/company";
import { useEffect, useMemo, useRef, useState } from "react";

const CENTER = { x: 50, y: 46 };
const WALK_MS = 2400;
const GLOW_EASE = [0.4, 0, 0.2, 1] as const;

function matchesQuery(query: string, node: (typeof techNodes)[number]) {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  return (
    node.name.toLowerCase().includes(q) ||
    node.keywords.some((k) => k.includes(q) || q.includes(k))
  );
}

/**
 * Creative Technologies section — organic fluid mesh,
 * logos on scattered nodes, search highlight, idle light-walk.
 */
export function TechnologiesSection() {
  const reduce = useHydrationSafeReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const [query, setQuery] = useState("");
  const [walkIndex, setWalkIndex] = useState(0);
  const [entered, setEntered] = useState(false);

  const searching = query.trim().length > 0;

  const searchHits = useMemo(() => {
    const hits = new Set<string>();
    if (!searching) return hits;
    for (const node of techNodes) {
      if (matchesQuery(query, node)) hits.add(node.id);
    }
    return hits;
  }, [query, searching]);

  useEffect(() => {
    if (!inView || entered) return;
    const t = setTimeout(() => setEntered(true), reduce ? 0 : 1400);
    return () => clearTimeout(t);
  }, [inView, entered, reduce]);

  // Idle spotlight walks node → node when not searching
  useEffect(() => {
    if (reduce || searching || !inView || !entered) return;
    const id = setInterval(() => {
      setWalkIndex((i) => (i + 1) % techNodes.length);
    }, WALK_MS);
    return () => clearInterval(id);
  }, [reduce, searching, inView, entered]);

  const walkId = !searching && inView && !reduce && entered ? techNodes[walkIndex]?.id : null;

  return (
    <section
      ref={sectionRef}
      id="technologies"
      className="relative overflow-x-clip px-5 py-24 md:overflow-hidden md:px-8 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(0,184,245,0.08),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(114,92,255,0.07),transparent_50%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.2fr] lg:gap-8">
        <div className="relative z-10 max-w-md">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5 }}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-cyan"
          >
            Technologies
          </motion.p>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.08, duration: 0.55 }}
            className="font-[family-name:var(--font-syne)] text-3xl font-bold text-off-white md:text-4xl"
          >
            Technologies we excel at
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.16, duration: 0.55 }}
            className="mt-4 text-cool-gray"
          >
            A living toolkit—not a checklist. Search the mesh to see how our stack
            connects across product, platform, and AI delivery.
          </motion.p>
        </div>

        <div className="relative mx-auto flex w-full max-w-[620px] flex-col gap-4 lg:mx-0 lg:max-w-none">
          {/* Mobile: search above mesh so nodes stay visible */}
          <motion.div
            className="relative z-20 mx-auto w-full max-w-sm lg:hidden"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.12, duration: 0.45 }}
          >
            <TechSearch
              query={query}
              onQueryChange={setQuery}
              searching={searching}
              hitCount={searchHits.size}
            />
          </motion.div>

          <div className="relative mx-auto h-[min(440px,105vw)] w-[min(100%,26rem)] overflow-visible sm:h-[480px] sm:w-full lg:h-[560px] lg:w-full lg:overflow-hidden">
            <FluidBackdrop active={inView && !reduce} />

            <svg
              className="pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {techNodes.map((node, i) => {
                const lit = searching ? searchHits.has(node.id) : walkId === node.id;
                const dimmed = searching && !lit;
                return (
                  <motion.path
                    key={`line-${node.id}`}
                    d={`M ${CENTER.x} ${CENTER.y} L ${node.x} ${node.y}`}
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                    animate={
                      inView
                        ? {
                            pathLength: 1,
                            opacity: dimmed ? 0.12 : lit ? 1 : 0.72,
                            stroke: lit ? "#00B8F5" : "#94A3B8",
                            strokeWidth: lit ? 0.6 : 0.35,
                          }
                        : undefined
                    }
                    transition={{
                      pathLength: entered
                        ? { duration: 0 }
                        : {
                            delay: 0.15 + i * 0.08,
                            duration: 1.05,
                            ease: [0.22, 1, 0.36, 1],
                          },
                      opacity: {
                        duration: entered ? 1.1 : 0.9,
                        delay: entered ? 0 : 0.2 + i * 0.08,
                        ease: GLOW_EASE,
                      },
                      stroke: { duration: 1.1, ease: GLOW_EASE },
                      strokeWidth: { duration: 1.1, ease: GLOW_EASE },
                    }}
                    style={{
                      filter: lit
                        ? "drop-shadow(0 0 6px rgba(0,184,245,0.85))"
                        : "none",
                      transition: "filter 1.1s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                );
              })}
            </svg>

            {/* Desktop: search sits in the mesh hub */}
            <motion.div
              className="absolute left-1/2 top-[46%] z-20 hidden w-[min(240px,58%)] -translate-x-1/2 -translate-y-1/2 lg:block"
              initial={reduce ? false : { opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <TechSearch
                query={query}
                onQueryChange={setQuery}
                searching={searching}
                hitCount={searchHits.size}
              />
            </motion.div>

            {/* Mobile hub glow (no search overlay) */}
            <div
              className="pointer-events-none absolute left-1/2 top-[46%] z-[2] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/20 blur-xl lg:hidden"
              aria-hidden
            />

            {techNodes.map((node, i) => {
              const lit = searching ? searchHits.has(node.id) : walkId === node.id;
              const dimmed = searching && !lit;
              return (
                <motion.div
                  key={node.id}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  initial={
                    reduce
                      ? false
                      : {
                          left: `${CENTER.x}%`,
                          top: `${CENTER.y}%`,
                          opacity: 0,
                          scale: 0.55,
                        }
                  }
                  animate={
                    inView
                      ? {
                          left: `${node.x}%`,
                          top: `${node.y}%`,
                          opacity: dimmed ? 0.28 : 1,
                          scale: 1,
                        }
                      : undefined
                  }
                  transition={{
                    left: entered
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 70,
                          damping: 18,
                          mass: 0.9,
                          delay: 0.12 + i * 0.09,
                        },
                    top: entered
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 70,
                          damping: 18,
                          mass: 0.9,
                          delay: 0.12 + i * 0.09,
                        },
                    opacity: {
                      duration: entered ? 0.9 : 0.85,
                      delay: entered ? 0 : 0.12 + i * 0.09,
                      ease: GLOW_EASE,
                    },
                    scale: entered
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 80,
                          damping: 16,
                          delay: 0.12 + i * 0.09,
                        },
                  }}
                >
                  <div
                    className="flex min-w-[3.25rem] flex-col items-center gap-1 rounded-xl border px-1.5 py-1.5 backdrop-blur-md sm:min-w-[4.75rem] sm:gap-1.5 sm:px-2.5 sm:py-2.5"
                    style={{
                      borderColor: lit
                        ? "rgba(0,184,245,0.9)"
                        : "rgba(148,163,184,0.28)",
                      background: lit
                        ? "rgba(0,184,245,0.14)"
                        : "rgba(11,30,58,0.82)",
                      boxShadow: lit
                        ? "0 0 28px rgba(0,184,245,0.5), inset 0 0 16px rgba(0,184,245,0.14)"
                        : "0 8px 24px rgba(0,0,0,0.25)",
                      transform: lit ? "scale(1.06)" : "scale(1)",
                      transition:
                        "border-color 1.1s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 1.1s cubic-bezier(0.4, 0, 0.2, 1), background-color 1.1s cubic-bezier(0.4, 0, 0.2, 1), transform 1.1s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <Image
                      src={node.logo}
                      alt=""
                      width={28}
                      height={28}
                      className="h-5 w-5 object-contain sm:h-7 sm:w-7"
                    />
                    <span
                      className="max-w-[4.25rem] truncate text-center text-[9px] font-medium tracking-wide sm:max-w-[5.75rem] sm:text-[10px]"
                      style={{
                        color: lit ? "#00B8F5" : "#94A3B8",
                        transition: "color 1.1s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {node.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FluidBackdrop({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute left-[28%] top-[22%] h-[58%] w-[48%] rounded-[42%_58%_48%_52%] bg-gradient-to-br from-deep-navy via-[#0a1830] to-midnight opacity-90"
        style={{
          boxShadow:
            "inset -20px -30px 60px rgba(0,0,0,0.45), inset 16px 12px 40px rgba(0,184,245,0.08), 0 30px 80px rgba(0,0,0,0.35)",
        }}
        animate={
          active
            ? {
                borderRadius: [
                  "42% 58% 48% 52%",
                  "52% 48% 55% 45%",
                  "45% 55% 42% 58%",
                  "42% 58% 48% 52%",
                ],
              }
            : undefined
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[48%] top-[30%] h-[38%] w-[34%] rounded-[55%_45%_60%_40%] bg-gradient-to-bl from-[#0d2244] to-midnight/90"
        animate={
          active
            ? {
                borderRadius: [
                  "55% 45% 60% 40%",
                  "45% 55% 40% 60%",
                  "55% 45% 60% 40%",
                ],
                x: [0, 8, 0],
                y: [0, -6, 0],
              }
            : undefined
        }
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[40%] top-[38%] h-16 w-16 rounded-full bg-gradient-to-br from-cyan via-royal to-violet shadow-[0_0_40px_rgba(0,184,245,0.55)]"
        animate={active ? { scale: [1, 1.08, 1], y: [0, -10, 0] } : undefined}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute left-[62%] top-[58%] h-7 w-7 rounded-full bg-deep-navy shadow-[inset_0_0_12px_rgba(0,184,245,0.2)]" />
      <div className="absolute left-[34%] top-[62%] h-4 w-4 rounded-full bg-violet/40 blur-[1px]" />
    </div>
  );
}

function TechSearch({
  query,
  onQueryChange,
  searching,
  hitCount,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  searching: boolean;
  hitCount: number;
}) {
  return (
    <>
      <label className="relative block">
        <span className="sr-only">Search technologies</span>
        <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 flex -translate-y-1/2 items-center text-cool-gray">
          <SearchIcon />
        </span>
        <input
          type="text"
          inputMode="search"
          autoComplete="off"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Technologies"
          className="w-full appearance-none rounded-full border border-border bg-deep-navy/95 py-2.5 pl-11 pr-4 text-sm text-off-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] outline-none backdrop-blur-md transition-[border-color,box-shadow] placeholder:text-cool-gray/70 focus:border-cyan/50 focus:shadow-[0_0_0_3px_rgba(0,184,245,0.15),0_12px_40px_rgba(0,0,0,0.35)]"
        />
      </label>
      {searching && (
        <p className="mt-2 text-center text-[10px] uppercase tracking-[0.16em] text-cool-gray">
          {hitCount === 0 ? "No match in the mesh" : `${hitCount} lit`}
        </p>
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-cool-gray"
    >
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M16.4 16.4L21 21"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
