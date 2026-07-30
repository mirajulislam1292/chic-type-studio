import { Suspense, lazy } from "react";

const NetworkMesh = lazy(() => import("../three/NetworkMesh"));

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* 3D network mesh — behind the copy, softened at the edges */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Suspense fallback={null}>
          <NetworkMesh />
        </Suspense>
        {/* Readability veil */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow mb-6 text-xs text-muted-foreground">
            Engineer · Designer · Builder
          </p>
          <h1 className="text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            I build systems that protect
            <span className="text-orange"> lives and money.</span>
          </h1>
          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            I&apos;m Mirajul Islam Mahim, a 20-year-old engineer and designer
            from Bangladesh. I&apos;m building TagWraps, a physical
            authentication system that makes counterfeiting products
            impractical.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#tagwraps"
              className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-medium text-orange-foreground transition-transform hover:-translate-y-0.5"
            >
              See what I&apos;m building
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <span className="eyebrow text-[10px] text-muted-foreground">
          Scroll
        </span>
      </div>
    </section>
  );
}
