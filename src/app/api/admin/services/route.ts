import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk, requireAdminApi } from "@/lib/api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;

  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return jsonOk(services);
}

const createSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  icon: z.string().default("code"),
  sortOrder: z.number().int().default(0),
  published: z.boolean().default(true),
});

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = await request.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return jsonError("Invalid payload");

  const created = await prisma.service.create({ data: parsed.data });
  return jsonOk(created, { status: 201 });
}

const patchSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2).optional(),
  description: z.string().min(2).optional(),
  icon: z.string().optional(),
  sortOrder: z.number().int().optional(),
  published: z.boolean().optional(),
  delete: z.boolean().optional(),
});

export async function PATCH(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = await request.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return jsonError("Invalid payload");

  if (parsed.data.delete) {
    await prisma.service.delete({ where: { id: parsed.data.id } });
    return jsonOk({ ok: true });
  }

  const { id, delete: _delete, ...data } = parsed.data;
  const updated = await prisma.service.update({ where: { id }, data });
  return jsonOk(updated);
}
