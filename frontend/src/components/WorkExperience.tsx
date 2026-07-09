import { motion } from "framer-motion";

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
    role: "Web Contributor & Intern Team Lead",
    company: "Scholars Cafe - Student Consulting Platform",
    period: "Jan 2026 - Present",
    type: null,
    location: null,
    points: [
      "Contributing to web development as an intern, coordinating a team of fellow interns and supporting technical project tasks including code reviews and deployment.",
      "Assisting platform operations that help students with EPT, SAT preparation, university applications, and scholarship pathways.",
    ],
    link: null,
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
    <section id="experience" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
        {/* Section Header */}
        <div className="mb-10">
          <span className="eyebrow text-xs uppercase text-muted-foreground block mb-2 tracking-[0.15em]">
            Professional Experience
          </span>
          <div className="h-[1px] w-full bg-white/10" />
        </div>

        {/* Experience Items */}
        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative pl-6 border-l border-white/10 group hover:border-white/25 transition-colors"
            >
              {/* Dot */}
              <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-white/20 group-hover:bg-white/60 transition-colors" />

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-3">
                <div>
                  <h3 className="text-[15px] font-semibold text-foreground leading-snug">
                    {exp.role}
                  </h3>
                  <p className="text-[13px] text-muted-foreground mt-0.5">
                    {exp.company}
                  </p>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <span className="text-[12px] font-mono text-muted-foreground block whitespace-nowrap">
                    {exp.period}
                  </span>
                  {exp.type && (
                    <span className="text-[11px] text-muted-foreground/60 block">
                      {exp.type}
                    </span>
                  )}
                </div>
              </div>

              {/* Points */}
              <ul className="space-y-2">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx} className="text-[14px] text-muted-foreground leading-relaxed pl-4 border-l border-white/5">
                    {pt}
                  </li>
                ))}
              </ul>

              {/* Link */}
              {exp.link && (
                <a
                  href={exp.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-[12px] font-mono text-[#d97706] hover:underline"
                >
                  {exp.link.label} ➔
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
