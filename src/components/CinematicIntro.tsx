import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Portrait } from "@/components/Portrait";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function CinematicIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const distance = Math.max(1, section.offsetHeight - window.innerHeight);
        setProgress(clamp(-rect.top / distance));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.body.classList.toggle("intro-active", progress < 1);
    return () => document.body.classList.remove("intro-active");
  }, [progress]);

  const style = { "--intro-progress": progress } as CSSProperties;

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

          <div className="cinematic-intro-location">
            <i aria-hidden="true" />
            <span>BASED IN DHAKA</span>
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
          <h1>WEBSITE <span>DESIGN</span><br />ANALYTICS &amp; TRACKING<br />AND <span>GOOGLE ADS</span><b className="intro-period">.</b></h1>
        </div>

        <div className="cinematic-intro-portrait" aria-hidden="true">
          <div className="cinematic-intro-orbit" />
          <Portrait alt="" className="cinematic-intro-image" />
          <div className="cinematic-intro-image-tint" />
        </div>

        <div className="cinematic-intro-bottom">
          <Link id="intro-contact" to="/contact" className="cinematic-intro-cta">
            LET'S WORK TOGETHER <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <span className="cinematic-intro-watermark" aria-hidden="true">IMRAN</span>
      </div>
    </section>
  );
}
