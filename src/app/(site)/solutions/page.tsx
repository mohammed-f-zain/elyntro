import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { SectionReveal } from "@/components/site/SectionReveal";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { getPageContent } from "@/lib/cms";
import { industries, solutionOutcomes } from "@/lib/company";
import { getSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return getSeoMetadata("/solutions");
}

type SolutionsSections = {
  hero: { title: string; subtitle: string };
  items: Array<{ title: string; body: string; icon: string }>;
};

const fallbackItems = [
  {
    title: "Customer platforms",
    body: "Portals, SaaS products, and self-serve experiences with auth, billing hooks, and analytics.",
    icon: "network",
  },
  {
    title: "Operations automation",
    body: "Replace spreadsheet and ticket loops with workflows, alerts, and AI-assisted triage.",
    icon: "spark",
  },
  {
    title: "Data & integrations",
    body: "Connect CRMs, ERPs, and internal tools into a reliable source of truth.",
    icon: "cube",
  },
];

export default async function SolutionsPage() {
  const content = await getPageContent<SolutionsSections>("solutions");
  const items = content?.items?.length ? content.items : fallbackItems;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
      <PageHero
        eyebrow="Solutions"
        title={content?.hero.title ?? "Solutions mapped to real business problems."}
        subtitle={
          content?.hero.subtitle ??
          "We don’t sell generic packages. We assemble platforms, automation, and integrations around the outcomes that matter to your team."
        }
      />

      <SectionReveal className="mt-12" direction="blur">
        <div className="grid gap-3 rounded-2xl border border-border bg-deep-navy/40 p-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutionOutcomes.map((item) => (
            <div key={item.label} className="rounded-xl px-3 py-4 text-center sm:text-left">
              <p className="font-[family-name:var(--font-syne)] text-2xl font-bold text-off-white">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-cool-gray">{item.label}</p>
            </div>
          ))}
        </div>
      </SectionReveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item, index) => (
          <SectionReveal key={item.title} delay={index * 0.08} direction={index === 1 ? "scale" : "up"}>
            <article className="glass group h-full rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan/35">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 text-cyan transition group-hover:scale-105">
                <ServiceIcon icon={item.icon} />
              </div>
              <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-off-white">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-cool-gray">{item.body}</p>
              <div className="mt-5 h-px w-0 bg-gradient-to-r from-cyan to-violet transition-all duration-500 group-hover:w-full" />
            </article>
          </SectionReveal>
        ))}
      </div>

      <section className="mt-20">
        <SectionReveal direction="left">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-off-white">
            Who we build for
          </h2>
          <p className="mt-3 max-w-2xl text-cool-gray">
            Product companies, operators, and internal platform teams that need software that holds up
            under real usage.
          </p>
        </SectionReveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {industries.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.07} direction={index % 2 ? "right" : "left"}>
              <article className="rounded-2xl border border-border bg-gradient-to-br from-deep-navy/80 to-midnight/40 p-6 transition hover:border-cyan/30">
                <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-off-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cool-gray">{item.body}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </section>

      <ProcessTimeline title="From problem to production" />

      <SectionReveal className="mt-16">
        <div className="gradient-border rounded-3xl px-6 py-10 text-center md:px-10">
          <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-off-white md:text-3xl">
            Have a workflow or platform to transform?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cool-gray">
            Tell us what is slow, fragile, or stuck in spreadsheets—we’ll propose a concrete path.
          </p>
          <Link href="/contact" className="btn-primary mt-7">
            Start a Project →
          </Link>
        </div>
      </SectionReveal>
    </div>
  );
}
