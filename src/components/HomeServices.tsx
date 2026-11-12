import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BarChart3, Megaphone, ShoppingBag, LayoutTemplate, Sparkles, Wallet, ShieldCheck } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const SERVICE_META: Record<string, { icon: typeof BarChart3; category: string; audience: string; accent: string }> = {
  "web-analytics": { icon: BarChart3, category: "MEASURE WHAT MATTERS", audience: "E-commerce teams, lead-generation businesses and marketers who need trustworthy conversion data.", accent: "from-emerald-500/20 via-lime-400/10 to-transparent" },
  "google-ads": { icon: Megaphone, category: "TURN INTENT INTO GROWTH", audience: "Businesses ready to reach high-intent customers, generate qualified leads or grow online sales.", accent: "from-amber-500/20 via-lime-400/10 to-transparent" },
  shopify: { icon: ShoppingBag, category: "BUILD A BETTER STOREFRONT", audience: "Product brands and retailers launching a Shopify store or improving an existing shopping experience.", accent: "from-lime-500/20 via-teal-400/10 to-transparent" },
  "wordpress-woocommerce": { icon: LayoutTemplate, category: "MAKE YOUR WEBSITE WORK HARDER", audience: "Small businesses, service providers and online sellers who need a flexible WordPress or WooCommerce website.", accent: "from-sky-500/20 via-lime-400/10 to-transparent" },
};

export function HomeServices() {
  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-2">
      {SERVICES.map((service, index) => {
        const meta = SERVICE_META[service.slug] ?? SERVICE_META["web-analytics"];
        const Icon = meta.icon;
        const detailHref = `/services#service-${service.slug}`;
        return (
          <Reveal key={service.slug} as="article" delay={index * 85} className="home-service-card group relative isolate overflow-hidden rounded-[1.75rem] border bg-card">
            <span className="pointer-events-none absolute right-6 top-[13.25rem] z-0 select-none text-[7.5rem] font-black leading-none tracking-[-0.09em] text-foreground/[0.055]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div className={`home-service-art relative flex min-h-[12.5rem] items-center justify-between overflow-hidden border-b bg-gradient-to-br ${meta.accent} px-7 py-6 sm:px-9`}>
              <div className="relative z-10 max-w-[70%]">
                <p className="text-[0.68rem] font-extrabold tracking-[0.18em] text-muted-foreground">{meta.category}</p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">A focused service, shaped around your business goals.</p>
              </div>
              <div className="home-service-orbit absolute right-7 top-1/2 grid size-32 -translate-y-1/2 place-items-center rounded-[2rem] border border-white/40 bg-white/35 shadow-[0_22px_55px_-25px_rgba(30,50,25,.45)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06] sm:right-10 sm:size-36">
                <div className="grid size-[5.2rem] place-items-center rounded-[1.6rem] border border-white/60 bg-background/90 text-foreground shadow-xl dark:border-white/10">
                  <Icon className="size-10 text-[oklch(0.56_0.16_135)]" strokeWidth={1.65} aria-hidden="true" />
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
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-2xl font-bold tracking-tight sm:text-[1.7rem]">{service.title}</h3>
                </div>
                <Link to={detailHref} aria-label={`View ${service.title} details`} title={`View ${service.title} details`} className="grid size-10 shrink-0 place-items-center rounded-full border transition duration-300 hover:-translate-y-1 hover:translate-x-1 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-3 leading-relaxed text-muted-foreground">{service.short}</p>

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

              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Who it’s for</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{meta.audience}</p>
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
