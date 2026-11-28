import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { Portrait } from "@/components/Portrait";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function CinematicIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const menuCloseTimer = useRef<number | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuCloseButtonRef = useRef<HTMLButtonElement>(null);
  const menuWasOpen = useRef(false);

  const closeMenu = () => {
    if (!menuOpen || menuClosing) return;
    setMenuClosing(true);
    if (menuCloseTimer.current !== null) window.clearTimeout(menuCloseTimer.current);
    menuCloseTimer.current = window.setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
      menuCloseTimer.current = null;
    }, 1150);
  };

  const openMenu = () => {
    if (menuCloseTimer.current !== null) window.clearTimeout(menuCloseTimer.current);
    menuCloseTimer.current = null;
    setMenuClosing(false);
    setMenuOpen(true);
  };
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
      const distance = Math.max(1, section.offsetHeight - Math.min(window.innerHeight, 900));
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
    if (!menuOpen) return;
    menuCloseButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".cinematic-intro-menu-layer a[href], .cinematic-intro-menu-panel-close"
        )
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, menuClosing]);

  useEffect(() => {
    if (menuOpen) {
      menuWasOpen.current = true;
    } else if (menuWasOpen.current) {
      menuWasOpen.current = false;
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  // Close only when the user scrolls after opening the menu.
  // Do not immediately close merely because the intro is already scrolled.
  useEffect(() => {
    if (!menuOpen || menuClosing) return;
    const onScroll = () => closeMenu();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen, menuClosing]);

  useEffect(() => () => {
    if (menuCloseTimer.current !== null) window.clearTimeout(menuCloseTimer.current);
  }, []);

  const introActive = progress < 1;
  useEffect(() => {
    document.body.classList.toggle("intro-active", introActive);
    return () => document.body.classList.remove("intro-active");
  }, [introActive]);

  // The description grows from half to the full shared content grid as the intro scrolls.
  const compositionWidth = Math.min(viewportWidth, 1600);
  const contentGutter = Math.max(24, Math.min(compositionWidth * 0.04, 80));
  const contentInset = contentGutter;
  const availableContentWidth = Math.max(0, compositionWidth - contentInset * 2);
  const copyStartWidth = availableContentWidth * 0.5;
  const copyEndWidth = Math.min(availableContentWidth * 0.75, 1120);
  const copyWidth = copyStartWidth + (copyEndWidth - copyStartWidth) * progress;
  // Title width stays fixed at exactly half of the content grid throughout the scroll.
  const titleWidth = availableContentWidth * 0.5;
  // Keep the description's left edge anchored while its container expands.
  const copyLeft = contentInset;
  const copyX = copyLeft + copyWidth / 2;
  // Keep the vertical composition tied to the proven 900px desktop canvas.
  // Taller monitors gain breathing room around the stage, not larger gaps between content.
  const compositionHeight = Math.min(viewportHeight, 900);
  const copyBottom = compositionHeight * 0.07;
  const copyStartY = compositionHeight - copyBottom - 48;
  const copyY = copyStartY + (compositionHeight / 2 - copyStartY) * progress;
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
  // Fluid greeting scale follows the viewport, with explicit minimum and maximum sizes.
  const greetingStartSize = Math.max(2, Math.min(3.25, viewportWidth / 576));
  const greetingEndSize = Math.max(1.25, Math.min(1.75, viewportWidth / 960));
  const greetingSize = greetingStartSize + (greetingEndSize - greetingStartSize) * progress;
  const copyStyle = {
    "--intro-copy-x": `${copyX}px`,
    "--intro-copy-y": `${copyY}px`,
    "--intro-copy-width": `${copyWidth}px`,
    "--intro-copy-size": `${1 + progress}rem`,
    "--intro-copy-progress": progress,
    "--intro-greeting-size": `${greetingSize}rem`,
    "--intro-menu-start": `${Math.max(20, Math.min(viewportWidth * 0.032, 46))}px`,
    "--intro-menu-top": `${Math.max(20, Math.min(viewportWidth * 0.032, 46)) + progress * Math.max(0, compositionHeight - Math.max(20, Math.min(viewportWidth * 0.032, 46)) - (viewportWidth <= 640 ? 42 : 48) - 24)}px`,
    "--intro-greeting-rise": "60px",
    textAlign: "left",
  } as CSSProperties;
  const initialPortraitWidth = Math.min(
    compositionWidth * (viewportWidth <= 640 ? 0.88 : viewportWidth <= 900 ? 0.62 : 0.52),
    730,
  );
  const initialPortraitHeight = Math.min(800, Math.max(180, compositionHeight - 100));
  // Portrait choreography is intentionally faster than the long-form copy reveal:
  // the first scroll movement immediately contracts the rendered image dimensions.
  const portraitProgress = clamp((-((sectionRef.current?.getBoundingClientRect().top) ?? 0)) / Math.max(1, viewportHeight * 0.72));
  const portraitSize = initialPortraitWidth + (64 - initialPortraitWidth) * portraitProgress;
  const portraitHeight = initialPortraitHeight + (64 - initialPortraitHeight) * portraitProgress;
  const portraitTop = 100 + (32 - 100) * portraitProgress;
  // Center the greeting + headline group on the capped 900px stage initially,
  // then settle the greeting at 32px from the top as the intro scroll completes.
  const initialTitleTop = compositionHeight / 2 - 40; // 2.5rem above exact vertical center
  const titleTop = initialTitleTop + (20 - initialTitleTop) * progress;
  const style = {
    "--intro-progress": progress,
    "--intro-portrait-width": `${portraitSize}px`,
    "--intro-portrait-height": `${portraitHeight}px`,
    "--intro-portrait-top": `${portraitTop}px`,
    "--intro-title-top": `${titleTop}px`,
    "--intro-title-width": `${titleWidth}px`,
    "--intro-content-inset": `${contentInset}px`,
    "--intro-portrait-radius": `${progress * 50}%`,
    "--intro-portrait-image-scale": 1,
    "--intro-portrait-progress": portraitProgress,
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
        <header className="cinematic-intro-header" data-menu-overlay-active={menuOpen && !menuClosing}>
          <button
            type="button"
            ref={menuButtonRef}
            className="cinematic-intro-menu"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="cinematic-intro-navigation"
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
          >
            <span />
            <span />
          </button>

          <Link to="/" className="cinematic-intro-brand" aria-label="Koder Imran home">
            KODER<span>IMRAN</span><i>.</i>
          </Link>

          <div className="cinematic-intro-location cinematic-intro-header-location">
            <i aria-hidden="true" />
            <span>DHAKA, BANGLADESH</span>
          </div>




        </header>



        <div className="cinematic-intro-copy">
          <p className="cinematic-intro-greeting"><span>Hi, I’m </span><span className="intro-greeting-accent">Imran.</span></p>
          <h1>
            <span className="intro-title-line">FULL STACK BUSINESS</span>
            <span className="intro-title-line"><span className="intro-growth-light">GROWTH </span><span className="intro-title-line-accent">ENGINEER.</span></span>
          </h1>
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


        <span className="cinematic-intro-watermark" aria-hidden="true">IMRAN</span>
        <nav
          className="cinematic-intro-scroll-nav"
          aria-label="Section navigation"
          data-reveal={progress >= 0.94}
          data-menu-open={menuOpen}
          aria-hidden={menuOpen || progress < 0.94}
        >
          <Link to="/" tabIndex={menuOpen || progress < 0.94 ? -1 : 0}>Home</Link>
          <Link to="/about" tabIndex={menuOpen || progress < 0.94 ? -1 : 0}>About</Link>
          <Link to="/services" tabIndex={menuOpen || progress < 0.94 ? -1 : 0}>Services</Link>
          <Link to="/portfolio" tabIndex={menuOpen || progress < 0.94 ? -1 : 0}>Projects</Link>
          <Link to="/contact" tabIndex={menuOpen || progress < 0.94 ? -1 : 0}>Contact</Link>
        </nav>
      </div>
 
      {menuOpen && typeof document !== "undefined" && createPortal(
        <div
          className="cinematic-intro-menu-layer"
          data-closing={menuClosing}
          role="presentation"
          onClick={closeMenu}
        >
          <section
            className="cinematic-intro-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cinematic-intro-menu-panel-header">
              <Link to="/" className="cinematic-intro-menu-panel-brand" aria-label="Koder Imran home" onClick={closeMenu}>
                KODER<span>IMRAN</span><i>.</i>
              </Link>
              <button
                type="button"
                ref={menuCloseButtonRef}
                className="cinematic-intro-menu-panel-close"
                aria-label="Close navigation menu"
                onClick={closeMenu}
              >
                <span />
                <span />
              </button>
            </div>
            <nav id="cinematic-intro-navigation" aria-label="Main navigation" className="cinematic-intro-menu-panel-nav">
              <Link to="/" onClick={closeMenu}>Home</Link>
              <Link to="/about" onClick={closeMenu}>About</Link>
              <Link to="/services" onClick={closeMenu}>Services</Link>
              <Link to="/portfolio" onClick={closeMenu}>Projects</Link>
              <Link to="/contact" onClick={closeMenu}>Contact</Link>
            </nav>
          </section>
        </div>,
        document.body
      )}
    </section>
  );
}
