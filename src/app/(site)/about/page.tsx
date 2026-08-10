import Link from "next/link";
import { BrandScene } from "@/components/site/BrandScene";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { SectionReveal } from "@/components/site/SectionReveal";
import { getPageContent } from "@/lib/cms";
import { aboutHighlights } from "@/lib/company";
import { getSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return getSeoMetadata("/about");
}

type AboutSections = {
  hero: { title: string; subtitle: string };
  mission: { title: string; body: string };
  approach: { title: string; items: Array<{ title: string; body: string }> };
  values: { title: string; items: Array<{ title: string; body: string }> };
};

const fallbackApproach = [
  {
    title: "Discover",
    body: "Workshops with stakeholders to define success metrics, constraints, and system reality.",
  },
  {
    title: "Design",
    body: "Architecture and experience plans that balance speed, security, and maintainability.",
  },
  {
    title: "Deliver",
    body: "Weekly shipping, transparent demos, and production-ready handoff with documentation.",
  },
];

const fallbackValues = [
  {
    title: "Clarity",
    body: "We speak in outcomes and trade-offs—so decisions stay fast and shared.",
  },
  {
    title: "Craft",
    body: "Interfaces and systems should feel intentional, durable, and easy to operate.",
  },
  {
    title: "Momentum",
    body: "Progress every week: visible demos, measured quality, and continuous learning.",
  },
];

export default async function AboutPage() {
  const content = await getPageContent<AboutSections>("about");
  const approach = content?.approach.items?.length ? content.approach.items : fallbackApproach;
  const values = content?.values.items?.length ? content.values.items : fallbackValues;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionReveal direction="blur">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-cyan">About</p>
          <h1 className="max-w-3xl font-[family-name:var(--font-syne)] text-[2.1rem] font-bold leading-tight text-off-white sm:text-4xl md:text-5xl">
            {content?.hero.title ?? "A software partner built for compounding results."}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-cool-gray sm:mt-5 sm:text-lg">
            {content?.hero.subtitle ??
              "Elyntro is a product engineering company. We design and ship software, platforms, and AI systems that stay sharp as your business scales."}
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Work with us →
          </Link>
        </SectionReveal>
        <SectionReveal direction="right">
          <BrandScene
            src="/brand/elyntro-logo-white.png"
            caption="Think forward. Build smarter. — software, systems, and AI under one roof."
          />
        </SectionReveal>
      </div>

      <SectionReveal className="mt-14" direction="blur">
        <div className="grid gap-3 rounded-2xl border border-border bg-deep-navy/45 p-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutHighlights.map((item) => (
            <div key={item.label} className="px-3 py-4 text-center sm:text-left">
              <p className="font-[family-name:var(--font-syne)] text-3xl font-bold text-off-white">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-cool-gray">{item.label}</p>
            </div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mt-14">
        <div className="glass rounded-3xl p-8 md:p-10">
          <h2 className="font-[family-name:var(--font-syne)] text-2xl font-semibold text-off-white">
            {content?.mission.title ?? "Our mission"}
          </h2>
          <p className="mt-3 max-w-3xl text-cool-gray">
            {content?.mission.body ??
              "Help organizations think forward—shipping intelligent products that are secure, measurable, and built for the long run."}
          </p>
        </div>
      </SectionReveal>

      <section className="mt-16">
        <SectionReveal>
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-off-white">
            {content?.approach.title ?? "How we work"}
          </h2>
        </SectionReveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {approach.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.08} direction="up">
              <article className="glass h-full rounded-2xl p-6 transition hover:-translate-y-1 hover:border-cyan/30">
                <p className="mb-3 text-sm font-semibold text-cyan">0{index + 1}</p>
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-off-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cool-gray">{item.body}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </section>

      <ProcessTimeline title="Engagement rhythm" />

      <section className="mt-16">
        <SectionReveal>
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-off-white">
            {content?.values.title ?? "What we value"}
          </h2>
        </SectionReveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {values.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.08} direction="scale">
              <article className="rounded-2xl border border-border bg-gradient-to-b from-deep-navy/70 to-midnight/40 p-6">
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold gradient-text">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cool-gray">{item.body}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
