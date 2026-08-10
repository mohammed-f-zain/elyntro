"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import { useHydrationSafeReducedMotion } from "@/lib/motion";
import { BrandLogo } from "@/components/site/BrandLogo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type NavbarProps = {
  ctaLabel?: string;
};

export function Navbar({ ctaLabel = "Let's Talk" }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useHydrationSafeReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const drawer =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/55 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={reduce ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduce ? undefined : { x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-[70] flex h-dvh w-[min(20rem,86vw)] flex-col border-l border-border bg-deep-navy shadow-[-20px_0_60px_rgba(0,0,0,0.45)] lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <p className="font-[family-name:var(--font-syne)] text-sm font-semibold tracking-wide text-off-white">
                  Menu
                </p>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-off-white"
                  onClick={() => setOpen(false)}
                >
                  ×
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={reduce ? false : { x: 16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.04 + i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-sm font-medium transition",
                        pathname === link.href
                          ? "bg-cyan/15 text-cyan"
                          : "text-off-white hover:bg-midnight/60",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="border-t border-border p-4">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full text-center text-sm"
                >
                  {ctaLabel}
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 border-b border-border/80 bg-midnight/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-5 md:px-8 md:py-3.5">
          <Link
            href="/"
            className="flex min-w-0 shrink items-center py-1"
            onClick={() => setOpen(false)}
            aria-label="Elyntro home"
          >
            <BrandLogo
              height={56}
              priority
              className="h-9 max-w-[min(200px,52vw)] sm:h-11 sm:max-w-[240px] md:h-12 md:max-w-[280px]"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium tracking-wide transition-colors",
                    active ? "text-cyan" : "text-cool-gray hover:text-off-white",
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-cyan to-violet"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="btn-ghost !hidden !px-4 !py-2 text-sm lg:!inline-flex"
            >
              {ctaLabel}
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-off-white lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="text-lg">{open ? "×" : "☰"}</span>
            </button>
          </div>
        </div>
      </motion.header>
      {drawer}
    </>
  );
}
