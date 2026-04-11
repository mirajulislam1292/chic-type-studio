import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import aboutPhoto from "@/assets/about-photo.jpg";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-surface-subtle" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
            My Story
          </h2>
          <p className="text-lg text-muted-foreground">
            From Narayanganj to the World
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-lg leading-relaxed text-muted-foreground"
          >
            <p>
              I'm <strong className="text-foreground font-semibold">Mahim from Narayanganj, Bangladesh</strong> a technology enthusiast driven by curiosity and a passion for creating positive change through innovation.
            </p>
            <p>
              I am a lifelong student who is always seeking knowledge. I enjoy learning from everyone, from younger individuals with fresh ideas to senior professionals with years of experience. From the beginning of my childhood, I have been fascinated by machines and constantly wondered how things work. I developed a unique hobby of taking apart electronic devices to explore their internal components and understand their functions.
            </p>
            <p>
              Through attending various events and gaining hands-on experience with innovative engineering projects, I realized that there is a significant gap in automation and robotics development in my country. Being the son of a businessman, I have developed a vision to <strong className="text-foreground font-semibold">establish a robotics and automation company in Bangladesh</strong>.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="aspect-[4/5] bg-card rounded-3xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img 
              src={aboutPhoto} 
              alt="Mahimmiraj teaching and working" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
