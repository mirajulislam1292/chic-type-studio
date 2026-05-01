import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Award, Trophy, Medal, Star, Users, Cpu, GraduationCap, Target, ExternalLink } from "lucide-react";

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
    <section id="achievements" className="py-24 bg-surface-subtle border-b border-border/40" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
            Achievements & Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            Recognition, Milestones, and Training
          </p>
        </motion.div>

        {/* Leadership Roles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">Leadership & Organizational Roles</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {leadershipRoles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-card rounded-3xl border border-border hover:border-primary/50 hover:shadow-orange transition-all"
              >
                <p className="text-sm">{role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Major Awards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">Major Awards & Championships</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {majorAwards.map((award, index) => {
              const IconComponent = award.icon;
              const CardContent = (
                <>
                  <div className="flex items-start justify-between">
                    <IconComponent className="h-6 w-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    {award.link && <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />}
                  </div>
                  <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">{award.title}</h4>
                  <p className="text-muted-foreground text-sm">{award.desc}</p>
                </>
              );
              
              return award.link ? (
                <Link to={award.link} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="p-5 bg-card rounded-3xl border border-border hover:shadow-orange hover:border-primary/50 transition-all duration-300 group h-full"
                  >
                    {CardContent}
                  </motion.div>
                </Link>
              ) : (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-5 bg-card rounded-3xl border border-border hover:shadow-orange hover:border-primary/50 transition-all duration-300 group"
                >
                  {CardContent}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* National Rankings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">National & District Rankings</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {nationalRankings.map((ranking, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-card rounded-3xl border border-border hover:border-primary/50 hover:shadow-orange transition-all"
              >
                <p className="text-sm">{ranking}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Olympiad Finalist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Star className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">National Olympiad Finalist (Nationalist)</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {olympiadFinalist.map((olympiad, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/30 hover:bg-primary/20 transition-colors"
              >
                {olympiad}
              </motion.span>
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
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">Technical & Specialized Training</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {technicalTraining.map((training, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="p-3 bg-card rounded-3xl border border-border hover:border-primary/50 hover:shadow-orange transition-all flex items-start gap-2"
              >
                <Cpu className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm">{training}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
