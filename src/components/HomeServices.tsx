import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, Wallet, ShieldCheck } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const SERVICE_META: Record<string, { audience: string }> = {
  "web-analytics": { audience: "E-commerce teams, lead-generation businesses and marketers who need trustworthy conversion data." },
  "google-ads": { audience: "Businesses ready to reach high-intent customers, generate qualified leads or grow online sales." },
  shopify: { audience: "Product brands and retailers launching a Shopify store or improving an existing shopping experience." },
  "wordpress-woocommerce": { audience: "Small businesses, service providers and online sellers who need a flexible WordPress or WooCommerce website." },
};


export function HomeServices() {
  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-2">
      {SERVICES.map((service, index) => {
        const meta = SERVICE_META[service.slug] ?? SERVICE_META["web-analytics"];
        const detailHref = `/services#service-${service.slug}`;
        return (
          <Reveal key={service.slug} as="article" delay={index * 85} className="home-service-card group relative isolate overflow-hidden rounded-[1.75rem] border bg-card">
            <span className="pointer-events-none absolute right-6 top-5 z-0 select-none text-[7.5rem] font-black leading-none tracking-[-0.09em] text-foreground/[0.055] sm:right-8 sm:top-4 sm:text-[8.5rem]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div className="relative z-10 p-6 sm:p-8">
              <div className="mb-3 inline-flex rounded-full border border-[oklch(0.78_0.18_130)]/35 bg-[oklch(0.78_0.18_130)]/10 px-3 py-1.5 text-xs font-semibold text-foreground">
                3 Flexible Packages Available
              </div>
              <h3 className="relative z-10 flex min-h-[4rem] items-start pr-24 text-2xl font-bold leading-tight tracking-tight sm:pr-32 sm:text-[1.7rem]">{service.title}</h3>
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
