import { describe, expect, it } from "vitest";
import { tickerWordOpacity } from "@/lib/ticker-fade";

describe("hero ticker word fade", () => {
  const clear = 48; // 3rem
  const fade = 32; // 2rem

  it("keeps a word fully clear while its middle is inside the clear zone", () => {
    expect(tickerWordOpacity(0, clear, fade)).toBe(1);
    expect(tickerWordOpacity(clear, clear, fade)).toBe(1);
  });

  it("fades smoothly and is gone one fade length further out", () => {
    expect(tickerWordOpacity(clear + fade / 2, clear, fade)).toBeCloseTo(0.5, 5);
    expect(tickerWordOpacity(clear + fade, clear, fade)).toBeCloseTo(0, 5);
    expect(tickerWordOpacity(clear + fade + 100, clear, fade)).toBeCloseTo(0, 5);
  });

  it("never gets brighter further from the centre", () => {
    let previous = 1;
    for (let d = clear; d <= clear + fade + 20; d += 2) {
      const value = tickerWordOpacity(d, clear, fade);
      expect(value).toBeLessThanOrEqual(previous + 1e-9);
      previous = value;
    }
  });

  it("hides everything outside the clear zone when the fade length is zero", () => {
    expect(tickerWordOpacity(clear + 1, clear, 0)).toBe(0);
  });
});
