import { describe, expect, it } from "vitest";
import { portraitSource } from "@/components/Portrait";
import originalPortrait from "@/assets/koder-imran.png.asset.json";
import darkPortrait from "@/assets/koder-imran-portrait-dark.png.asset.json";

describe("Theme portraits", () => {
  it("keeps the original portrait in the light theme", () => {
    expect(portraitSource("light")).toBe(originalPortrait.url);
  });
  it("uses the newly supplied portrait only in the dark theme", () => {
    expect(portraitSource("dark")).toBe(darkPortrait.url);
    expect(portraitSource("dark")).not.toBe(originalPortrait.url);
  });
});