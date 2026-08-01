import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import profileImage from "@/assets/new-profile.jpg";

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="min-h-[85vh] flex flex-col justify-center relative pt-28 pb-16 overflow-hidden">
      <div className="w-full max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-10 md:gap-12">
          
          {/* Main Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 space-y-6 text-left"
          >
            {/* Name Headline */}
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-2">
                M. Mahimmiraj
              </h1>
            </div>

            {/* Subtext Content */}
            <div className="space-y-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-2xl">
              <p>
                Currently developing <strong className="text-white font-semibold">TagWraps</strong>, an innovative packaging system using NFC technology to protect the authenticity of a product through a secured cryptographic encryption method, helping the public buy and identify genuine products.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection("#projects")}
                className="px-6 py-3 bg-white hover:bg-zinc-200 text-black font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 text-sm shadow-md"
              >
                Explore My Work
                <ArrowUpRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => scrollToSection("#contact")}
                className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-medium rounded-lg transition-all duration-200 text-sm"
              >
                Get In Touch
              </button>
            </div>


          </motion.div>

          {/* Profile Picture Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 self-center md:self-auto"
          >
            <div className="relative">
              <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
                <img
                  src={profileImage}
                  alt="M. Mahimmiraj"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

