import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCollection } from "@/hooks/useContent";
import { readingTime, useSeo } from "@/lib/seo";
import type { BlogPost } from "@/lib/types";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, count, loading, error } = useCollection<BlogPost>("blog_posts", { publishedOnly: true, search, page, pageSize: 12 });
  useSeo({ title: "Writing — M. Mahimmiraj", description: "Technical writing about engineering, robotics, IoT and building useful systems.", path: "/blog" });
  return <div className="min-h-screen bg-[#050507] text-white"><Navbar /><main className="mx-auto max-w-6xl px-6 pb-24 pt-32"><header className="mb-12 max-w-3xl"><p className="eyebrow mb-3 text-xs uppercase text-orange-400">Field notes</p><h1 className="text-4xl font-bold sm:text-6xl">Writing</h1><p className="mt-5 text-zinc-400">Technical notes, experiments and lessons from building physical and digital systems.</p></header>
    <label className="relative mb-10 block max-w-lg"><span className="sr-only">Search posts</span><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search writing" className="cms-input pl-11" /></label>
    {loading && <p className="text-zinc-500">Loading writing…</p>}{error && <p role="alert" className="text-red-400">{error}</p>}
    {!loading && !data.length && <div className="rounded-xl border border-zinc-800 p-10 text-zinc-400">{search ? "No posts match that search." : "No published posts yet. New writing will appear here."}</div>}
    <div className="divide-y divide-zinc-800 border-y border-zinc-800">{data.map((post) => <Link key={post.id} to={`/blog/${post.slug}`} className="group grid gap-5 py-7 sm:grid-cols-[1fr_auto]"><div><div className="mb-3 flex flex-wrap gap-3 text-xs font-mono text-zinc-500"><span>{post.category}</span><span>{readingTime(post.content)} min read</span>{post.published_at && <time>{new Date(post.published_at).toLocaleDateString()}</time>}</div><h2 className="text-2xl font-semibold group-hover:text-orange-300">{post.title}</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">{post.excerpt}</p></div><ArrowUpRight className="h-5 w-5 text-zinc-600 group-hover:text-white" /></Link>)}</div>
    {count > 12 && <nav aria-label="Blog pagination" className="mt-10 flex gap-3"><button className="action-secondary" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</button><span className="self-center text-sm text-zinc-500">Page {page} of {Math.ceil(count / 12)}</span><button className="action-secondary" disabled={page * 12 >= count} onClick={() => setPage((value) => value + 1)}>Next</button></nav>}
  </main><Footer /></div>;
}

