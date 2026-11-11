import { createFileRoute } from "@tanstack/react-router";
import { SITE, SERVICES } from "@/lib/site";
import { PageHero, ServiceGrid, Process, SectionHead } from "@/components/Sections";
import { CtaBand } from "@/components/SiteChrome";

const TITLE = "Services: Conversion Tracking, Google Ads, Shopify & WordPress | Koder Imran";
const DESC = "Web analytics and conversion tracking, Google Ads management, Shopify store design and growth, and WordPress website design and tracking by Koder Imran.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE.url + "/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": SERVICES.map((s) => ({
            "@type": "Service",
            name: s.title,
            description: s.answer,
            areaServed: "Worldwide",
            provider: { "@type": "Person", name: SITE.name, url: SITE.url },
          })),
        }),
      },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Services" title="The right expertise for your next move" text="Explore my services in analytics, Google Ads, Shopify and WordPress. See what’s included, the outcomes to expect, and choose a package that fits your project." />
      <section className="container-page py-14 md:py-20"><ServiceGrid detailed /></section>
      <section className="container-page pb-6 md:pb-10">
        <SectionHead eyebrow="Process" title="From first call to growth" />
        <Process />
      </section>
      <CtaBand />
    </>
  ),
});
