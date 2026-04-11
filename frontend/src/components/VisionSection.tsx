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
          className="max-w-4xl mx-auto p-8 sm:p-12 bg-card rounded-3xl border border-border"
        >
          <blockquote className="text-2xl sm:text-3xl font-light italic leading-relaxed mb-8">
            "In my dictionary, wealth doesn't mean money. It means doing something for humanity, becoming happy in life, and making people smile."
          </blockquote>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I dream of becoming an{" "}
              <span className="text-primary font-medium">
                unforgettable contributor to history
              </span>{" "}
              not for fame, but for impact. Among 8 billion people on this pale blue dot, only a few minds are remembered and recalled. Inspired by{" "}
              <span className="text-primary font-medium">Nikola Tesla</span> who gave away free rights to his AC current invention for the betterment of humanity, I'm committed to creating innovations that serve people.
            </p>
            <p>
              My ultimate goal is to invent something significant for humanity and name it after my hidden surname{" "}
              <span className="text-primary font-medium">"Howlader"</span> whether it's an effect, an equation, or a discovery. I want to make this name proud and renowned throughout the entire world through my contributions to science and technology.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}