import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, BarChart3, Megaphone, ShoppingBag, LayoutTemplate, Check, Layers } from "lucide-react";
import { SERVICES, WORKS, REVIEWS, FAQS, PROCESS } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

const ICONS = [BarChart3, Megaphone, ShoppingBag, LayoutTemplate];

export function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
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
    <Reveal as="article" id={service.slug} delay={index * 80} className="service-detail-card scroll-mt-28 overflow-hidden rounded-3xl border bg-card">
      <div className="border-b px-6 py-6 md:px-9 md:py-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow">Service 0{index + 1}</p>
          <span className="text-xs font-semibold text-muted-foreground">Personalised service · Worldwide</span>
        </div>
        <h2 className="mt-3 max-w-4xl text-lg font-semibold tracking-tight text-muted-foreground md:text-xl">{service.title}</h2>
      </div>

      <div className="grid gap-8 p-6 md:grid-cols-[minmax(0,1.12fr)_minmax(19rem,0.88fr)] md:gap-10 md:p-9 lg:gap-14">
        <div className="min-w-0">
          <p className="eyebrow">The service</p>
          <h3 className="mt-3 max-w-2xl text-2xl font-bold leading-tight md:text-3xl">{service.short}</h3>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{service.answer}</p>

          <div className="mt-8 space-y-7">
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

            <div className="border-t pt-6">
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

            <div className="border-t pt-6">
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
    return <div className="grid gap-7">{SERVICES.map((service, index) => <ServicePackagePanel key={service.slug} service={service} index={index} />)}</div>;
  }

  return (
    <>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {SERVICES.map((s, i) => <ServiceCard3D key={s.slug} service={s} index={i} />)}
      </div>

      <Reveal className="mt-8 flex flex-col items-start justify-between gap-5 rounded-3xl border bg-secondary/50 p-6 md:flex-row md:items-center md:p-8">
        <div>
          <p className="font-display text-lg font-bold">Not sure which service fits?</p>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">Tell me about your goals and I’ll point you to the right service and package for where your business is today.</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link to="/contact" className="btn btn-ink rounded-full px-6 py-3 text-sm font-bold">Book a free call</Link>
          <Link to="/services" className="link-arrow">Compare all packages <ArrowUpRight className="size-4" /></Link>
        </div>
      </Reveal>
    </>
  );
}

function ServiceCard3D({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const Icon = ICONS[index % ICONS.length] ?? Megaphone;
  const packages = SERVICE_PACKAGES[service.slug] ?? [];

  return (
    <Reveal as="article" delay={index * 90} className="service-reveal">
      <TiltCard className="service-card flex h-full flex-col rounded-3xl border bg-card p-7 md:p-8">
        <div className="flex items-start justify-between">
          <span className="service-icon" style={{ animationDelay: `${index * 700}ms` }} aria-hidden="true">
            <Icon className="size-7" />
          </span>
          <span className="font-display text-sm text-muted-foreground">0{index + 1}</span>
        </div>

        <h3 className="service-z-md mt-6 text-2xl font-bold">{service.title}</h3>
        <p className="mt-3 text-muted-foreground">{service.short}</p>

        <div className="mt-6">
          <p className="service-label">What you get</p>
          <ul className="mt-3 space-y-2.5">
            {service.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3 text-sm">
                <span className="service-check" aria-hidden="true"><Check className="size-3.5" /></span>
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <p className="service-label">Who needs this</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {service.bestFor.map((item) => <li key={item} className="pill rounded-full px-3 py-1 text-xs font-semibold">{item}</li>)}
          </ul>
        </div>

        {packages.length > 0 && (
          <div className="service-packages mt-6 rounded-2xl border p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="service-label flex items-center gap-2"><Layers className="size-4" aria-hidden="true" />{packages.length} packages</p>
              <span className="text-xs text-muted-foreground">Choose the level that fits</span>
            </div>
            <ul className="mt-3 grid grid-cols-3 gap-2">
              {packages.map((item, tier) => (
                <li key={item.name} className="service-tier" title={item.summary}>
                  <span className="service-tier-bars" aria-hidden="true">
                    {packages.map((_, bar) => <i key={bar} data-on={bar <= tier} />)}
                  </span>
                  <span className="text-xs font-bold">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
          <Link to="/services" hash={service.slug} className="btn btn-ink rounded-full px-6 py-3 text-sm font-bold">View packages</Link>
          <Link to="/contact" className="link-arrow">Get a quote <ArrowUpRight className="size-4" /></Link>
        </div>
      </TiltCard>
    </Reveal>
  );
}

export function WorkGrid({ limit }: { limit?: number }) {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {WORKS.slice(0, limit).map((w, i) => (
        <Reveal key={w.name} delay={i * 90} className="hover-lift overflow-hidden rounded-3xl border bg-card">
        <a href={w.url} target="_blank" rel="noopener noreferrer" className="group block">
          <div className="aspect-[16/10] overflow-hidden bg-muted">
            <img src={w.img} alt={`${w.name} website designed by Imran`} loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-105" />
          </div>
          <div className="flex items-center justify-between p-5">
            <div>
              <h3 className="font-bold">{w.name}</h3>
              <p className="text-sm text-muted-foreground">{w.tag}</p>
            </div>
            <ArrowUpRight className="size-5 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
        </a>
        </Reveal>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-3">
      {REVIEWS.slice(0, 3).map((r, i) => (
        <Reveal as="figure" key={r.name} delay={i * 110} className="hover-lift rounded-3xl border bg-card p-7">
          <p className="text-signal-foreground dark:text-signal">★★★★★</p>
          <blockquote className="mt-4 text-lg leading-relaxed">“{r.text}”</blockquote>
          <figcaption className="mt-6 text-sm font-semibold">{r.name} <span className="font-normal text-muted-foreground">· {r.country}</span></figcaption>
        </Reveal>
      ))}
    </div>
  );
}

export function Process() {
  return (
    <ol className="mt-12 grid gap-5 md:grid-cols-4">
      {PROCESS.map((p, i) => (
        <Reveal as="li" key={p.title} delay={i * 100} className="hover-lift rounded-3xl border-t-4 border-ink bg-card p-6">
          <span className="font-display text-4xl font-bold text-muted-foreground/40">0{i + 1}</span>
          <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
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

export function PageHero({ eyebrow, title, text, cta = "Book a free call" }: { eyebrow: string; title: string; text: string; cta?: string }) {
  return (
    <section className="bg-grid border-b">
      <div className="container-page py-20 md:py-28">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="page-hero-title animate-rise mt-4 max-w-4xl font-bold" style={{ animationDelay: "90ms" }}>{title}</h1>
        <p className="animate-rise mt-6 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "180ms" }}>{text}</p>
        <Link to="/contact" className="page-hero-cta btn btn-ink animate-rise mt-8 rounded-full px-7 py-4 font-bold" style={{ animationDelay: "270ms" }}>
          {cta}
        </Link>

      </div>
    </section>
  );
}
