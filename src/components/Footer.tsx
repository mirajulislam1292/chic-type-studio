import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useContent";
import { defaultSocialLinks, getVisibleSocialLinks } from "@/lib/socialLinks";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { settings } = useSiteSettings();
  const socialLinks = getVisibleSocialLinks(settings?.social_links || defaultSocialLinks);

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

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-mono text-zinc-400">
          {socialLinks.map((social) => (
            <a
              key={social.key}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {social.label}
            </a>
          ))}
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
