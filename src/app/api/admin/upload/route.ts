import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { jsonError, jsonOk, requireAdminApi } from "@/lib/api";

const ALLOWED = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

const MAX_BYTES = 2 * 1024 * 1024;

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return jsonError("Missing file");

  const ext = ALLOWED.get(file.type);
  if (!ext) return jsonError("Only JPEG, PNG, WebP, or GIF images are allowed");
  if (file.size > MAX_BYTES) return jsonError("Image must be 2MB or smaller");

  const bytes = Buffer.from(await file.arrayBuffer());
  const filename = `${randomUUID()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", "testimonials");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), bytes);

  return jsonOk({ url: `/uploads/testimonials/${filename}` }, { status: 201 });
}
