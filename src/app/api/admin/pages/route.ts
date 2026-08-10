import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk, requireAdminApi } from "@/lib/api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;

  const pages = await prisma.pageContent.findMany({ orderBy: { slug: "asc" } });
  return jsonOk(pages);
}

const patchSchema = z.object({
  slug: z.string().min(1),
  sections: z.unknown(),
});

export async function PATCH(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = await request.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return jsonError("Invalid payload");

  const updated = await prisma.pageContent.update({
    where: { slug: parsed.data.slug },
    data: { sections: parsed.data.sections as Prisma.InputJsonValue },
  });
  return jsonOk(updated);
}
