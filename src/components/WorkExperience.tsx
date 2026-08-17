import { motion } from "framer-motion";
import { Briefcase, ArrowUpRight } from "lucide-react";

const experiences = [
  {
    role: "Founder & Lead Developer",
    company: "TagWraps - Product Authenticity Startup",
    period: "Jan 2026 - Present",
    type: "Self-employed",
    location: "Bangladesh",
    points: [
      "Independently developing a blockchain-integrated verification system to combat counterfeit consumer goods across Bangladeshi supply chains.",
      "Sole developer responsible for architecture, backend API design, and real-time product authentication features.",
    ],
    link: { label: "tagwraps.vercel.app", href: "https://tagwraps.vercel.app/" },
  },
  {
    role: "Lead Developer & Technical Architect",
    company: "Scholars Cafe - Student Consulting Platform",
    period: "Jan 2026 - Present",
    type: null,
    location: null,
    points: [
      "Built the entire Scholars Cafe platform from scratch as the primary developer and technical architect behind the website.",
      "Engineered frontend interfaces, backend services, responsive design, and deployment pipelines from the ground up.",
      "Coordinating the intern technical team, conducting code reviews, and maintaining platform operations that empower students with EPT, SAT prep, university applications, and scholarship pathways.",
    ],
    link: { label: "scholarscafe.com", href: "https://www.scholarscafe.com/" },
  },
  {
    role: "Graphic Design Intern",
    company: "Scholars Cafe",
    period: "Apr 2025 - Dec 2025",
    type: null,
    location: null,
    points: [
      "Produced visual communications and promotional materials aligned with brand guidelines and audience engagement objectives.",
    ],
    link: null,
  },
  {
    role: "President, Science Club (GTCSC) - EC 2024-2025",
    company: "Government Tolaram College, Narayanganj",
    period: "May 2025 - May 2026",
    type: null,
    location: null,
    points: [
      "Directed a student-led science and technology club; organized seminars, inter-college workshops, and outreach initiatives.",
      "Managed a committee to execute events promoting STEM education across the district.",
    ],
    link: null,
  },
  {
    role: "RCY Volunteer, ICT Department",
    company: "Bangladesh Red Crescent Youth, Narayanganj Unit",
    period: "May 2024 - Present",
    type: null,
    location: null,
    points: [
      "Coordinated digital communication during emergency response operations.",
      "Contributed to climate adaptation programs and participated in multiple national environmental training initiatives.",
    ],
    link: null,
  },
];

export function WorkExperience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Header Column */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Work Experience
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                Leadership roles, startup development, and community initiatives.
              </p>
            </div>
          </div>

          {/* Timeline List Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative pl-6 sm:pl-8 border-l border-zinc-800 space-y-10">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="relative group"
                >
                  {/* Timeline Node */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full bg-[#08080a] border-2 border-zinc-700 group-hover:border-zinc-400 transition-all duration-300 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 group-hover:bg-white transition-colors" />
                  </div>

                  {/* Card Box */}
                  <div className="bg-[#0b0b0e] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-6 transition-all duration-300 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-zinc-200 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-zinc-400 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <div className="sm:text-right shrink-0">
                        <span className="inline-block px-2.5 py-1 bg-[#121218] border border-zinc-800 rounded-md text-xs font-mono text-zinc-400">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2.5 mb-4">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-sm text-zinc-400 leading-relaxed flex items-start gap-2">
                          <span className="text-zinc-500 shrink-0 mt-1">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.link && (
                      <div className="pt-3 mt-2 border-t border-zinc-800/80 flex items-center justify-end">
                        <a
                          href={exp.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#14141d] hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 hover:border-zinc-600 rounded-lg text-xs font-mono transition-all duration-200 shadow-sm group/btn"
                        >
                          <span>Visit {exp.link.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-orange-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

