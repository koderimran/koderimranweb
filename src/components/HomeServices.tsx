import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Wallet, ShieldCheck } from "lucide-react";
import { SERVICES } from "@/lib/site";

const SERVICE_META: Record<string, { audience: string }> = {
  "web-analytics": { audience: "E-commerce teams, lead-generation businesses and marketers who need trustworthy conversion data." },
  "google-ads": { audience: "Businesses ready to reach high-intent customers, generate qualified leads or grow online sales." },
  shopify: { audience: "Product brands and retailers launching a Shopify store or improving an existing shopping experience." },
  "wordpress-woocommerce": { audience: "Small businesses, service providers and online sellers who need a flexible WordPress or WooCommerce website." },
};

function ServiceCard({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const meta = SERVICE_META[service.slug] ?? SERVICE_META["web-analytics"];
  const detailHref = `/services#service-${service.slug}`;

  return (
    <article className={`home-service-card home-service-card--${index + 1} home-service-active-card group relative isolate h-full overflow-hidden rounded-[1.75rem] border bg-card`}>
      <span className="pointer-events-none absolute right-6 top-5 z-0 select-none text-[6rem] font-black leading-none tracking-[-0.09em] text-foreground/[0.055] sm:right-8 sm:top-4 sm:text-[7rem]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div className="relative z-10 flex h-full flex-col p-6 sm:p-8">
        <div className="mb-3 inline-flex self-start rounded-full border border-[oklch(0.78_0.18_130)]/35 bg-[oklch(0.78_0.18_130)]/10 px-3 py-1.5 text-xs font-semibold text-foreground">
          3 Flexible Packages Available
        </div>
        <h3 className="home-service-title relative z-10 flex min-h-[4rem] items-start pr-24 text-2xl font-bold leading-tight tracking-tight sm:pr-32 sm:text-[1.7rem]">{service.title}</h3>
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

        <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
          <Link to={detailHref} className="btn btn-ink inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold">
            Explore service <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <Link to="/contact" className="btn btn-outline inline-flex flex-1 items-center justify-center rounded-full px-5 py-3.5 text-sm font-bold">
            Discuss your project
          </Link>
        </div>
      </div>
    </article>
  );
}

export function HomeServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    if (!media.matches) return;

    let frame = 0;
    const updateActive = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const distance = Math.max(0, window.scrollY - (section.getBoundingClientRect().top + window.scrollY));
        const nextIndex = Math.min(SERVICES.length - 1, Math.floor(distance / Math.max(1, window.innerHeight)));
        setActiveIndex(nextIndex);
      });
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const activeService = SERVICES[activeIndex];

  return (
    <section ref={sectionRef} className="home-services-story mt-12" aria-label="Our services">
      <div className="home-services-sticky">
        <div className="home-services-stage">
          <div className="home-services-featured" aria-live="polite">
            <div key={activeService.slug} className="home-services-active-wrap">
              <ServiceCard service={activeService} index={activeIndex} />
            </div>
          </div>
          <aside className="home-services-rail" aria-label="Other services">
            {SERVICES.map((service, index) => {
              if (index === activeIndex) return null;
              return (
                <div key={service.slug} className={`home-service-preview home-service-card--${index + 1}`} aria-label={`Service ${index + 1}: ${service.title}`}>
                  <span className="home-service-preview-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="home-service-preview-title">{service.title}</span>
                </div>
              );
            })}
          </aside>
        </div>
      </div>
      <div className="home-services-scroll-track" aria-hidden="true">
        {SERVICES.slice(1).map((service) => <div key={service.slug} className="home-services-scroll-step" />)}
      </div>
      <div className="home-services-mobile-list">
        {SERVICES.map((service, index) => <ServiceCard key={service.slug} service={service} index={index} />)}
      </div>
    </section>
  );
}
