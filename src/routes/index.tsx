import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { SectionHead, SectionIntro, WorkGrid, Reviews, Process, Faq, faqJsonLd } from "@/components/Sections";
import { HomeServices } from "@/components/HomeServices";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/SiteChrome";
import { AmbientGlow, AmbientGrid } from "@/components/Ambient";
import { Portrait } from "@/components/Portrait";
import { CinematicIntro } from "@/components/CinematicIntro";

const HERO_MARQUEE = ["Google Ads", "Web Analytics", "Shopify", "WordPress"];

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
      { property: "og:image", content: SITE.portraitUrl },
      { name: "twitter:image", content: SITE.portraitUrl },
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
  const marqueeStage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Pause the hero ticker while the hero is scrolled out of view.
    const el = marqueeStage.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.paused = entry.isIntersecting ? "false" : "true";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <section className="home-section-divider overflow-x-clip">
        <div className="hero-backdrop">
          <AmbientGlow />
          <div className="hero-photo-stage container-page" aria-hidden="true">
            <Portrait alt="Imran, Google Ads and e-commerce web specialist" className="hero-background-photo" />
          </div>
          <div ref={marqueeStage} className="container-page hero-marquee-stage" aria-hidden="true">
            <div className="hero-service-marquee">
              <div className="hero-service-marquee-track">
                {/* One span; labels repeat 4x so each half is wider than the ticker and the -50% loop never shows a gap. */}
                <span>
                  {[0, 1, 2, 3].flatMap((copy) =>
                    HERO_MARQUEE.flatMap((label) => [
                      <b key={`${copy}-${label}`}>{label}</b>,
                      <i key={`${copy}-${label}-dot`}>✳</i>,
                    ]),
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="hero-photo-blend" aria-hidden="true" />
          <div className="container-page hero-content">
            <div className="hero-row">
              <div className="hero-copy">
                <p className="animate-rise mt-5 font-display text-4xl font-semibold leading-none tracking-[-0.04em] text-foreground sm:text-[2.75rem]" style={{ animationDelay: "45ms" }}>Hi, I'm <span className="name-gradient font-extrabold">Imran.</span></p>
                <h1 className="hero-title title-settle mt-5 text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
                  <span className="hero-title-line">The Right Expertise</span>
                  <span className="hero-title-line">For Your <em className="accent-text font-serif font-medium italic">Next Move.</em></span>
                </h1>
                <p className="animate-rise mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: "180ms" }}>
                  I help e-commerce brands scale with high-converting <strong className="text-foreground">Shopify & WordPress</strong> stores, precision <strong className="text-foreground">GA4 & GTM</strong> tracking, and ROI-focused <strong className="text-foreground">Google Ads</strong> campaigns.
                </p>
                <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "270ms" }}>
                  <Link to="/contact" className="btn btn-lg btn-signal">Get a free audit <ArrowUpRight className="btn-arrow-up size-4" aria-hidden="true" /></Link>
                  <Link to="/portfolio" className="btn btn-lg btn-outline">See my work <ArrowRight className="btn-arrow size-4" aria-hidden="true" /></Link>
                </div>
                <p className="animate-rise mt-6 text-sm text-muted-foreground" style={{ animationDelay: "360ms" }}>Trusted by clients in the USA, UK & Europe</p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-section-top-rule home-stats-section">
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

      <section className="home-section-divider home-services-section container-page py-20">
        <SectionIntro
          eyebrow="Services"
          title={<>Everything your online business <em className="accent-text font-serif font-medium italic">needs to grow.</em></>}
          text="One specialist for your store, your data and your ads — so nothing gets lost between agencies."
        />
        <HomeServices />
      </section>

      <section className="home-section-divider bg-secondary/50">
        <div className="container-page py-20">
          <SectionIntro
            eyebrow="Selected work"
            title={<>Websites and campaigns built for <em className="accent-text font-serif font-medium italic">measurable growth.</em></>}
            action={
              <Link to="/portfolio" className="btn btn-lg btn-outline">Browse all projects <ArrowRight className="btn-arrow size-4" aria-hidden="true" /></Link>
            }
          />
          <WorkGrid limit={3} featured />
        </div>
      </section>

      <div className="home-proof-atmosphere">
        <section className="home-section-divider ambient-grid-host container-page py-20">
          <AmbientGrid />
          <SectionIntro
            eyebrow="How I work"
            title="A process built around your service"
            text="Choose a service to explore the steps, from the first conversation to launch and ongoing improvement."
          />
          <Process />
        </section>

        <section className="home-section-divider ambient-host testimonial-section overflow-hidden py-20 text-foreground">
          <AmbientGlow variant="proof" />
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
