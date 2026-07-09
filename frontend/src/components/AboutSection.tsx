import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24" ref={ref}>
      <div className="max-w-[720px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 border-b border-white/12 pb-8"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            My Story
          </h2>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground"
        >
          <p>
            I'm <strong className="text-white font-semibold">Mahim from Narayanganj, Bangladesh</strong> a technology enthusiast driven by curiosity and a passion for creating positive change through innovation.
          </p>
          <p>
            I am a lifelong student who is always seeking knowledge. I enjoy learning from everyone, from younger individuals with fresh ideas to senior professionals with years of experience. From the beginning of my childhood, I have been fascinated by machines and constantly wondered how things work. I developed a unique hobby of taking apart electronic devices to explore their internal components and understand their functions.
          </p>
          <p>
            Through attending various events and gaining hands-on experience with innovative engineering projects, I realized that there is a significant gap in automation and robotics development in my country. Being the son of a businessman, I have developed a vision to <strong className="text-white font-semibold">establish a robotics and automation company in Bangladesh</strong>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
