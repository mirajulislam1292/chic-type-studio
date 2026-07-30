export default function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="font-display text-sm font-semibold">
          Mirajul Islam<span className="text-orange">.</span>
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Md. Mirajul Islam Mahim — Narayanganj,
          Bangladesh
        </p>
      </div>
    </footer>
  );
}
