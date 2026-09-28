import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getBySlug } from "@/lib/contentRepository";
import { useSeo } from "@/lib/seo";
import type { Project } from "@/lib/types";

export default function DynamicProjectPage() {
  const { slug = "" } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getBySlug<Project>("projects", slug).then(setProject).finally(() => setLoading(false)); }, [slug]);
  useSeo({ title: project ? `${project.name} — M. Mahimmiraj` : "Project — M. Mahimmiraj", description: project?.short_description || "Engineering project by M. Mahimmiraj.", path: `/projects/${slug}`, image: project?.thumbnail_url });
  return <div className="min-h-screen bg-[#050507] text-white"><Navbar /><main className="mx-auto max-w-5xl px-6 pb-24 pt-32">
    <Link to="/projects" className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"><ArrowLeft className="h-4 w-4" />All projects</Link>
    {loading && <p className="text-zinc-500">Loading project…</p>}
    {!loading && !project && <div className="rounded-xl border border-zinc-800 p-10"><h1 className="text-3xl font-semibold">Project not found</h1><p className="mt-3 text-zinc-400">This project is unavailable or has not been published.</p></div>}
    {project && <article><header className="mb-10"><p className="eyebrow mb-3 text-xs uppercase text-orange-400">{project.category}</p><h1 className="text-4xl font-bold sm:text-6xl">{project.name}</h1><p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-300">{project.short_description}</p><div className="mt-7 flex flex-wrap gap-3">{project.live_url && <a className="action-primary" href={project.live_url} target="_blank" rel="noreferrer">Visit live <ExternalLink className="h-4 w-4" /></a>}{project.github_url && <a className="action-secondary" href={project.github_url} target="_blank" rel="noreferrer"><Github className="h-4 w-4" />Source</a>}</div></header>
      {project.thumbnail_url && <img src={project.thumbnail_url} alt={`${project.name} project`} className="mb-12 aspect-[16/9] w-full rounded-2xl border border-zinc-800 object-cover" />}
      <div className="grid gap-12 md:grid-cols-[1fr_240px]"><MarkdownContent content={project.long_description} /><aside><h2 className="mb-4 text-sm font-mono uppercase tracking-wider text-zinc-500">Technology</h2><ul className="space-y-2 text-sm text-zinc-300">{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul></aside></div>
      {project.gallery_urls.length > 1 && <div className="mt-16 grid gap-5 sm:grid-cols-2">{project.gallery_urls.slice(1).map((url) => <img key={url} src={url} alt={`${project.name} detail`} loading="lazy" className="w-full rounded-xl border border-zinc-800" />)}</div>}
    </article>}
  </main><Footer /></div>;
}

