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
      <PageHero eyebrow="Services" title="Websites, Ads & Analytics — All Under One Roof." text="Get professional website design, expert Google Ads management, and accurate analytics and conversion tracking, all delivered by one dedicated specialist to help your business grow." cta="Let’s Get Started" />
      <nav className="service-jump-nav container-page" aria-label="Jump to a service">
        <div className="service-jump-nav__inner">
          <a href="#service-web-analytics">Analytics</a>
          <span aria-hidden="true" />
          <a href="#service-google-ads">Google Ads</a>
          <span aria-hidden="true" />
          <a href="#service-wordpress-woocommerce">WordPress</a>
          <span aria-hidden="true" />
          <a href="#service-shopify">Shopify</a>
          <span aria-hidden="true" />
          <a className="service-jump-nav__combo" href="/contact?service=combo">Combo</a>
        </div>
      </nav>
      <section className="container-page pt-7 pb-14 md:pt-9 md:pb-20"><ServiceGrid detailed /></section>
      <section className="container-page pb-6 md:pb-10">
        <SectionHead eyebrow="Process" title="From first call to growth" />
        <Process />
      </section>
      <CtaBand />
    </>
  ),
});
