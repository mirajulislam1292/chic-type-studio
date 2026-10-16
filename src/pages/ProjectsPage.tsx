import { useState } from "react";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCollection } from "@/hooks/useContent";
import { useSeo } from "@/lib/seo";
import type { Project } from "@/lib/types";

export default function ProjectsPage() {
  const [page, setPage] = useState(1);
  const { data, count, loading, error } = useCollection<Project>("projects", { publishedOnly: true, page, pageSize: 20 });
  useSeo({ title: "Projects — M. Mahimmiraj", description: "Engineering, robotics, IoT and product security projects by M. Mahimmiraj.", path: "/projects" });
  return <div className="min-h-screen bg-[#050507] text-white"><Navbar /><main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
    <header className="mb-14 max-w-3xl"><p className="eyebrow mb-3 text-xs uppercase text-orange-400">Selected systems</p><h1 className="text-4xl font-bold sm:text-6xl">Projects built around real problems.</h1><p className="mt-5 text-zinc-400">Hardware, software and research working together.</p></header>
    {loading && <p className="text-zinc-500">Loading projects…</p>}
    {error && <p role="alert" className="text-red-400">{error}</p>}
    {!loading && !data.length && <p className="rounded-xl border border-zinc-800 p-8 text-zinc-400">No published projects yet.</p>}
    <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 md:grid-cols-2">{data.map((project) => <article key={project.id} className="bg-[#09090c] p-7 transition-colors hover:bg-[#101014]">
      <Link to={`/projects/${project.slug}`} className="group block">
        <div className="flex items-start justify-between gap-5"><div><p className="mb-2 text-xs font-mono uppercase tracking-wider text-orange-400">{project.category}</p><h2 className="text-2xl font-semibold">{project.name}</h2></div><ArrowUpRight className="mt-1 h-5 w-5 text-zinc-500 transition group-hover:text-white" /></div>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.short_description}</p><div className="mt-5 flex flex-wrap gap-2">{project.technologies.slice(0, 4).map((tech) => <span key={tech} className="text-xs font-mono text-zinc-500">{tech}</span>)}</div>
      </Link>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white">Case study <ArrowRight className="h-3.5 w-3.5" /></Link>
        {project.live_url ? <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-orange-300 hover:text-orange-200">Project link <ExternalLink className="h-3.5 w-3.5" /></a> : null}
      </div>
    </article>)}</div>{count > 20 && <nav className="mt-10 flex items-center justify-between" aria-label="Project pagination"><button className="action-secondary" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</button><span className="text-xs text-zinc-500">Page {page} of {Math.ceil(count / 20)}</span><button className="action-secondary" disabled={page * 20 >= count} onClick={() => setPage((value) => value + 1)}>Next</button></nav>}
  </main><Footer /></div>;
}
