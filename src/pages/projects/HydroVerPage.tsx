import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Droplets, Sparkles, Thermometer, Wind, Radio, LifeBuoy } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const features = [
  {
    icon: Droplets,
    title: "Water Collection System",
    desc: "Automated water sampling mechanism for laboratory testing and comprehensive analysis",
  },
  {
    icon: Sparkles,
    title: "Chemical Spreading",
    desc: "Controlled dispensing system for treatment chemicals as recommended by laboratory analysis",
  },
  {
    icon: Thermometer,
    title: "Temperature Sensor",
    desc: "Environmental temperature monitoring for real-time data collection",
  },
  {
    icon: Wind,
    title: "MQ2 Air Quality Sensor",
    desc: "Air quality detection and monitoring capabilities",
  },
  {
    icon: Radio,
    title: "Wireless Control",
    desc: "NRF24L01 transceivers for real-time remote navigation and control",
  },
  {
    icon: LifeBuoy,
    title: "Emergency Life Jacket",
    desc: "Deployable life jacket system with automatic ejection mechanism",
  },
];

const tags = ["Arduino Nano", "NRF24L01", "IoT", "Environmental", "Robotics"];

export default function HydroVerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/20 selection:text-orange-400">
      <Navbar />

      <main className="pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8 text-sm font-mono"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </motion.div>

          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">
              HydroVer
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              A Smart Solution for Water Pollution Monitoring & Treatment
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.header>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="space-y-8 text-muted-foreground leading-relaxed text-[15px] sm:text-[16px]">
              
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Abstract
                </h2>
                <p>
                  Water pollution and ineffective monitoring of water bodies are pressing issues in Bangladesh and across the world. To address these challenges, I developed HydroVer, a multi-functional remotely controlled water surface vehicle designed for environmental monitoring, water sampling, chemical treatment, and emergency assistance applications. The system is built on Arduino Nano and controlled wirelessly using NRF24L01 transceivers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Problem Statement
                </h2>
                <p>
                  Water resources in Bangladesh, including rivers, canals, and lakes, are increasingly polluted due to industrial waste, plastic contamination, and other human activities. Manual monitoring and cleaning are often labor-intensive, time-consuming, and dangerous for personnel.
                </p>
              </section>

              {/* 6 Feature Cards */}
              <section className="grid sm:grid-cols-2 gap-6 my-12 not-prose">
                {features.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-6 bg-card rounded-xl border border-border hover:border-orange-500/40 transition-colors"
                    >
                      <Icon className="h-8 w-8 text-orange-400 mb-3" />
                      <h3 className="font-semibold text-foreground mb-2 text-base">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Objectives
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Design and build a multi-functional robotic boat capable of remote navigation and multiple water management tasks</li>
                  <li>Utilize wireless communication for real-time control over the water surface</li>
                  <li>Demonstrate precise movement control (forward, backward, left, right) using a joystick interface</li>
                  <li>Implement water collection system for laboratory analysis and testing</li>
                  <li>Provide chemical spreading capability for water treatment applications</li>
                  <li>Integrate environmental monitoring sensors for real-time data collection</li>
                  <li>Incorporate emergency life jacket deployment system for water safety</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Technical Implementation
                </h2>
                <h3 className="text-xl font-medium text-foreground mb-3">
                  Core Control System:
                </h3>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li><strong className="text-foreground">Arduino Nano</strong> - Main vehicle controller</li>
                  <li><strong className="text-foreground">NRF24L01 transceivers</strong> - Wireless communication between boat and controller</li>
                  <li><strong className="text-foreground">L298N motor driver</strong> - Controls and drives two DC motors</li>
                  <li><strong className="text-foreground">Two DC motors</strong> - Provides propulsion for forward/backward and directional movement</li>
                  <li><strong className="text-foreground">Joystick module</strong> - Operator control interface</li>
                  <li><strong className="text-foreground">Power source</strong> - Rechargeable battery pack for autonomous operation</li>
                </ul>

                <h3 className="text-xl font-medium text-foreground mb-3">
                  Navigation Control:
                </h3>
                <p>
                  The joystick sends control signals to the transmitter Arduino via NRF24L01 wireless communication. The receiver Arduino Nano (mounted on the boat) interprets the commands and drives the motors using the L298N motor driver. The vehicle executes directional movement based on real-time joystick input.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Impact & Recognition
                </h2>
                <p>
                  HydroVer offers a comprehensive, cost-effective solution for water resource management and safety applications. The project was presented at the National Science & Technology Week, where it received recognition for its innovative approach to environmental monitoring. This demonstrates the potential of low-cost, locally-developed solutions to address pressing environmental challenges in developing countries.
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
