import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { SectionReveal } from "@/components/site/SectionReveal";
import { ServiceCard } from "@/components/site/ServiceCard";
import { getPageContent, getPublishedServices } from "@/lib/cms";
import { serviceDetails, techStack } from "@/lib/company";
import { getSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return getSeoMetadata("/services");
}

type ServicesPageSections = {
  hero: { title: string; subtitle: string };
};

export default async function ServicesPage() {
  const [content, services] = await Promise.all([
    getPageContent<ServicesPageSections>("services"),
    getPublishedServices(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
      <PageHero
        eyebrow="Services"
        title={content?.hero.title ?? "Engineering services that ship."}
        subtitle={
          content?.hero.subtitle ??
          "From custom software to AI automation and enterprise platforms—scoped around outcomes, owned end to end."
        }
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary !py-2.5 text-sm">
            Start a Project →
          </Link>
          <Link href="/solutions" className="btn-ghost !py-2.5 text-sm">
            Explore Solutions →
          </Link>
        </div>
      </PageHero>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const detail = serviceDetails[service.title];
          return (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
              points={detail?.points}
              outcome={detail?.outcome}
            />
          );
        })}
      </div>

      <ProcessTimeline title="How we deliver services" />

      <SectionReveal className="mt-20" direction="blur">
        <div className="glass rounded-3xl p-8 md:p-10">
          <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-off-white md:text-3xl">
            Stack we work with daily
          </h2>
          <p className="mt-3 max-w-2xl text-cool-gray">
            We pick tools for longevity and team velocity—not novelty. Typical engagements use a
            modern TypeScript or Python core with cloud-native delivery.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-border bg-midnight/50 px-3 py-1.5 text-sm text-cool-gray transition hover:border-cyan/40 hover:text-off-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
