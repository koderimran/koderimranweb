import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { SectionHead, Faq, faqJsonLd } from "@/components/Sections";
import { CtaBand } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";
import { Portrait } from "@/components/Portrait";

const TITLE = "About Imran | E-commerce Web Developer & Google Ads Specialist";
const DESC = "Meet Imran (Koder Imran), a Bangladesh-based WordPress, Shopify, Google Ads and GA4 specialist working with clients worldwide.";

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
      <section className="bg-grid rule-b">
        <div className="container-page grid items-center gap-8 py-12 sm:gap-10 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-12 lg:py-20">
          <Portrait alt="Portrait of Imran" className="animate-rise mx-auto aspect-[4/5] w-full max-w-sm lg:mx-0 rounded-[2rem] bg-muted shadow-soft" />
          <div>
            <p className="eyebrow animate-rise">About me</p>
            <h1 className="page-hero-title animate-rise text-reveal-load mt-4 font-bold" style={{ animationDelay: "90ms" }}>Hi, I'm Imran.</h1>
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
                <span key={s} className="pill rounded-full px-3 py-1.5 text-sm font-semibold">{s}</span>
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
