import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SITE, WORKS, DEMO_STATS, SHOW_DEMO_BADGE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Reviews } from "@/components/Sections";
import { CtaBand } from "@/components/SiteChrome";

const TITLE = "Portfolio | Websites, E-commerce & Digital Growth Projects | Koder Imran";
const DESC = "Explore selected websites and e-commerce projects by Koder Imran, alongside services in conversion tracking, Google Ads, Shopify and WordPress.";


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
  component: Portfolio,
});

function Portfolio() {
  return (
    <>
      <section className="bg-grid rule-b">
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow animate-rise">Selected work</p>
          <h1 className="page-hero-title animate-rise text-reveal-load mt-3 max-w-4xl font-bold" style={{ animationDelay: "90ms" }}>
            Stores, tracking and ads that turn visitors into customers.
          </h1>
          <p className="animate-rise mt-4 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "180ms" }}>
            A selection of recent websites, stores and campaigns, each built to look sharp and to be measured properly.
          </p>
          <div className="page-hero-actions animate-rise mt-6 flex flex-wrap gap-3" style={{ animationDelay: "270ms" }}>
            <Link to="/contact" className="btn btn-lg btn-ink inline-flex items-center justify-center gap-2 rounded-full font-bold">Get a Free Audit <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
            <Link to="/services" className="btn btn-lg btn-outline inline-flex items-center justify-center gap-2 rounded-full font-bold">Explore services <span className="btn-arrow" aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <Reveal className="w-full">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Project showcase</p>
              <h2 className="text-reveal mt-3 text-3xl font-bold md:text-5xl">Selected projects</h2>
            </div>
            <p className="max-w-xl text-muted-foreground">
              Different businesses need different digital experiences. These selected builds span e-commerce,
              business websites and agency or corporate platforms.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-7 md:grid-cols-2">
          {WORKS.map((work, i) => (
            <Reveal key={work.name} delay={i * 70} className="group overflow-hidden rounded-3xl border bg-card">
              <a href={work.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${work.name} website`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={work.img}
                    alt={`${work.name} website project`}
                    loading="lazy"
                    className="size-full object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                  <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    {work.tag}
                  </span>
                  <span className="absolute bottom-5 right-5 grid size-11 place-items-center rounded-full bg-signal text-signal-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">0{i + 1} / Featured project</p>
                      <h3 className="mt-2 text-2xl font-bold">{work.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{work.services.join(" · ")}</p>
                    </div>
                    <span className="shrink-0 text-sm font-bold underline decoration-border underline-offset-4 group-hover:decoration-foreground">
                      View website
                    </span>
                  </div>
                  <dl className="mt-5 space-y-2 border-t pt-5 text-sm leading-relaxed">
                    <div>
                      <dt className="inline font-semibold">Challenge: </dt>
                      <dd className="inline text-muted-foreground">{work.problem}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold">Result: </dt>
                      <dd className="inline text-muted-foreground">{work.result}</dd>
                    </div>
                  </dl>
                  {SHOW_DEMO_BADGE && (
                    <p className="mt-4 inline-block rounded-full border border-dashed px-3 py-1 text-xs text-muted-foreground">
                      Demo result: replace with real data
                    </p>
                  )}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {DEMO_STATS.length > 0 && (
        <section className="container-page pb-20">
          <div className="grid gap-6 rounded-3xl border bg-card p-8 text-center md:grid-cols-3 md:p-10">
            {DEMO_STATS.map((stat) => (
              <Reveal key={stat.label}>
                <p className="text-reveal font-display text-4xl font-bold md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </Reveal>
            ))}
          </div>
          {SHOW_DEMO_BADGE && (
            <p className="mt-3 text-center text-xs text-muted-foreground">Demo numbers: replace with real data</p>
          )}
        </section>
      )}

      <section className="home-section-divider home-section-divider--no-bottom-rule testimonial-section overflow-hidden py-20 text-foreground">
        <div className="container-page">
          <Reviews />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
