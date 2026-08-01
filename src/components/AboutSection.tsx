import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, Target, Lightbulb, Compass } from "lucide-react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Header Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-28 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                My Story
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                Curiosity, continuous learning, and a vision for technological transformation.
              </p>
            </div>
          </motion.div>

          {/* Narrative Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 space-y-6"
          >
            <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              
              <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
                I'm <strong className="text-white font-semibold">M. Mahimmiraj</strong> from Narayanganj, Bangladesh - a technology enthusiast driven by curiosity and a passion for creating positive change through innovation.
              </p>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                I am a lifelong student who is always seeking knowledge. I enjoy learning from everyone, from younger individuals with fresh ideas to senior professionals with years of experience. From early childhood, I have been fascinated by machines and constantly wondered how things work, taking apart electronic devices to explore their internal components and understand their functions.
              </p>

              <div className="p-5 bg-[#121218] rounded-xl border border-zinc-800/60 my-6">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-zinc-300 shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                    Through attending various events and gaining hands-on experience with engineering projects, I realized that there is a significant gap in automation and robotics development in my country. Being the son of a businessman, I have developed a vision to <strong className="text-white font-semibold">establish a robotics and automation company in Bangladesh</strong>.
                  </p>
                </div>
              </div>

              {/* Core Values Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800/80 text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Lightbulb className="w-4 h-4 text-zinc-300 shrink-0" />
                  <span>Curiosity-Driven Problem Solving</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Compass className="w-4 h-4 text-zinc-300 shrink-0" />
                  <span>Impact-Focused Engineering</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <User className="w-4 h-4 text-zinc-300 shrink-0" />
                  <span>Continuous Learning</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

