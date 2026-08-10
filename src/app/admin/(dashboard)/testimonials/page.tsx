"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

type Testimonial = {
  id: string;
  name: string;
  position: string;
  content: string;
  image: string;
  sortOrder: number;
  published: boolean;
};

const emptyForm = {
  name: "",
  position: "",
  content: "",
  image: "",
  sortOrder: 0,
  published: true,
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/testimonials");
    if (res.ok) setTestimonials(await res.json());
  }

  useEffect(() => {
    void load();
  }, []);

  async function onUpload(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Upload failed");
        return;
      }
      setForm((f) => ({ ...f, image: data.url as string }));
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (!form.image) {
      setError("Upload an image before saving.");
      return;
    }

    if (editingId) {
      await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      });
    } else {
      await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm(emptyForm);
    setEditingId(null);
    await load();
  }

  function startEdit(item: Testimonial) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      position: item.position,
      content: item.content,
      image: item.image,
      sortOrder: item.sortOrder,
      published: item.published,
    });
  }

  async function remove(id: string) {
    await fetch("/api/admin/testimonials", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, delete: true }),
    });
    await load();
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold">Testimonials</h1>
      <p className="mt-2 text-cool-gray">Quotes shown in the home page marquee strips.</p>

      <form onSubmit={onSubmit} className="glass mt-8 grid gap-3 rounded-2xl p-5 md:grid-cols-2">
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="rounded-xl border border-border bg-midnight/60 px-3 py-2 text-sm outline-none"
        />
        <input
          required
          placeholder="Position"
          value={form.position}
          onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
          className="rounded-xl border border-border bg-midnight/60 px-3 py-2 text-sm outline-none"
        />
        <textarea
          required
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          className="rounded-xl border border-border bg-midnight/60 px-3 py-2 text-sm outline-none md:col-span-2"
          rows={3}
        />
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-cool-gray">Image</label>
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => void onUpload(e.target.files?.[0] ?? null)}
              className="text-sm text-cool-gray file:mr-3 file:rounded-lg file:border-0 file:bg-cyan/15 file:px-3 file:py-2 file:text-sm file:font-medium file:text-cyan"
            />
            {uploading && <span className="text-xs text-cool-gray">Uploading…</span>}
            {form.image && (
              <Image
                src={form.image}
                alt="Preview"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover ring-1 ring-border"
                unoptimized
              />
            )}
          </div>
        </div>
        <input
          type="number"
          value={form.sortOrder}
          onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))}
          className="rounded-xl border border-border bg-midnight/60 px-3 py-2 text-sm outline-none"
        />
        <label className="flex items-center gap-2 text-sm text-cool-gray">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
          />
          Published
        </label>
        {error && <p className="text-sm text-red-300 md:col-span-2">{error}</p>}
        <div className="md:col-span-2">
          <button type="submit" className="btn-primary !py-2 text-sm" disabled={uploading}>
            {editingId ? "Update testimonial" : "Add testimonial"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn-ghost ml-2 !py-2 text-sm"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 space-y-3">
        {testimonials.map((item) => (
          <article key={item.id} className="glass flex flex-wrap items-start justify-between gap-3 rounded-2xl p-4">
            <div className="flex gap-3">
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-border"
                unoptimized
              />
              <div>
                <p className="font-semibold">
                  {item.name}{" "}
                  <span className="text-xs text-cool-gray">
                    · order {item.sortOrder} · {item.published ? "published" : "draft"}
                  </span>
                </p>
                <p className="text-sm text-cyan/80">{item.position}</p>
                <p className="mt-1 max-w-3xl text-sm text-cool-gray">&ldquo;{item.content}&rdquo;</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={() => startEdit(item)}>
                Edit
              </button>
              <button
                type="button"
                className="btn-ghost !px-3 !py-1.5 text-xs !border-red-400/40"
                onClick={() => remove(item.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
