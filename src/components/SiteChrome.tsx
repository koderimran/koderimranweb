import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, MoveRight, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import logo from "@/assets/koder-imran-brush.png.asset.json";
import darkLogo from "@/assets/koder-imran-neon-brush.png.asset.json";
import { useTheme } from "@/components/ThemeProvider";

function BrandLogo() {
  const { theme } = useTheme();
  return (
    <img
      src={theme === "dark" ? darkLogo.url : logo.url}
      alt="Koder Imran logo"
      className="brand-logo"
    />
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
  return (
    <Button variant="ghost" size="icon" className="theme-toggle shrink-0" onClick={toggleTheme} aria-label={label} title={label}>
      {theme === "light" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
    </Button>
  );
}

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
      <div className="site-header-row container-page relative flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center">
          <Link to="/" className="font-display inline-flex items-center text-lg font-bold" aria-label="Koder Imran — home">
            <span className="site-header-logo inline-flex items-center">
              <BrandLogo />
            </span>
          </Link>
        </div>

        <span className="theme-toggle-mobile absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
          <ThemeToggle />
        </span>

        <nav className="hidden items-center justify-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="nav-link text-base font-semibold text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex md:justify-self-end">
          <ThemeToggle />
          <Link to="/contact" className="nav-cta text-sm font-bold" aria-label="Book a free call">
            <span className="nav-cta__content"><span className="nav-cta__label">Book a free call</span><span className="nav-cta__icon" aria-hidden="true"><ArrowUpRight className="nav-cta__arrow nav-cta__arrow--default" size={19} strokeWidth={2.2} /><MoveRight className="nav-cta__arrow nav-cta__arrow--hover" size={25} strokeWidth={2.2} /></span></span>
          </Link>
        </div>

        <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </Button>
        </div>
      </div>
      {open && (
        <div className="animate-menu-in border-t border-border/70 bg-muted/50 md:hidden">
          <nav className="container-page flex flex-col items-stretch pb-6 pt-4 text-left">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="menu-item text-lg font-semibold text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground" }}>
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="nav-cta mt-4 self-start text-sm font-bold" aria-label="Book a free call"><span className="nav-cta__content"><span>Book a free call</span><ArrowRight className="nav-cta__arrow" size={20} strokeWidth={2.2} aria-hidden="true" /></span></Link>
          </nav>
        </div>
      )}

    </header>
  );
}

export function CtaBand() {
  return (
    <section className="container-page py-20">
      <Reveal className="relative overflow-hidden rounded-3xl border border-[oklch(0.34_0.025_155/0.45)] bg-[oklch(0.235_0.035_155)] px-8 py-12 text-[oklch(0.96_0.008_95)] shadow-[0_24px_60px_-38px_oklch(0.18_0.025_155/0.55)] backdrop-blur-sm dark:border-[oklch(0.82_0.025_145/0.8)] dark:bg-[oklch(0.91_0.025_145)] dark:text-[oklch(0.2_0.02_255)] dark:shadow-[0_24px_60px_-38px_oklch(0.05_0.02_160/0.5)] md:px-14 md:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_120%_at_0%_0%,oklch(0.9_0.17_128/0.16),transparent_68%),radial-gradient(ellipse_65%_100%_at_100%_100%,oklch(0.62_0.09_205/0.12),transparent_72%)] dark:bg-[radial-gradient(ellipse_75%_120%_at_0%_0%,oklch(0.9_0.17_128/0.3),transparent_68%),radial-gradient(ellipse_65%_100%_at_100%_100%,oklch(0.72_0.07_205/0.13),transparent_72%)]" />
        <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="w-full text-3xl font-bold md:text-5xl">
              <span className="block">Power Your Business Growth with</span>
              <span className="text-[oklch(90%_0.17_128)] dark:text-[oklch(0.38_0.11_140)]">Websites Ads and Analytics</span>
            </h2>
            <p className="mt-4 max-w-xl text-[oklch(0.82_0.012_150)] dark:text-[oklch(0.39_0.025_255)]">
              <strong className="font-bold text-[oklch(0.98_0.006_95)] dark:text-[oklch(0.2_0.02_255)]">Free 30-Minute Audit</strong> of your website, tracking or Google Ads account — with clear recommendations to help you move forward.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link to="/contact" className="btn btn-signal cta-band-button rounded-full px-7 py-4 text-center font-bold">
              Get my free audit <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-12 lg:col-span-5">
          <p className="font-display text-xl font-bold">
            <span className="inline-flex h-12 items-center"><BrandLogo /></span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            {SITE.name} — {SITE.role}. Helping e-commerce brands and service businesses grow with measurable results.
          </p>
        </div>
        <div className="text-sm md:col-span-6 lg:col-span-4">
          <p className="eyebrow mb-3">Services</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/services">Web Analytics & Conversion Tracking</Link></li>
            <li><Link to="/services">Google Ads Management & Optimization</Link></li>
            <li><Link to="/services">Shopify Store Design, Tracking & Growth</Link></li>
            <li><Link to="/services">WordPress Website Design, Tracking & Growth</Link></li>
          </ul>
        </div>
        <div className="text-sm md:col-span-6 lg:col-span-3">
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
      <div className="border-t">
        <p className="container-page py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
