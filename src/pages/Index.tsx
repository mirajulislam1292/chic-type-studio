import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { WorkExperience } from "@/components/WorkExperience";
import { AchievementsSection } from "@/components/AchievementsSection";
import { VisionSection } from "@/components/VisionSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CredentialsSection } from "@/components/CredentialsSection";
import { useSiteSettings } from "@/hooks/useContent";
import { useSeo } from "@/lib/seo";

export default function IndexPage() {
  const { settings } = useSiteSettings();
  useSeo({ title: settings?.seo_title || "M. Mahimmiraj — Engineer, Builder & Founder", description: settings?.seo_description || "Engineering, robotics and product security portfolio of M. Mahimmiraj.", path: "/", image: settings?.profile_image_url, jsonLd: { "@context": "https://schema.org", "@type": "Person", name: settings?.name || "M. Mahimmiraj", url: window.location.origin, sameAs: settings ? Object.values(settings.social_links) : [] } });
  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-orange-500/20 selection:text-orange-400">
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <WorkExperience />
        <CredentialsSection />
        <AchievementsSection />
        <VisionSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
