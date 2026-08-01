import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Award, Trophy, Medal, Star, Users, Cpu, GraduationCap, Target, ExternalLink, ShieldAlert } from "lucide-react";

const leadershipRoles = [
  "President, Govt. Tolaram College Science Club (2024-2025)",
  "Youth Volunteer (ICT Dept.), Bangladesh Red Crescent Society (BDRCS), Narayanganj Unit",
  "Member, Team Atlas (Robotics)",
];

const majorAwards = [
  { title: "Silver Award", desc: "The Queen's Commonwealth Essay Competition 2025", icon: Award, link: "/essays/qcec" },
  { title: "Champion", desc: "NextGen BD Festival, Green University of Bangladesh", icon: Trophy },
  { title: "Champion", desc: "UIU CSE FEST 2025 (ICT Olympiad)", icon: Trophy },
  { title: "Champion", desc: "DRMC Math Summit", icon: Trophy },
  { title: "5th Place", desc: "EWU NatEcon Startup Catalyst", icon: Medal },
];

const nationalRankings = [
  "District Champion & National Rank 9th, 46th National Science and Technology Fest",
  "District Champion & National Rank 13th, 45th National Science and Technology Fest",
  "District Champion, Bangladesh Wildlife Olympiad (Narayanganj)",
  "7th Place, Ibn Al-Haytham Science Fest 2024",
  "9th Place, Al-Khwarizmi Science Fest 2025",
];

const olympiadFinalist = [
  "Bangladesh Mathematical Olympiad (BdMO)",
  "Bangladesh Physics Olympiad (BdPhO)",
  "Bangladesh Robotics Olympiad (BdRO)",
  "Bangladesh Artificial Intelligence Olympiad (BdAiO)",
  "Bangladesh Wildlife Olympiad",
  "Bangladesh English Olympiad",
  "Bangladesh Environmental Olympiad",
  "National Earth Olympiad",
];

const technicalTraining = [
  "Basic to Advanced Robotics, Team Atlas",
  "ML Data Handling & Image Recognition, Team Atlas",
  "Computer 101, Govt. Tolaram College (Grade: A+)",
  "Cyber Hygiene, The Asia Foundation & Sajeda Foundation",
  "Green Day Training (GDT), Bangladesh Youth Environmental Initiative (BYEI)",
  "AAA Training, Bangladesh Red Crescent Society (BDRCS)",
  "MIS & Data Management, BDRCS",
  "ICRC & Standard Volunteering, BDRCS",
  "Art of Problem Definition, Passport to Earning (P2E) Bangladesh",
];

export function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-3"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Achievements & Experience
          </h2>
          <p className="text-base text-zinc-400 font-mono">
            Recognition, Milestones, Olympiads, and Technical Training
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Major Awards & Championships */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-zinc-800">
              <Trophy className="h-5 w-5 text-zinc-300" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">Major Awards & Championships</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {majorAwards.map((award, index) => {
                const IconComponent = award.icon;
                const CardContent = (
                  <div className="bg-[#0b0b0e] border border-zinc-800/80 hover:border-zinc-700 rounded-xl p-5 transition-all duration-300 group h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        {award.link && (
                          <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                            Read Essay <ExternalLink className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-white text-base group-hover:text-zinc-200 transition-colors mb-1">{award.title}</h4>
                      <p className="text-zinc-400 text-sm">{award.desc}</p>
                    </div>
                  </div>
                );
                
                return award.link ? (
                  <Link to={award.link} key={index} className="block">
                    {CardContent}
                  </Link>
                ) : (
                  <div key={index}>{CardContent}</div>
                );
              })}
            </div>
          </motion.div>

          {/* Leadership Roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-zinc-800">
              <Users className="h-5 w-5 text-zinc-300" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">Leadership & Organizational Roles</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {leadershipRoles.map((role, index) => (
                <div
                  key={index}
                  className="p-5 bg-[#0b0b0e] rounded-xl border border-zinc-800/80 hover:border-zinc-700 transition-all"
                >
                  <p className="text-sm sm:text-base font-medium text-zinc-200">{role}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* National Rankings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-zinc-800">
              <Target className="h-5 w-5 text-zinc-300" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">National & District Rankings</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nationalRankings.map((ranking, index) => (
                <div
                  key={index}
                  className="p-4 bg-[#0b0b0e] rounded-xl border border-zinc-800/80 hover:border-zinc-700 transition-all flex items-start gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-zinc-400 mt-2 shrink-0" />
                  <p className="text-sm text-zinc-300 font-medium leading-relaxed">{ranking}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Olympiad Finalist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-zinc-800">
              <Star className="h-5 w-5 text-zinc-300" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">National Olympiad Finalist</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {olympiadFinalist.map((olympiad, index) => (
                <span
                  key={index}
                  className="px-3.5 py-2 bg-[#0d0d12] text-zinc-200 rounded-lg text-xs font-mono border border-zinc-800 hover:border-zinc-600 hover:text-white transition-all"
                >
                  {olympiad}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Technical Training */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-zinc-800">
              <GraduationCap className="h-5 w-5 text-zinc-300" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">Technical & Specialized Training</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {technicalTraining.map((training, index) => (
                <div
                  key={index}
                  className="p-3.5 bg-[#0b0b0e] rounded-lg border border-zinc-800/80 hover:border-zinc-700 transition-all flex items-start gap-3"
                >
                  <Cpu className="h-4 w-4 text-zinc-400 mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-zinc-300 font-medium">{training}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

