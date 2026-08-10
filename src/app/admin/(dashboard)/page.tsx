import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminOverviewPage() {
  const [unreadMessages, totalMessages, services, publishedServices, latestSeo] = await Promise.all([
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.contactMessage.count(),
    prisma.service.count(),
    prisma.service.count({ where: { published: true } }),
    prisma.seoMeta.findFirst({ orderBy: { updatedAt: "desc" } }),
  ]);

  const cards = [
    { label: "Unread messages", value: unreadMessages, href: "/admin/messages" },
    { label: "Total messages", value: totalMessages, href: "/admin/messages" },
    { label: "Published services", value: publishedServices, href: "/admin/services" },
    { label: "All services", value: services, href: "/admin/services" },
  ];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold">Overview</h1>
      <p className="mt-2 text-cool-gray">Control center for Elyntro content, SEO, and inbox.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="glass rounded-2xl p-5 transition hover:border-cyan/40">
            <p className="text-sm text-cool-gray">{card.label}</p>
            <p className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold text-off-white">
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="glass mt-6 rounded-2xl p-5">
        <p className="text-sm text-cool-gray">Latest SEO update</p>
        <p className="mt-2 text-off-white">
          {latestSeo
            ? `${latestSeo.path} · ${new Date(latestSeo.updatedAt).toLocaleString()}`
            : "No SEO records yet"}
        </p>
        <Link href="/admin/seo" className="mt-3 inline-block text-sm text-cyan hover:underline">
          Manage SEO →
        </Link>
      </div>
    </div>
  );
}
