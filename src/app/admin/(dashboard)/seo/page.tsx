"use client";

import { useEffect, useState } from "react";

type SeoRow = {
  id: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
};

export default function AdminSeoPage() {
  const [rows, setRows] = useState<SeoRow[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/admin/seo");
      if (res.ok) setRows(await res.json());
    })();
  }, []);

  function updateField(path: string, key: keyof SeoRow, value: string) {
    setRows((prev) => prev.map((row) => (row.path === path ? { ...row, [key]: value } : row)));
  }

  async function save(row: SeoRow) {
    setStatus("");
    const res = await fetch("/api/admin/seo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: row.path,
        title: row.title,
        description: row.description,
        keywords: row.keywords,
        ogImage: row.ogImage,
      }),
    });
    setStatus(res.ok ? `Saved ${row.path}` : `Failed ${row.path}`);
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold">SEO</h1>
      <p className="mt-2 text-cool-gray">Per-route metadata used by the public site.</p>
      {status && <p className="mt-3 text-sm text-cyan">{status}</p>}

      <div className="mt-8 space-y-5">
        {rows.map((row) => (
          <article key={row.path} className="glass space-y-3 rounded-2xl p-5">
            <p className="text-sm font-semibold text-cyan">{row.path}</p>
            <input
              value={row.title}
              onChange={(e) => updateField(row.path, "title", e.target.value)}
              className="w-full rounded-xl border border-border bg-midnight/60 px-3 py-2 text-sm outline-none"
              placeholder="Title"
            />
            <textarea
              value={row.description}
              onChange={(e) => updateField(row.path, "description", e.target.value)}
              className="w-full rounded-xl border border-border bg-midnight/60 px-3 py-2 text-sm outline-none"
              rows={3}
              placeholder="Description"
            />
            <input
              value={row.keywords}
              onChange={(e) => updateField(row.path, "keywords", e.target.value)}
              className="w-full rounded-xl border border-border bg-midnight/60 px-3 py-2 text-sm outline-none"
              placeholder="Keywords (comma separated)"
            />
            <input
              value={row.ogImage}
              onChange={(e) => updateField(row.path, "ogImage", e.target.value)}
              className="w-full rounded-xl border border-border bg-midnight/60 px-3 py-2 text-sm outline-none"
              placeholder="OG image path"
            />
            <button type="button" onClick={() => save(row)} className="btn-primary !py-2 text-sm">
              Save
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
