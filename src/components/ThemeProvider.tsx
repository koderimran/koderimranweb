import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";

export type Theme = "light" | "dark";
/** Where the reveal starts, in viewport pixels (the toggle button's centre). */
export type ThemeOrigin = { x: number; y: number };
const ThemeContext = createContext<{ theme: Theme; toggleTheme: (origin?: ThemeOrigin) => void } | null>(null);

const REVEAL_MS = 650;
const REVEAL_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Every page open starts in light theme. Dark is used only after the
  // visitor explicitly selects it, and it never carries over to a new visit.
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback(
    (origin?: ThemeOrigin) => {
      const next: Theme = theme === "light" ? "dark" : "light";
      const apply = () => {
        // Set the class first so the browser captures the new theme in the same frame.
        document.documentElement.classList.toggle("dark", next === "dark");
        flushSync(() => setTheme(next));
      };
      const doc = document as ViewTransitionDocument;
      const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (!doc.startViewTransition || reduceMotion) {
        apply();
        return;
      }
      // A circle grows from the toggle and reveals the new theme over the frozen old page.
      const hasOrigin = typeof origin?.x === "number" && typeof origin?.y === "number";
      const x = hasOrigin ? origin.x : window.innerWidth / 2;
      const y = hasOrigin ? origin.y : window.innerHeight / 2;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const transition = doc.startViewTransition(apply);
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: REVEAL_MS, easing: REVEAL_EASE, pseudoElement: "::view-transition-new(root)" },
          );
        })
        .catch(() => {});
    },
    [theme],
  );

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
