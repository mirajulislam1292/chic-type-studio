import { motion } from "framer-motion";
import { ArrowUpRight, HeartHandshake } from "lucide-react";
import { useCollection } from "@/hooks/useContent";
import type { Volunteering } from "@/lib/types";

function period(item: Volunteering) {
  const format = (value: string | null) => value
    ? new Date(`${value}T00:00:00`).toLocaleDateString(undefined, { month: "short", year: "numeric" })
    : "";
  return `${format(item.start_date)} — ${item.current ? "Present" : format(item.end_date)}`;
}

export function VolunteeringSection() {
  const { data } = useCollection<Volunteering>("volunteering", { pageSize: 20 });

  if (data.length === 0) return null;

  return (
    <section id="volunteering" className="py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <HeartHandshake className="mb-5 h-7 w-7 text-zinc-500" aria-hidden="true" />
              <h2 className="text-3xl font-bold sm:text-4xl">Volunteering</h2>
              <p className="mt-4 text-sm font-mono leading-relaxed text-zinc-500">
                Community service, humanitarian work, and causes I contribute to.
              </p>
            </div>
          </div>
          <div className="space-y-8 border-l border-zinc-800 pl-6 lg:col-span-8">
            {data.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative rounded-xl border border-zinc-800 bg-[#0a0a0d] p-6 before:absolute before:-left-[31px] before:top-8 before:h-3 before:w-3 before:rounded-full before:border-2 before:border-zinc-600 before:bg-[#050507]"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row">
                  <div>
                    <h3 className="text-lg font-semibold">{item.role}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{item.organization}</p>
                    {item.cause ? <p className="mt-2 text-xs font-mono text-zinc-600">{item.cause}</p> : null}
                  </div>
                  <time className="text-xs font-mono text-zinc-500">{period(item)}</time>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {item.description.split("\n").filter(Boolean).map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-zinc-400">
                      <span className="mt-1 shrink-0 text-zinc-500">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {item.external_url ? (
                  <a href={item.external_url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs text-orange-300">
                    Visit organization <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : null}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
