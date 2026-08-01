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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay }}
    >
      <Link 
        to={`/projects/${slug}`}
        className="block bg-[#0b0b0e] border border-zinc-800/80 hover:border-zinc-600 rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-xl group relative overflow-hidden"
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors">
            {title}
          </h3>
          <div className="w-8 h-8 rounded-full bg-[#14141a] border border-zinc-800 group-hover:border-zinc-600 flex items-center justify-center text-zinc-400 group-hover:text-white transition-all shrink-0">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <p className="text-zinc-400 leading-relaxed text-sm sm:text-base mb-6 font-normal">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/60">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2.5 py-1 bg-[#121218] text-zinc-300 rounded-md border border-zinc-800 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}

