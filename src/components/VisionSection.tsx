import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Sparkles } from "lucide-react";

export function VisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="vision" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-3"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Vision & Philosophy
          </h2>
          <p className="text-base text-zinc-400 font-mono">
            What Drives Me Forward
          </p>
        </motion.div>

        {/* Vision Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden group"
        >
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3 text-zinc-400">
              <Quote className="w-8 h-8 opacity-80" />
            </div>

            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-light italic leading-relaxed text-zinc-100">
              "In my dictionary, wealth doesn't mean money. It means doing something for humanity, becoming happy in life, and making people smile."
            </blockquote>

            <div className="space-y-6 text-base sm:text-lg text-zinc-300 leading-relaxed pt-6 border-t border-zinc-800/80 font-normal">
              <p>
                I dream of becoming an{" "}
                <strong className="text-white font-semibold">
                  unforgettable contributor to history
                </strong>{" "}
                not for fame, but for impact. Among 8 billion people on this pale blue dot, only a few minds are remembered and recalled. Inspired by{" "}
                <strong className="text-white font-semibold">Nikola Tesla</strong> who gave away free rights to his AC current invention for the betterment of humanity, I'm committed to creating innovations that serve people.
              </p>
              <p>
                My ultimate goal is to invent something significant for humanity and name it after my hidden surname{" "}
                <strong className="text-white font-semibold font-mono">"Howlader"</strong> whether it's an effect, an equation, or a discovery. I want to make this name proud and renowned throughout the entire world through my contributions to science and technology.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
