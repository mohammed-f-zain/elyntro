import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk, requireAdminApi } from "@/lib/api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  return jsonOk(messages);
}

const patchSchema = z.object({
  id: z.string().min(1),
  read: z.boolean().optional(),
  delete: z.boolean().optional(),
});

export async function PATCH(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = await request.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return jsonError("Invalid payload");

  if (parsed.data.delete) {
    await prisma.contactMessage.delete({ where: { id: parsed.data.id } });
    return jsonOk({ ok: true });
  }

  if (typeof parsed.data.read === "boolean") {
    const updated = await prisma.contactMessage.update({
      where: { id: parsed.data.id },
      data: { read: parsed.data.read },
    });
    return jsonOk(updated);
  }

  return jsonError("Nothing to update");
}
