import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, BarChart3, Megaphone, ShoppingBag, LayoutTemplate, Check } from "lucide-react";
import { SERVICES, WORKS, REVIEWS, FAQS, PROCESS } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const ICONS = [BarChart3, Megaphone, ShoppingBag, LayoutTemplate];

export function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) {
  return (
    <Reveal className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-lg text-muted-foreground">{text}</p>}
    </Reveal>
  );
}

const SERVICE_PACKAGES: Record<string, { name: string; summary: string; features: string[] }[]> = {
  "web-analytics": [
    { name: "Basic", summary: "Get the essential measurement foundations in place.", features: ["GA4 property setup or audit", "Google Tag Manager installation", "Core page-view and form events", "Basic conversion configuration", "Testing and handover notes"] },
    { name: "Standard", summary: "Measure the actions that matter across your customer journey.", features: ["Everything in Basic", "Lead or e-commerce event tracking", "Google Ads conversion tracking", "Cross-domain setup when required", "Tracking validation and QA"] },
    { name: "Premium", summary: "Build a more complete measurement and reporting system.", features: ["Everything in Standard", "Enhanced conversions where eligible", "Custom event and parameter setup", "Looker Studio reporting dashboard", "Documentation and walkthrough"] },
  ],
  "google-ads": [
    { name: "Basic", summary: "A clear starting point for a focused campaign.", features: ["Account and goal review", "Keyword and audience research", "One campaign setup", "Ad copy and extensions", "Launch checks"] },
    { name: "Standard", summary: "A structured campaign setup with conversion measurement.", features: ["Everything in Basic", "Multi-campaign structure", "Conversion tracking review or setup", "Landing-page recommendations", "Initial optimisation and reporting"] },
    { name: "Premium", summary: "Ongoing campaign management focused on learning and improvement.", features: ["Everything in Standard", "Ongoing optimisation", "Search-term and budget reviews", "Performance reporting", "Regular strategy check-ins"] },
  ],
  shopify: [
    { name: "Basic", summary: "Launch a clean, professional Shopify storefront.", features: ["Shopify setup and theme configuration", "Core pages and navigation", "Product and collection setup", "Responsive layout", "Essential app configuration"] },
    { name: "Standard", summary: "Create a stronger storefront with reliable measurement.", features: ["Everything in Basic", "Theme customisation and custom sections", "GA4 and GTM setup", "E-commerce event tracking", "Product and collection optimisation"] },
    { name: "Premium", summary: "A more complete store experience built to support growth.", features: ["Everything in Standard", "Advanced storefront improvements", "Marketing pixel integrations", "Speed and usability optimisation", "SEO essentials and handover support"] },
  ],
  "wordpress-woocommerce": [
    { name: "Basic", summary: "Build a responsive website for your business.", features: ["WordPress installation and configuration", "Theme setup and page design", "Core business pages", "Responsive layout", "Essential plugin configuration"] },
    { name: "Standard", summary: "Improve the website experience and measure key actions.", features: ["Everything in Basic", "Custom page sections and layouts", "GA4 and GTM integration", "Lead or form conversion tracking", "On-page SEO essentials"] },
    { name: "Premium", summary: "A complete website or WooCommerce build with growth foundations.", features: ["Everything in Standard", "WooCommerce setup when required", "Product and checkout improvements", "Performance and technical SEO review", "Marketing integrations and handover"] },
  ],
};

