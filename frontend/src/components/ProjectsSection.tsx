import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Droplets, Shield, Eye, Leaf, ExternalLink, Download } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "HydroVer",
    slug: "hydrover",
    description:
      "An RF-controlled aquatic rover built to tackle plastic pollution in Bangladeshi waterways. Handles water sampling, chemical treatment, and environmental monitoring. Winner, 45th National Science and Technology Week.",
    tags: ["Arduino Nano", "NRF24L01", "IoT", "Environmental"],
    color: "from-primary/20 via-primary/10 to-white/10",
    icon: Droplets,
  },
  {
    title: "TrueMedi",
    slug: "truemedi",
    description:
      "A pharmaceutical authentication system using NFC and encrypted hash verification to confirm whether a medicine is genuine at the point of purchase. Now operating inside the TagWraps ecosystem.",
    tags: ["PN532 NFC", "Arduino", "Healthcare", "Security"],
    color: "from-primary/20 via-primary/10 to-white/10",
    icon: Shield,
    liveUrl: "https://truemedi.vercel.app/",
  },
  {
    title: "AEYE",
    slug: "a-eye",
    description:
      "An automatic road accident detection system using computer vision that achieved 92% accuracy in highway monitoring. Identifies accidents through a standard camera feed and triggers emergency alerts without human input.",
    tags: ["ESP32-CAM", "OpenCV", "Computer Vision", "Safety"],
    color: "from-primary/20 via-primary/10 to-white/10",
    icon: Eye,
  },
  {
    title: "NutriDrip",
    slug: "nutridrip",
    description:
      "An automated irrigation and soil nutrition system with IoT connectivity. Adjusts watering and NPK levels in real time based on live soil moisture readings.",
    tags: ["ESP8266", "IoT", "Agriculture", "Mobile App"],
    color: "from-primary/20 via-primary/10 to-white/10",
    icon: Leaf,
  },
];

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
  liveUrl?: string;
}

function ProjectCard({ title, description, tags, slug, color, icon: Icon, delay = 0, liveUrl }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className="group bg-card rounded-3xl border border-border overflow-hidden transition-all duration-300 hover:shadow-orange hover:border-primary/50"
    >
      {/* Icon Header */}
      <div className={`aspect-[16/10] bg-gradient-to-br ${color} flex items-center justify-center border-b border-border relative overflow-hidden`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4">
            <Icon className="h-16 w-16" />
          </div>
          <div className="absolute bottom-4 right-4">
            <Icon className="h-12 w-12" />
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          <Icon className="h-20 w-20 text-foreground/80" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full border border-border hover:bg-primary/10 hover:border-primary/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Link */}
        <div className="flex items-center gap-4">
          <Link 
            to={`/projects/${slug}`}
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all group-hover:underline underline-offset-4"
          >
            Read Full Article
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          {liveUrl && (
            <a 
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all hover:underline underline-offset-4"
            >
              Live Demo
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 border-b border-border/40" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Currently Building Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6 }}
           className="mb-32"
        >
          <div className="bg-card rounded-3xl border border-border p-8 sm:p-12 transition-all hover:border-primary/50 hover:shadow-orange group">
            <div className="flex flex-col gap-6 sm:gap-8">
              {/* Badge & Logo area */}
              <div className="flex flex-col items-start gap-6">
                <span className="inline-flex items-center px-3 py-1.5 bg-secondary text-secondary-foreground border border-border rounded-full text-xs font-semibold uppercase tracking-wide">
                  Currently Building
                </span>
                
                <div className="h-10">
                  <img src="/images/tagwraps-logo-light.png" alt="TagWraps Logo" className="h-10 w-auto object-contain dark:hidden" />
                  <img src="/images/tagwraps-logo-dark.png" alt="TagWraps Logo" className="h-10 w-auto object-contain hidden dark:block" />
                </div>
              </div>

              {/* Title & Desc */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">TagWraps</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
                  <p>In Bangladesh and across South Asia, counterfeit medicines, fake cosmetics, and fraudulent goods cause real harm to real people every day. I built TagWraps to solve that with something simple and affordable.</p>
                  
                  <p>TagWraps is a smart NFC authentication tag embedded in a product wrapper. Each chip is cryptographically locked and registered in a cloud database. When a customer taps the tag with their smartphone, the system verifies the product as genuine or flags it as fake in real time. No app required. No special scanner. Just a phone tap.</p>
                  
                  <p>The cost per tag is 5 to 10 taka. The protection it provides is priceless.</p>
                  
                  <p>Currently in prototype phase, building the authentication infrastructure and preparing for pilot testing with pharmaceutical distributors in Dhaka.</p>
                  
                  <p>If this problem excites you and you want to help build something that matters, I would love to connect and build TagWraps together.</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.a 
                  href="https://tagwraps.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(255, 119, 0, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary-hover transition-all duration-300 shadow-lg hover:shadow-orange relative overflow-hidden group/btn"
                >
                  <span className="relative z-10 flex items-center gap-2">Visit TagWraps <ExternalLink className="h-4 w-4" /></span>
                </motion.a>
                <a
                  href="/#/whitepaper"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent border-2 border-border text-foreground rounded-full font-semibold hover:bg-primary/10 hover:border-primary/60 hover:shadow-orange transition-all duration-300"
                >
                  <span className="relative z-10">Whitepaper of TagWraps</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            Building Solutions for Real World Problems
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
