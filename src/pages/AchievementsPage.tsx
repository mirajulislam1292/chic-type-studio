import { useState } from "react";
import { Award, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCollection } from "@/hooks/useContent";
import { useSeo } from "@/lib/seo";
import type { Achievement } from "@/lib/types";

export default function AchievementsPage() {
  const [page, setPage] = useState(1);
  const { data, count, loading } = useCollection<Achievement>("achievements", { publishedOnly: true, page, pageSize: 20 });
  useSeo({ title: "Achievements — M. Mahimmiraj", description: "Awards, national rankings and engineering achievements by M. Mahimmiraj.", path: "/achievements" });
  return <div className="min-h-screen bg-[#050507] text-white"><Navbar /><main className="mx-auto max-w-6xl px-6 pb-24 pt-32"><header className="mb-14"><p className="eyebrow mb-3 text-xs uppercase text-orange-400">Recognition</p><h1 className="text-4xl font-bold sm:text-6xl">Achievements</h1></header>
    {loading ? <p className="text-zinc-500">Loading achievements…</p> : <div className="grid gap-4 md:grid-cols-2">{data.map((item) => <article key={item.id} className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-6"><div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900"><Award className="h-5 w-5 text-orange-400" /></div><p className="text-xs font-mono uppercase text-zinc-500">{item.category}</p><h2 className="mt-2 text-xl font-semibold">{item.title}</h2><p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.short_description}</p>{item.organization && <p className="mt-4 text-xs text-zinc-500">{item.organization}</p>}<div className="mt-6 flex flex-wrap gap-3">{item.certificate?.file_url && <a href={item.certificate.file_url} target="_blank" rel="noreferrer" className="action-secondary">View this certificate <ExternalLink className="h-4 w-4" /></a>}{item.external_url && <a href={item.external_url} className="action-secondary">Read more</a>}</div></article>)}</div>}{count > 20 && <nav className="mt-10 flex items-center justify-between" aria-label="Achievement pagination"><button className="action-secondary" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</button><span className="text-xs text-zinc-500">Page {page} of {Math.ceil(count / 20)}</span><button className="action-secondary" disabled={page * 20 >= count} onClick={() => setPage((value) => value + 1)}>Next</button></nav>}
  </main><Footer /></div>;
}
