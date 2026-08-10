import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk, requireAdminApi } from "@/lib/api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;

  try {
    const [unreadMessages, totalMessages, services, publishedServices, latestSeo] =
      await Promise.all([
        prisma.contactMessage.count({ where: { read: false } }),
        prisma.contactMessage.count(),
        prisma.service.count(),
        prisma.service.count({ where: { published: true } }),
        prisma.seoMeta.findFirst({ orderBy: { updatedAt: "desc" } }),
      ]);

    return jsonOk({
      unreadMessages,
      totalMessages,
      services,
      publishedServices,
      latestSeoUpdatedAt: latestSeo?.updatedAt ?? null,
    });
  } catch {
    return jsonError("Failed to load overview", 500);
  }
}
