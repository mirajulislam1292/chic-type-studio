import { motion } from "framer-motion";
import { ArrowRight, Award, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useCollection } from "@/hooks/useContent";
import type { Achievement } from "@/lib/types";

export function AchievementsSection() {
  const { data, loading } = useCollection<Achievement>("achievements", { publishedOnly: true, pageSize: 6 });
  return <section id="achievements" className="py-24"><div className="mx-auto max-w-7xl px-6 lg:px-12"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 border-b border-white/10 pb-8"><h2 className="text-3xl font-bold">Achievements</h2><p className="mt-2 text-sm text-zinc-500">Recognition across engineering, science and writing.</p></motion.div>{loading && <p className="text-zinc-500">Loading achievements…</p>}<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{data.map((item, index) => <motion.article key={item.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-5"><div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900"><Award className="h-4 w-4 text-orange-400" /></div><p className="text-xs font-mono uppercase text-zinc-600">{item.category}</p><h3 className="mt-2 text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.short_description}</p>{item.certificate?.file_url && <a href={item.certificate.file_url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs text-orange-300 hover:text-orange-200">View this certificate<ExternalLink className="h-3.5 w-3.5" /></a>}</motion.article>)}</div><Link to="/achievements" className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white">View all achievements<ArrowRight className="h-4 w-4" /></Link></div></section>;
}

