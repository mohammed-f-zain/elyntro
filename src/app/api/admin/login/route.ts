import { z } from "zod";
import { createSession, verifyCredentials } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Invalid credentials");
    }

    const user = await verifyCredentials(parsed.data.email, parsed.data.password);
    if (!user) {
      return jsonError("Invalid email or password", 401);
    }

    await createSession(user.id, user.email);
    return jsonOk({ ok: true });
  } catch {
    return jsonError("Login failed", 500);
  }
}
