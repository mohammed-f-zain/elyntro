import { ContactForm } from "@/components/site/ContactForm";
import { SectionReveal } from "@/components/site/SectionReveal";
import { getPageContent, getSiteSettings } from "@/lib/cms";
import { contactReasons } from "@/lib/company";
import { getSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return getSeoMetadata("/contact");
}

type ContactSections = {
  hero: { title: string; subtitle: string };
};

export default async function ContactPage() {
  const [content, settings] = await Promise.all([
    getPageContent<ContactSections>("contact"),
    getSiteSettings(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionReveal direction="left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-cyan">Contact</p>
            <h1 className="font-[family-name:var(--font-syne)] text-[2.1rem] font-bold leading-tight text-off-white sm:text-4xl md:text-5xl">
              {content?.hero.title ?? "Tell us what you want to build."}
            </h1>
            <p className="mt-4 text-base text-cool-gray sm:mt-5 sm:text-lg">
              {content?.hero.subtitle ??
                "Share your product, platform, or automation goals. Messages go straight to the Elyntro team inbox—we typically reply within one business day."}
            </p>
          </SectionReveal>

          <SectionReveal className="mt-8" direction="blur">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="min-w-0 rounded-2xl border border-border bg-deep-navy/40 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.16em] text-cool-gray">Email</p>
                <p className="mt-1 break-words text-sm text-off-white">{settings.email}</p>
              </div>
              <div className="min-w-0 rounded-2xl border border-border bg-deep-navy/40 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.16em] text-cool-gray">Phone</p>
                <p className="mt-1 break-words text-sm text-off-white">{settings.phone}</p>
              </div>
              <div className="min-w-0 rounded-2xl border border-border bg-deep-navy/40 px-4 py-3 sm:col-span-1">
                <p className="text-xs uppercase tracking-[0.16em] text-cool-gray">Location</p>
                <p className="mt-1 break-words text-sm text-off-white">{settings.address}</p>
              </div>
            </div>
          </SectionReveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {contactReasons.map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.06} direction="up">
                <article className="h-full rounded-2xl border border-border bg-midnight/40 p-4 transition hover:border-cyan/30">
                  <h3 className="font-[family-name:var(--font-syne)] text-sm font-semibold text-off-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-cool-gray">{item.body}</p>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>

        <SectionReveal delay={0.1} direction="right">
          <ContactForm />
        </SectionReveal>
      </div>
    </div>
  );
}
