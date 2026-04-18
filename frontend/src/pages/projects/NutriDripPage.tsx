import { motion } from "framer-motion";
import { ArrowLeft, Droplets, Leaf, Wifi, BarChart3, Settings, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Seo from "@/components/Seo";

export default function NutriDripPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
  <Seo title="NutriDrip" description="NutriDrip — Automatic plant irrigation and NPK adjustment system (IoT) by M. Mahimmiraj." />
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
              NutriDrip
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Automatic Plant Irrigation & NPK Adjustment System
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Co-created with Kawser Mahamud Junayed
            </p>
            <div className="flex flex-wrap gap-2">
              {["ESP8266", "IoT", "Agriculture", "Automation", "Mobile App"].map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full border border-border">
                  {tag}
                </span>
              ))}
            </div>
          </motion.header>

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
                  This project addresses the common concern of plant care during extended absences from home. 
                  The system provides an innovative IoT-based solution for automated plant watering and nutrient management.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Problem Statement</h2>
                <p>
                  When you go on a visit outside of your home for a long time, you might feel tense about your plants on your balcony. 
                  If you aren't able to give them water, eventually they will dry out. This system solves that problem by combining 
                  automated irrigation with nutrient management.
                </p>
              </section>

              {/* Features Grid */}
              <section className="grid sm:grid-cols-2 gap-6 my-12">
                {[
                  { icon: Wifi, title: "IoT Connectivity", desc: "ESP8266 for wireless connectivity, allowing remote monitoring and control through WiFi" },
                  { icon: Droplets, title: "Soil Moisture Detection", desc: "Continuous monitoring of water requirements, detects when plants are drying out" },
                  { icon: Leaf, title: "NPK Management", desc: "Three solenoid valves control liquid NPK flow with adjustable mixing ratios" },
                  { icon: Smartphone, title: "Mobile App Control", desc: "Remote monitoring, real-time readings, and manual/auto mode toggle" },
                  { icon: Settings, title: "Automatic Mode", desc: "Triggers irrigation when moisture drops below 50%, customizable threshold" },
                  { icon: BarChart3, title: "Real-time Updates", desc: "Live soil moisture readings and system status through the app" },
                ].map((feature) => (
                  <div key={feature.title} className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm">{feature.desc}</p>
                  </div>
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Hardware Components</h2>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>ESP8266 microcontroller</strong> - IoT connectivity and control</li>
                  <li><strong>Soil moisture sensor</strong> - Detects if the plant is drying out</li>
                  <li><strong>Water pump</strong> - Controls watering system</li>
                  <li><strong>3 solenoid valves</strong> - Controls liquid NPK distribution</li>
                  <li><strong>Manual control buttons</strong> - For direct pump and system control</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Key Features</h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <h4 className="font-medium text-foreground">Automated Irrigation</h4>
                    <ul className="text-sm mt-2 list-disc list-inside space-y-1">
                      <li>Manual control: Users can control the pump for watering through the mobile app</li>
                      <li>Automatic mode: System automatically irrigates when moisture levels decrease below 50%</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <h4 className="font-medium text-foreground">NPK Management System</h4>
                    <ul className="text-sm mt-2 list-disc list-inside space-y-1">
                      <li>Three solenoid valves control the liquid NPK flow</li>
                      <li>Users can adjust NPK mixing ratios with the flowing water</li>
                      <li>Customizable nutrient delivery based on plant requirements</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <h4 className="font-medium text-foreground">Mobile App Control</h4>
                    <ul className="text-sm mt-2 list-disc list-inside space-y-1">
                      <li>Remote monitoring and control via WiFi</li>
                      <li>Real-time soil moisture readings</li>
                      <li>Manual irrigation control</li>
                      <li>NPK adjustment settings</li>
                      <li>Automated mode toggle</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">System Operation</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <h4 className="font-medium text-foreground mb-2">Manual Mode</h4>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>Monitor soil moisture levels through the app</li>
                      <li>Manual watering control via app interface</li>
                      <li>Adjustable NPK mixing ratios</li>
                      <li>Real-time system status updates</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <h4 className="font-medium text-foreground mb-2">Automatic Mode</h4>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>Continuous soil moisture monitoring</li>
                      <li>Auto irrigation when moisture drops below 50%</li>
                      <li>Preset NPK delivery with watering cycles</li>
                      <li>Notification alerts to user's mobile app</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Benefits</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Peace of Mind:</strong> No worry about plant care during travel</li>
                  <li><strong>Plant Health:</strong> Consistent watering and nutrient delivery</li>
                  <li><strong>Remote Control:</strong> Monitor and control from anywhere with internet</li>
                  <li><strong>Customizable:</strong> Adjustable moisture thresholds and NPK ratios</li>
                  <li><strong>User-Friendly:</strong> Simple app interface for easy operation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Conclusion</h2>
                <p>
                  This Automatic Plant Irrigation and NPK Adjustment System provides a comprehensive solution for plant care 
                  during extended absences. By combining IoT technology with automated irrigation and nutrient management, 
                  users can ensure their plants remain healthy and well-maintained regardless of their physical presence.
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
