import { SITE } from "@/lib/site";

export function Portrait({ alt, className }: { alt: string; className: string }) {
  return <img src={SITE.portrait} alt={alt} className={`${className} object-cover`} />;
}
