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
    <div className="mt-8 grid gap-5 lg:grid-cols-2">
      {SERVICES.map((service, index) => {
        const meta = SERVICE_META[service.slug] ?? SERVICE_META["web-analytics"];
        const detailHref = `/services#service-${service.slug}`;
        return (
          <Reveal key={service.slug} as="article" delay={index * 85} className={`home-service-card home-service-card--${index + 1} group relative isolate overflow-hidden rounded-[1.75rem] border bg-card`}>
            <div className="relative z-10 p-6 sm:p-8">
              <div className="flow-root">
                <span className="home-service-watermark float-right ml-3 select-none text-right text-[3.5rem] font-black leading-[0.85] tracking-[-0.09em] text-foreground/[0.055] sm:text-[5.5rem]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div className="service-chip inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold">
                  3 Flexible Packages Available
                </div>
                <h3 className="home-service-title text-reveal mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-[1.7rem]">{service.title}</h3>
              </div>
              <p className="mt-3 leading-relaxed text-muted-foreground">{service.short}</p>

              <div className="service-audience mt-4 rounded-xl border px-4 py-3.5">
                <p className="service-audience-label text-xs font-extrabold uppercase tracking-[0.15em]">Who it’s for</p>
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
                <Link to={detailHref} className="btn btn-lg btn-ink inline-flex flex-1 items-center justify-center gap-2 rounded-full font-bold">
                  Explore service <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
                <Link to="/contact" className="btn btn-lg btn-outline inline-flex flex-1 items-center justify-center rounded-full font-bold">
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
