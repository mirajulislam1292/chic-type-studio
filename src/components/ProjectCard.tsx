import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  delay?: number;
}

export function ProjectCard({ title, description, tags, slug, delay = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <Link 
        to={`/projects/${slug}`}
        className="block p-4 sm:p-6 rounded-xl bg-[#0b0b0e] border border-zinc-800/80 hover:border-zinc-700 hover:bg-[#121218] transition-all group"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white group-hover:text-zinc-200 transition-colors">
              {title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
          </div>
          <p className="text-zinc-400 leading-relaxed text-sm">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-zinc-400 uppercase tracking-wider px-2 py-0.5 bg-[#171720] rounded border border-zinc-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
