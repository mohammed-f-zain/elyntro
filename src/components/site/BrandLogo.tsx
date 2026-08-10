"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  /** Intrinsic height hint for next/image (CSS controls display size). */
  height?: number;
  priority?: boolean;
};

/** Official white lockup — readable on dark navy UI. */
export function BrandLogo({ className = "", height = 48, priority = false }: BrandLogoProps) {
  // Cropped asset ≈ 1263×356
  const width = Math.round(height * (1263 / 356));

  return (
    <Image
      src="/brand/elyntro-logo-white.png"
      alt="Elyntro"
      width={width}
      height={height}
      priority={priority}
      className={cn("w-auto object-contain object-left", className)}
      style={{ width: "auto" }}
    />
  );
}
