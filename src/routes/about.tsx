import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { SectionHead, Faq, faqJsonLd } from "@/components/Sections";
import { CtaBand } from "@/components/SiteChrome";

const TITLE = "About Al Imran | E-commerce Web Developer & Google Ads Specialist";
const DESC = "Meet Al Imran (CoderImranBD), a Bangladesh-based WordPress, Shopify, Google Ads and GA4 specialist working with clients worldwide.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:image", content: SITE.portrait },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: SITE.portrait },
    ],
    links: [{ rel: "canonical", href: SITE.url + "/about" }],
    scripts: [faqJsonLd()],
  }),
  component: About,
});

const SKILLS = ["Google Ads", "Performance Max", "Merchant Center", "GA4", "Google Tag Manager", "Meta CAPI", "Looker Studio", "Shopify", "Liquid", "WordPress", "WooCommerce", "Elementor Pro", "Speed optimisation", "Technical SEO"];

function About() {
  return (
    <>
      <section className="bg-grid border-b">
        <div className="container-page grid items-center gap-12 py-20 md:grid-cols-[1fr_1.3fr]">
          <img src={SITE.portrait} alt="Portrait of Al Imran" className="aspect-[4/5] w-full max-w-sm rounded-[2rem] bg-muted object-cover shadow-soft" />
          <div>
            <p className="eyebrow">About me</p>
            <h1 className="mt-4 text-4xl font-bold md:text-6xl">Hi, I'm Al Imran.</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              I'm a web developer and digital marketer from {SITE.location}. I help e-commerce brands and service
              businesses build websites that convert, set up analytics they can trust, and run Google Ads that are
              profitable.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Most businesses lose money in the gaps — a slow store, broken tracking, or ads optimised on bad data. I
              close those gaps by handling the website, the tracking and the ads together.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <span key={s} className="rounded-full border bg-card px-3 py-1.5 text-sm font-semibold">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="container-page py-20">
        <SectionHead eyebrow="FAQ" title="Working with me" />
        <Faq />
      </section>
      <CtaBand />
    </>
  );
}
