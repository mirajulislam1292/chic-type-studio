import SiteNav from "@/components/site/SiteNav";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import TagWraps from "@/components/site/TagWraps";
import Work from "@/components/site/Work";
import Credentials from "@/components/site/Credentials";
import Contact from "@/components/site/Contact";
import SiteFooter from "@/components/site/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <About />
        <TagWraps />
        <Work />
        <Credentials />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
