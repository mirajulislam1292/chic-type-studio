import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Cpu, ShieldCheck, Zap, Layers, Image as ImageIcon, FileText, Download } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import QCECPage from "./QCECPage";

const projectDetailsData: Record<string, {
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  image: string;
  secondaryImage?: string;
  secondaryTitle?: string;
  overview: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  techStack: string[];
  impact: string;
  whitepaperUrl?: string;
}> = {
  "tagwraps": {
    title: "TagWraps",
    subtitle: "Tamper-Evident NFC Packaging & Real-Time Product Verification Platform",
    category: "Hardware & Cryptographic Packaging",
    tags: ["NFC Tag Type-4", "AES Cryptography", "Anti-Counterfeit", "Hardware Security"],
    image: "/assets/truemedi-prototype.jpg",
    secondaryImage: "/assets/about-photo.jpg",
    secondaryTitle: "TagWraps Lab Prototyping & Antenna Matching",
    overview: "TagWraps provides tamper-evident packaging integrated with high-security NFC tags and proprietary cryptographic encryption to eliminate counterfeit goods in luxury, pharmaceutical, and electronic sectors.",
    problem: "Global counterfeit markets cost businesses hundreds of billions annually and endanger consumers with fake pharmaceuticals, adulterated cosmetics, and cloned consumer goods.",
    solution: "TagWraps integrates ultra-thin, tear-detecting NFC tags directly into product packaging. When scanned with any standard smartphone, the chip uses cryptographic challenge-response authentication to confirm genuine provenance and verify if the package has ever been opened.",
    keyFeatures: [
      "Cryptographic challenge-response verification prevents tag cloning and replay attacks",
      "Tamper-loop physical antenna break detection instantly marks packaging as opened",
      "Zero-app customer experience: taps open secure web authentication in native mobile browsers",
      "Enterprise analytics dashboard for brand owners to track supply chain distribution in real time"
    ],
    techStack: ["NTAG 424 DNA / PN532", "AES-128 / ECC Cryptography", "Node.js REST API", "React & Tailwind CSS", "Microcontroller Testbeds"],
    impact: "Provides manufacturers and consumers with an unbreakable chain of trust against counterfeit products worldwide.",
    whitepaperUrl: "/TagWraps_Whitepaper.pdf"
  },
  "hydrover": {
    title: "HydroVer",
    subtitle: "Smart Water Pollution Monitoring & Autonomous Sampling Surface Vehicle",
    category: "Environmental Robotics & IoT",
    tags: ["Arduino Nano", "NRF24L01", "pH Sensor", "Turbidity", "Surface Vehicle"],
    image: "/assets/hydrover-prototype.jpg",
    secondaryImage: "/assets/hydrover-electronics.jpg",
    secondaryTitle: "HydroVer Custom RF Telemetry & Sensor Circuitry",
    overview: "HydroVer is an IoT-enabled remote controlled surface vehicle designed to collect water samples, measure water quality metrics in real-time, and administer chemical treatments in polluted water bodies.",
    problem: "Industrial effluents and untreated chemical runoff in rivers like Shitalakshya and Buriganga in Bangladesh pose severe risks to public health and marine ecosystems.",
    solution: "A low-cost surface vehicle equipped with water quality sensors (pH, turbidity, temperature, dissolved oxygen) transmitting data wirelessly via NRF24L01 / IoT modules to a ground monitoring station.",
    keyFeatures: [
      "Real-time wireless telemetry for pH, turbidity, and chemical concentration",
      "Modular payload bay for water sample collection and neutralizer dispensing",
      "Reinforced dual-hull pontoon design for stability in rough river currents",
      "Low power consumption enabling extended mission runtimes"
    ],
    techStack: ["Arduino Nano", "NRF24L01 Radio", "pH & Turbidity Sensors", "C++ / Embedded C", "Custom Hull Design"],
    impact: "Provides environmental researchers and municipal water bodies with low-cost, accurate field data without risking human operators."
  },
  "truemedi": {
    title: "TrueMedi",
    subtitle: "Anti-Counterfeit Pharmaceutical Verification Platform",
    category: "Healthcare & Cryptographic Security",
    tags: ["PN532 NFC", "Arduino", "Crypto Hashes", "Healthcare"],
    image: "/assets/truemedi-prototype.jpg",
    secondaryImage: "/assets/electronics-experiment.jpg",
    secondaryTitle: "TrueMedi Circuit Breadboarding & Tag Verification Test Rig",
    overview: "TrueMedi utilizes encrypted NFC tags on pharmaceutical packaging to allow instant verification of medicine authenticity with smartphone taps.",
    problem: "Counterfeit medicines account for billions in illicit sales and endanger millions of patients across South Asia who lack tools to verify genuine pharmaceuticals.",
    solution: "An end-to-end cryptographic architecture using PN532 NFC chips and cloud-registered hash signatures that instantly alert consumers if a medicine package is counterfeit or previously opened.",
    keyFeatures: [
      "Encrypted chip key pairing with cloud ledger",
      "Tap-and-verify mobile authentication without installing third-party apps",
      "Tamper-evident seal detection algorithm",
      "Manufacturer dashboard for batch lifecycle tracking"
    ],
    techStack: ["PN532 NFC Module", "Arduino", "Node.js API", "AES-128 Encryption", "Tailwind CSS"],
    impact: "Demonstrates an economical approach to counterfeit medicine detection, leading directly to the founding of TagWraps."
  },
  "aquaguard": {
    title: "AquaGuard",
    subtitle: "Continuous Real-Time IoT Water Quality Telemetry System",
    category: "Environmental IoT & Hardware",
    tags: ["IoT Hardware", "Water Quality", "ESP8266", "Cloud Telemetry"],
    image: "/assets/aquaguard-device.jpg",
    secondaryImage: "/assets/hydrover-prototype.jpg",
    secondaryTitle: "Field Testing with Aquatic Surface Probes",
    overview: "AquaGuard is a standalone, compact IoT device engineered for continuous water quality monitoring in rivers, lakes, and industrial drainage pipelines.",
    problem: "Traditional manual water sampling is slow, labor-intensive, and fails to catch rapid pollutant dumping events before contamination spreads.",
    solution: "AquaGuard submerges multi-parameter digital sensor probes and transmits live readings over WiFi and cellular networks to an emergency dashboard.",
    keyFeatures: [
      "Continuous pH, turbidity, TDS, and temperature logging",
      "Instant push notifications when toxicity thresholds are exceeded",
      "Solar-compatible charging system for remote deployability",
      "Weather-sealed waterproof casing engineered for harsh industrial environments"
    ],
    techStack: ["ESP8266 / ESP32", "Digital pH Probe", "Turbidity Sensor", "Cloud Telemetry", "C++"],
    impact: "Enables communities and factories to monitor water safety 24/7 and detect hazardous discharge immediately."
  },
  "robot-car": {
    title: "Autonomous Robot Car",
    subtitle: "4WD Obstacle Avoiding Autonomous Rover with Trajectory Mapping",
    category: "Autonomous Robotics",
    tags: ["Arduino Uno", "Ultrasonic HC-SR04", "L298N Motor Driver", "4WD Chassis"],
    image: "/assets/robot-car.jpg",
    secondaryImage: "/assets/robot-car-selfie.jpg",
    secondaryTitle: "Autonomous Rover Field Navigation Trials",
    overview: "A custom 4-wheel drive autonomous rover that maps immediate obstacle distances using ultrasonic sensor sweeps and executes real-time collision evasion maneuvers.",
    problem: "Navigation in cluttered, unmapped indoor and outdoor terrain requires dependable local sensor loops without relying on expensive LIDAR systems.",
    solution: "An optimized algorithmic steering loop implemented on microcontrollers that calculates evasive turning vectors dynamically within milliseconds.",
    keyFeatures: [
      "Servo-mounted ultrasonic scanning radar head",
      "Dual H-bridge L298N motor driver speed and direction control",
      "Dynamic trajectory adjustment for narrow path clearance",
      "Modular sensor expansion header for infrared and line-tracking sensors"
    ],
    techStack: ["Arduino Uno", "HC-SR04 Ultrasonic", "L298N Motor Driver", "Embedded C++", "4WD Chassis"],
    impact: "Served as the foundation for autonomous spatial navigation research and robotics workshops conducted for high school and college students."
  },
  "smart-city": {
    title: "Smart City Infrastructure Model",
    subtitle: "Integrated Urban Automation & Environmental Sensing System",
    category: "Smart Grid & Automation",
    tags: ["Smart Grid", "IoT Automation", "Sensors", "Sustainability"],
    image: "/assets/smart-city-model.jpg",
    secondaryImage: "/assets/science-festival.jpg",
    secondaryTitle: "Exhibition at National Science & Technology Festival",
    overview: "An architectural and engineering scale model demonstrating interconnected smart city systems including automated solar street lighting, soil moisture regulation, and road safety alerts.",
    problem: "Urban centers consume vast amounts of energy on inefficient municipal lighting and suffer from uncoordinated environmental data collection.",
    solution: "A centralized IoT controller coordinating light-dependent resistors, micro-irrigation valves, and automated emergency road signaling.",
    keyFeatures: [
      "Adaptive street illumination triggered by ambient light and motion",
      "Automated drip irrigation based on real-time soil moisture sensors",
      "Environmental air and temperature telemetry display",
      "Interactive status panel for public exhibition and demonstrations"
    ],
    techStack: ["ESP8266", "LDR Sensors", "Soil Moisture Probes", "Relay Control", "OLED Display"],
    impact: "Exhibited at national science exhibitions, earning district championships and educating hundreds of attendees on sustainable urban technology."
  },
  "a-eye": {
    title: "AEYE Edge Vision",
    subtitle: "Automatic Highway Accident Detection & Emergency Dispatch System",
    category: "Computer Vision & Edge AI",
    tags: ["ESP32-CAM", "OpenCV", "Computer Vision", "Highway Safety"],
    image: "/assets/electronics-experiment.jpg",
    secondaryImage: "/assets/robotics-workspace.jpg",
    secondaryTitle: "Edge AI Model Calibration & Firmware Testing",
    overview: "AEYE is a low-latency accident detection system that analyzes road traffic camera streams to automatically detect vehicle collisions and alert emergency services.",
    problem: "Delayed emergency response times during road accidents significantly increase fatality rates, especially on remote highway segments.",
    solution: "Computer vision pipeline deployed on edge devices to process traffic video feeds, recognize crash telemetry patterns with 92% accuracy, and transmit immediate GPS coordinates to emergency dispatch.",
    keyFeatures: [
      "Real-time vehicle trajectory analysis and impact vector calculation",
      "92% detection accuracy across day and night lighting conditions",
      "Automated SMS/HTTP dispatch alerts to local emergency response units",
      "Low power consumption suitable for solar-powered highway poles"
    ],
    techStack: ["ESP32-CAM", "OpenCV", "Python", "TensorFlow Lite", "MQTT Protocol"],
    impact: "Reduces emergency notification latency from minutes to seconds, improving response times for critical road incidents."
  },
  "nutridrip": {
    title: "NutriDrip",
    subtitle: "Smart Automated Plant Irrigation & Soil NPK Adjustment System",
    category: "AgriTech & Smart Farming",
    tags: ["ESP8266", "IoT", "Precision Agriculture", "Soil Sensors"],
    image: "/assets/smart-city-model.jpg",
    secondaryImage: "/assets/electronics-experiment.jpg",
    secondaryTitle: "NutriDrip Sensor Integration & Pumping System",
    overview: "NutriDrip automates precision irrigation and soil nutrient dosing for agricultural farms based on live moisture and NPK sensor readings.",
    problem: "Over-irrigation and improper fertilizer dosing degrade soil quality, waste water, and reduce overall crop yields.",
    solution: "An automated IoT drip irrigation system using ESP8266 and multi-depth soil sensors to deliver exact water and liquid nutrient volumes required by specific crops.",
    keyFeatures: [
      "Closed-loop soil moisture and pH feedback control",
      "Automated liquid fertilizer dosing pumps",
      "Real-time mobile telemetry dashboard for farmers",
      "Scheduled solar-powered watering schedules based on local weather forecasts"
    ],
    techStack: ["ESP8266 Microcontroller", "NPK & Soil Moisture Sensors", "Blynk IoT / Web Dashboard", "Relay Control"],
    impact: "Optimizes water usage by up to 40% and prevents fertilizer runoff while improving crop yield consistency."
  }
};

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [imgError, setImgError] = useState(false);
  const [secImgError, setSecImgError] = useState(false);

  if (slug === "qcec") {
    return <QCECPage />;
  }

  const project = slug ? projectDetailsData[slug] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050507] text-[#FAFAFA] flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-32 px-6">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-zinc-400 mb-6">The requested project page does not exist or has been moved.</p>
          <Link
            to="/#projects"
            className="px-6 py-2.5 bg-white text-black font-semibold rounded-lg text-sm"
          >
            Back to Projects
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA]">
      <Navbar />

      <section className="pt-28 pb-16 border-b border-zinc-800/80 bg-gradient-to-b from-[#0b0b0e] to-[#050507]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          
          <Link
            to="/#projects"
            className="inline-flex items-center text-sm font-mono text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono">
                {project.category}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl text-zinc-300 font-normal leading-relaxed max-w-3xl">
              {project.subtitle}
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-[#121218] border border-zinc-800 text-zinc-300 text-xs font-mono rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 space-y-12">
          
          {/* Project Primary Image Banner */}
          <div className="rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl bg-[#0b0b0e] flex items-center justify-center">
            {!imgError ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-80 sm:h-[440px] object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-80 sm:h-[440px] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#14141e] to-[#08080c] text-center">
                <Cpu className="w-16 h-16 text-orange-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                <p className="text-sm font-mono text-zinc-400">{project.category}</p>
              </div>
            )}
          </div>

          {project.whitepaperUrl && (
            <div className="p-6 bg-[#0e0e13] border border-orange-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Technical Whitepaper & Architecture Spec</h4>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">Read the full cryptographic specification and tamper-evident mechanism.</p>
                </div>
              </div>
              <a
                href={project.whitepaperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white hover:bg-zinc-200 text-black font-semibold rounded-xl text-xs font-mono transition-all inline-flex items-center gap-2 shrink-0 shadow-md"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          )}

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                The Challenge
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-8 bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Engineering Solution
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Secondary Circuitry / Hardware Detail Image if present */}
          {project.secondaryImage && (
            <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-orange-400">
                <ImageIcon className="w-4 h-4" />
                <span>HARDWARE & CIRCUITRY BREAKDOWN</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {project.secondaryTitle || "Circuit & Component Architecture"}
              </h3>
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                {!secImgError ? (
                  <img
                    src={project.secondaryImage}
                    alt={project.secondaryTitle || "Hardware Architecture"}
                    className="w-full h-72 sm:h-96 object-cover"
                    onError={() => setSecImgError(true)}
                  />
                ) : (
                  <div className="w-full h-64 flex flex-col items-center justify-center text-zinc-400 text-sm">
                    Hardware detail view
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Key Features */}
          <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-400" />
              Key System Features
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.keyFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack & Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-zinc-400" />
                Technologies & Hardware
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 bg-[#121218] border border-zinc-800 text-zinc-200 text-xs font-mono rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-zinc-400" />
                Project Impact
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {project.impact}
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
