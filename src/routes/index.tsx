import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { SectionHead, ServiceGrid, WorkGrid, Reviews, Process, Faq, faqJsonLd } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/SiteChrome";
import { Portrait } from "@/components/Portrait";

const TITLE = "Imran | Google Ads, GA4 Tracking, Shopify & WordPress Expert";
const DESC =
  "Imran (Koder Imran) helps e-commerce brands grow with Google Ads management, GA4 & GTM tracking, Shopify stores and WordPress/WooCommerce websites.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: SITE.portraitLight },
      { name: "twitter:image", content: SITE.portraitLight },
    ],
    links: [{ rel: "canonical", href: SITE.url + "/" }],
    scripts: [faqJsonLd()],
  }),
  component: Index,
});

const STATS = [
  { k: "100+", v: "Projects delivered" },
  { k: "5★", v: "Average client rating" },
  { k: "4+ yrs", v: "Hands-on experience" },
  { k: "24/7", v: "Support & communication" },
];

function Index() {
  return (
    <>
      <section className="overflow-x-clip border-b">
        <div className="hero-backdrop">
          <div className="hero-photo-stage container-page" aria-hidden="true">
            <Portrait alt="Imran, Google Ads and e-commerce web specialist" className="hero-background-photo" />
          </div>
          <div className="hero-photo-blend" aria-hidden="true" />
          <div className="container-page hero-content">
          <div className="hero-row">
          <div className="hero-copy">
            <p className="animate-rise inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-semibold">
              <span className="animate-pulse-dot size-2 rounded-full bg-signal" /> Available for new projects
            </p>
            <h1 className="hero-title animate-rise mt-6 text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl" style={{ animationDelay: "90ms" }}>
              <span className="hero-title-line">The Right Expertise</span>
              <span className="hero-title-line">for Your <em className="font-serif font-medium italic text-[oklch(0.36_0.105_140)] dark:text-signal">Next Move.</em></span>
            </h1>
            <p className="animate-rise mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: "180ms" }}>
              I'm <strong className="text-foreground">Imran</strong> — a Google Ads, web analytics, and e-commerce specialist. I build Shopify and WordPress stores, implement precise conversion tracking with GA4 and GTM, and run data-driven ad campaigns that turn clicks into customers.
            </p>
            <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "270ms" }}>
              <Link to="/contact" className="btn btn-ink rounded-full px-7 py-4 font-bold">
                Get Free Audit
              </Link>
              <Link to="/portfolio" className="btn btn-outline rounded-full px-7 py-4 font-bold">
                See my work
              </Link>
            </div>

            <p className="animate-rise mt-6 text-sm text-muted-foreground" style={{ animationDelay: "360ms" }}>Trusted by clients in the USA, UK & Europe</p>
          </div>
          <div className="hero-specialism animate-rise" style={{ animationDelay: "450ms" }}>
            <p className="hero-specialism-label">Specialist in</p>
            <ul className="hero-specialism-list">
              {["Google Ads", "GA4 & GTM", "Shopify", "WordPress"].map((t) => (
                <li key={t} className="hero-specialism-chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          </div>
          </div>
        </div>
        <div className="container-page grid grid-cols-2 gap-6 border-t py-8 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.v} delay={i * 90}>
              <p className="font-display text-3xl font-bold">{s.k}</p>
              <p className="text-sm text-muted-foreground">{s.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHead eyebrow="Services" title="Everything your online business needs to grow" text="One specialist for your store, your data and your ads — so nothing gets lost between agencies." />
        <ServiceGrid />
      </section>

      <section className="border-y bg-secondary/50">
        <div className="container-page py-20">
          <SectionHead eyebrow="Recent work" title="Websites that look great and sell" />
          <WorkGrid limit={3} />
          <Link to="/portfolio" className="link-arrow mt-8 underline">Browse all projects <span className="btn-arrow">→</span></Link>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHead eyebrow="How I work" title="A simple, transparent process" />
        <Process />
      </section>

      <section className="container-page pb-20">
        <SectionHead eyebrow="Client reviews" title="What clients say" />
        <Reviews />
      </section>

      <section className="container-page pb-4">
        <SectionHead eyebrow="FAQ" title="Questions clients ask" />
        <Faq />
      </section>

      <CtaBand />
    </>
  );
}
