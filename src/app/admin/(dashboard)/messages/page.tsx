"use client";

import { useEffect, useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/messages");
    if (res.ok) {
      setMessages(await res.json());
    }
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function patch(id: string, data: { read?: boolean; delete?: boolean }) {
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    await load();
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold">Messages</h1>
      <p className="mt-2 text-cool-gray">Contact form submissions from the public site.</p>

      {loading ? (
        <p className="mt-8 text-cool-gray">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="mt-8 text-cool-gray">No messages yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {messages.map((msg) => (
            <article
              key={msg.id}
              className={`glass rounded-2xl p-5 ${msg.read ? "opacity-80" : "border-cyan/30"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-off-white">
                    {msg.subject} {!msg.read && <span className="text-xs text-cyan">· unread</span>}
                  </p>
                  <p className="mt-1 text-sm text-cool-gray">
                    {msg.name} · {msg.email} · {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn-ghost !px-3 !py-1.5 text-xs"
                    onClick={() => patch(msg.id, { read: !msg.read })}
                  >
                    Mark {msg.read ? "unread" : "read"}
                  </button>
                  <button
                    type="button"
                    className="btn-ghost !px-3 !py-1.5 text-xs !border-red-400/40"
                    onClick={() => patch(msg.id, { delete: true })}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-off-white/90">{msg.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
