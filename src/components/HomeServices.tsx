import { useCallback, useEffect, useRef, useState } from "react";
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
    <article className={`home-service-card home-service-card--${index + 1} home-service-active-card group relative isolate overflow-hidden rounded-[1.75rem] border bg-card`}>
      <span className="pointer-events-none absolute right-6 top-5 z-0 select-none text-[5rem] font-black leading-none tracking-[-0.09em] text-foreground/[0.055] sm:right-8 sm:top-4 sm:text-[6rem]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div className="relative z-10 flex flex-col p-6 sm:p-8">
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

        <div className="home-service-outcomes-wrap">
          <p className="home-service-outcomes-heading">Expected outcomes</p>
          <ul className="home-service-outcomes mt-5 space-y-2" aria-label="Expected outcomes">
          {service.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-2.5 text-sm font-medium leading-snug text-foreground/85">
              <Check className="mt-0.5 size-4 shrink-0 text-[oklch(0.52_0.13_135)] dark:text-[oklch(0.82_0.16_130)]" strokeWidth={2.5} aria-hidden="true" />
              <span>{outcome}</span>
            </li>
          ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
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

/**
 * The pinned, scroll-driven showcase only runs when the screen is wide AND tall enough for the
 * whole card to stay visible while pinned. Keep this in sync with the media queries in styles.css
 * (".home-services-sticky" / ".home-services-mobile-list"); below it, the cards are a normal list.
 */
const PINNED_QUERY = "(min-width: 900px) and (min-height: 700px)";
/** Safety net: stop waiting for a programmatic scroll to finish after this long. */
const SELECT_TIMEOUT_MS = 1500;
/** Keys that scroll the page; pressing one means the visitor took over from a programmatic scroll. */
const SCROLL_KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);
/** Trackpad momentum right after a click is not a deliberate takeover; ignore input for this long. */
const TAKEOVER_GRACE_MS = 250;

export function HomeServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // While a click-triggered smooth scroll is running this holds its destination; scroll-driven
  // selection is paused so the clicked card is not replaced by the ones scrolled past on the way.
  const scrollTargetRef = useRef<number | null>(null);
  const releaseTimerRef = useRef(0);
  const selectedAtRef = useRef(0);

  const measure = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return null;
    const stepHeight = window.innerHeight;
    section.style.setProperty("--service-step-height", `${stepHeight}px`);
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    return { stepHeight, sectionTop };
  }, []);

  const syncFromScroll = useCallback(() => {
    const measured = measure();
    if (!measured) return;
    const distance = Math.max(0, window.scrollY - measured.sectionTop);
    setActiveIndex(Math.min(SERVICES.length - 1, Math.floor(distance / measured.stepHeight)));
  }, [measure]);

  /**
   * Ends the "waiting for the smooth scroll" state. `resync` is false when the scroll arrived where
   * the click sent it (the clicked card is already selected) and true when it was interrupted, so
   * the card is chosen from where the visitor actually is instead of staying frozen.
   */
  const releaseTarget = useCallback((resync: boolean) => {
    window.clearTimeout(releaseTimerRef.current);
    if (scrollTargetRef.current === null) return;
    scrollTargetRef.current = null;
    if (resync) syncFromScroll();
  }, [syncFromScroll]);

  useEffect(() => {
    const media = window.matchMedia(PINNED_QUERY);
    let frame = 0;
    let detach: (() => void) | undefined;

    const attach = () => {
      const onScroll = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const target = scrollTargetRef.current;
          if (target !== null) {
            // Arrived: the clicked card is already selected, so do not recalculate on this frame
            // (it could briefly pick the previous card and replay the transition).
            if (Math.abs(window.scrollY - target) <= 3) releaseTarget(false);
            return;
          }
          syncFromScroll();
        });
      };
      const onScrollEnd = () => {
        const target = scrollTargetRef.current;
        if (target !== null) releaseTarget(Math.abs(window.scrollY - target) > 6);
      };
      const onUserTakeover = () => {
        if (performance.now() - selectedAtRef.current > TAKEOVER_GRACE_MS) releaseTarget(true);
      };
      const onKeyDown = (event: KeyboardEvent) => {
        if (SCROLL_KEYS.has(event.key)) onUserTakeover();
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("scrollend", onScrollEnd);
      window.addEventListener("resize", onScroll);
      window.addEventListener("wheel", onUserTakeover, { passive: true });
      window.addEventListener("touchstart", onUserTakeover, { passive: true });
      window.addEventListener("keydown", onKeyDown);
      syncFromScroll();

      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("scrollend", onScrollEnd);
        window.removeEventListener("resize", onScroll);
        window.removeEventListener("wheel", onUserTakeover);
        window.removeEventListener("touchstart", onUserTakeover);
        window.removeEventListener("keydown", onKeyDown);
      };
    };

    // Re-evaluate whenever the screen crosses the breakpoint (resize, rotate, browser zoom).
    const apply = () => {
      detach?.();
      detach = undefined;
      if (media.matches) {
        detach = attach();
      } else {
        releaseTarget(false);
      }
    };

    apply();
    media.addEventListener("change", apply);
    return () => {
      media.removeEventListener("change", apply);
      detach?.();
      window.clearTimeout(releaseTimerRef.current);
    };
  }, [releaseTarget, syncFromScroll]);

  const selectService = (index: number) => {
    if (index === activeIndex) return;
    const measured = measure();
    if (!measured) return;
    const target = measured.sectionTop + index * measured.stepHeight + 2;
    // Switch the featured card immediately so it leaves the preview rail before the scroll starts;
    // scroll-driven selection stays paused until the scroll arrives, is interrupted, or times out.
    window.clearTimeout(releaseTimerRef.current);
    selectedAtRef.current = performance.now();
    scrollTargetRef.current = target;
    releaseTimerRef.current = window.setTimeout(() => releaseTarget(true), SELECT_TIMEOUT_MS);
    setActiveIndex(index);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: target, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const activeService = SERVICES[activeIndex];

  return (
    <section ref={sectionRef} className="home-services-story mt-5" aria-label="Our services">
      <div className="home-services-sticky">
        {/* Announces only the short change, not the whole card, to screen readers. */}
        <p className="sr-only" role="status">{`Showing service ${activeIndex + 1} of ${SERVICES.length}: ${activeService.title}`}</p>
        <div className="home-services-stage">
          <div className="home-services-featured">
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
