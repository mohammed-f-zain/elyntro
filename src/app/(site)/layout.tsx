import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { SiteEffects } from "@/components/site/SiteEffects";
import { getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <SiteEffects>
      <div className="flex min-h-full flex-col overflow-x-clip">
        <Navbar ctaLabel="Let's Talk" />
        <main className="min-w-0 flex-1">{children}</main>
        <Footer settings={settings} />
      </div>
    </SiteEffects>
  );
}
