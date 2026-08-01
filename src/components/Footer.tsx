import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-zinc-800/80 bg-[#08080a]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold text-white tracking-tight">
            Md Mirajul Islam Mahim
          </h4>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            © {currentYear} Md Mirajul Islam Mahim • Innovating for Humanity
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-zinc-400">
          <a
            href="https://www.linkedin.com/in/mahimmiraj1292/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/mirajulislam1292"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.facebook.com/mahimmiraj1292"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/mahimmiraj1292"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
          <Link to="/gallery" className="hover:text-white transition-colors">
            Gallery
          </Link>
        </div>
      </div>
    </footer>
  );
}

