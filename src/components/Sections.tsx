import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BarChart3, Megaphone, ShoppingBag, LayoutTemplate, Check } from "lucide-react";
import { SERVICES, WORKS, REVIEWS, FAQS, PROCESS } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const ICONS = [Megaphone, BarChart3, ShoppingBag, LayoutTemplate];

export function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-lg text-muted-foreground">{text}</p>}
    </Reveal>
  );
}

export function ServiceGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className={`mt-12 grid gap-5 ${detailed ? "" : "md:grid-cols-2"}`}>
      {SERVICES.map((s, i) => {
        const Icon = ICONS[i % ICONS.length] ?? Megaphone;
        return (
          <Reveal as="article" key={s.slug} delay={i * 90} className="group hover-lift scroll-mt-24 rounded-3xl border bg-card p-8">
            <div className="flex items-start justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
                <Icon className="size-6" />
              </span>
              <span className="font-display text-sm text-muted-foreground">0{i + 1}</span>
            </div>
            <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
            <p className="mt-3 text-muted-foreground">{detailed ? s.answer : s.short}</p>
            {detailed ? (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="eyebrow mb-3">What you get</p>
                  <ul className="space-y-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-ring" />{d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow mb-3">Results</p>
                  <ul className="space-y-2">
                    {s.outcomes.map((d) => (
                      <li key={d} className="flex gap-2 text-sm font-semibold"><Check className="mt-0.5 size-4 shrink-0 text-ring" />{d}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.tools.map((t) => (
                      <span key={t} className="pill rounded-full px-3 py-1 text-xs font-semibold">{t}</span>
                    ))}

                  </div>
                </div>
              </div>
            ) : (
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.outcomes.map((o) => (
                  <li key={o} className="pill rounded-full px-3 py-1 text-xs font-semibold">{o}</li>
                ))}

              </ul>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}

export function WorkGrid({ limit }: { limit?: number }) {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {WORKS.slice(0, limit).map((w, i) => (
        <Reveal key={w.name} delay={i * 90} className="hover-lift overflow-hidden rounded-3xl border bg-card">
        <a href={w.url} target="_blank" rel="noopener noreferrer" className="group block">
          <div className="aspect-[16/10] overflow-hidden bg-muted">
            <img src={w.img} alt={`${w.name} website designed by Imran`} loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-105" />
          </div>
          <div className="flex items-center justify-between p-5">
            <div>
              <h3 className="font-bold">{w.name}</h3>
              <p className="text-sm text-muted-foreground">{w.tag}</p>
            </div>
            <ArrowUpRight className="size-5 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
        </a>
        </Reveal>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-3">
      {REVIEWS.slice(0, 3).map((r, i) => (
        <Reveal as="figure" key={r.name} delay={i * 110} className="hover-lift rounded-3xl border bg-card p-7">
          <p className="text-signal-foreground dark:text-signal">★★★★★</p>
          <blockquote className="mt-4 text-lg leading-relaxed">“{r.text}”</blockquote>
          <figcaption className="mt-6 text-sm font-semibold">{r.name} <span className="font-normal text-muted-foreground">· {r.country}</span></figcaption>
        </Reveal>
      ))}
    </div>
  );
}

export function Process() {
  return (
    <ol className="mt-12 grid gap-5 md:grid-cols-4">
      {PROCESS.map((p, i) => (
        <Reveal as="li" key={p.title} delay={i * 100} className="hover-lift rounded-3xl border-t-4 border-ink bg-card p-6">
          <span className="font-display text-4xl font-bold text-muted-foreground/40">0{i + 1}</span>
          <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export function Faq() {
  return (
    <Reveal className="mt-12 divide-y rounded-3xl border bg-card">
      {FAQS.map((f) => (
        <details key={f.q} className="faq-item group p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-semibold">
            {f.q}
            <span className="ml-4 text-2xl transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </Reveal>
  );
}

export function faqJsonLd() {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    }),
  };
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="bg-grid border-b">
      <div className="container-page py-20 md:py-28">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="animate-rise mt-4 max-w-4xl text-4xl font-bold md:text-6xl" style={{ animationDelay: "90ms" }}>{title}</h1>
        <p className="animate-rise mt-6 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "180ms" }}>{text}</p>
        <Link to="/contact" className="btn btn-ink animate-rise mt-8 rounded-full px-7 py-4 font-bold" style={{ animationDelay: "270ms" }}>
          Book a free call
        </Link>

      </div>
    </section>
  );
}
