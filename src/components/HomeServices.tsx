import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Wallet, ShieldCheck, Check } from "lucide-react";
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
      <span className="pointer-events-none absolute right-6 top-5 z-0 select-none text-[5rem] font-black leading-none tracking-[-0.09em] text-foreground/[0.055] sm:right-8 sm:top-4 sm:text-[6rem]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div className="relative z-10 flex h-full flex-col p-6 sm:p-8">
        <div className="home-service-intro">
          <div className="mb-2 inline-flex self-start rounded-full border border-[oklch(0.78_0.18_130)]/35 bg-[oklch(0.78_0.18_130)]/10 px-3 py-1.5 text-xs font-semibold text-foreground">
            3 Flexible Packages Available
          </div>
          <h3 className="home-service-title relative z-10 w-full text-left text-2xl font-bold leading-tight tracking-tight sm:text-[1.7rem]">{service.title}</h3>
          <p className="mt-2 text-left leading-relaxed text-muted-foreground">{service.short}</p>
        </div>

        <div className="mt-4 rounded-xl border border-[oklch(0.78_0.18_130)]/25 bg-[oklch(0.78_0.18_130)]/[0.07] px-4 py-3.5">
          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.15em] text-[oklch(0.52_0.13_135)] dark:text-[oklch(0.82_0.16_130)]">Who it’s for</p>
          <p className="mt-1.5 text-sm font-medium leading-relaxed text-foreground/85">{meta.audience}</p>
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex items-center gap-2.5">
            <Wallet className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span className="text-sm font-medium">Scope-based quote</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span className="text-sm font-medium">Project-specific deliverables confirmed</span>
          </div>
        </div>

        <ul className="home-service-outcomes mt-5 space-y-2" aria-label="Key outcomes">
          {service.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-2.5 text-sm font-medium leading-snug text-foreground/85">
              <Check className="mt-0.5 size-4 shrink-0 text-[oklch(0.52_0.13_135)] dark:text-[oklch(0.82_0.16_130)]" strokeWidth={2.5} aria-hidden="true" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row">
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
  const scrollTargetRef = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    if (!media.matches) return;

    let frame = 0;
    const updateActive = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = scrollTargetRef.current;
        if (target !== null) {
          if (Math.abs(window.scrollY - target) > 3) return;
          scrollTargetRef.current = null;
        }
        const section = sectionRef.current;
        if (!section) return;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const distance = Math.max(0, window.scrollY - sectionTop);
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

  const selectService = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const target = sectionTop + index * window.innerHeight + 2;
    scrollTargetRef.current = target;
    setActiveIndex(index);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

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
                <button
                  key={service.slug}
                  type="button"
                  className={`home-service-preview home-service-card--${index + 1}`}
                  onClick={() => selectService(index)}
                  aria-label={`Show service ${index + 1}: ${service.title}`}
                  aria-current={undefined}
                >
                  <span className="home-service-preview-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="home-service-preview-title">{service.title}</span>
                </button>
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
