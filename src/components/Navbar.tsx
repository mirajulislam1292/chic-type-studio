import { motion } from "framer-motion";
import { Menu, X, Award, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
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
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:py-4 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <nav className="bg-[#0b0b0e]/85 backdrop-blur-md border border-[#1f1f28] rounded-full px-5 py-2.5 shadow-2xl shadow-black/80 flex items-center justify-between transition-all">
          {/* Logo / Brand Name */}
          <button
            onClick={goHome}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold font-mono text-zinc-200 group-hover:border-zinc-500 transition-all">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                M. Mahimmiraj
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1 bg-[#121217]/60 p-1 rounded-full border border-zinc-800/60">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="px-3.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-full transition-all"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* QCEC Badge / Essay Link */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/essays/qcec"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-700/80 rounded-full text-xs font-medium font-mono text-zinc-300 hover:text-white hover:border-zinc-500 transition-all shadow-sm"
            >
              <Award className="w-3.5 h-3.5 text-zinc-400" />
              QCEC '25
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/essays/qcec"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-900 border border-zinc-700/80 rounded-full text-[11px] font-mono text-zinc-300"
            >
              <Award className="w-3 h-3 text-zinc-400" />
              QCEC
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white rounded-full bg-zinc-900/80 border border-zinc-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="md:hidden mt-2 bg-[#0b0b0e]/95 backdrop-blur-xl border border-zinc-800 rounded-2xl p-4 shadow-2xl"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="w-full text-left py-2 px-3 text-sm font-medium text-zinc-300 hover:text-orange-400 hover:bg-zinc-900 rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-zinc-800/80 mt-1">
                <Link
                  to="/essays/qcec"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 px-3 text-sm font-medium text-orange-400 bg-orange-500/10 rounded-lg border border-orange-500/20"
                >
                  <Award className="w-4 h-4" />
                  QCEC '25 Silver Essay
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}

