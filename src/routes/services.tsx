import { createFileRoute } from "@tanstack/react-router";
import { SITE, SERVICES } from "@/lib/site";
import { PageHero, ServiceGrid, Process, SectionHead } from "@/components/Sections";
import { CtaBand } from "@/components/SiteChrome";

const TITLE = "Services: Google Ads, GA4 Tracking, Shopify & WooCommerce | Al Imran";
const DESC = "Google Ads management, GA4 & Google Tag Manager tracking, Shopify store development and WordPress/WooCommerce websites for growing e-commerce brands.";

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
      <PageHero eyebrow="Services" title="Growth services for e-commerce & service businesses" text="Build the store, measure every conversion, and scale with Google Ads — handled by one accountable specialist." />
      <section className="container-page py-16"><ServiceGrid detailed /></section>
      <section className="container-page pb-8">
        <SectionHead eyebrow="Process" title="From first call to growth" />
        <Process />
      </section>
      <CtaBand />
    </>
  ),
});
