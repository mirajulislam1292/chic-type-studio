import { motion } from "framer-motion";
import profileImage from "@/assets/new-profile.jpg";
import { NeuralNetworkBackground } from "./NeuralNetworkBackground";

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Interactive Neural Network Background */}
      <NeuralNetworkBackground />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left space-y-8"
        >
          {/* Profile Photo */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-border">
            <img src={profileImage} alt="M.Mahimmiraj" className="w-full h-full object-cover" />
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight tracking-tight">
            M.Mahimmiraj
          </h1>

          {/* Description */}
          <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              Currently developing TagWraps, an innovative packaging system using NFC technology to protect the authenticity of a product through a secured cryptographic encryption method, helping the public buy and identify genuine products.
            </p>
            <p>
              TrueMedi, a medicine-focused authentication prototype, is now operating under the TagWraps ecosystem.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <motion.button
              onClick={() => scrollToSection("#projects")}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 bg-white text-black rounded-[2px] font-medium hover:bg-neutral-200 transition-colors duration-200"
            >
              Explore My Work
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("#contact")}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 bg-transparent border border-white/12 text-white rounded-[2px] font-medium hover:bg-white hover:text-black transition-colors duration-200"
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
