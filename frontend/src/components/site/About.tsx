import { useReveal } from "@/hooks/useReveal";

const FACETS = [
  {
    title: "Engineer",
    body: "Hardware and software that has to survive contact with the real world. I care about the gap between a prototype and something people can trust.",
  },
  {
    title: "Designer",
    body: "Interfaces and objects reduced to what matters. Good design is mostly deciding what to leave out.",
  },
  {
    title: "Traveler",
    body: "From Bangladesh outward. Moving through different places is how I keep my assumptions honest and my curiosity fed.",
  },
];

export default function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="border-t border-border py-28 md:py-36">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-6 text-xs text-muted-foreground">About</p>
        <h2 className="max-w-3xl text-balance font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          Three ways of looking at the same problem: how do you make something
          real, useful, and trusted.
        </h2>

        <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-3">
          {FACETS.map((facet) => (
            <div key={facet.title}>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                <h3 className="font-display text-lg font-semibold">
                  {facet.title}
                </h3>
              </div>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                {facet.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
