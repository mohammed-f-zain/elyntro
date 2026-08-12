import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { SectionReveal } from "@/components/site/SectionReveal";
import { ServicesCatalog } from "@/components/site/ServicesCatalog";
import { getPageContent } from "@/lib/cms";
import { servicesProcessSteps, serviceOfferings } from "@/lib/company";
import { getSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return getSeoMetadata("/services");
}

type ServicesPageSections = {
  hero: { title: string; subtitle: string };
  cta?: { title: string; subtitle: string; button: string };
};

/** Equal vertical rhythm between major Services page sections */
const SECTION_GAP = "flex flex-col gap-24 md:gap-32";

export default async function ServicesPage() {
  const content = await getPageContent<ServicesPageSections>("services");

  return (
    <div className={`mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8 md:pb-32 md:pt-20 ${SECTION_GAP}`}>
      <PageHero
        eyebrow="Services"
        title={content?.hero.title ?? "Technology services built around your business."}
        subtitle={
          content?.hero.subtitle ??
          "From high-performing websites and mobile applications to custom business systems, AI automation, and ongoing technical support, Elyntro turns ideas and operational challenges into reliable digital solutions."
        }
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary !py-2.5 text-sm">
            Discuss Your Project →
          </Link>
          <Link href="/solutions" className="btn-ghost !py-2.5 text-sm">
            Explore Business Solutions →
          </Link>
        </div>
      </PageHero>

      <div className="relative">
        <div className="pointer-events-none absolute -inset-x-8 -inset-y-8 -z-10 hidden rounded-[3rem] bg-gradient-to-b from-cyan/5 via-deep-navy/20 to-violet/5 md:block" />
        <ServicesCatalog services={serviceOfferings} />
      </div>

      <ProcessTimeline title="How we work" steps={servicesProcessSteps} className="mt-0" />

      <SectionReveal direction="up">
        <div className="relative overflow-hidden px-6 py-12 text-center md:px-10 md:py-14">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-royal/20 via-transparent to-violet/25" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent" />
          <h2 className="relative font-[family-name:var(--font-syne)] text-2xl font-bold text-off-white md:text-3xl">
            {content?.cta?.title ?? "Have an idea—or a process that needs improving?"}
          </h2>
          <p className="relative mx-auto mt-3 max-w-2xl text-[#B8C4D8]">
            {content?.cta?.subtitle ??
              "Tell us what you want to build, fix, or automate. We will help you identify the right approach and define a practical next step."}
          </p>
          <Link href="/contact" className="btn-primary relative mt-7">
            {content?.cta?.button ?? "Start Your Project"} →
          </Link>
        </div>
      </SectionReveal>
    </div>
  );
}
