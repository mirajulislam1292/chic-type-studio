import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { VisionSection } from "@/components/VisionSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WorkExperience } from "@/components/WorkExperience";
import { MotherboardBackground } from "@/components/MotherboardBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* 3D motherboard background layer - fixed behind all content */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-25">
        <MotherboardBackground />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <WorkExperience />
        <AchievementsSection />
        <VisionSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
