import { motion } from "framer-motion";
import { ArrowLeft, Eye, AlertTriangle, Zap, Camera, MapPin, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Seo from "@/components/Seo";

export default function AEyePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
  <Seo title="AEYE" description="AEYE — Automatic accident detection system using computer vision by M. Mahimmiraj." />
      <Navbar />
      
      <main className="pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link 
              to="/#projects" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              AEYE
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Automatic Accident Detection System Using Computer Vision
            </p>
            <div className="flex flex-wrap gap-2">
              {["ESP32-CAM", "OpenCV", "Computer Vision", "Highway Safety"].map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full border border-border">
                  {tag}
                </span>
              ))}
            </div>
          </motion.header>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-primary/10 rounded-2xl p-8 mb-12 text-center"
          >
            <div className="text-5xl font-bold text-primary mb-2">92%</div>
            <div className="text-foreground font-medium">Detection Accuracy</div>
            <p className="text-sm text-muted-foreground mt-2">Achieved with ESP32-CAM module in controlled testing</p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Project Overview</h2>
                <p>
                  AEYE is an automatic accident detection system integrated with OpenCV for situation detection. 
                  I developed a scaled-down version of this system using an ESP32-CAM module for detecting certain accidents, 
                  achieving 92% accuracy in accident detection.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Problem Statement</h2>
                <p>
                  The main highways and countryside roads in Bangladesh lack cameras for automatically detecting accidents. 
                  While the country already has advanced cameras integrated on the N1 (National Highway Dhaka-Chittagong) from Huawei, 
                  these are very costly because they process everything internally within the camera itself.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Proposed Solution</h2>
                <p>
                  I am planning to reduce costs by eliminating in-camera processing. Instead, I propose using basic IP cameras 
                  integrated with highway lampposts to send data to a central server for accident detection. Each camera would 
                  have its longitude and latitude coordinates as the model number for precise location identification, 
                  and the National Highway Department (NHD) would have a central control room.
                </p>
              </section>

              {/* Workflow */}
              <section className="bg-card rounded-xl border border-border p-6 my-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">System Workflow</h3>
                <ol className="list-decimal list-inside space-y-3">
                  <li>When an accident is detected in an area, it is first identified by the NHD control room</li>
                  <li>Based on the longitude and latitude coordinates (model number), a notification is sent to the nearest highway police center</li>
                  <li>LED boards are activated to redirect traffic routes if possible, or notify drivers about accidents ahead</li>
                </ol>
              </section>

              {/* Features Grid */}
              <section className="grid sm:grid-cols-2 gap-6 my-12">
                {[
                  { icon: Eye, title: "Computer Vision", desc: "OpenCV-powered image processing for real-time accident detection" },
                  { icon: Camera, title: "ESP32-CAM", desc: "Low-cost camera module for video streaming to central server" },
                  { icon: MapPin, title: "GPS Coordinates", desc: "Each camera tagged with longitude/latitude for precise location" },
                  { icon: AlertTriangle, title: "Instant Alerts", desc: "Automatic notification to nearest highway police center" },
                  { icon: Radio, title: "LED Boards", desc: "Traffic redirection and accident warning displays" },
                  { icon: Zap, title: "Central Processing", desc: "Server-based detection eliminates expensive in-camera processing" },
                ].map((feature) => (
                  <div key={feature.title} className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm">{feature.desc}</p>
                  </div>
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Real-World Impact Scenarios</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <h4 className="font-medium text-foreground">Scenario 1: Remote Highway Accident</h4>
                    <p className="text-sm mt-2">
                      Imagine you are riding on a countryside highway and unfortunately have an accident where there are no people to help you. 
                      However, the highway has lampposts with integrated basic IP cameras running the AEYE system. 
                      The nearest highway police can get notifications as quickly as possible and rescue you.
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <h4 className="font-medium text-foreground">Scenario 2: Traffic Management</h4>
                    <p className="text-sm mt-2">
                      Imagine you are a passenger heading toward Cox's Bazar through a remote jungle highway. 
                      LED boards display information about an accident ahead, allowing you to immediately reroute to another road 
                      to skip traffic jams. This also helps police manage the accident site more easily.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Key Benefits</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Life-saving potential:</strong> Faster emergency response in remote areas</li>
                  <li><strong>Cost-effective solution:</strong> Eliminates expensive in-camera processing</li>
                  <li><strong>Traffic management:</strong> Real-time route optimization and accident notifications</li>
                  <li><strong>Scalable system:</strong> Can be deployed across Bangladesh's highway network</li>
                  <li><strong>Emergency response optimization:</strong> Direct notification to nearest police centers</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Technical Specifications</h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>Detection accuracy: 92% with ESP32-CAM module</li>
                  <li>Processing method: Central server-based detection</li>
                  <li>Communication: Longitude and latitude coordinates as model numbers</li>
                  <li>Integration: Basic IP cameras mounted on highway lampposts</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Conclusion</h2>
                <p>
                  The AEYE system represents a cost-effective solution to improve road safety and emergency response times 
                  across Bangladesh's highway network, particularly in remote and underserved areas where traditional 
                  emergency response may be delayed.
                </p>
              </section>
            </div>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
