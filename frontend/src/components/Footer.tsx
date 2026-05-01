export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="glass-effect border-t border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content Grid */}
        <div className="grid sm:grid-cols-3 gap-8 mb-6">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">M. Mahimmiraj</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building technologies that solve real problems. Robotics, IoT, and environmental innovation from Bangladesh.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#achievements" className="text-muted-foreground hover:text-primary transition-colors">Achievements</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.linkedin.com/in/mahimmiraj1292/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/mirajulislam1292" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="https://www.instagram.com/m.mahimmiraj/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="https://www.facebook.com/mahimmiraj.1292/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Facebook</a></li>
              <li><a href="mailto:mahimmiraj@outlook.com" className="text-muted-foreground hover:text-primary transition-colors">Email</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-border/40 py-6">
          {/* Thank You Message */}
          <div className="text-center mb-6 space-y-3">
            <p className="text-lg font-semibold text-foreground">
              Thank you for visiting
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Your interest in my work means a lot. Whether you're here to explore projects, learn about innovations, or just curious about what I'm building, I appreciate you taking the time to visit.
            </p>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground pt-6 border-t-2 border-border/40">
            <p>© {currentYear} M. Mahimmiraj. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>

          {/* Legal Name Note */}
          <p className="text-xs text-muted-foreground/70 text-center pt-4 border-t-2 border-border/40 mt-4">
            Md. Mirajul Islam Mahim is my full legal name.
          </p>
        </div>
      </div>
    </footer>
  );
}
