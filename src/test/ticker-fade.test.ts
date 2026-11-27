import { describe, expect, it } from "vitest";
import { tickerWordOpacity } from "@/lib/ticker-fade";

describe("hero ticker word fade", () => {
  const clear = 80; // 5rem
  const half = 276;

  it("keeps a word fully clear while its middle is inside the clear zone", () => {
    expect(tickerWordOpacity(0, clear, half)).toBe(1);
    expect(tickerWordOpacity(clear, clear, half)).toBe(1);
  });

  it("fades smoothly and is gone at the end of the ticker", () => {
    const mid = tickerWordOpacity((clear + half) / 2, clear, half);
    expect(mid).toBeCloseTo(0.5, 5);
    expect(tickerWordOpacity(half, clear, half)).toBeCloseTo(0, 5);
    expect(tickerWordOpacity(half + 100, clear, half)).toBeCloseTo(0, 5);
  });

  it("never gets brighter further from the centre", () => {
    let previous = 1;
    for (let d = clear; d <= half; d += 4) {
      const value = tickerWordOpacity(d, clear, half);
      expect(value).toBeLessThanOrEqual(previous + 1e-9);
      previous = value;
    }
  });

  it("leaves everything clear when the ticker is narrower than the clear zone", () => {
    expect(tickerWordOpacity(100, clear, 60)).toBe(1);
  });
});
