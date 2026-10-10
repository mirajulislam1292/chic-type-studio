import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useContent";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { settings } = useSiteSettings();

  return (
    <footer className="py-12 border-t border-zinc-800/80 bg-[#08080a]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold text-white tracking-tight">
            {settings?.name || "M. Mahimmiraj"}
          </h4>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            © {currentYear} {settings?.footer_text || "M. Mahimmiraj • Innovating for Humanity"}
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-zinc-400">
          <a
            href={settings?.social_links.linkedin || "https://www.linkedin.com/in/mahimmiraj1292/"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={settings?.social_links.github || "https://github.com/mirajulislam1292"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={settings?.social_links.facebook || "https://www.facebook.com/mahimmiraj1292"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Facebook
          </a>
          <a
            href={settings?.social_links.instagram || "https://www.instagram.com/mahimmiraj1292"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
          <Link to="/gallery" className="hover:text-white transition-colors">
            Gallery
          </Link>
          <Link to="/message" className="hover:text-white transition-colors">
            Message
          </Link>
        </div>
      </div>
    </footer>
  );
}
