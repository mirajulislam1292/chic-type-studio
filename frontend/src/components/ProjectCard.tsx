import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay }}
    >
      <Link 
        to={`/projects/${slug}`}
        className="block p-4 sm:p-6 rounded-[2px] hover:bg-[#1C1C1E] transition-colors border-b border-white/12 group"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            {description}
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
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
