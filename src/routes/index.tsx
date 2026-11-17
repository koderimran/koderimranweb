import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
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
      <section className="home-section-divider overflow-x-clip">
        <div className="hero-backdrop">
          <div className="hero-photo-stage container-page" aria-hidden="true">
            <div className="hero-service-marquee" aria-label="Google Ads, Web Analytics, Shopify and WordPress">
              <div className="hero-service-marquee-track" aria-hidden="true">
                <span>GOOGLE ADS <i>✳</i> WEB ANALYTICS <i>✳</i> SHOPIFY <i>✳</i> WORDPRESS <i>✳</i> </span>
                <span>GOOGLE ADS <i>✳</i> WEB ANALYTICS <i>✳</i> SHOPIFY <i>✳</i> WORDPRESS <i>✳</i> </span>
              </div>
            </div>
            <Portrait alt="Imran, Google Ads and e-commerce web specialist" className="hero-background-photo" />
          </div>
          <div className="hero-photo-blend" aria-hidden="true" />
          <div className="container-page hero-content">
            <div className="hero-row">
              <div className="hero-copy">
                <p className="animate-rise mt-5 font-display text-4xl font-semibold leading-none tracking-[-0.04em] text-foreground sm:text-[2.75rem]" style={{ animationDelay: "45ms" }}>Hi, I'm <span className="bg-gradient-to-r from-[oklch(0.46_0.16_137)] via-[oklch(0.54_0.19_132)] to-[oklch(0.42_0.16_148)] bg-clip-text font-extrabold text-transparent dark:from-signal dark:via-[oklch(0.82_0.2_132)] dark:to-[oklch(0.7_0.19_145)]">Imran.</span></p>
                <h1 className="hero-title animate-rise text-reveal-load mt-5 text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl" style={{ animationDelay: "90ms" }}>
                  <span className="hero-title-line">The Right Expertise</span>
                  <span className="hero-title-line">for Your <em className="font-serif font-medium italic text-[oklch(0.36_0.105_140)] dark:text-signal">Next Move.</em></span>
                </h1>
                <p className="animate-rise mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: "180ms" }}>
                  I help e-commerce brands scale with high-converting <strong className="text-foreground">Shopify & WordPress</strong> stores, precision <strong className="text-foreground">GA4 & GTM</strong> tracking, and ROI-focused <strong className="text-foreground">Google Ads</strong> campaigns.
                </p>
                <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "270ms" }}>
                  <Link to="/contact" className="btn btn-ink inline-flex items-center gap-2 rounded-full px-7 py-4 font-bold">Get Free Audit <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
                  <Link to="/portfolio" className="btn btn-outline inline-flex items-center gap-2 rounded-full px-7 py-4 font-bold">See my work <span className="btn-arrow">→</span></Link>
                </div>
                <p className="animate-rise mt-6 text-sm text-muted-foreground" style={{ animationDelay: "360ms" }}>Trusted by clients in the USA, UK & Europe</p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-section-top-rule">
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

      <section className="home-section-divider container-page py-20">
        <Reveal className="w-full">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="min-w-0 w-full md:w-1/2">
              <p className="eyebrow">Services</p>
              <h2 className="text-reveal mt-3 w-full text-3xl font-bold md:text-5xl">Everything your online business <em className="font-serif font-medium italic text-[oklch(0.36_0.105_140)] dark:text-signal">needs to grow.</em></h2>
            </div>
            <p className="max-w-xl text-lg text-muted-foreground md:pb-1">One specialist for your store, your data and your ads — so nothing gets lost between agencies.</p>
          </div>
        </Reveal>
        <HomeServices />
      </section>

      <section className="home-section-divider bg-secondary/50">
        <div className="container-page py-20">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="min-w-0"><SectionHead eyebrow="Selected work" title={<>Websites and campaigns built for <em className="font-serif font-medium italic text-[oklch(0.36_0.105_140)] dark:text-signal">measurable growth.</em></>} /></div>
            <Link to="/portfolio" className="btn btn-outline mb-1 inline-flex shrink-0 items-center gap-2 self-start rounded-full px-6 py-3 font-bold sm:self-auto">Browse all projects <span className="btn-arrow">→</span></Link>
          </div>
          <WorkGrid limit={3} featured />
        </div>
      </section>

      <div className="home-proof-atmosphere">
        <section className="home-section-divider container-page py-20">
          <Reveal className="w-full">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="min-w-0 w-full md:w-1/2">
                <p className="eyebrow">How I work</p>
                <h2 className="mt-3 w-full text-3xl font-bold md:text-5xl">A process built around your service</h2>
              </div>
              <p className="max-w-xl text-lg text-muted-foreground md:pb-1">Choose a service to explore the steps, from the first conversation to launch and ongoing improvement.</p>
            </div>
          </Reveal>
          <Process />
        </section>

        <section className="home-section-divider testimonial-section overflow-hidden py-20 text-foreground dark:text-white">
          <div className="container-page">
            <Reviews />
          </div>
        </section>

        <section className="home-section-divider home-section-divider--no-bottom-rule container-page py-20">
          <SectionHead eyebrow="FAQ" title="Questions clients ask" />
          <Faq />
        </section>

        <CtaBand />
      </div>
    </>
  );
}
