import { useReveal } from "@/hooks/useReveal";

const AREAS = [
  {
    title: "Robotics",
    body: "Autonomous ground robots and embedded control — machines that sense, decide, and act on constrained hardware.",
    tags: ["Embedded", "Control systems", "Sensors"],
  },
  {
    title: "Applied AI",
    body: "Computer vision and assistive systems that turn models into tools people can actually rely on.",
    tags: ["Computer vision", "Edge inference"],
  },
  {
    title: "Hardware & electronics",
    body: "Circuit design and rapid prototyping, taking an idea from breadboard to a device that holds up in the field.",
    tags: ["PCB", "Prototyping", "NFC"],
  },
  {
    title: "Product design",
    body: "Interfaces and objects that keep complex systems legible, so the engineering never gets in the user's way.",
    tags: ["Interface", "Systems", "Prototyping"],
  },
];

export default function Work() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="work" className="border-t border-border py-28 md:py-36">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-6 text-xs text-muted-foreground">
          Other work
        </p>
        <h2 className="max-w-2xl text-balance font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          The disciplines behind the work.
        </h2>

        <ul className="mt-16 border-t border-border">
          {AREAS.map((area, i) => (
            <li
              key={area.title}
              className="group grid grid-cols-1 gap-4 border-b border-border py-8 transition-colors hover:bg-secondary md:grid-cols-12 md:items-baseline md:gap-8 md:px-4"
            >
              <span className="eyebrow text-xs text-muted-foreground md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl font-semibold md:col-span-3">
                {area.title}
              </h3>
              <p className="text-pretty leading-relaxed text-muted-foreground md:col-span-5">
                {area.body}
              </p>
              <div className="flex flex-wrap gap-2 md:col-span-3 md:justify-end">
                {area.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
