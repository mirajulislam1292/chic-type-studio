import { useReveal } from "@/hooks/useReveal";

const ITEMS = [
  {
    period: "2024 — present",
    title: "Founder & Lead Developer, TagWraps",
    body: "Leading the cryptography, hardware, and product of a physical authentication system from concept to working prototype.",
  },
  {
    period: "National",
    title: "Six national innovation events",
    body: "Selected to demonstrate the prototype to more than 10,000 people, with endorsement from government officials.",
  },
  {
    period: "Award",
    title: "QCEC — Silver recognition",
    body: "Recognized in national competition for engineering and innovation work.",
  },
  {
    period: "Service",
    title: "Bangladesh Red Crescent — Volunteer",
    body: "Community service and disaster-response support alongside technical work.",
  },
];

export default function Credentials() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="credentials"
      className="border-t border-border bg-secondary py-28 md:py-36"
    >
      <div
        ref={ref}
        className="reveal mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-3"
      >
        <div className="md:sticky md:top-28 md:self-start">
          <p className="eyebrow mb-6 text-xs text-muted-foreground">
            Credentials
          </p>
          <h2 className="text-balance font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            What I&apos;ve built, and who has taken notice.
          </h2>
        </div>

        <ol className="md:col-span-2">
          {ITEMS.map((item) => (
            <li
              key={item.title}
              className="border-t border-border py-8 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8">
                <span className="eyebrow w-32 shrink-0 text-xs text-orange">
                  {item.period}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
