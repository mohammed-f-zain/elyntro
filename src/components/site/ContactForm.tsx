"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Unable to send message");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass space-y-4 rounded-2xl p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-cool-gray">Name</span>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-border bg-midnight/60 px-3 py-2.5 text-off-white outline-none ring-cyan/40 focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-cool-gray">Email</span>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-xl border border-border bg-midnight/60 px-3 py-2.5 text-off-white outline-none ring-cyan/40 focus:ring-2"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block text-cool-gray">Subject</span>
        <input
          name="subject"
          required
          className="w-full rounded-xl border border-border bg-midnight/60 px-3 py-2.5 text-off-white outline-none ring-cyan/40 focus:ring-2"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-cool-gray">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full resize-y rounded-xl border border-border bg-midnight/60 px-3 py-2.5 text-off-white outline-none ring-cyan/40 focus:ring-2"
        />
      </label>
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full md:w-auto">
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-sm text-cyan">Message sent. Our team will see it in the admin inbox.</p>
      )}
      {status === "error" && <p className="text-sm text-red-300">{error}</p>}
    </form>
  );
}