function ServicePackagePanel({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const [selected, setSelected] = useState(1);
  const [compareOpen, setCompareOpen] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const compareButtonRef = useRef<HTMLButtonElement>(null);
  const rawPackages = SERVICE_PACKAGES[service.slug] ?? SERVICE_PACKAGES["web-analytics"];
  // Expand "Everything in ..." so each package shows its complete included task list.
  const packages = rawPackages.map((item, i) => ({
    ...item,
    features: [
      ...rawPackages.slice(0, i).flatMap((previous) => previous.features.filter((feature) => !feature.startsWith("Everything in "))),
      ...item.features.filter((feature) => !feature.startsWith("Everything in ")),
    ],
  }));
  const comparisonTasks = [...new Set(packages.flatMap((item) => item.features))];
  const ServiceIcon = ICONS[index] ?? BarChart3;

  useEffect(() => {
    if (!compareOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCompareOpen(false);
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      compareButtonRef.current?.focus();
    };
  }, [compareOpen]);

  return (
    <Reveal id={`service-${service.slug}`} as="article" delay={index * 80} className={`home-service-card home-service-card--${index + 1} service-detail-section group relative isolate pt-8 scroll-mt-28 overflow-hidden bg-card`}>
      <div className="px-6 pt-6 pb-3 md:px-9 md:pt-7 md:pb-4">
        <div className="relative flex items-center gap-4 md:gap-5">
          <span className="pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-1/2 select-none font-display text-[4.5rem] font-black leading-none tracking-[-0.09em] text-foreground/[0.055] sm:text-[5.5rem]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-[oklch(0.78_0.18_130)]/35 bg-[oklch(0.78_0.18_130)]/10 text-[oklch(0.48_0.14_135)] shadow-sm dark:text-[oklch(0.84_0.17_130)] sm:size-16" aria-hidden="true">
            <ServiceIcon className="size-7 sm:size-8" strokeWidth={1.7} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Personalised service · Worldwide</p>
            <h2 className="home-service-title relative z-10 max-w-4xl pr-20 font-display text-3xl font-bold leading-tight tracking-tight sm:pr-28 sm:text-4xl">{service.title}</h2>
          </div>
        </div>
      </div>
      <div className="grid gap-8 px-6 pt-3 pb-6 md:grid-cols-[minmax(0,1.12fr)_minmax(19rem,0.88fr)] md:gap-10 md:px-9 md:pt-4 md:pb-9 lg:gap-14">
        <div className="min-w-0">
          <p className="eyebrow mb-2">About the service</p>
          <h3 className="max-w-2xl text-2xl font-bold leading-tight">{service.short}</h3>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{service.answer}</p>

          <div className="mt-7 space-y-6">
            <div>
              <h4 className="text-sm font-bold">What’s included</h4>
              <ul className="mt-4 space-y-3">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-ring" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold">Expected outcomes</h4>
              <ul className="mt-4 space-y-3">
                {service.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                    <Check className="mt-0.5 size-4 shrink-0 text-ring" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold">Tools & technologies</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.tools.map((tool) => <span key={tool} className="pill rounded-full px-3 py-1.5 text-xs font-semibold">{tool}</span>)}
              </div>
            </div>
          </div>
        </div>

        <aside className="min-w-0 self-start rounded-2xl border bg-background p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="eyebrow">Flexible options</p>
              <h3 className="mt-1 text-xl font-bold">Choose your package</h3>
            </div>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">3 options</span>
          </div>
          <div className="mt-5 grid grid-cols-3 rounded-xl bg-muted p-1" role="group" aria-label={service.title + " packages"}>
            {packages.map((item, i) => (
              <button key={item.name} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)} className={`rounded-lg px-2 py-2.5 text-xs font-bold transition sm:text-sm ${selected === i ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                {item.name}
              </button>
            ))}
          </div>
          <div className="min-h-[16rem] pt-5" aria-live="polite">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{packages[selected].name} package</p>
            <h4 className="mt-2 text-xl font-bold">{packages[selected].summary}</h4>
            <p className="mt-2 text-sm text-muted-foreground">Scope-based quote</p>
            <ul className="mt-5 space-y-3">
              {packages[selected].features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm leading-relaxed">
                  <Check className="mt-0.5 size-4 shrink-0 text-ring" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5 grid gap-2 border-t pt-4">
            <button ref={compareButtonRef} type="button" onClick={() => setCompareOpen(true)} aria-haspopup="dialog" aria-expanded={compareOpen} className="btn btn-outline w-full rounded-full px-5 py-3 text-sm font-bold">Compare packages</button>
            <Link to="/contact" className="btn btn-ink flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold">
              Request a quote <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>
      <div aria-hidden="true" className={`w-full border-t border-border ${index === 2 ? "border-t-2" : ""}`} />

      {compareOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-3 backdrop-blur-md sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) setCompareOpen(false); }}>
          <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={`compare-title-${service.slug}`} aria-describedby={`compare-description-${service.slug}`} tabIndex={-1} className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl sm:max-h-[calc(100dvh-2.5rem)] sm:rounded-3xl">
            <div className="flex shrink-0 items-start justify-between gap-4 border-b px-5 py-4 sm:px-7 sm:py-5">
              <div className="min-w-0">
                <p className="eyebrow">Package comparison</p>
                <h3 id={`compare-title-${service.slug}`} className="mt-1.5 text-lg font-bold tracking-tight sm:text-xl">Compare what’s included</h3>
                <p className="mt-1 text-xs text-muted-foreground">{service.title}</p>
              </div>
              <button type="button" onClick={() => setCompareOpen(false)} aria-label="Close package comparison" className="grid size-9 shrink-0 place-items-center rounded-full border text-xl text-muted-foreground transition hover:bg-muted hover:text-foreground">×</button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto px-4 py-4 sm:px-7 sm:py-5">
              <div className="overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                <thead className="bg-muted/70">
                  <tr>
                    <th scope="col" className="w-[46%] px-4 py-4 text-xs font-bold uppercase tracking-wide text-muted-foreground">Tasks & features</th>
                    {packages.map((item, i) => (
                      <th key={item.name} scope="col" className={`px-3 py-4 text-center text-sm font-bold ${i === selected ? "bg-accent/50 text-foreground" : ""}`}>{item.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonTasks.map((task, rowIndex) => (
                    <tr key={task} className={rowIndex % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <th scope="row" className="border-t px-4 py-3 text-left text-xs font-medium leading-relaxed sm:text-sm">{task}</th>
                      {packages.map((item, i) => {
                        const included = item.features.includes(task);
                        return (
                          <td key={item.name} className={`border-t px-3 py-3 text-center ${i === selected ? "bg-accent/20" : ""}`}>
                            <span className={`inline-flex size-7 items-center justify-center rounded-full text-base font-bold ${included ? "text-ring" : "text-muted-foreground/50"}`} aria-label={included ? "Included" : "Not included"}>{included ? "✓" : "×"}</span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <p id={`compare-description-${service.slug}`} className="mt-3 text-xs leading-relaxed text-muted-foreground">Every project is scoped around your goals and requirements. Final deliverables and pricing are confirmed in your quote.</p>
            </div>
            <div className="flex shrink-0 flex-col-reverse gap-2 border-t bg-card px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
              <button type="button" onClick={() => setCompareOpen(false)} className="btn btn-outline rounded-full px-5 py-2.5 text-sm font-bold">Close</button>
              <Link to="/contact" className="btn btn-ink inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold">Request a quote <ArrowUpRight className="size-4" /></Link>
            </div>
          </section>
        </div>,
        document.body,
      )}
    </Reveal>
  );
}

export function ServiceGrid({ detailed = false }: { detailed?: boolean }) {
  if (detailed) {
    return <div className="service-detail-list">{SERVICES.map((service, index) => <ServicePackagePanel key={service.slug} service={service} index={index} />)}</div>;
  }

  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2">
      {SERVICES.map((s, i) => {
        const Icon = ICONS[i % ICONS.length] ?? Megaphone;
        return (
          <Reveal as="article" key={s.slug} delay={i * 90} className="group hover-lift scroll-mt-24 rounded-3xl border bg-card p-8">
            <div className="flex items-start justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground"><Icon className="size-6" /></span>
              <span className="font-display text-sm text-muted-foreground">0{i + 1}</span>
            </div>
            <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
            <p className="mt-3 text-muted-foreground">{s.short}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {s.outcomes.map((outcome) => <li key={outcome} className="pill rounded-full px-3 py-1 text-xs font-semibold">{outcome}</li>)}
            </ul>
            <Link to="/services" className="link-arrow mt-6">Explore service <ArrowUpRight className="size-4" /></Link>
          </Reveal>
        );
      })}
    </div>
  );
}

export function WorkGrid({ limit }: { limit?: number }) {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {WORKS.slice(0, limit).map((w, i) => (
        <Reveal key={w.name} delay={i * 90} className="group">
          <a href={w.url} target="_blank" rel="noopener noreferrer" className="block h-full overflow-hidden rounded-[1.6rem] border border-border/70 bg-card transition duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_22px_60px_-30px_oklch(0_0_0/0.28)]">
            <div className="relative aspect-[16/11] overflow-hidden bg-muted">
              <img src={w.img} alt={`${w.name} website designed by Imran`} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-[1.045]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70" />
              <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-white backdrop-blur-md">SELECTED WORK · 0{i + 1}</span>
              <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black"><ArrowUpRight className="size-5" /></span>
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">
              <div className="min-w-0">
                <h3 className="truncate font-display text-lg font-bold tracking-tight">{w.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{w.tag}</p>
              </div>
              <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">View project</span>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

export function Reviews() {
  const [active, setActive] = useState(0);
  const visibleReviews = Array.from({ length: 3 }, (_, offset) => REVIEWS[(active + offset) % REVIEWS.length]);
  const move = (direction: number) => setActive((current) => (current + direction + REVIEWS.length) % REVIEWS.length);

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[0.78fr_1.5fr] lg:items-center lg:gap-14">
      <div className="flex flex-col items-start">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
          <span className="size-1.5 rounded-full bg-[oklch(0.82_0.18_130)]" /> Client stories
        </span>
        <h3 className="mt-6 max-w-sm font-display text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl">
          Why clients choose <span className="font-serif font-medium italic text-[oklch(0.82_0.18_130)]">to work with me.</span>
        </h3>
        <p className="mt-5 max-w-sm text-sm leading-7 text-white/65 sm:text-base">
          Real feedback from people I’ve worked with — built on clear communication, thoughtful execution and results that matter.
        </p>
        <Link to="/contact" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[oklch(0.88_0.17_130)] px-6 py-3.5 text-sm font-bold text-[oklch(0.2_0.035_145)] transition hover:-translate-y-0.5 hover:bg-[oklch(0.92_0.17_130)]">
          Start a project <ArrowUpRight className="size-4" />
        </Link>
        <div className="mt-10 flex items-center gap-4 border-t border-white/15 pt-6">
          <div className="flex -space-x-2">
            {REVIEWS.slice(0, 3).map((review) => <span key={review.name} className="grid size-9 place-items-center rounded-full border-2 border-[oklch(0.24_0.035_145)] bg-[oklch(0.82_0.18_130)] font-display text-xs font-bold text-[oklch(0.2_0.035_145)]">{review.name.charAt(0).toUpperCase()}</span>)}
          </div>
          <div>
            <p className="text-sm font-bold text-white">Trusted worldwide</p>
            <p className="mt-0.5 text-xs text-white/55">Clients across multiple countries</p>
          </div>
        </div>
      </div>

      <div className="min-w-0">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleReviews.map((review, i) => (
            <Reveal as="figure" key={review.name} delay={i * 90} className="flex min-h-[19rem] flex-col rounded-[1.35rem] border border-white/12 bg-white/[0.07] p-5 text-white shadow-[0_24px_70px_-45px_oklch(0_0_0/0.65)] backdrop-blur-sm sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm tracking-[0.15em] text-[oklch(0.82_0.18_130)]" aria-label="5 out of 5 stars">★★★★★</span>
                <span aria-hidden="true" className="font-serif text-4xl leading-none text-[oklch(0.82_0.18_130)]/70">“</span>
              </div>
              <blockquote className="mt-5 flex-1 font-display text-base font-medium leading-relaxed tracking-[-0.015em] sm:text-lg">“{review.text}”</blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-white/15 pt-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[oklch(0.82_0.18_130)] font-display text-sm font-bold text-[oklch(0.2_0.035_145)]">{review.name.charAt(0).toUpperCase()}</span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold">{review.name}</span>
                  <span className="mt-0.5 block text-xs text-white/55">{review.country}</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs font-semibold tracking-[0.16em] text-white/45">0{active + 1} <span className="mx-1 text-white/25">/</span> 0{REVIEWS.length}</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => move(-1)} aria-label="Previous testimonials" className="grid size-11 place-items-center rounded-full border border-white/20 text-white transition hover:border-[oklch(0.82_0.18_130)] hover:bg-white/10">←</button>
            <button type="button" onClick={() => move(1)} aria-label="Next testimonials" className="grid size-11 place-items-center rounded-full bg-[oklch(0.88_0.17_130)] text-[oklch(0.2_0.035_145)] transition hover:-translate-y-0.5 hover:bg-[oklch(0.92_0.17_130)]">→</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Process() {
  return (
    <ol className="relative mt-12 grid gap-4 md:grid-cols-4 md:gap-3">
      <div aria-hidden="true" className="pointer-events-none absolute left-[8%] right-[8%] top-7 hidden h-px bg-gradient-to-r from-border via-[oklch(0.72_0.16_130)]/70 to-border md:block" />
      {PROCESS.map((p, i) => (
        <Reveal as="li" key={p.title} delay={i * 100} className="group relative">
          <div className="relative flex h-full flex-col rounded-[1.5rem] border border-border/70 bg-card px-5 pb-6 pt-5 transition duration-300 hover:-translate-y-1 hover:border-[oklch(0.72_0.16_130)]/55 hover:shadow-[0_20px_55px_-34px_oklch(0_0_0/0.3)] sm:px-6">
            <div className="relative z-10 flex items-center justify-between">
              <span className="grid size-14 place-items-center rounded-2xl border border-[oklch(0.72_0.16_130)]/35 bg-background font-display text-lg font-bold text-foreground shadow-sm transition group-hover:bg-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Step {i + 1}</span>
            </div>
            <h3 className="mt-7 font-display text-xl font-bold tracking-tight">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            <div className="mt-auto flex items-center gap-2 pt-7">
              <span className="h-1 w-8 rounded-full bg-[oklch(0.72_0.16_130)] transition-all group-hover:w-12" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Clear next step</span>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function Faq() {
  return (
    <Reveal className="mt-12 divide-y rounded-3xl border bg-card">
      {FAQS.map((f) => (
        <details key={f.q} className="faq-item group p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-semibold">
            {f.q}
            <span className="ml-4 text-2xl transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </Reveal>
  );
}

export function faqJsonLd() {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    }),
  };
}

export function PageHero({ eyebrow, title, text, cta = "Book a free call", compact = false }: { eyebrow: string; title: string; text: string; cta?: string; compact?: boolean }) {
  return (
    <section className="bg-grid border-b">
      <div className={compact ? "container-page py-12 md:py-16" : "container-page py-20 md:py-28"}>
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="page-hero-title animate-rise mt-3 max-w-4xl font-bold" style={{ animationDelay: "90ms" }}>{title}</h1>
        <p className="animate-rise mt-4 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "180ms" }}>{text}</p>
        <Link to="/contact" className="page-hero-cta btn btn-ink animate-rise mt-6 rounded-full px-7 py-3.5 font-bold" style={{ animationDelay: "270ms" }}>
          {cta}
        </Link>
      </div>
    </section>
  );
}
