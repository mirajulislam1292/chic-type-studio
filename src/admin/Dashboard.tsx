import { useEffect, useState } from "react";
import { ArrowUpRight, ImagePlus, PenLine, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { getDashboardCounts } from "@/lib/contentRepository";

export default function Dashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  useEffect(() => { void getDashboardCounts().then(setCounts); }, []);
  const cards = [["New messages", "new_messages"], ["Projects", "projects"], ["Achievements", "achievements"], ["Certificates", "certificates"], ["Gallery photos", "gallery_items"], ["Published posts", "blog_published"], ["Draft posts", "blog_drafts"]];
  return <div className="admin-page"><header className="mb-8"><p className="text-xs font-mono uppercase tracking-wider text-orange-400">Control center</p><h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Dashboard</h1><p className="mt-2 text-sm text-zinc-400">Manage what appears across your portfolio.</p></header><div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-3">{cards.map(([label, key]) => <div key={key} className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-4 sm:p-5"><p className="text-xs text-zinc-500">{label}</p><p className="mt-2 text-3xl font-semibold">{counts[key] ?? "—"}</p></div>)}</div>
    <section><h2 className="mb-4 text-sm font-semibold text-zinc-300">Quick actions</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><Link className="admin-action-card" to="/admin/projects/new"><Plus className="h-5 w-5 text-orange-400" /><span><strong>New project</strong><small>Add work and case-study details.</small></span><ArrowUpRight className="ml-auto h-4 w-4 text-zinc-600" /></Link><Link className="admin-action-card" to="/admin/blog/new"><PenLine className="h-5 w-5 text-orange-400" /><span><strong>Write a post</strong><small>Start a draft or publish.</small></span><ArrowUpRight className="ml-auto h-4 w-4 text-zinc-600" /></Link><Link className="admin-action-card" to="/admin/gallery/new"><ImagePlus className="h-5 w-5 text-orange-400" /><span><strong>Add photo</strong><small>Upload from your phone.</small></span><ArrowUpRight className="ml-auto h-4 w-4 text-zinc-600" /></Link></div></section>
  </div>;
}

