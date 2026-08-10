import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk, requireAdminApi } from "@/lib/api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;

  const rows = await prisma.seoMeta.findMany({ orderBy: { path: "asc" } });
  return jsonOk(rows);
}

const patchSchema = z.object({
  path: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  keywords: z.string().optional(),
  ogImage: z.string().optional(),
});

export async function PATCH(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = await request.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return jsonError("Invalid payload");

  const updated = await prisma.seoMeta.update({
    where: { path: parsed.data.path },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      keywords: parsed.data.keywords ?? "",
      ogImage: parsed.data.ogImage ?? "/brand/Logo.jpeg",
    },
  });
  return jsonOk(updated);
}
