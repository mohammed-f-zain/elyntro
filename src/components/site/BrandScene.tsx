"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { useHydrationSafeReducedMotion } from "@/lib/motion";
import type { MouseEvent } from "react";

type BrandSceneProps = {
  src?: string;
  alt?: string;
  caption?: string;
  className?: string;
};

/** Interactive brand image with soft 3D tilt — no decorative empty boxes. */
export function BrandScene({
  src = "/brand/elyntro-logo-white.png",
  alt = "Elyntro",
  caption = "Built to connect systems, software, and intelligence.",
  className = "",
}: BrandSceneProps) {
  const reduce = useHydrationSafeReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 120, damping: 18 });
  const springY = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      className={`relative overflow-visible bg-transparent ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/15 blur-3xl" />
      <div className="pointer-events-none absolute right-6 top-8 h-28 w-28 rounded-full bg-violet/20 blur-2xl" />

      <motion.div
        className="relative"
        style={
          reduce
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
      >
        <div className="glass relative overflow-hidden rounded-3xl p-6 md:p-8">
          <motion.div
            className="relative mx-auto flex aspect-[4/3] max-w-md items-center justify-center"
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={reduce ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={src}
              alt={alt}
              width={520}
              height={360}
              className="h-auto w-[85%] object-contain drop-shadow-[0_20px_50px_rgba(0,184,245,0.25)]"
              priority={false}
            />
          </motion.div>
          {caption && <p className="mt-4 text-center text-sm text-cool-gray">{caption}</p>}
        </div>
      </motion.div>
    </div>
  );
}
