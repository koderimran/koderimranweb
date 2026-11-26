import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { CinematicIntro } from "@/components/CinematicIntro";

export const Route = createFileRoute("/intro")({
  head: () => ({
    meta: [
      { title: "Koder Imran | Full Stack Business Growth Engineer" },
      { name: "description", content: "A cinematic introduction to Imran — full stack business growth engineer." },
      { property: "og:title", content: "Koder Imran | Full Stack Business Growth Engineer" },
      { property: "og:description", content: "Website design, analytics and growth strategy." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: SITE.url + "/intro" }],
  }),
  component: IntroPage,
});

function IntroPage() {
  return <CinematicIntro />;
}
