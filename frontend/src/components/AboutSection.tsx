import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import aboutPhoto from "@/assets/image copy.png";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-surface-subtle border-y border-border/40" ref={ref}>
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
            The Story So Far
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
              I grew up in <strong className="text-foreground font-semibold">Narayanganj, a city defined by industry, rivers, and movement.</strong> My father runs an engineering firm. Long before I had any formal training, I was taking apart machines to understand how they worked. Not to fix them. Just to know.
            </p>
            <p>
              That habit became projects. The projects became competition wins. The wins became a startup. None of it was planned. It was just what happens when you cannot stop asking how things work and why they fail.
            </p>
            <p>
              I have represented Bangladesh in national olympiads across mathematics, physics, robotics, artificial intelligence, and environmental science. I have won national science championships with hardware I built myself. I founded TagWraps to fight counterfeit products in South Asia using NFC technology. I led a science club of hundreds of students as president.
            </p>
            <p>
              <strong className="text-foreground font-semibold">I am nineteen years old and I am just getting started.</strong>
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="aspect-[4/5] bg-card rounded-3xl border border-border overflow-hidden shadow-lg hover:shadow-orange transition-shadow duration-300"
          >
            <img 
              src={aboutPhoto} 
              alt="Mahimmiraj teaching and working" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 brightness-90 contrast-110"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
