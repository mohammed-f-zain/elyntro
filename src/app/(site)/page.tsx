import { CapabilityPanel } from "@/components/site/CapabilityPanel";
import { HeroSection } from "@/components/site/HeroSection";
import { ParallaxBlock, SectionReveal } from "@/components/site/SectionReveal";
import { ServiceCard } from "@/components/site/ServiceCard";
import { ServicesCarousel } from "@/components/site/ServicesCarousel";
import { TechnologiesSection } from "@/components/site/TechnologiesSection";
import { TrustStats } from "@/components/site/TrustStats";
import { getPageContent, getPublishedServices, getSiteSettings } from "@/lib/cms";
import { serviceDetails } from "@/lib/company";
import { getSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return getSeoMetadata("/");
}

type HomeSections = {
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
  };
  stats: Array<{ label: string; value: string }>;
  servicesIntro: { title: string; subtitle: string };
};

export default async function HomePage() {
  const [settings, content, services] = await Promise.all([
    getSiteSettings(),
    getPageContent<HomeSections>("home"),
    getPublishedServices(),
  ]);

  const hero = content?.hero;
  const stats = content?.stats ?? [];
  const servicesIntro = content?.servicesIntro;
  const primaryServices = services
    .filter((s) =>
      ["Software Development", "AI & Automation", "Enterprise Solutions"].includes(s.title),
    )
    .slice(0, 3);
  const displayServices = primaryServices.length === 3 ? primaryServices : services.slice(0, 3);

  return (
    <>
      <HeroSection
        eyebrow={hero?.eyebrow ?? settings.name}
        titleLead={hero?.titleLead ?? "THINK FORWARD."}
        titleAccent={hero?.titleAccent ?? "BUILD SMARTER."}
        subtitle={
          hero?.subtitle ??
          "Intelligent technology built around your business. We design scalable software, connected systems, and AI-powered automation that turn complex challenges into measurable growth."
        }
        ctaPrimary={settings.ctaPrimary || "Start a Project"}
        ctaSecondary={settings.ctaSecondary || "Explore Solutions"}
      />

      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
        <ParallaxBlock speed={24}>
          <SectionReveal direction="blur">
            <TrustStats stats={stats} />
          </SectionReveal>
        </ParallaxBlock>
      </section>

      <section id="services" className="relative mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-cyan/5 blur-3xl" />
        <div className="mb-12 max-w-2xl">
          <SectionReveal direction="left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-cyan">Services</p>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-off-white md:text-4xl">
              {servicesIntro?.title ?? "From vision to execution."}
            </h2>
            <p className="mt-3 text-cool-gray">{servicesIntro?.subtitle}</p>
          </SectionReveal>
        </div>
        <ServicesCarousel
          services={displayServices.map((service) => ({
            id: service.id,
            title: service.title,
            description: service.description,
            icon: service.icon,
            points: serviceDetails[service.title]?.points?.slice(0, 3),
            outcome: serviceDetails[service.title]?.outcome,
          }))}
        />
        <div className="hidden gap-5 sm:grid-cols-2 md:grid lg:grid-cols-3">
          {displayServices.map((service, index) => (
            <SectionReveal
              key={service.id}
              delay={index * 0.1}
              direction={index === 1 ? "scale" : index === 2 ? "right" : "up"}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
                points={serviceDetails[service.title]?.points?.slice(0, 3)}
                outcome={serviceDetails[service.title]?.outcome}
              />
            </SectionReveal>
          ))}
        </div>
      </section>

      <TechnologiesSection />

      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <SectionReveal direction="left">
            <CapabilityPanel />
          </SectionReveal>
          <SectionReveal direction="right">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-cyan">
              How we deliver
            </p>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-off-white md:text-4xl">
              Software teams that ship measurable outcomes.
            </h2>
            <p className="mt-4 text-cool-gray">
              Elyntro partners with product and operations leaders to design, build, and run modern
              software—from customer-facing platforms to internal tools and AI-assisted workflows.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-cool-gray">
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                Discovery workshops that turn business goals into a clear technical roadmap
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                Dedicated squads for design, engineering, and quality—working in weekly increments
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                Production handoff with observability, documentation, and optional retained support
              </li>
            </ul>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
