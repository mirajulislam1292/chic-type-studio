import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function VisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="vision" className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
            Vision & Philosophy
          </h2>
          <p className="text-lg text-muted-foreground">
            What Drives Me Forward
          </p>
        </motion.div>

        {/* Vision Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto p-8 sm:p-12 bg-card rounded-3xl border border-border hover:shadow-orange transition-shadow duration-300"
        >
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I am not building things to become famous. I am building things because the problems are real and I am standing close enough to see them.
            </p>
            <p>
              Bangladesh needs engineers who understand hardware at depth. South Asia needs authentication infrastructure that works without expensive equipment. The world needs people who build for the places that usually get skipped.
            </p>
            <p>
              That is what I am working toward. Everything I have built so far is practice for the thing I have not built yet.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}