import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const TITLE = "Contact Imran | Free Website, GA4 or Google Ads Audit";
const DESC = "Book a free call or audit with Imran for Google Ads, GA4 tracking, Shopify or WordPress/WooCommerce projects. Fast replies, worldwide.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE.url + "/contact" }],
  }),
  component: Contact,
});

const NEEDS = ["Google Ads", "GA4 / Tracking", "Shopify store", "WordPress / WooCommerce", "Not sure yet"];

function Contact() {
  const [need, setNeed] = useState(NEEDS[0]);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nWebsite: ${f.get("website")}\nService: ${need}\n\n${f.get("message")}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Project inquiry: ${need}`)}&body=${encodeURIComponent(body)}`;
  }
  const field = "w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring";
  return (
    <section className="bg-grid">
      <div className="container-page grid gap-12 py-20 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow animate-rise">Contact</p>
          <h1 className="animate-rise mt-4 text-4xl font-bold md:text-6xl" style={{ animationDelay: "90ms" }}>Let's grow your business.</h1>
          <p className="animate-rise mt-6 text-lg text-muted-foreground" style={{ animationDelay: "180ms" }}>Tell me about your project. I usually reply within 24 hours with next steps and a free quick audit.</p>
          <ul className="mt-10 space-y-5">
            <li><a href={`mailto:${SITE.email}`} className="flex items-center gap-4 font-semibold"><span className="grid size-11 place-items-center rounded-xl bg-accent"><Mail className="size-5" /></span>{SITE.email}</a></li>
            <li><a href={`tel:${SITE.phone}`} className="flex items-center gap-4 font-semibold"><span className="grid size-11 place-items-center rounded-xl bg-accent"><Phone className="size-5" /></span>{SITE.phone}</a></li>
            <li className="flex items-center gap-4 font-semibold"><span className="grid size-11 place-items-center rounded-xl bg-accent"><MapPin className="size-5" /></span>{SITE.location}</li>
          </ul>
        </div>
        <form onSubmit={submit} className="animate-rise space-y-4 rounded-3xl border bg-card p-8 shadow-soft" style={{ animationDelay: "180ms" }}>
          <div>
            <p className="mb-3 text-sm font-semibold">What do you need help with?</p>
            <div className="flex flex-wrap gap-2">
              {NEEDS.map((n) => (
                <button type="button" key={n} onClick={() => setNeed(n)} aria-pressed={need === n} className="chip rounded-full px-4 py-2 text-sm font-semibold">{n}</button>
              ))}

            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input required name="name" placeholder="Your name" className={field} maxLength={100} />
            <input required type="email" name="email" placeholder="Email" className={field} maxLength={255} />
          </div>
          <input name="website" placeholder="Website URL (optional)" className={field} maxLength={255} />
          <textarea required name="message" rows={5} placeholder="Tell me about your goals, budget and timeline" className={field} maxLength={2000} />
          <button className="btn btn-signal w-full rounded-full py-4 font-bold">Send message</button>
        </form>
      </div>
    </section>
  );
}
