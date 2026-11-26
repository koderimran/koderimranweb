import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
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
  // Title width stays fixed at exactly half of the content grid throughout the scroll.
  const titleWidth = availableContentWidth * 0.5;
  // Keep the description's left edge anchored while its container expands.
  const copyLeft = contentInset;
  const copyX = copyLeft + copyWidth / 2;
  const copyBottom = viewportHeight * (viewportWidth <= 640 ? 0.07 : 0.07);
  const copyStartY = viewportHeight - copyBottom - 48;
  const copyY = copyStartY + (viewportHeight / 2 - copyStartY) * progress;
  const handlePortraitPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--intro-tilt-x", `${-y * 3.2}deg`);
    event.currentTarget.style.setProperty("--intro-tilt-y", `${x * 4.2}deg`);
    event.currentTarget.style.setProperty("--intro-depth-x", `${x * -9}px`);
    event.currentTarget.style.setProperty("--intro-depth-y", `${y * -7}px`);
    event.currentTarget.style.setProperty("--intro-highlight-x", `${x * 5}px`);
    event.currentTarget.style.setProperty("--intro-highlight-y", `${y * 4}px`);
    event.currentTarget.style.setProperty("--intro-pointer-x", `${(x + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--intro-pointer-y", `${(y + 0.5) * 100}%`);
  };
  const handlePortraitPointerLeave = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--intro-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--intro-tilt-y", "0deg");
    event.currentTarget.style.setProperty("--intro-depth-x", "0px");
    event.currentTarget.style.setProperty("--intro-depth-y", "0px");
    event.currentTarget.style.setProperty("--intro-highlight-x", "0px");
    event.currentTarget.style.setProperty("--intro-highlight-y", "0px");
  };
  const copyStyle = {
    "--intro-copy-x": `${copyX}px`,
    "--intro-copy-y": `${copyY}px`,
    "--intro-copy-width": `${copyWidth}px`,
    "--intro-title-width": `${titleWidth}px`,
    "--intro-copy-size": `${1 + progress}rem`,
    "--intro-copy-progress": progress,
    textAlign: "left",
  } as CSSProperties;
  const initialPortraitWidth = Math.min(
    viewportWidth * (viewportWidth <= 640 ? 0.88 : viewportWidth <= 900 ? 0.62 : 0.52),
    730,
  );
  const initialPortraitHeight = Math.max(180, viewportHeight - 100);
  const portraitSize = initialPortraitWidth + (64 - initialPortraitWidth) * progress;
  const portraitHeight = initialPortraitHeight + (64 - initialPortraitHeight) * progress;
  const portraitTop = 100 + (32 - 100) * progress;
  const titleTop = 155 + (80 - 155) * progress;
  const style = {
    "--intro-progress": progress,
    "--intro-portrait-width": `${portraitSize}px`,
    "--intro-portrait-height": `${portraitHeight}px`,
    "--intro-portrait-top": `${portraitTop}px`,
    "--intro-title-top": `${titleTop}px`,
    "--intro-portrait-radius": `${progress * 50}%`,
    "--intro-portrait-image-scale": 1 + progress * 1.35,
    "--intro-portrait-fit": progress > 0.82 ? "cover" : "contain",
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      className="cinematic-intro"
      style={style}
      aria-label="Introduction"
      onPointerMove={handlePortraitPointerMove}
      onPointerLeave={handlePortraitPointerLeave}
    >
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

          <Link to="/portfolio" className="cinematic-intro-portfolio cinematic-intro-header-portfolio">
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
          <p className="cinematic-intro-greeting"><span>Hi, I’m </span><span className="intro-greeting-accent">Imran.</span></p>
          <h1><span className="intro-title-line">FULL STACK BUSINESS</span><br /><span className="intro-title-line"><span className="intro-growth-light">GROWTH </span><span className="intro-title-line-accent">ENGINEER.</span></span></h1>
        </div>

        <div className="cinematic-intro-portrait" aria-hidden="true">
          <div className="cinematic-intro-orbit" />
          <Portrait alt="" className="cinematic-intro-depth-layer" />
          <Portrait alt="" className="cinematic-intro-image" />
          <div className="cinematic-intro-image-tint" />
        </div>

        <div className="cinematic-intro-sidecopy cinematic-intro-sidecopy-left cinematic-intro-scroll-copy" style={copyStyle}>
          <p>I help e-commerce brands and service businesses scale with high-converting <strong>Shopify &amp; WordPress</strong> websites, precision <strong>GA4 &amp; GTM</strong> tracking, and ROI-focused <strong>Google Ads</strong> campaigns.</p>
        </div>

        <div className="cinematic-intro-bottom">
          <div className="cinematic-intro-location">
            <i aria-hidden="true" />
            <span>BASED IN DHAKA, BANGLADESH</span>
          </div>
        </div>
        <span className="cinematic-intro-watermark" aria-hidden="true">IMRAN</span>
      </div>
    </section>
  );
}
