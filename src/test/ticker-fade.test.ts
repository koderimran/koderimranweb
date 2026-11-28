import { describe, expect, it } from "vitest";
import { loopDistance, tickerWordOpacity } from "@/lib/ticker-fade";

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

  describe("loopDistance", () => {
    const centre = 300;
    const period = 1200; // the track slides this far, then starts over

    it("is the plain distance when the item is near the centre", () => {
      expect(loopDistance(350, centre, period)).toBe(50);
      expect(loopDistance(260, centre, period)).toBe(40);
    });

    it("gives an item and its twin one loop away the same distance", () => {
      for (const position of [-1000, -700, -300, 0, 180, 300, 411, 900]) {
        expect(loopDistance(position + period, centre, period)).toBeCloseTo(
          loopDistance(position, centre, period),
          9,
        );
      }
    });

    it("keeps the opacity the same across the loop restart", () => {
      // Just before the restart the track is at -period, just after at 0: every item's twin takes its place.
      for (const middle of [20, 180, 300, 330, 700, 1100, 1500, 2100]) {
        const before = tickerWordOpacity(loopDistance(middle - period, centre, period), 48, 32);
        const after = tickerWordOpacity(loopDistance(middle, centre, period), 48, 32);
        expect(after).toBeCloseTo(before, 9);
      }
    });

    it("never exceeds half a loop", () => {
      for (let position = -2500; position <= 2500; position += 37) {
        expect(loopDistance(position, centre, period)).toBeLessThanOrEqual(period / 2);
      }
    });

    it("falls back to the plain distance without a loop length", () => {
      expect(loopDistance(500, centre, 0)).toBe(200);
    });
  });
});
