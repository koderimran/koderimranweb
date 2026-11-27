/**
 * Hero ticker: fade whole words, not pixels.
 *
 * A word whose middle is within `clear` of the face's centre line is fully clear along its whole
 * length. Beyond that the whole word (and the dot after it) fades together, smoothly, and is gone
 * `fade` further out. The reading window is therefore a spotlight about one word wide, not the
 * whole ticker. The CSS only adds a short edge fade so a word is never clipped hard at the ends.
 *
 * Words move at roughly 15px/s, so the opacity is refreshed ~15 times a second, which is far
 * finer than the eye can see for this speed, and only while the hero is on screen.
 */

/** Opacity (0..1) of one item, from the distance of its middle to the centre line. */
export function tickerWordOpacity(distance: number, clear: number, fade: number): number {
  if (distance <= clear) return 1;
  if (fade <= 0) return 0;
  const t = Math.min(1, (distance - clear) / fade);
  return 1 - t * t * (3 - 2 * t); // smoothstep, the same curve family as the portrait fade
}

function translateX(el: HTMLElement): number {
  // "none" or "matrix(a, b, c, d, tx, ty)"
  const m = /matrix\(([^)]+)\)/.exec(getComputedStyle(el).transform);
  return m ? parseFloat(m[1].split(",")[4]) || 0 : 0;
}

/** Starts the word fade on a `.hero-marquee-stage`. Returns a function that stops it. */
export function startTickerWordFade(stage: HTMLElement, clearRem = 3, fadeRem = 2): () => void {
  const lane = stage.querySelector<HTMLElement>(".hero-service-marquee");
  const track = stage.querySelector<HTMLElement>(".hero-service-marquee-track");
  if (!lane || !track) return () => {};
  const items = Array.from(track.querySelectorAll<HTMLElement>("b, i"));
  if (!items.length) return () => {};

  let centres: number[] = []; // each item's middle, measured from the track's left edge
  let half = 0; // the ticker's middle, measured from its left edge
  let clear = 0;
  let fade = 0;
  const shown: string[] = [];

  const measure = () => {
    const laneRect = lane.getBoundingClientRect();
    const tx = translateX(track);
    half = laneRect.width / 2;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    clear = clearRem * rem;
    fade = fadeRem * rem;
    centres = items.map((el) => {
      const r = el.getBoundingClientRect();
      return r.left + r.width / 2 - laneRect.left - tx;
    });
  };

  const apply = () => {
    const tx = translateX(track);
    for (let i = 0; i < items.length; i++) {
      const value = tickerWordOpacity(Math.abs(centres[i] + tx - half), clear, fade).toFixed(2);
      if (shown[i] !== value) {
        shown[i] = value;
        items[i].style.opacity = value;
      }
    }
  };

  const reduceMotion =
    typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf = 0;
  let last = 0;
  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    if (now - last < 66) return;
    last = now;
    apply();
  };
  const run = () => {
    if (reduceMotion || raf) return;
    raf = requestAnimationFrame(tick);
  };
  const halt = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  measure();
  apply();
  stage.dataset.wordFade = "true";

  const resize =
    typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(() => {
          measure();
          apply();
        });
  resize?.observe(lane);

  const visible =
    typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(([entry]) => (entry.isIntersecting ? run() : halt()));
  if (visible) visible.observe(stage);
  else run();

  return () => {
    halt();
    resize?.disconnect();
    visible?.disconnect();
    delete stage.dataset.wordFade;
    for (const el of items) el.style.removeProperty("opacity");
  };
}
