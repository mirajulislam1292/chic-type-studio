import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Download, Image } from "lucide-react";
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

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 bg-surface-subtle" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            If you are working on something real and you think I can contribute, reach out. I respond to every serious message.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(255, 107, 0, 0.55)" }}
              className="text-center p-8 bg-card rounded-3xl border border-border hover:shadow-orange transition-all"
            >
              <item.icon className="h-6 w-6 text-primary mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-2">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="font-medium hover:text-primary transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="font-medium">{item.value}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* CV Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-4 mb-12"
        >
          <a
            href="/MAHIM CV.pdf"
            download="M. Mahimmiraj_CV.pdf"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary-hover transition-all duration-300 hover:scale-105 hover:shadow-orange active:scale-95"
          >
            <Download className="h-5 w-5" />
            Download My CV
          </a>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-primary/10 hover:border-primary/50 border border-border transition-all duration-300 hover:scale-105 hover:shadow-orange active:scale-95"
          >
            <Image className="h-5 w-5" />
            Open Photo Gallery
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
