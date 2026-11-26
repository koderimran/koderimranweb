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

  const initialPortraitWidth = Math.min(viewportWidth * (viewportWidth <= 640 ? 0.88 : viewportWidth <= 900 ? 0.62 : 0.52), 730);
  const portraitScale = 1 - progress * (1 - 75 / initialPortraitWidth);
  const style = {
    "--intro-progress": progress,
    "--intro-portrait-scale": portraitScale,
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

          <Link to="/portfolio" className="cinematic-intro-portfolio">
            VIEW PORTFOLIO <ArrowUpRight aria-hidden="true" />
          </Link>

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

        <div className="cinematic-intro-sidecopy cinematic-intro-sidecopy-left">
          <span className="cinematic-intro-side-index">DIGITAL EXPERIENCE / PERFORMANCE</span>
          <p>Website design, analytics &amp; growth strategy<br />Built for clarity, speed and conversion.</p>
        </div>

        <div className="cinematic-intro-portrait" aria-hidden="true">
          <div className="cinematic-intro-orbit" />
          <Portrait alt="" className="cinematic-intro-image" />
          <div className="cinematic-intro-image-tint" />
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
