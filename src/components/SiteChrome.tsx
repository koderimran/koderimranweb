import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import logo from "@/assets/koder-imran-logo.png.asset.json";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const updateHeader = () => {
      setCompact((current) => window.scrollY > (current ? 24 : 80));
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header data-compact={compact} className="site-header sticky top-0 z-40 border-b backdrop-blur">
      <div className="site-header-row container-page flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-bold">
          <img src={logo.url} alt="Koder Imran logo" width={40} height={40} className="site-header-logo rounded-full" />
          {SITE.brand}
        </Link>
        <nav className="hidden items-center justify-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="nav-link text-sm font-semibold text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex md:justify-self-end">
          <Button asChild className="btn-press rounded-full bg-ink px-5 text-sm font-bold text-ink-foreground hover:bg-ink/90">
            <Link to="/contact">Book a free call</Link>
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="animate-menu-in container-page flex flex-col items-center gap-4 pb-6 text-center md:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-semibold">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function CtaBand() {
  return (
    <section className="container-page py-20">
      <Reveal className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 text-ink-foreground md:px-14">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold md:text-5xl">
              Ready for a website and ad account that <span className="text-signal">pays for itself?</span>
            </h2>
            <p className="mt-4 max-w-xl text-ink-foreground/70">
              Get a free 20-minute audit of your store, tracking or Google Ads account. No obligation.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link to="/contact" className="btn-press rounded-full bg-signal px-7 py-4 text-center font-bold text-signal-foreground hover:opacity-90">
              Get my free audit →
            </Link>
            <a href={`mailto:${SITE.email}`} className="text-sm text-ink-foreground/70 transition-colors hover:text-ink-foreground">
              {SITE.email}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="flex items-center gap-3 font-display text-xl font-bold">
            <img src={logo.url} alt="Koder Imran logo" width={48} height={48} className="size-12 rounded-full" loading="lazy" />
            {SITE.brand}
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            {SITE.name} — {SITE.role}. Helping e-commerce brands and service businesses grow with measurable results.
          </p>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-3">Services</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/services">Google Ads Management</Link></li>
            <li><Link to="/services">GA4 & GTM Tracking</Link></li>
            <li><Link to="/services">Shopify Development</Link></li>
            <li><Link to="/services">WordPress & WooCommerce</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-3">Contact</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a href={`tel:${SITE.phone}`}>{SITE.phone}</a></li>
            <li>{SITE.location}</li>
            <li className="flex flex-wrap gap-3 pt-2">
              {SITE.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer me" className="font-semibold text-foreground">
                  {s.label}
                </a>
              ))}
            </li>
          </ul>
        </div>
      </div>
      <p className="container-page border-t py-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </p>
    </footer>
  );
}
