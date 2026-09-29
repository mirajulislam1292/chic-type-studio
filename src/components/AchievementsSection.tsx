import { motion } from "framer-motion";
import { Award, Cpu, ExternalLink, GraduationCap, Star, Target, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useCollection } from "@/hooks/useContent";
import type { Achievement } from "@/lib/types";

const groups = [
  { category: "Major Awards & Championships", icon: Trophy, columns: "sm:grid-cols-2 lg:grid-cols-3" },
  { category: "Leadership & Organizational Roles", icon: Users, columns: "sm:grid-cols-3" },
  { category: "National & District Rankings", icon: Target, columns: "sm:grid-cols-2 lg:grid-cols-3" },
  { category: "Olympiad Finalist & Participation", icon: Star, columns: "grid-cols-2 sm:grid-cols-4" },
  { category: "Technical Training & Certifications", icon: GraduationCap, columns: "sm:grid-cols-2 lg:grid-cols-3" },
] as const;

export function AchievementsSection() {
  const { data, loading } = useCollection<Achievement>("achievements", { publishedOnly: true, pageSize: 50 });

  return (
    <section id="achievements" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 border-b border-white/10 pb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">Achievements &amp; Experience</h2>
        </motion.div>

        {loading && <p className="text-zinc-500">Loading achievements…</p>}

        <div className="space-y-16">
          {groups.map((group) => {
            const items = data.filter((item) => item.category === group.category);
            if (!items.length) return null;
            const Icon = group.icon;

            return (
              <motion.div key={group.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="mb-6 flex items-center gap-3">
                  <Icon className={`h-6 w-6 ${group.category === "Major Awards & Championships" ? "text-orange-400" : "text-zinc-300"}`} />
                  <h3 className="text-2xl font-bold text-white">{group.category}</h3>
                </div>
                <div className={`grid gap-4 ${group.columns}`}>
                  {items.map((item) => {
                    const card = (
                      <article className="h-full rounded-xl border border-zinc-800/80 bg-[#0b0b0e] p-5 transition-colors hover:border-zinc-700">
                        {group.category === "Major Awards & Championships" && (
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-[#14141d]">
                              <Award className="h-5 w-5 text-orange-400" />
                            </div>
                            {item.external_url && <span className="inline-flex items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-300">Read Essay <ExternalLink className="h-3 w-3" /></span>}
                          </div>
                        )}
                        {group.category === "Technical Training & Certifications" && <Cpu className="mb-3 h-4 w-4 text-zinc-400" />}
                        <h4 className={`${group.category === "Olympiad Finalist & Participation" ? "text-center font-mono text-xs sm:text-sm" : "text-sm font-medium sm:text-base"} text-zinc-200`}>{item.title}</h4>
                        {item.short_description && <p className="mt-1 text-sm text-zinc-400">{item.short_description}</p>}
                      </article>
                    );

                    return item.external_url ? <Link key={item.id} to={item.external_url}>{card}</Link> : <div key={item.id}>{card}</div>;
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
