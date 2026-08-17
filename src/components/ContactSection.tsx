import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Image, Linkedin, Github, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "mahimmiraj@outlook.com",
    href: "mailto:mahimmiraj@outlook.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1410 669641",
    href: "tel:+8801410669641",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Narayanganj, Bangladesh",
    href: null,
  },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mahimmiraj1292/",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/mirajulislam1292",
    icon: Github,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/mahimmiraj1292",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/mahimmiraj1292",
    icon: Instagram,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Let's Connect
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            As a passionate learner and open project contributor, I am always eager to connect and collaborate. Feel free to reach out to me via email or connect with me on social platforms.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-8 bg-[#0b0b0e] rounded-2xl border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 shadow-xl group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 mx-auto mb-4 group-hover:scale-105 transition-transform">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm sm:text-base font-semibold text-white hover:text-zinc-300 transition-colors block"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-sm sm:text-base font-semibold text-white">{item.value}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Gallery Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center mb-16"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-zinc-900 text-zinc-200 border border-zinc-800 hover:border-zinc-700 hover:text-white font-semibold rounded-xl transition-all duration-300 text-sm shadow-md"
          >
            <Image className="h-4 w-4 text-orange-400" />
            Open Photo Gallery
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-4"
        >
          {socialLinks.map((social) => {
            const SocialIcon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-[#0b0b0e] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all duration-300"
                title={social.name}
              >
                <SocialIcon className="w-5 h-5" />
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

