import { useReveal } from "@/hooks/useReveal";

const STATS = [
  { value: "$4.5T", label: "Annual global counterfeit trade" },
  { value: "10%+", label: "Medicines in low-income markets that are fake or substandard" },
  { value: "<$0.15", label: "Target hardware cost per tag" },
  { value: "6", label: "National innovation events where it was demonstrated" },
];

const PILLARS = [
  {
    step: "01",
    title: "The problem",
    body: "Counterfeiting is a multi-trillion-dollar industry, and the harm lands hardest on people with the least protection: falsified medicine, unregulated cosmetics, unsafe electronics. Holograms, QR codes, and serial registries either copy trivially or demand infrastructure small manufacturers cannot afford.",
  },
  {
    step: "02",
    title: "The mechanism",
    body: "TagWraps embeds a mathematically unforgeable identity into a paper-thin NFC tag using elliptic-curve digital signatures on the P-256 curve. The tag adheres to any product wrapper. A shopper taps it with any NFC phone and gets an instant genuine-or-fake answer, with no app to install and even when connectivity is intermittent.",
  },
  {
    step: "03",
    title: "The stakes",
    body: "When the signature cannot be forged and verification costs nothing, the economics of faking a product collapse. For a buyer, that is the difference between medicine that treats and medicine that harms. For a manufacturer, it is a brand that cannot be quietly hollowed out.",
  },
];

export default function TagWraps() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="tagwraps"
      className="border-t border-border bg-secondary py-28 md:py-36"
    >
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-6 text-xs text-muted-foreground">
              Featured project
            </p>
            <h2 className="font-display text-5xl font-semibold tracking-tight md:text-6xl">
              TagWraps
            </h2>
          </div>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            A physical authentication system that makes counterfeiting a product
            impractical, not just detectable.
          </p>
        </div>

        {/* Stat strip */}
        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-background p-6">
              <dt className="font-display text-3xl font-semibold text-orange md:text-4xl">
                {stat.value}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        {/* Problem / Mechanism / Stakes */}
        <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div key={pillar.step} className="border-t border-border pt-6">
              <span className="eyebrow text-xs text-orange">{pillar.step}</span>
              <h3 className="mt-3 font-display text-xl font-semibold">
                {pillar.title}
              </h3>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          The working prototype has been demonstrated at six national innovation
          events with more than 10,000 direct exposures and endorsement from
          government officials. It is built to run where hardware budgets are
          tight and internet access is not guaranteed.
        </p>
      </div>
    </section>
  );
}
