import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

/**
 * A card that tilts in 3D toward the mouse pointer.
 * - Only reacts to a real mouse on devices that can hover (never on touch).
 * - Does nothing when the visitor prefers reduced motion.
 * The tilt is driven by CSS variables (--rx, --ry, --mx, --my); all visuals live in styles.css.
 */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const canTilt = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reset = () => {
    cancelAnimationFrame(frame.current);
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty("--rx");
    el.style.removeProperty("--ry");
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse" || !canTilt()) return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      el.style.setProperty("--ry", `${((x - 0.5) * 9).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - y) * 7).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    });
  };

  return (
    <div className="tilt-scene">
      <div ref={ref} className={`tilt-card ${className}`} onPointerMove={onPointerMove} onPointerLeave={reset}>
        {children}
      </div>
    </div>
  );
}
