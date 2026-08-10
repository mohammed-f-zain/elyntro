import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk, requireAdminApi } from "@/lib/api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;

  const row = await prisma.siteSetting.findUnique({ where: { key: "site" } });
  return jsonOk(row?.value ?? {});
}

const patchSchema = z.object({
  value: z.record(z.string(), z.unknown()),
});

export async function PATCH(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = await request.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return jsonError("Invalid payload");

  const value = parsed.data.value as Prisma.InputJsonValue;

  const updated = await prisma.siteSetting.upsert({
    where: { key: "site" },
    update: { value },
    create: { key: "site", value },
  });
  return jsonOk(updated.value);
}
