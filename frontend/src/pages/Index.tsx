import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { VisionSection } from "@/components/VisionSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import Seo from "@/components/Seo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Home"
        description="Portfolio of M. Mahimmiraj — Robotic projects, essays, and gallery showcasing work in environmental robotics and IoT."
        keywords={["M Mahimmiraj","Mahim","Miraj","Mirajul Islam Mahim","TrueMedi","TagWraps","GTCSC","Govt Tolaram College"]}
        sameAs={[
          "https://www.linkedin.com/in/replace-with-your-profile",
          "https://github.com/replace-with-your-profile",
          "https://twitter.com/replace-with-your-profile"
        ]}
      />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <AchievementsSection />
      <VisionSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
