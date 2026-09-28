import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ExternalLink, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useCollection } from "@/hooks/useContent";
import type { Project } from "@/lib/types";

export function ProjectsSection() {
  const { data: projects, loading } = useCollection<Project>("projects", { publishedOnly: true, pageSize: 8 });
  const featured = projects.find((project) => project.slug === "tagwraps") || projects.find((project) => project.featured);
  const selected = projects.filter((project) => project.id !== featured?.id).slice(0, 5);
  return <section id="projects" className="py-24"><div className="mx-auto max-w-7xl px-6 lg:px-12"><div className="max-w-4xl">
    {featured && <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-24 border-b border-white/10 pb-12"><span className="inline-flex border border-white/15 px-3 py-1 text-xs font-mono uppercase tracking-wider text-zinc-400">Currently building</span><h2 className="mt-6 text-3xl font-bold">{featured.name}</h2><p className="mt-4 max-w-3xl leading-relaxed text-zinc-400">{featured.short_description}</p><div className="mt-7 flex flex-wrap gap-3">{featured.live_url && <a href={featured.live_url} target="_blank" rel="noreferrer" className="action-primary">Visit {featured.name}<ExternalLink className="h-4 w-4" /></a>}{typeof featured.metadata.whitepaper_url === "string" && <a href={featured.metadata.whitepaper_url} className="action-secondary"><FileText className="h-4 w-4" />Whitepaper</a>}<Link to={`/projects/${featured.slug}`} className="action-secondary">Case study<ArrowRight className="h-4 w-4" /></Link></div></motion.article>}
    <div className="mb-10"><h2 className="text-3xl font-bold">Selected work</h2><p className="mt-2 text-sm text-zinc-500">Systems built for real-world problems.</p></div>
    {loading && <p className="text-zinc-500">Loading work…</p>}<div className="border-t border-white/10">{selected.map((project, index) => <motion.div key={project.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}><Link to={`/projects/${project.slug}`} className="group block border-b border-white/10 px-1 py-7"><div className="flex items-start justify-between gap-5"><div><h3 className="text-xl font-semibold">{project.name}</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.short_description}</p><div className="mt-4 flex flex-wrap gap-3">{project.technologies.slice(0, 4).map((tech) => <span key={tech} className="text-xs font-mono uppercase text-zinc-600">{tech}</span>)}</div></div><ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-600 group-hover:text-white" /></div></Link></motion.div>)}</div><Link to="/projects" className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white">View all projects<ArrowRight className="h-4 w-4" /></Link>
  </div></div></section>;
}

