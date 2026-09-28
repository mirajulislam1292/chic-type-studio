import { motion } from "framer-motion";
import { useSiteSettings } from "@/hooks/useContent";

export function AboutSection() {
  const { settings } = useSiteSettings();
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 border-b border-white/10 pb-8"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white">
            My Story
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 text-[15px] sm:text-[16px] leading-relaxed text-zinc-300 max-w-4xl font-normal"
        >
          {(settings?.about_content || "I'm Mahim from Narayanganj, Bangladesh, a technology enthusiast driven by curiosity and a passion for creating positive change through innovation.").split("\n").filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </motion.div>
      </div>
    </section>
  );
}
