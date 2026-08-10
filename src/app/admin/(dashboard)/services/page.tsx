"use client";

import { FormEvent, useEffect, useState } from "react";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
  published: boolean;
};

const emptyForm = {
  title: "",
  description: "",
  icon: "code",
  sortOrder: 0,
  published: true,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/services");
    if (res.ok) setServices(await res.json());
  }

  useEffect(() => {
    void load();
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (editingId) {
      await fetch("/api/admin/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      });
    } else {
      await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm(emptyForm);
    setEditingId(null);
    await load();
  }

  function startEdit(service: Service) {
    setEditingId(service.id);
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      sortOrder: service.sortOrder,
      published: service.published,
    });
  }

  async function remove(id: string) {
    await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, delete: true }),
    });
    await load();
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold">Services</h1>
      <p className="mt-2 text-cool-gray">Create and publish service cards shown on the site.</p>

      <form onSubmit={onSubmit} className="glass mt-8 grid gap-3 rounded-2xl p-5 md:grid-cols-2">
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="rounded-xl border border-border bg-midnight/60 px-3 py-2 text-sm outline-none"
        />
        <input
          placeholder="Icon key (code, spark, cube, network)"
          value={form.icon}
          onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
          className="rounded-xl border border-border bg-midnight/60 px-3 py-2 text-sm outline-none"
        />
        <textarea
          required
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="rounded-xl border border-border bg-midnight/60 px-3 py-2 text-sm outline-none md:col-span-2"
          rows={3}
        />
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
        <div className="md:col-span-2">
          <button type="submit" className="btn-primary !py-2 text-sm">
            {editingId ? "Update service" : "Add service"}
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
        {services.map((service) => (
          <article key={service.id} className="glass flex flex-wrap items-start justify-between gap-3 rounded-2xl p-4">
            <div>
              <p className="font-semibold">
                {service.title}{" "}
                <span className="text-xs text-cool-gray">
                  · {service.icon} · order {service.sortOrder} · {service.published ? "published" : "draft"}
                </span>
              </p>
              <p className="mt-1 max-w-3xl text-sm text-cool-gray">{service.description}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={() => startEdit(service)}>
                Edit
              </button>
              <button
                type="button"
                className="btn-ghost !px-3 !py-1.5 text-xs !border-red-400/40"
                onClick={() => remove(service.id)}
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
