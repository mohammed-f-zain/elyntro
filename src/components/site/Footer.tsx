import Link from "next/link";
import { BrandLogo } from "@/components/site/BrandLogo";
import type { SiteSettings } from "@/lib/cms";

type FooterProps = {
  settings: SiteSettings;
};

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-border bg-midnight/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div className="min-w-0">
          <BrandLogo className="mb-4 h-10 max-w-[220px] sm:h-12 sm:max-w-[280px]" height={56} />
          <p className="max-w-sm text-sm leading-relaxed text-cool-gray">{settings.tagline}</p>
        </div>
        <div>
          <h3 className="mb-3 font-[family-name:var(--font-syne)] text-sm font-semibold uppercase tracking-[0.16em] text-off-white">
            Explore
          </h3>
          <ul className="space-y-2 text-sm text-cool-gray">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-cyan">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-[family-name:var(--font-syne)] text-sm font-semibold uppercase tracking-[0.16em] text-off-white">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-cool-gray">
            <li>{settings.email}</li>
            <li>{settings.phone}</li>
            <li>{settings.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70 px-5 py-4 text-center text-xs text-cool-gray md:px-8">
        © {new Date().getFullYear()} {settings.name}. All rights reserved.
      </div>
    </footer>
  );
}
