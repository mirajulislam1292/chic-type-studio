import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";

// Import all gallery images
import img3 from "@/assets/project-electronics.jpg";
import img4 from "@/assets/team-work.jpg";
import img5 from "@/assets/hydrover-prototype.jpg";
import img6 from "@/assets/hydrover-electronics.jpg";
import img7 from "@/assets/robot-car.jpg";
import img8 from "@/assets/award-ceremony.jpg";
import img9 from "@/assets/trophy-photo.jpg";
import img10 from "@/assets/childhood-photo.jpg";
import img11 from "@/assets/mountain-photo.jpg";
import img12 from "@/assets/truemedi-prototype.jpg";
import img13 from "@/assets/bdrcs-volunteer.jpg";
import img14 from "@/assets/science-fair-presentation.jpg";
import img15 from "@/assets/robotics-workspace.jpg";
import img16 from "@/assets/startup-summit.jpg";
import img17 from "@/assets/family-childhood.jpg";
import img18 from "@/assets/siblings-swing.jpg";
import img19 from "@/assets/night-selfie.jpg";
import img20 from "@/assets/science-fair-team.jpg";
import img21 from "@/assets/electronics-experiment.jpg";
import img22 from "@/assets/smart-city-model.jpg";
import img23 from "@/assets/aquaguard-device.jpg";
import img24 from "@/assets/truemedi-full-setup.jpg";
import img25 from "@/assets/robot-car-selfie.jpg";
import img26 from "@/assets/club-activity.jpg";
import img27 from "@/assets/dev-workspace.jpg";
import img28 from "@/assets/qcec-silver-certificate.jpg";
import img29 from "@/assets/science-festival.jpg";
import img30 from "@/assets/about-photo.jpg";
import img31 from "@/assets/Mahim Linkedin.jpg";
import img32 from "@/assets/f3a36a5d-383e-4f1d-9b25-5ce51c37cb5b 2.jpg";
import img33 from "@/assets/IMG_0329.jpg";
import img34 from "@/assets/IMG_2826.jpg";
import img35 from "@/assets/IMG_3143.JPG";
import img36 from "@/assets/IMG_3612 3.jpg";
import img37 from "@/assets/IMG_4720_Original.jpg";
import img38 from "@/assets/IMG_C1E7806B13C8-1.jpeg";

const galleryImages = [
  { src: "/images/gallery-extra-22.png", alt: "Art Gallery Photo" },
  { src: img4, alt: "Team Collaboration" },
  { src: img5, alt: "HydroVer Prototype" },
  { src: img6, alt: "Electronics Assembly" },
  { src: img7, alt: "Robot Car Project" },
  { src: img8, alt: "Award Ceremony" },
  { src: img9, alt: "Trophy Achievement" },
  { src: img10, alt: "Childhood Curiosity" },
  { src: img11, alt: "Mountain Adventure" },
  { src: img12, alt: "TrueMedi Prototype" },
  { src: img13, alt: "BDRCS Volunteer" },
  { src: img14, alt: "Science Fair Presentation" },
  { src: img15, alt: "Robotics Workspace" },
  { src: img16, alt: "Bangladesh Startup Summit" },
  { src: img17, alt: "Family Moments" },
  { src: img18, alt: "Childhood Memories" },
  { src: img19, alt: "Night Life" },
  { src: img20, alt: "Science Fair Team Award" },
  { src: img21, alt: "Electronics Experiment" },
  { src: img22, alt: "Smart City Model" },
  { src: img23, alt: "AquaGuard Device" },
  { src: img24, alt: "TrueMedi Full Setup" },
  { src: img25, alt: "Robot Car Project Selfie" },
];

export function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "center",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-scroll
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section id="gallery" className="py-24 bg-surface-subtle" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
            Photo Gallery
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
            <div className="flex">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots - show only subset for many images */}
          <div className="flex justify-center gap-2 mt-6">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "bg-primary w-6"
                    : "bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
