import { SITE } from "@/lib/site";

/** The owner photo: one transparent cut-out, the same in every theme (the hero blends it per theme in CSS). */
export function Portrait({ alt, className }: { alt: string; className: string }) {
  return <img src={SITE.portrait} alt={alt} className={`${className} object-cover`} />;
}
