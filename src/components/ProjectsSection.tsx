import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Download, Rocket, FolderGit2 } from "lucide-react";
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
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        {/* Currently Building Flagship Showcase - TagWraps */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6 }}
           className="mb-20"
        >
          <div className="bg-[#0c0c10] border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
            <div className="flex flex-col gap-6 relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs font-mono text-zinc-400">NFC Cryptographic Authentication</span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                  TagWraps
                </h3>
                <div className="space-y-4 text-zinc-300 leading-relaxed text-base sm:text-lg">
                  <p>
                    In Bangladesh and across South Asia, counterfeit medicines, fake cosmetics, and fraudulent goods cause real harm to real people every day. I built TagWraps to solve that with something simple and affordable.
                  </p>
                  <p className="text-zinc-400 text-sm sm:text-base">
                    TagWraps is a smart NFC authentication tag embedded in a product wrapper. Each chip is cryptographically locked and registered in a cloud database. When a customer taps the tag with their smartphone, the system verifies the product as genuine or flags it as fake in real time. No app required. No special scanner. Just a phone tap.
                  </p>
                  <p className="text-zinc-200 font-mono text-sm font-medium pt-1">
                    The cost per tag is 15 to 25 taka. The protection it provides is priceless.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-800/80">
                <a 
                  href="https://tagwraps.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black rounded-lg font-semibold transition-all duration-200 text-sm shadow-md"
                >
                  Visit TagWraps <ExternalLink className="h-4 w-4" />
                </a>
                <a 
                  href="/TagWraps_Whitepaper.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 rounded-lg font-medium transition-all duration-200 text-sm"
                >
                  Download Whitepaper
                  <Download className="h-4 w-4 text-zinc-400" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Header for Selected Work */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Hardware & Systems
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-mono">
            Engineering hardware & software solutions for real-world problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} delay={index * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}

