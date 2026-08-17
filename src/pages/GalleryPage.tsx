import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { galleryImages } from "@/data/galleryImages";
import { useState, useEffect, useCallback, useRef } from "react";

const INITIAL_BATCH_SIZE = 16;
const BATCH_INCREMENT = 12;

export default function GalleryPage() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH_SIZE);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  // Progressive infinite scroll loading for ultra-smooth performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, galleryImages.length));
        }
      },
      { rootMargin: "300px" }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") setSelectedIdx(null);
      if (e.key === "ArrowRight") setSelectedIdx((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
      if (e.key === "ArrowLeft") setSelectedIdx((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
    },
    [selectedIdx]
  );

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
          
          {/* Top navigation */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-mono text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Photo Gallery
            </h1>
          </div>

          {/* Ultra-optimized CSS Masonry Grid - Pure Photos */}
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {visibleImages.map((img, index) => (
              <div
                key={img.src + index}
                className="group mb-4 block break-inside-avoid overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0d0d12] shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-zinc-700 cursor-pointer"
                onClick={() => setSelectedIdx(index)}
              >
                <img
                  src={img.src}
                  alt={img.alt || "Gallery Photo"}
                  loading={index < 6 ? "eager" : "lazy"}
                  decoding="async"
                  className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          {visibleCount < galleryImages.length && (
            <div
              ref={observerTarget}
              className="py-12 text-center text-xs font-mono text-zinc-500 flex items-center justify-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Loading more photos ({visibleCount}/{galleryImages.length})...
            </div>
          )}

        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedIdx !== null && galleryImages[selectedIdx] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedIdx(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIdx(null)}
            className="absolute top-5 right-5 z-50 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white p-3 rounded-full border border-zinc-700 transition-colors shadow-xl"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIdx((selectedIdx - 1 + galleryImages.length) % galleryImages.length);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white p-3 rounded-full border border-zinc-700 transition-colors shadow-xl"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIdx((selectedIdx + 1) % galleryImages.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white p-3 rounded-full border border-zinc-700 transition-colors shadow-xl"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[selectedIdx].src}
              alt="Gallery item"
              decoding="async"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-zinc-800"
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
