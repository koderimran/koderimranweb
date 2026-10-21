import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { PageHero, WorkGrid, Reviews, SectionHead } from "@/components/Sections";
import { CtaBand } from "@/components/SiteChrome";

const TITLE = "Portfolio: Shopify, WooCommerce & WordPress Websites | Imran Hasan";
const DESC = "Selected Shopify, WooCommerce and WordPress websites designed and developed by Imran Hasan for clients worldwide.";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE.url + "/portfolio" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Portfolio" title="Recent websites & online stores" text="E-commerce stores, business sites and landing pages built for speed, clarity and conversions." />
      <section className="container-page py-16"><WorkGrid /></section>
      <section className="container-page pb-8">
        <SectionHead eyebrow="Reviews" title="Results clients talk about" />
        <Reviews />
      </section>
      <CtaBand />
    </>
  ),
});
