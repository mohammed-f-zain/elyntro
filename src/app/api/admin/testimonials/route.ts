import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk, requireAdminApi } from "@/lib/api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;

  const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
  return jsonOk(testimonials);
}

const createSchema = z.object({
  name: z.string().min(2),
  position: z.string().min(2),
  content: z.string().min(2),
  image: z.string().min(1),
  sortOrder: z.number().int().default(0),
  published: z.boolean().default(true),
});

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = await request.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return jsonError("Invalid payload");

  const created = await prisma.testimonial.create({ data: parsed.data });
  return jsonOk(created, { status: 201 });
}

const patchSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2).optional(),
  position: z.string().min(2).optional(),
  content: z.string().min(2).optional(),
  image: z.string().min(1).optional(),
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
    await prisma.testimonial.delete({ where: { id: parsed.data.id } });
    return jsonOk({ ok: true });
  }

  const { id, delete: _delete, ...data } = parsed.data;
  const updated = await prisma.testimonial.update({ where: { id }, data });
  return jsonOk(updated);
}
