/**
 * Hero ticker: fade whole words, not pixels.
 *
 * A word whose middle is within `clear` of the face's centre line is fully clear along its whole
 * length. Beyond that the whole word (and the dot after it) fades together, smoothly, and is gone
 * `fade` further out. The reading window is therefore a spotlight about one word wide, not the
 * whole ticker. The CSS adds no mask in this mode, so nothing else touches the words.
 *
 * The ticker loops by sliding the track left by exactly half its width and starting over. The
 * second half is a copy of the first, so the picture is the same on both sides of the restart.
 * The opacity has to be the same too, and the word on the centre line after the restart is a
 * different element from the one before it. So the distance to the centre line is measured
 * modulo the loop length (`loopDistance`), never per element. Without that, every word flashes
 * out and back in at each restart.
 *
 * `clear` and `fade` are in `em` of the ticker text, so the window follows the text size
 * (smaller on phones). The opacity is refreshed every frame, only while the hero is on screen,
 * and an element is written to only when its value changes.
 */

/** Opacity (0..1) of one item, from the distance of its middle to the centre line. */
export function tickerWordOpacity(distance: number, clear: number, fade: number): number {
  if (distance <= clear) return 1;
  if (fade <= 0) return 0;
  const t = Math.min(1, (distance - clear) / fade);
  return 1 - t * t * (3 - 2 * t); // smoothstep, the same curve family as the portrait fade
}

/**
 * Distance from `position` to `centre` on a loop of length `period`: the nearest copy of the
 * position wins, so an item and its twin one loop away give the same distance.
 */
export function loopDistance(position: number, centre: number, period: number): number {
  const d = Math.abs(position - centre);
  if (!(period > 0)) return d;
  const r = d % period;
  return Math.min(r, period - r);
}

/** Starts the word fade on a `.hero-marquee-stage`. Returns a function that stops it. */
export function startTickerWordFade(stage: HTMLElement, clearEm = 3.85, fadeEm = 2.55): () => void {
  const lane = stage.querySelector<HTMLElement>(".hero-service-marquee");
  const track = stage.querySelector<HTMLElement>(".hero-service-marquee-track");
  if (!lane || !track) return () => {};
  const items = Array.from(track.querySelectorAll<HTMLElement>("b, i"));
  if (!items.length) return () => {};

  const trackStyle = getComputedStyle(track); // live object: reading it again is cheap
  const translateX = () => {
    // "none" or "matrix(a, b, c, d, tx, ty)"
    const m = /matrix\(([^)]+)\)/.exec(trackStyle.transform);
    return m ? parseFloat(m[1].split(",")[4]) || 0 : 0;
  };

  let centres: number[] = []; // each item's middle, measured from the track's left edge
  let half = 0; // the ticker's middle, measured from its left edge
  let period = 0; // how far the track slides before it starts over: half its width
  let clear = 0;
  let fade = 0;
  const shown: string[] = [];

  const measure = () => {
    const laneRect = lane.getBoundingClientRect();
    const tx = translateX();
    half = laneRect.width / 2;
    period = track.getBoundingClientRect().width / 2;
    const fontPx = parseFloat(getComputedStyle(items[0]).fontSize) || 12;
    clear = clearEm * fontPx;
    fade = fadeEm * fontPx;
    centres = items.map((el) => {
      const r = el.getBoundingClientRect();
      return r.left + r.width / 2 - laneRect.left - tx;
    });
  };

  const apply = () => {
    const tx = translateX();
    for (let i = 0; i < items.length; i++) {
      const distance = loopDistance(centres[i] + tx, half, period);
      const value = tickerWordOpacity(distance, clear, fade).toFixed(3);
      if (shown[i] !== value) {
        shown[i] = value;
        items[i].style.opacity = value;
      }
    }
  };

  const reduceMotion =
    typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf = 0;
  const tick = () => {
    raf = requestAnimationFrame(tick);
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

  let alive = true;
  const remeasure = () => {
    if (!alive) return;
    measure();
    apply();
  };

  measure();
  apply();
  stage.dataset.wordFade = "true";

  // The lane changes size with the window; the track changes size when the web font arrives.
  const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(remeasure);
  resize?.observe(lane);
  resize?.observe(track);
  if (typeof document !== "undefined" && document.fonts) void document.fonts.ready.then(remeasure);

  const visible =
    typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(([entry]) => (entry.isIntersecting ? run() : halt()));
  if (visible) visible.observe(stage);
  else run();

  return () => {
    alive = false;
    halt();
    resize?.disconnect();
    visible?.disconnect();
    delete stage.dataset.wordFade;
    for (const el of items) el.style.removeProperty("opacity");
  };
}
