import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BarChart3, Megaphone, ShoppingBag, LayoutTemplate, Check, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const SERVICE_META: Record<string, { icon: typeof BarChart3; category: string; audience: string; packageNote: string; accent: string }> = {
  "web-analytics": {
    icon: BarChart3,
    category: "MEASURE WHAT MATTERS",
    audience: "E-commerce teams, lead-generation businesses and marketers who need trustworthy conversion data.",
    packageNote: "GA4 foundations · Event & conversion tracking · Advanced measurement",
    accent: "from-emerald-500/20 via-lime-400/10 to-transparent",
  },
  "google-ads": {
    icon: Megaphone,
    category: "TURN INTENT INTO GROWTH",
    audience: "Businesses ready to reach high-intent customers, generate qualified leads or grow online sales.",
    packageNote: "Campaign launch · Multi-campaign setup · Ongoing optimisation",
    accent: "from-amber-500/20 via-lime-400/10 to-transparent",
  },
  shopify: {
    icon: ShoppingBag,
    category: "BUILD A BETTER STOREFRONT",
    audience: "Product brands and retailers launching a Shopify store or improving an existing shopping experience.",
    packageNote: "Store setup · Custom storefront · Growth-ready improvements",
    accent: "from-lime-500/20 via-teal-400/10 to-transparent",
  },
  "wordpress-woocommerce": {
    icon: LayoutTemplate,
    category: "MAKE YOUR WEBSITE WORK HARDER",
    audience: "Small businesses, service providers and online sellers who need a flexible WordPress or WooCommerce website.",
    packageNote: "Business website · Custom layouts & tracking · WooCommerce build",
    accent: "from-sky-500/20 via-lime-400/10 to-transparent",
  },
};

export function HomeServices() {
  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-2">
      {SERVICES.map((service, index) => {
        const meta = SERVICE_META[service.slug] ?? SERVICE_META["web-analytics"];
        const Icon = meta.icon;
        return (
          <Reveal key={service.slug} as="article" delay={index * 85} className="home-service-card group relative isolate overflow-hidden rounded-[1.75rem] border bg-card">
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

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Service 0{index + 1}</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-[1.7rem]">{service.title}</h3>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-accent">
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-3 leading-relaxed text-muted-foreground">{service.short}</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-bold">What you get</h4>
                  <ul className="mt-3 space-y-2.5">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-[oklch(0.56_0.16_135)]" aria-hidden="true" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border bg-muted/40 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Who it’s for</p>
                  <p className="mt-2 text-sm leading-relaxed">{meta.audience}</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-dashed p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold">Flexible service packages</p>
                  <span className="rounded-full bg-accent px-3 py-1 text-[0.68rem] font-bold text-accent-foreground">Basic · Standard · Premium</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{meta.packageNote}</p>
                <p className="mt-2 text-xs text-muted-foreground">Scope-based quote · Final deliverables confirmed for your project</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/services" className="btn btn-ink inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold">
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
