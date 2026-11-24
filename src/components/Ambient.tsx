/**
 * Slow, decorative background motion. The layers are aria-hidden and ignore pointer events.
 * Put them inside a host that has `ambient-host` (or an element that already isolates, like
 * `.hero-backdrop`); all motion rules and the phone / reduced-motion limits live in styles.css.
 */

/** Soft light blobs that drift in opposite directions. "hero" also breathes a lime corner. */
export function AmbientGlow({ variant = "hero" }: { variant?: "hero" | "proof" }) {
  return (
    <span className={`ambient-glows ambient-glows--${variant}`} aria-hidden="true">
      <span className="ambient-glow ambient-glow-a" />
      <span className="ambient-glow ambient-glow-b" />
      {variant === "hero" && <span className="ambient-glow ambient-glow-c" />}
    </span>
  );
}

/** A faint grid that slides one cell per loop, fading out toward the edges. */
export function AmbientGrid() {
  return <span className="ambient-grid" aria-hidden="true" />;
}
