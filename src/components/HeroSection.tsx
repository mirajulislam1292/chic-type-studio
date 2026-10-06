import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useSiteSettings } from "@/hooks/useContent";
import { HeroGeometry } from "./HeroGeometry";

export function HeroSection() {
  const [imgError, setImgError] = useState(false);
  const { settings } = useSiteSettings();
  const profileImage = settings?.profile_image_url || "/assets/new-profile.jpg";

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative flex h-[100svh] min-h-[640px] flex-col justify-center overflow-hidden border-b border-white/[0.06] pt-24 pb-14">
      <HeroGeometry />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-12">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)] md:gap-5">
          
          {/* Main Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/[0.07] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-orange-200/80">
              <ShieldCheck className="h-3.5 w-3.5 text-orange-400" />
              Engineering trust into products
            </div>
            {/* Name Headline */}
            <div>
              <h1 className="text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
                {settings?.name || "M. Mahimmiraj"}
              </h1>
            </div>

            {/* Subtext Content */}
            <div className="space-y-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-2xl">
              <p>
                {settings?.short_bio || "Building secure NFC packaging and engineering systems that solve real problems."}
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
                className="px-5 py-3 text-zinc-400 hover:text-white transition-colors duration-200 text-sm"
              >
                Get In Touch
              </button>
            </div>

          </motion.div>

          {/* The portrait is a verified identity card floating beside the security system. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden min-h-[360px] md:block"
          >
            <div className="absolute bottom-5 right-0 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b0b0e]/75 p-2.5 pr-4 shadow-2xl shadow-black/60 backdrop-blur-xl">
              <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-orange-400/25 bg-[#0f0f15]">
                {!imgError ? (
                  <img
                    src={profileImage}
                    alt={settings?.name || "M. Mahimmiraj"}
                    className="h-full w-full object-cover"
                    loading="eager"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-900 text-zinc-300">
                    <span className="text-xl font-black tracking-wider text-white">MM</span>
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />Verified builder</div>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">Identity secured</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      <button onClick={() => scrollToSection("#about")} className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600 transition hover:text-zinc-300" aria-label="Scroll to My Story">
        Continue <ArrowDown className="h-3.5 w-3.5" />
      </button>
    </section>
  );
}
