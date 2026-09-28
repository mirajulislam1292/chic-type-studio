import { useCollection } from "@/hooks/useContent";
import type { Education, Skill } from "@/lib/types";

export function CredentialsSection() {
  const { data: skills } = useCollection<Skill>("skills", { pageSize: 50 });
  const { data: education } = useCollection<Education>("education", { pageSize: 20 });
  if (!skills.length && !education.length) return null;
  return <section id="skills" className="py-20"><div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:px-12"><div><h2 className="text-3xl font-bold">Capabilities</h2><div className="mt-7 flex flex-wrap gap-2">{skills.map((skill) => <span key={skill.id} className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300">{skill.name}<small className="ml-2 text-zinc-600">{skill.category}</small></span>)}</div></div>{education.length > 0 && <div><h2 className="text-3xl font-bold">Education</h2><div className="mt-7 space-y-4">{education.map((item) => <article key={item.id} className="border-l border-orange-500/50 pl-4"><h3 className="font-semibold">{item.degree}</h3><p className="mt-1 text-sm text-zinc-400">{item.institution}{item.field ? ` · ${item.field}` : ""}</p></article>)}</div></div>}</div></section>;
}
