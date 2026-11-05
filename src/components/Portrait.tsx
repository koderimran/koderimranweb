import { SITE } from "@/lib/site";
import { useTheme } from "@/components/ThemeProvider";

export function Portrait({ alt, className }: { alt: string; className: string }) {
  const { theme } = useTheme();
  const src = theme === "dark" ? SITE.portrait : SITE.portraitLight;
  return <img src={src} alt={alt} className={`${className} object-cover`} />;
}
