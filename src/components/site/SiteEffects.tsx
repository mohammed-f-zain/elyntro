"use client";

import type { ReactNode } from "react";
import { AmbientOrbits } from "@/components/site/AmbientOrbits";
import { CustomCursor } from "@/components/site/CustomCursor";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { SmoothScroll } from "@/components/site/SmoothScroll";

export function SiteEffects({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <div className="relative min-h-full">
        <AmbientOrbits />
        <ScrollProgress />
        <CustomCursor />
        <div className="relative z-10">{children}</div>
      </div>
    </SmoothScroll>
  );
}
