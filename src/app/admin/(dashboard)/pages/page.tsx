"use client";

import { useEffect, useState } from "react";

type PageRow = {
  id: string;
  slug: string;
  sections: unknown;
  updatedAt: string;
};

export default function AdminPagesPage() {
  const [pages, setPages] = useState<PageRow[]>([]);
  const [active, setActive] = useState<string>("home");
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/admin/pages");
      if (!res.ok) return;
      const data = (await res.json()) as PageRow[];
      setPages(data);
      const first = data.find((p) => p.slug === "home") ?? data[0];
      if (first) {
        setActive(first.slug);
        setDraft(JSON.stringify(first.sections, null, 2));
      }
    })();
  }, []);

  function selectPage(slug: string) {
    const page = pages.find((p) => p.slug === slug);
    if (!page) return;
    setActive(slug);
    setDraft(JSON.stringify(page.sections, null, 2));
    setStatus("");
  }

  async function save() {
    setStatus("");
    try {
      const sections = JSON.parse(draft) as unknown;
      const res = await fetch("/api/admin/pages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: active, sections }),
      });
      if (!res.ok) throw new Error("Save failed");
      const updated = (await res.json()) as PageRow;
      setPages((prev) => prev.map((p) => (p.slug === updated.slug ? updated : p)));
      setStatus("Saved");
    } catch {
      setStatus("Invalid JSON or save failed");
    }
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold">Pages</h1>
      <p className="mt-2 text-cool-gray">Edit static section JSON for each public page.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {pages.map((page) => (
          <button
            key={page.slug}
            type="button"
            onClick={() => selectPage(page.slug)}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              active === page.slug ? "bg-cyan/20 text-cyan" : "bg-deep-navy text-cool-gray"
            }`}
          >
            {page.slug}
          </button>
        ))}
      </div>

      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={22}
        className="mt-4 w-full rounded-2xl border border-border bg-midnight/70 px-4 py-3 font-mono text-sm text-off-white outline-none ring-cyan/30 focus:ring-2"
      />
      <div className="mt-3 flex items-center gap-3">
        <button type="button" onClick={save} className="btn-primary !py-2 text-sm">
          Save page
        </button>
        {status && <p className="text-sm text-cool-gray">{status}</p>}
      </div>
    </div>
  );
}
