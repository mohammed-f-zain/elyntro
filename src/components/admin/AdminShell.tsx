"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({ children, email }: { children: React.ReactNode; email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="relative flex min-h-screen bg-midnight text-off-white">
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border bg-deep-navy/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div>
          <p className="font-[family-name:var(--font-syne)] text-base font-bold">Elyntro Admin</p>
          <p className="truncate text-[11px] text-cool-gray">{email}</p>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-off-white"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {/* Backdrop (mobile) */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-deep-navy transition-transform duration-200 lg:static lg:translate-x-0 lg:min-h-screen",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="hidden border-b border-border px-5 py-6 lg:block">
          <p className="font-[family-name:var(--font-syne)] text-lg font-bold tracking-wide">
            Elyntro Admin
          </p>
          <p className="mt-1 truncate text-xs text-cool-gray">{email}</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4 pt-20 lg:pt-4">
          {links.map((link) => {
            const active =
              link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-cyan/15 text-cyan"
                    : "text-cool-gray hover:bg-midnight/60 hover:text-off-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-2 border-t border-border px-3 py-4">
          <button type="button" onClick={logout} className="btn-ghost w-full !py-2 text-sm">
            Log out
          </button>
          <Link
            href="/"
            className="block text-center text-xs text-cool-gray hover:text-cyan"
            onClick={() => setOpen(false)}
          >
            View site →
          </Link>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-5 pb-10 pt-20 lg:px-8 lg:pt-8">{children}</main>
    </div>
  );
}
