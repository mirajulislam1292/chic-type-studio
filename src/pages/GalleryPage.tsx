import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { galleryImages } from "@/data/galleryImages";

const INITIAL_BATCH_SIZE = 8;
const BATCH_INCREMENT = 8;

export default function GalleryPage() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH_SIZE);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (visibleCount >= galleryImages.length || !triggerRef.current) {
      return undefined;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisibleCount(galleryImages.length);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, galleryImages.length));
        }
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(triggerRef.current);

    return () => observer.disconnect();
  }, [visibleCount]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (selectedIdx === null) return;

    if (event.key === "Escape") {
      setSelectedIdx(null);
      return;
    }

    if (event.key === "ArrowRight") {
      setSelectedIdx((prev) => (prev === null ? null : (prev + 1) % galleryImages.length));
      return;
    }

    if (event.key === "ArrowLeft") {
      setSelectedIdx((prev) => (prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length));
    }
  }, [selectedIdx]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const visibleImages = galleryImages.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#07070a] text-foreground selection:bg-orange-500/20 selection:text-orange-400">
      <Navbar />

      <main className="py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-mono text-zinc-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Photo Gallery
            </h1>
          </div>

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {visibleImages.map((image, index) => {
              return (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  onClick={() => setSelectedIdx(index)}
                  aria-label={`Open photo ${index + 1}: ${image.alt}`}
                  className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0d0d12] text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700"
                >
                  <img
                    src={image.src}
                    alt={image.alt || "Gallery Photo"}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </button>
              );
            })}
          </div>

          {visibleCount < galleryImages.length && (
            <div
              ref={triggerRef}
              className="flex items-center justify-center gap-2 py-12 text-center text-xs font-mono text-zinc-500"
            >
              <div className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
              Loading more photos ({visibleCount}/{galleryImages.length})...
            </div>
          )}
        </div>
      </main>

      {selectedIdx !== null && galleryImages[selectedIdx] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          onClick={() => setSelectedIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
        >
          <button
            type="button"
            onClick={() => setSelectedIdx(null)}
            className="absolute right-5 top-5 z-50 rounded-full border border-zinc-700 bg-zinc-900/80 p-3 text-zinc-300 shadow-xl transition-colors hover:bg-zinc-800 hover:text-white"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedIdx((prev) => (prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length));
            }}
            className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full border border-zinc-700 bg-zinc-900/80 p-3 text-zinc-300 shadow-xl transition-colors hover:bg-zinc-800 hover:text-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedIdx((prev) => (prev === null ? null : (prev + 1) % galleryImages.length));
            }}
            className="absolute right-14 top-1/2 z-50 -translate-y-1/2 rounded-full border border-zinc-700 bg-zinc-900/80 p-3 text-zinc-300 shadow-xl transition-colors hover:bg-zinc-800 hover:text-white"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={galleryImages[selectedIdx].fullSrc}
              alt={galleryImages[selectedIdx].alt}
              decoding="async"
              className="max-h-[85vh] max-w-full rounded-xl border border-zinc-800 object-contain shadow-2xl"
            />
            <div className="mt-3 text-xs font-mono text-zinc-400">
              {selectedIdx + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
