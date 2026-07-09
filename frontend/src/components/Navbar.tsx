import { motion } from "framer-motion";
import { Menu, X, Award } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#vision", label: "Vision" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (href: string) => {
    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setMobileMenuOpen(false);
  };

  const goHome = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/12"
    >
      <div className="max-w-[720px] mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={goHome}
            className="font-mono text-xl font-bold text-white tracking-widest hover:opacity-80 transition-opacity"
          >
            1292.
          </button>

          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <Link
                to="/essays/qcec"
                className="inline-flex items-center gap-2 px-3 py-1 bg-transparent border border-white/12 rounded-[2px] text-xs font-semibold hover:bg-white hover:text-black transition-colors"
              >
                <Award className="w-3 h-3" />
                QCEC '25
              </Link>
            </li>
          </ul>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-white/12"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="w-full text-left py-2 px-2 text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/essays/qcec"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 px-2 text-sm text-white hover:opacity-80 transition-opacity"
                >
                  <Award className="w-4 h-4" />
                  QCEC '25
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
