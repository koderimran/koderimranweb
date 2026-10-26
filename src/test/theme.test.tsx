import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";

function Switch() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark");
});
afterEach(cleanup);

describe("Site themes", () => {
  it("switches the whole document from light to dark and back", async () => {
    render(<ThemeProvider><Switch /></ThemeProvider>);
    fireEvent.click(screen.getByRole("button", { name: "light" }));
    await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(true));
    fireEvent.click(screen.getByRole("button", { name: "dark" }));
    await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(false));
  });

  it("always opens in light theme, even when a dark choice was saved before", async () => {
    localStorage.setItem("koder-imran-theme", "dark");
    render(<ThemeProvider><Switch /></ThemeProvider>);
    // Give any restore logic a chance to run before asserting it did not.
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(screen.getByRole("button", { name: "light" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "light" }));
    await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(true));
  });
});