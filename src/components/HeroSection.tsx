import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useSiteSettings } from "@/hooks/useContent";
import { HeroGeometry } from "./HeroGeometry";

export function HeroSection() {
  const [imgError, setImgError] = useState(false);
  const { settings } = useSiteSettings();
  const profileImage = settings?.profile_image_url || "/assets/new-profile.jpg";

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative flex h-[100svh] min-h-[640px] flex-col justify-center overflow-hidden border-b border-white/[0.05] pb-16 pt-28">
      <HeroGeometry />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-12">
        <div className="flex flex-col-reverse items-start justify-between gap-10 md:flex-row md:items-center md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 space-y-6 text-left"
          >
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {settings?.name || "M. Mahimmiraj"}
            </h1>
            <p className="max-w-2xl text-base font-normal leading-relaxed text-zinc-300 sm:text-lg">
              {settings?.short_bio || "Building secure NFC packaging and technology that solves real problems."}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button onClick={() => scrollToSection("#projects")} className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black shadow-md transition-all duration-200 hover:bg-zinc-200">
                Explore My Work <ArrowUpRight className="h-4 w-4" />
              </button>
              <button onClick={() => scrollToSection("#contact")} className="px-5 py-3 text-sm text-zinc-400 transition-colors duration-200 hover:text-white">
                Get In Touch
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 self-center md:self-auto"
          >
            <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border border-zinc-800 bg-[#0f0f15] shadow-2xl sm:h-56 sm:w-56">
              {!imgError ? (
                <img src={profileImage} alt={settings?.name || "M. Mahimmiraj"} className="h-full w-full object-cover" loading="eager" onError={() => setImgError(true)} />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-900 text-zinc-300">
                  <span className="text-3xl font-black tracking-wider text-white sm:text-5xl">MM</span>
                  <span className="mt-1 font-mono text-[10px] uppercase text-zinc-400">Mahimmiraj</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
