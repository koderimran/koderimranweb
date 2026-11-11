import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
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
          <Link to="/contact" className="btn btn-ink rounded-full px-5 py-2.5 text-sm font-bold">
            Book a free call
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
            <Link to="/contact" onClick={() => setOpen(false)} className="btn btn-ink mt-4 self-start rounded-full px-5 py-2.5 text-sm font-bold">Book a free call</Link>
          </nav>
        </div>
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
            <Link to="/contact" className="btn btn-signal rounded-full px-7 py-4 text-center font-bold">
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
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl font-bold">
            <span className="inline-flex h-12 items-center"><BrandLogo /></span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            {SITE.name} — {SITE.role}. Helping e-commerce brands and service businesses grow with measurable results.
          </p>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-3">Services</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/services">Web Analytics & Conversion Tracking</Link></li>
            <li><Link to="/services">Google Ads Management & Optimization</Link></li>
            <li><Link to="/services">Shopify Store Design, Tracking & Growth</Link></li>
            <li><Link to="/services">WordPress Website Design, Tracking & Growth</Link></li>
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
      <p className="container-page border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </p>
    </footer>
  );
}
