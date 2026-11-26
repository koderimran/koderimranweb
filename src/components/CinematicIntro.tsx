import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Portrait } from "@/components/Portrait";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function CinematicIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1440);
  const [viewportHeight, setViewportHeight] = useState(900);

  useEffect(() => {
    const section = sectionRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const update = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      if (reducedMotion || !section) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      setProgress(clamp(-rect.top / distance));
    };
    update();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.body.classList.toggle("intro-active", progress < 1);
    return () => document.body.classList.remove("intro-active");
  }, [progress]);

  // The description grows from half to the full shared content grid as the intro scrolls.
  const contentGutter = Math.max(24, Math.min(viewportWidth * 0.04, 80));
  const contentInset = Math.max(0, (viewportWidth - 1920) / 2) + contentGutter;
  const availableContentWidth = Math.max(0, viewportWidth - contentInset * 2);
  const copyStartWidth = availableContentWidth * 0.5;
  const copyEndWidth = availableContentWidth;
  const copyWidth = copyStartWidth + (copyEndWidth - copyStartWidth) * progress;
  // Keep the description's left edge anchored while its container expands.
  const copyLeft = contentInset;
  const copyX = copyLeft + copyWidth / 2;
  const copyBottom = viewportHeight * (viewportWidth <= 640 ? 0.07 : 0.07);
  const copyStartY = viewportHeight - copyBottom - 48;
  const copyY = copyStartY + (viewportHeight / 2 - copyStartY) * progress;
  const copyStyle = {
    "--intro-copy-x": `${copyX}px`,
    "--intro-copy-y": `${copyY}px`,
    "--intro-copy-width": `${copyWidth}px`,
    "--intro-copy-size": `${1 + progress * 1.55}rem`,
    "--intro-copy-progress": progress,
    textAlign: "left",
  } as CSSProperties;
  const style = {
    "--intro-progress": progress,
  } as CSSProperties;

  return (
    <section ref={sectionRef} className="cinematic-intro" style={style} aria-label="Introduction">
      <div className="cinematic-intro-stage">
        <div className="cinematic-intro-noise" aria-hidden="true" />
        <header className="cinematic-intro-header">
          <button
            type="button"
            className="cinematic-intro-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <Link to="/" className="cinematic-intro-brand" aria-label="Koder Imran home">
            KODER<span>IMRAN</span><i>.</i>
          </Link>

          <div className="cinematic-intro-header-profile">
            <Portrait alt="Imran" className="cinematic-intro-avatar-image" />
          </div>

          <nav aria-label="Main navigation" className="cinematic-intro-nav" data-open={menuOpen}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Projects</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>
        </header>

        <div className="cinematic-intro-copy">
          <h1>FULL STACK<br /><span>BUSINESS GROWTH</span><br />ENGINEER<b className="intro-period">.</b></h1>
        </div>

        <div className="cinematic-intro-sidecopy cinematic-intro-sidecopy-left cinematic-intro-scroll-copy" style={copyStyle}>
          <p>I help e-commerce brands and service businesses scale with high-converting <strong>Shopify &amp; WordPress</strong> websites, precision <strong>GA4 &amp; GTM</strong> tracking, and ROI-focused <strong>Google Ads</strong> campaigns.</p>
          <Link to="/portfolio" className="cinematic-intro-portfolio cinematic-intro-copy-portfolio">
            VIEW PORTFOLIO <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="cinematic-intro-bottom">
          <div className="cinematic-intro-location">
            <i aria-hidden="true" />
            <span>BASED IN DHAKA</span>
          </div>
        </div>
        <span className="cinematic-intro-watermark" aria-hidden="true">IMRAN</span>
      </div>
    </section>
  );
}
