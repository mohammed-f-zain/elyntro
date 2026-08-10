"use client";

import { FormEvent, useEffect, useState } from "react";

type Settings = {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  ctaPrimary: string;
  ctaSecondary: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
};

const defaults: Settings = {
  name: "Elyntro",
  tagline: "",
  email: "",
  phone: "",
  address: "",
  ctaPrimary: "",
  ctaSecondary: "",
  social: {},
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<Settings>(defaults);
  const [status, setStatus] = useState("");

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/admin/settings");
      if (!res.ok) return;
      const data = (await res.json()) as Settings;
      setForm({ ...defaults, ...data, social: { ...defaults.social, ...data.social } });
    })();
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("");
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: form }),
    });
    setStatus(res.ok ? "Settings saved" : "Save failed");
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold">Settings</h1>
      <p className="mt-2 text-cool-gray">Global site name, tagline, CTAs, and contact info.</p>

      <form onSubmit={onSubmit} className="glass mt-8 grid gap-3 rounded-2xl p-5 md:grid-cols-2">
        {(
          [
            ["name", "Site name"],
            ["tagline", "Tagline"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["address", "Address"],
            ["ctaPrimary", "Primary CTA"],
            ["ctaSecondary", "Secondary CTA"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="block text-sm">
            <span className="mb-1.5 block text-cool-gray">{label}</span>
            <input
              value={form[key]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              className="w-full rounded-xl border border-border bg-midnight/60 px-3 py-2 outline-none"
            />
          </label>
        ))}
        <label className="block text-sm md:col-span-2">
          <span className="mb-1.5 block text-cool-gray">LinkedIn</span>
          <input
            value={form.social.linkedin ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, social: { ...f.social, linkedin: e.target.value } }))}
            className="w-full rounded-xl border border-border bg-midnight/60 px-3 py-2 outline-none"
          />
        </label>
        <div className="md:col-span-2">
          <button type="submit" className="btn-primary !py-2 text-sm">
            Save settings
          </button>
          {status && <span className="ml-3 text-sm text-cool-gray">{status}</span>}
        </div>
      </form>
    </div>
  );
}
