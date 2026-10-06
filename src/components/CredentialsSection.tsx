import { useCollection } from "@/hooks/useContent";
import type { Education, Skill } from "@/lib/types";

function educationPeriod(item: Education) {
  const format = (value: string | null) => value
    ? new Date(`${value.slice(0, 10)}T00:00:00`).toLocaleDateString(undefined, { month: "short", year: "numeric" })
    : "";
  const start = format(item.start_date);
  const end = format(item.end_date);
  if (!start && !end) return null;
  return [start, end || "Present"].filter(Boolean).join(" — ");
}

export function CredentialsSection() {
  const { data: skills } = useCollection<Skill>("skills", { pageSize: 50 });
  const { data: education } = useCollection<Education>("education", { pageSize: 20 });
  if (!skills.length && !education.length) return null;
  return <section id="skills" className="py-20"><div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:px-12"><div><h2 className="text-3xl font-bold">Capabilities</h2><div className="mt-7 flex flex-wrap gap-2">{skills.map((skill) => <span key={skill.id} className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300">{skill.name}<small className="ml-2 text-zinc-600">{skill.category}</small></span>)}</div></div>{education.length > 0 && <div><h2 className="text-3xl font-bold">Education</h2><div className="mt-7 space-y-4">{education.map((item) => { const period = educationPeriod(item); return <article key={item.id} className="rounded-r-xl border-l border-orange-500/50 bg-zinc-950/35 py-3 pl-4 pr-3"><div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start"><h3 className="font-semibold">{item.degree}</h3>{period && <time className="shrink-0 font-mono text-xs text-orange-200/60">{period}</time>}</div><p className="mt-1 text-sm text-zinc-400">{item.institution}{item.field ? ` · ${item.field}` : ""}</p>{item.description && <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.description}</p>}</article>; })}</div></div>}</div></section>;
}
