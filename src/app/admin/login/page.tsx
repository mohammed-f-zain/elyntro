"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/site/BrandLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    setLoading(false);
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setError(body.error || "Login failed");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-full items-center justify-center px-5 py-16">
      <form onSubmit={onSubmit} className="glass w-full max-w-md rounded-2xl p-8">
        <BrandLogo className="mb-6 h-12 max-w-[280px]" height={56} priority />
        <h1 className="font-[family-name:var(--font-syne)] text-2xl font-bold">Admin login</h1>
        <p className="mt-2 text-sm text-cool-gray">Manage content, SEO, and contact messages.</p>
        <label className="mt-6 block text-sm">
          <span className="mb-1.5 block text-cool-gray">Email</span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-border bg-midnight/60 px-3 py-2.5 outline-none ring-cyan/40 focus:ring-2"
          />
        </label>
        <label className="mt-4 block text-sm">
          <span className="mb-1.5 block text-cool-gray">Password</span>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-xl border border-border bg-midnight/60 px-3 py-2.5 outline-none ring-cyan/40 focus:ring-2"
          />
        </label>
        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
