import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Portrait } from "@/components/Portrait";
import { SITE } from "@/lib/site";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function CinematicIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {\n    document.body.classList.toggle("intro-active", progress < 1);\n    return () => document.body.classList.remove("intro-active");\n  }, [progress]);\n\n  const style = { "--intro-progress": progress } as CSSProperties;

  return (
    <section ref={sectionRef} className="cinematic-intro" style={style} aria-label="Introduction">
      <div className="cinematic-intro-stage">
        <div className="cinematic-intro-noise" aria-hidden="true" />
        <header className="cinematic-intro-header">
          <Link to="/" className="cinematic-intro-brand" aria-label="Koder Imran home">KODER<span>IMRAN</span><i>.</i></Link>
          <nav aria-label="Main navigation" className="cinematic-intro-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Skills</Link>
            <Link to="/portfolio">Projects</Link>
            <a href="#intro-contact">Contact</a>
          </nav>
          <span className="cinematic-intro-index">INDEPENDENT DIGITAL SPECIALIST</span>
        </header>

        <div className="cinematic-intro-copy">
          <p className="cinematic-intro-kicker">STRATEGY · DESIGN · DEVELOPMENT</p>
          <h1>BUILDING <span>SMART</span><br />DIGITAL EXPERIENCES<span className="intro-period">.</span></h1>
          <p className="cinematic-intro-description">
            I help businesses grow through <strong>Google Ads, analytics, conversion tracking</strong> and high-performing e-commerce experiences.
          </p>
        </div>

        <div className="cinematic-intro-portrait" aria-hidden="true">
          <div className="cinematic-intro-orbit" />
          <Portrait alt="" className="cinematic-intro-image" />
          <div className="cinematic-intro-image-tint" />
        </div>

        <div className="cinematic-intro-bottom">
          <span className="cinematic-intro-scroll"><i /> SCROLL TO EXPLORE</span>
          <p>Turning complex ideas into<br /><strong>measurable digital growth.</strong></p>
          <Link id="intro-contact" to="/contact" className="cinematic-intro-cta">LET'S WORK TOGETHER <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <span className="cinematic-intro-watermark" aria-hidden="true">IMRAN</span>
      </div>
    </section>
  );
}
