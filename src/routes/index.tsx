import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { SectionHead, WorkGrid, Reviews, Process, Faq, faqJsonLd } from "@/components/Sections";
import { HomeServices } from "@/components/HomeServices";
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
                <p className="animate-rise mt-5 font-display text-4xl font-semibold leading-none tracking-[-0.04em] text-foreground sm:text-[2.75rem]" style={{ animationDelay: "45ms" }}>Hi, I'm <span className="bg-gradient-to-r from-[oklch(0.46_0.16_137)] via-[oklch(0.54_0.19_132)] to-[oklch(0.42_0.16_148)] bg-clip-text font-extrabold text-transparent dark:from-signal dark:via-[oklch(0.82_0.2_132)] dark:to-[oklch(0.7_0.19_145)]">Imran.</span></p>
                <h1 className="hero-title animate-rise mt-5 text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl" style={{ animationDelay: "90ms" }}>
                  <span className="hero-title-line">The Right Expertise</span>
                  <span className="hero-title-line">for Your <em className="font-serif font-medium italic text-[oklch(0.36_0.105_140)] dark:text-signal">Next Move.</em></span>
                </h1>
                <p className="animate-rise mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: "180ms" }}>
                  I help e-commerce brands scale with high-converting <strong className="text-foreground">Shopify & WordPress</strong> stores, precision <strong className="text-foreground">GA4 & GTM</strong> tracking, and ROI-focused <strong className="text-foreground">Google Ads</strong> campaigns.
                </p>
                <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "270ms" }}>
                  <Link to="/contact" className="btn btn-ink rounded-full px-7 py-4 font-bold">Get Free Audit</Link>
                  <Link to="/portfolio" className="btn btn-outline rounded-full px-7 py-4 font-bold">See my work</Link>
                </div>
                <p className="animate-rise mt-6 text-sm text-muted-foreground" style={{ animationDelay: "360ms" }}>Trusted by clients in the USA, UK & Europe</p>
              </div>
              <div className="hero-specialism animate-rise" style={{ animationDelay: "450ms" }}>
                <p className="hero-specialism-label">Specialist in</p>
                <ul className="hero-specialism-list">
                  {["Google Ads", "GA4 & GTM", "Shopify", "WordPress"].map((t) => <li key={t} className="hero-specialism-chip">{t}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="container-page grid grid-cols-2 gap-6 py-8 text-center md:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.v} delay={i * 90}>
                <p className="font-display text-3xl font-bold">{s.k}</p>
                <p className="text-sm text-muted-foreground">{s.v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHead eyebrow="Services" title={<>Everything your online business <em className="font-serif font-medium italic text-[oklch(0.36_0.105_140)] dark:text-signal">needs to grow.</em></>} text="One specialist for your store, your data and your ads — so nothing gets lost between agencies." />
        <HomeServices />
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
