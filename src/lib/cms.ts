import { prisma } from "@/lib/prisma";

export type SiteSettings = {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  ctaPrimary: string;
  ctaSecondary: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
};

const defaultSettings: SiteSettings = {
  name: "Elyntro",
  tagline: "Think forward. Build smarter.",
  email: "hello@elyntro.com",
  phone: "+1 (555) 010-2030",
  address: "Global · Remote-first",
  ctaPrimary: "Start a Project",
  ctaSecondary: "Explore Solutions",
  social: {},
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: "site" } });
    if (!row) return defaultSettings;
    return { ...defaultSettings, ...(row.value as SiteSettings) };
  } catch {
    return defaultSettings;
  }
}

export async function getPageContent<T extends Record<string, unknown>>(slug: string): Promise<T | null> {
  try {
    const page = await prisma.pageContent.findUnique({ where: { slug } });
    if (!page) return null;
    return page.sections as T;
  } catch {
    return null;
  }
}

export async function getPublishedServices() {
  try {
    return await prisma.service.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getPublishedTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}
