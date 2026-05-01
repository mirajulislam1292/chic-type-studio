// Centralized gallery image list shared across pages/sections.
// Keep this file as the single source of truth for gallery ordering.

import img1 from "@/assets/MAHIM GTCSC SEMINAR 1.png";
import img2 from "@/assets/science-festival.jpg";
import img3 from "@/assets/image copy 2.png";
import img4 from "@/assets/image copy 4.png";
import img5 from "@/assets/image copy 5.png";
import img6 from "@/assets/image copy 6.png";
import img7 from "@/assets/image copy 7.png";
import img8 from "@/assets/image copy 8.png";
import img9 from "@/assets/image copy 9.png";
import img10 from "@/assets/image copy 10.png";
import img11 from "@/assets/image copy 11.png";

export type GalleryImage = {
  src: string;
  alt: string;
};

export const galleryImages: GalleryImage[] = [
  { src: img1, alt: "MAHIM GTCSC Seminar 1" },
  { src: img2, alt: "Science Festival" },
  { src: img3, alt: "Image Copy 2" },
  { src: img4, alt: "Image Copy 4" },
  { src: img5, alt: "Image Copy 5" },
  { src: img6, alt: "Image Copy 6" },
  { src: img7, alt: "Image Copy 7" },
  { src: img8, alt: "Image Copy 8" },
  { src: img9, alt: "Image Copy 9" },
  { src: img10, alt: "Image Copy 10" },
  { src: img11, alt: "Image Copy 11" },
];
