import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Radio, Database, ShieldCheck, Bell } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const features = [
  {
    icon: Radio,
    title: "NFC Verification",
    desc: "PN532 NFC modules for secure tag reading and writing",
  },
  {
    icon: Database,
    title: "Hash Memory",
    desc: "Stores last 4 valid hashes for offline verification",
  },
  {
    icon: ShieldCheck,
    title: "Encrypted Codes",
    desc: "Secure random 12-character hash codes prevent tampering",
  },
  {
    icon: Bell,
    title: "Alert System",
    desc: "OLED display and buzzer indicate authenticity instantly",
  },
];

const tags = ["Arduino Nano", "PN532 NFC", "OLED Display", "Healthcare", "Security"];

export default function TrueMediPage() {
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
              TrueMedi
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              A Smart Fake Medicine Detection System Using NFC Technology
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
            <p className="mt-6 text-base text-foreground/90 border-l-4 border-orange-400 pl-4 py-1">
              This project is now operating under the TagWraps ecosystem.
            </p>
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
                  Introduction
                </h2>
                <p>
                  Counterfeit medicines pose a critical threat to public health globally, especially in developing countries like Bangladesh. TrueMedi is an innovative, affordable, and accessible fake medicine detection system developed using Arduino technology and NFC modules. It allows pharmacies and healthcare providers to instantly verify the authenticity of medicines using encrypted NFC tags and smart detection hardware.
                </p>
              </section>

              <section className="grid sm:grid-cols-2 gap-6 my-12 not-prose">
                <div className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-3 text-base">
                    Problem: Fake Medicines
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Over 10% of medicines in circulation in developing countries are counterfeit, posing serious risks to public health and safety.
                  </p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-3 text-base">
                    Problem: Expensive Systems
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Most existing verification systems are expensive and require internet or cloud connectivity, making them inaccessible for many pharmacies.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Our Solution
                </h2>
                <p>
                  TrueMedi offers a two-part solution to combat fake medicine circulation that works offline and uses Wi-Fi only between two devices, enabling low-cost deployments in pharmacies and clinics.
                </p>
                <div className="mt-6 space-y-4 not-prose">
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <h4 className="font-medium text-foreground">
                      1. Writer Module (Pharmaceutical Factory)
                    </h4>
                    <p className="text-sm mt-2 text-muted-foreground">
                      Generates a secure, random 12-character hash code and writes it onto an NFC tag attached to each medicine packet. This hash is sent wirelessly to the reader device for validation.
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <h4 className="font-medium text-foreground">
                      2. Reader Module (Pharmacy/Hospital)
                    </h4>
                    <p className="text-sm mt-2 text-muted-foreground">
                      Verifies the medicine's NFC tag against the most recent valid hashes received. If valid, a success message appears on the OLED screen; otherwise, a warning is shown with buzzer alerts.
                    </p>
                  </div>
                </div>
              </section>

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
                  How It Works
                </h2>
                <ol className="list-decimal list-inside space-y-2">
                  <li>The writer device generates a secure hash</li>
                  <li>The hash is stored in an NFC tag and wirelessly shared with the reader</li>
                  <li>The reader stores the last 4 valid hashes in memory</li>
                  <li>When scanned, a medicine's NFC tag is checked against this list</li>
                  <li>OLED and buzzer indicate authenticity</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Components Used
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>Arduino Nano</li>
                  <li>NFC Modules (PN532)</li>
                  <li>OLED Display</li>
                  <li>Buzzer</li>
                  <li>Push Button</li>
                  <li>Li-Po Battery (3.7V)</li>
                  <li>Jumper Wires & Breadboard</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Possible Applications
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong className="text-foreground">Pharmaceutical Industry:</strong> Authenticate products during production and prevent counterfeit drugs from entering supply chains</li>
                  <li><strong className="text-foreground">Hospitals & Clinics:</strong> Quickly verify the authenticity of drugs before administering</li>
                  <li><strong className="text-foreground">Remote Healthcare:</strong> Portable solution for rural areas without internet access</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Future Development
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Add Firebase integration for cloud-based validation and logging</li>
                  <li>Introduce a mobile app to show patient-side verification</li>
                  <li>Upgrade to NFC-enabled smartcards and anti-cloning technology</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Conclusion
                </h2>
                <p>
                  TrueMedi is a step toward a safer and smarter healthcare system. It combines affordability, simplicity, and innovation to address one of the most pressing challenges in medicine distribution. This project embodies our commitment to improving public health through accessible technology and has the potential for national-scale implementation.
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
