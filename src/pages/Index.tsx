import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { WorkExperience } from "@/components/WorkExperience";
import { AchievementsSection } from "@/components/AchievementsSection";
import { VisionSection } from "@/components/VisionSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ParticleWaveBackground } from "@/components/ParticleWaveBackground";

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-orange-500/20 selection:text-orange-400">
      <ParticleWaveBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <WorkExperience />
        <AchievementsSection />
        <VisionSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
