import { SITE } from "@/lib/site";
import darkPortrait from "@/assets/koder-imran-portrait-dark.png.asset.json";
import { useTheme, type Theme } from "@/components/ThemeProvider";

export function portraitSource(theme: Theme) {
  return theme === "dark" ? darkPortrait.url : SITE.portrait;
}

export function Portrait({ alt, className }: { alt: string; className: string }) {
  const { theme } = useTheme();
  return <img src={portraitSource(theme)} alt={alt} className={`${className} ${theme === "dark" ? "object-contain" : "object-cover"}`} />;
}