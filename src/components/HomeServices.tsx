import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, Wallet, ShieldCheck } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const SERVICE_META: Record<string, { category: string; audience: string; accent: string }> = {
  "web-analytics": { category: "MEASURE WHAT MATTERS", audience: "E-commerce teams, lead-generation businesses and marketers who need trustworthy conversion data.", accent: "from-emerald-500/20 via-lime-400/10 to-transparent" },
  "google-ads": { category: "TURN INTENT INTO GROWTH", audience: "Businesses ready to reach high-intent customers, generate qualified leads or grow online sales.", accent: "from-amber-500/20 via-lime-400/10 to-transparent" },
  shopify: { category: "TRACKING & GROWTH", audience: "Product brands and retailers launching a Shopify store or improving an existing shopping experience.", accent: "from-lime-500/20 via-teal-400/10 to-transparent" },
  "wordpress-woocommerce": { category: "TRACKING & GROWTH", audience: "Small businesses, service providers and online sellers who need a flexible WordPress or WooCommerce website.", accent: "from-sky-500/20 via-lime-400/10 to-transparent" },
};

function ServiceBrandLogo({ slug }: { slug: string }) {
  if (slug === "web-analytics") return (
    <svg viewBox="0 0 100 100" className="size-16 sm:size-[4.5rem]" role="img" aria-label="Google Tag Manager logo">
      <path d="M50 8 87 45 50 82 13 45Z" fill="#4285F4" />
      <path d="M50 8 68 26 31 63 13 45Z" fill="#669DF6" />
      <circle cx="72" cy="72" r="13" fill="#34A853" />
      <text x="50" y="53" textAnchor="middle" fontSize="20" fontWeight="800" fill="white">GTM</text>
    </svg>
  );
  if (slug === "google-ads") return (
    <svg viewBox="0 0 100 100" className="size-16 sm:size-[4.5rem]" role="img" aria-label="Google Ads logo">
      <path d="M38 12c7-4 16-2 20 6l30 52c5 8 2 18-6 22-8 5-18 2-22-6L30 34c-5-8-1-18 8-22Z" fill="#34A853" />
      <path d="M62 18c4-8 14-11 22-6 8 4 11 14 6 22L60 86c-5 8-15 10-23 6-8-5-10-15-5-23Z" fill="#4285F4" />
      <circle cx="22" cy="78" r="13" fill="#FBBC04" />
    </svg>
  );
  if (slug === "shopify") return (
    <svg viewBox="0 0 100 100" className="size-16 sm:size-[4.5rem]" role="img" aria-label="Shopify logo">
      <path d="m25 29 50-5 8 62-58 5Z" fill="#95BF47" />
      <path d="M39 31c0-12 6-20 15-20s15 8 15 18" fill="none" stroke="#5E8E3E" strokeWidth="6" strokeLinecap="round" />
      <text x="54" y="69" textAnchor="middle" fontSize="39" fontFamily="Georgia,serif" fontWeight="bold" fill="white">S</text>
    </svg>
  );
  return (
    <svg viewBox="0 0 100 100" className="size-16 sm:size-[4.5rem]" role="img" aria-label="WordPress logo">
      <circle cx="50" cy="50" r="42" fill="#21759B" />
      <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="2.5" />
      <text x="50" y="66" textAnchor="middle" fontSize="54" fontFamily="Georgia,serif" fill="white">W</text>
    </svg>
  );
}

export function HomeServices() {
  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-2">
      {SERVICES.map((service, index) => {
        const meta = SERVICE_META[service.slug] ?? SERVICE_META["web-analytics"];
        const detailHref = `/services#service-${service.slug}`;
        return (
          <Reveal key={service.slug} as="article" delay={index * 85} className="home-service-card group relative isolate overflow-hidden rounded-[1.75rem] border bg-card">
            <span className="pointer-events-none absolute right-6 top-[10.25rem] z-0 select-none text-[7.5rem] font-black leading-none tracking-[-0.09em] text-foreground/[0.055]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div className={`home-service-art relative flex min-h-[9.5rem] items-center justify-between overflow-hidden border-b bg-gradient-to-br ${meta.accent} px-7 py-6 sm:px-9`}>
              <div className="relative z-10 w-[calc(100%-9.75rem)] max-w-none sm:w-[calc(100%-13rem)]">
                <p className="text-[0.68rem] font-extrabold tracking-[0.18em] text-muted-foreground">{meta.category}</p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">A focused service, shaped around your business goals.</p>
              </div>
              <div className="home-service-orbit absolute right-7 top-1/2 grid size-32 -translate-y-1/2 place-items-center rounded-[2rem] border border-white/40 bg-white/35 shadow-[0_22px_55px_-25px_rgba(30,50,25,.45)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06] sm:right-10 sm:size-36">
                <div className="grid size-[5.2rem] place-items-center rounded-[1.6rem] border border-white/60 bg-background/90 text-foreground shadow-xl dark:border-white/10">
                  <ServiceBrandLogo slug={service.slug} />
                </div>
                <Sparkles className="absolute -right-2 -top-2 size-6 text-[oklch(0.56_0.16_135)]" aria-hidden="true" />
                <span className="absolute -bottom-2 -left-2 size-5 rounded-full border-4 border-background bg-[oklch(0.78_0.18_130)]" />
              </div>
              <span className="absolute -bottom-16 right-20 size-44 rounded-full border border-foreground/10" aria-hidden="true" />
              <span className="absolute -bottom-24 right-8 size-56 rounded-full border border-foreground/10" aria-hidden="true" />
              <span className="absolute right-1/3 top-5 size-2 rounded-full bg-[oklch(0.72_0.18_130)] shadow-[0_0_18px_currentColor]" aria-hidden="true" />
              <span className="absolute bottom-7 left-[48%] size-1.5 rounded-full bg-foreground/30" aria-hidden="true" />
            </div>

            <div className="relative z-10 p-6 sm:p-8">
              <div className="mb-3 inline-flex rounded-full border border-[oklch(0.78_0.18_130)]/35 bg-[oklch(0.78_0.18_130)]/10 px-3 py-1.5 text-xs font-semibold text-foreground">
                3 Flexible Packages Available
              </div>
              <h3 className="flex min-h-[4rem] items-start pr-16 text-2xl font-bold leading-tight tracking-tight sm:pr-20 sm:text-[1.7rem]">{service.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{service.short}</p>

              <div className="mt-4 rounded-xl border border-[oklch(0.78_0.18_130)]/25 bg-[oklch(0.78_0.18_130)]/[0.07] px-4 py-3.5">
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.15em] text-[oklch(0.52_0.13_135)] dark:text-[oklch(0.82_0.16_130)]">Who it’s for</p>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-foreground/85">{meta.audience}</p>
              </div>

              <div className="mt-6 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <Wallet className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-medium">Scope-based quote</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-medium">Project-specific deliverables confirmed</span>
                </div>
              </div>


              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to={detailHref} className="btn btn-ink inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold">
                  Explore service <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
                <Link to="/contact" className="btn btn-outline inline-flex flex-1 items-center justify-center rounded-full px-5 py-3.5 text-sm font-bold">
                  Discuss your project
                </Link>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
