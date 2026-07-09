import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Download } from "lucide-react";
import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "HydroVer",
    slug: "hydrover",
    description: "Smart water pollution monitoring system with remote controlled surface vehicle for water sampling and chemical treatment.",
    tags: ["Arduino Nano", "NRF24L01", "IoT", "Environmental"],
  },
  {
    title: "TrueMedi",
    slug: "truemedi",
    description: "Fake medicine detection system using NFC technology and encrypted hash codes to verify medicine authenticity.",
    tags: ["PN532 NFC", "Arduino", "Healthcare", "Security"],
  },
  {
    title: "AEYE",
    slug: "a-eye",
    description: "Automatic accident detection system using OpenCV and ESP32-CAM achieving 92% accuracy for highway monitoring.",
    tags: ["ESP32-CAM", "OpenCV", "Computer Vision", "Safety"],
  },
  {
    title: "NutriDrip",
    slug: "nutridrip",
    description: "Automatic plant irrigation and NPK adjustment system with IoT connectivity for remote monitoring and smart watering.",
    tags: ["ESP8266", "IoT", "Agriculture", "Mobile App"],
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
        
        {/* Currently Building Section - TagWraps */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6 }}
           className="mb-24"
        >
          <div className="border-b border-white/12 pb-12 transition-all group">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-start gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground border border-white/12 px-3 py-1 rounded-[2px]">
                  Currently Building
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">TagWraps</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-[14px]">
                  <p>In Bangladesh and across South Asia, counterfeit medicines, fake cosmetics, and fraudulent goods cause real harm to real people every day. I built TagWraps to solve that with something simple and affordable.</p>
                  
                  <p>TagWraps is a smart NFC authentication tag embedded in a product wrapper. Each chip is cryptographically locked and registered in a cloud database. When a customer taps the tag with their smartphone, the system verifies the product as genuine or flags it as fake in real time. No app required. No special scanner. Just a phone tap.</p>
                  
                  <p>The cost per tag is 5 to 10 taka. The protection it provides is priceless.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="https://tagwraps.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black rounded-lg font-semibold hover:bg-neutral-100 transition-all duration-200 text-sm shadow-lg shadow-white/10"
                >
                  Visit TagWraps <ExternalLink className="h-4 w-4" />
                </a>
                <a 
                  href="/TagWraps_Whitepaper.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-200 text-sm"
                >
                  Whitepaper
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Selected Work
          </h2>
          <p className="text-[14px] text-muted-foreground">
            Building Solutions for Real World Problems
          </p>
        </div>

        {/* Projects List */}
        <div className="flex flex-col border-t border-white/12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} delay={index * 0.1} />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
