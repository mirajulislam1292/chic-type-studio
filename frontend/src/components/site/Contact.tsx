import { useReveal } from "@/hooks/useReveal";

const LINKS = [
  { label: "Email", value: "mahimmiraj@outlook.com", href: "mailto:mahimmiraj@outlook.com" },
  { label: "TagWraps", value: "tagwraps.vercel.app", href: "https://tagwraps.vercel.app" },
  { label: "Location", value: "Narayanganj, Bangladesh", href: null },
];

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="border-t border-border py-28 md:py-40">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-6 text-xs text-muted-foreground">Contact</p>
        <h2 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          If you&apos;re building something that has to be trusted, let&apos;s
          talk.
        </h2>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="mailto:mahimmiraj@outlook.com"
            className="inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 text-sm font-medium text-orange-foreground transition-transform hover:-translate-y-0.5"
          >
            Start a conversation
          </a>
          <a
            href="https://tagwraps.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium transition-colors hover:bg-secondary"
          >
            Visit TagWraps
          </a>
        </div>

        <dl className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {LINKS.map((link) => (
            <div key={link.label} className="bg-background p-6">
              <dt className="eyebrow text-xs text-muted-foreground">
                {link.label}
              </dt>
              <dd className="mt-3 font-display text-lg">
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="transition-colors hover:text-orange"
                  >
                    {link.value}
                  </a>
                ) : (
                  link.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
