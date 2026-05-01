import { motion } from "framer-motion";
import { Sparkles, Cpu, Leaf } from "lucide-react";
import profileImage from "@/assets/Mahim Linkedin.jpg";
import roboticsBackground from "@/assets/image.png";

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Small particles scattered across the page
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <section className="min-h-screen flex items-center justify-center relative isolate overflow-hidden bg-background">
      {/* Theme-aware robotics background image layer (place image in /public/assets/) */}
      <div
        aria-hidden="true"
        style={{ backgroundImage: `url(${roboticsBackground})` }}
        className="absolute inset-0 z-0 pointer-events-none bg-center bg-no-repeat bg-cover bg-scroll md:bg-fixed opacity-[0.08] dark:opacity-[0.3] [filter:grayscale(100%)_brightness(1.5)_contrast(0.8)] dark:[filter:brightness(0.7)]"
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_20%,rgba(255,107,0,0.16),transparent_40%),radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.07),transparent_35%)]" />
      
      {/* Interactive particles - theme responsive */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
          className="absolute z-[2] rounded-full bg-foreground/20 blur-[1px]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - Content (on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-6 order-2 lg:order-1"
          >
            {/* Small tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {[
                { label: "Builder", icon: Cpu },
                { label: "Problem Solver", icon: Sparkles },
                { label: "Perpetually Curious", icon: Leaf },
              ].map((item, index) => (
                <motion.span
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-primary/10 transition-all cursor-default"
                >
                  <item.icon className="h-3.5 w-3.5 text-primary" />
                  {item.label}
                </motion.span>
              ))}
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight"
            >
              M. Mahimmiraj
            </motion.h1>

            {/* Description with no hyperlinks */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              <p>
                I build things that solve problems nobody around me was solving. Right now that is TagWraps, an NFC-based product authentication system that helps people verify whether what they are buying is real. TrueMedi, my pharmaceutical authentication prototype, runs inside the same ecosystem.
              </p>
            </motion.div>

            {/* CTA Buttons with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.button
                onClick={() => scrollToSection("#projects")}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(255, 119, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary-hover transition-all duration-300 shadow-lg hover:shadow-orange relative overflow-hidden group"
              >
                <span className="relative z-10">Explore My Work</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("#contact")}
                whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3.5 bg-transparent border-2 border-border text-foreground rounded-full font-semibold hover:bg-card hover:border-primary/60 hover:shadow-orange transition-all duration-300"
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Profile Image (on desktop, TOP on mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              {/* Animated glow effect */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-primary/25 rounded-full blur-3xl"
              />
              
              {/* Orbiting particles around image - theme responsive */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary/90 rounded-full -translate-x-1/2 shadow-lg shadow-primary/40" />
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-primary/70 rounded-full -translate-x-1/2 shadow-lg shadow-primary/30" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute left-0 top-1/2 w-2 h-2 bg-primary/80 rounded-full -translate-y-1/2 shadow-lg shadow-primary/35" />
                <div className="absolute right-0 top-1/2 w-2 h-2 bg-primary/60 rounded-full -translate-y-1/2 shadow-lg shadow-primary/25" />
              </motion.div>
              
              {/* Image container */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-hover to-accent rounded-full p-1 shadow-orange">
                  <div className="w-full h-full rounded-full overflow-hidden bg-card border-2 border-background">
                    <motion.img 
                      src={profileImage} 
                      alt="M. Mahimmiraj"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
