import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  slug: string;
  delay?: number;
}

export function ProjectCard({ title, description, tags, image, slug, delay = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-card rounded-3xl border border-border overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50"
    >
      {/* Image */}
      <div className="aspect-[16/10] bg-secondary overflow-hidden border-b border-border">
        <img 
          src={image} 
          alt={`${title} project`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: delay + 0.1 * index }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full border border-border hover:bg-primary/10 hover:border-primary/50 hover:shadow-md transition-all cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Read More Link */}
        <Link 
          to={`/projects/${slug}`}
          className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all group-hover:underline underline-offset-4"
        >
          Read Full Article
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
