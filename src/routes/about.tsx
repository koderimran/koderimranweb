import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { SectionHead, Faq, faqJsonLd } from "@/components/Sections";
import { CtaBand } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";

const TITLE = "About Imran Hasan | E-commerce Web Developer & Google Ads Specialist";
const DESC = "Meet Imran Hasan (Koder Imran), a Bangladesh-based WordPress, Shopify, Google Ads and GA4 specialist working with clients worldwide.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
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
          <img src={SITE.portrait} alt="Portrait of Imran Hasan" className="animate-rise aspect-[4/5] w-full max-w-sm rounded-[2rem] bg-muted object-cover shadow-soft" />
          <div>
            <p className="eyebrow animate-rise">About me</p>
            <h1 className="animate-rise mt-4 text-4xl font-bold md:text-6xl" style={{ animationDelay: "90ms" }}>Hi, I'm Imran Hasan.</h1>
            <p className="animate-rise mt-6 text-lg text-muted-foreground" style={{ animationDelay: "180ms" }}>
              I'm a web developer and digital marketer from {SITE.location}. I help e-commerce brands and service
              businesses build websites that convert, set up analytics they can trust, and run Google Ads that are
              profitable.
            </p>
            <p className="animate-rise mt-4 text-lg text-muted-foreground" style={{ animationDelay: "270ms" }}>
              Most businesses lose money in the gaps — a slow store, broken tracking, or ads optimised on bad data. I
              close those gaps by handling the website, the tracking and the ads together.
            </p>
            <Reveal className="mt-8 flex flex-wrap gap-2" delay={360}>
              {SKILLS.map((s) => (
                <span key={s} className="rounded-full border bg-card px-3 py-1.5 text-sm font-semibold">{s}</span>
              ))}
            </Reveal>
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
