import { Navbar } from "@/components/Navbar";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { galleryImages } from "@/data/galleryImages";

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-24" ref={ref}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold">Photo Gallery</h2>
          </div>

          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
            {galleryImages.map((image, idx) => (
              <a
                key={image.src}
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-5 block break-inside-avoid overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                aria-label={`Open image ${idx + 1} in a new tab`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
