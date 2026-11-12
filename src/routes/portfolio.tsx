import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BarChart3, Megaphone, ShoppingBag, PanelsTopLeft } from "lucide-react";
import { SITE, WORKS, SERVICES, REVIEWS } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/Sections";
import { CtaBand } from "@/components/SiteChrome";

const TITLE = "Portfolio | Websites, E-commerce & Digital Growth Projects | Koder Imran";
const DESC = "Explore selected websites and e-commerce projects by Koder Imran, alongside services in conversion tracking, Google Ads, Shopify and WordPress.";

const SERVICE_ICONS = [BarChart3, Megaphone, ShoppingBag, PanelsTopLeft];

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
      <section className="bg-grid border-b">
        <div className="container-page py-20 md:py-28">
          <p className="eyebrow animate-rise">Selected work</p>
          <h1 className="page-hero-title animate-rise mt-4 max-w-4xl font-bold" style={{ animationDelay: "90ms" }}>
            Digital experiences built around business goals.
          </h1>
          <p className="animate-rise mt-6 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "180ms" }}>
            A selection of websites, online stores and digital projects. Explore the work, then see how design,
            measurement and marketing can work together to support growth.
          </p>
          <div className="page-hero-actions animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "270ms" }}>
            <Link to="/contact" className="btn btn-ink rounded-full px-7 py-4 font-bold">Discuss a project</Link>
            <Link to="/services" className="btn btn-outline rounded-full px-7 py-4 font-bold">Explore services</Link>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Project showcase</p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">Selected projects</h2>
          </div>
          <p className="max-w-xl text-muted-foreground">
            Different businesses need different digital experiences. These selected builds span e-commerce,
            business websites and agency or corporate platforms.
          </p>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2">
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
                <div className="flex items-center justify-between gap-4 p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">0{i + 1} / Featured project</p>
                    <h3 className="mt-2 text-2xl font-bold">{work.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{work.tag}</p>
                  </div>
                  <span className="shrink-0 text-sm font-bold underline decoration-border underline-offset-4 group-hover:decoration-foreground">
                    View website
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y bg-secondary/50">
        <div className="container-page py-20">
          <SectionHead
            eyebrow="What I do"
            title="More than a website. A connected growth setup."
            text="From accurate measurement to campaign optimisation and conversion-focused stores, get the right expertise across the parts of your digital business."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[i] ?? PanelsTopLeft;
              return (
                <Reveal key={service.slug} delay={i * 80} className="group rounded-3xl border bg-card p-7 transition-colors hover:border-ring/60 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
                      <Icon className="size-6" />
                    </span>
                    <span className="font-display text-sm text-muted-foreground">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold md:text-2xl">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
                  <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
                    Explore service <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHead eyebrow="Client feedback" title="Good work is remembered." text="A few words shared by clients after working together." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {REVIEWS.slice(0, 3).map((review, i) => (
            <Reveal as="figure" key={review.name} delay={i * 90} className="rounded-3xl border bg-card p-7">
              <p className="text-signal-foreground dark:text-signal">★★★★★</p>
              <blockquote className="mt-4 text-base leading-relaxed">“{review.text}”</blockquote>
              <figcaption className="mt-6 text-sm font-semibold">
                {review.name} <span className="font-normal text-muted-foreground">· {review.country}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
