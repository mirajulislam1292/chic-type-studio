import { motion } from "framer-motion";

export function AboutSection() {
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
          <p>
            I'm <strong className="text-white font-semibold">Mahim from Narayanganj, Bangladesh</strong>, a technology enthusiast driven by curiosity and a passion for creating positive change through innovation.
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
