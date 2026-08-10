import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

const fallback: Metadata = {
  title: "Elyntro — Think Forward. Build Smarter.",
  description:
    "Intelligent technology built around your business. Scalable software, connected systems, and AI-powered automation.",
};

export async function getSeoMetadata(path: string): Promise<Metadata> {
  try {
    const seo = await prisma.seoMeta.findUnique({ where: { path } });
    if (!seo) return fallback;

    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords ? seo.keywords.split(",").map((k) => k.trim()) : undefined,
      openGraph: {
        title: seo.title,
        description: seo.description,
        images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
      },
    };
  } catch {
    return fallback;
  }
}
