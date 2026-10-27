import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { Portrait } from "@/components/Portrait";
import { SITE } from "@/lib/site";

function Toggle() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark");
});
afterEach(cleanup);

describe("Owner portrait", () => {
  it("shows the same uploaded photo in light and dark themes", async () => {
    render(
      <ThemeProvider>
        <Toggle />
        <Portrait alt="Imran" className="" />
      </ThemeProvider>,
    );

    const img = screen.getByAltText("Imran");
    expect(img.getAttribute("src")).toBe(SITE.portrait);

    fireEvent.click(screen.getByRole("button", { name: "light" }));
    await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(true));
    expect(img.getAttribute("src")).toBe(SITE.portrait);
  });
});
