// Centralized gallery image list shared across pages/sections.
// Keep this file as the single source of truth for gallery ordering.

import old1 from "@/assets/science-festival.jpg";
import old2 from "@/assets/about-photo.jpg";
import old3 from "@/assets/project-electronics.jpg";
import old4 from "@/assets/team-work.jpg";
import old5 from "@/assets/hydrover-prototype.jpg";
import old6 from "@/assets/hydrover-electronics.jpg";
import old7 from "@/assets/robot-car.jpg";
import old8 from "@/assets/award-ceremony.jpg";
import old9 from "@/assets/trophy-photo.jpg";
import old10 from "@/assets/childhood-photo.jpg";
import old12 from "@/assets/truemedi-prototype.jpg";
import old13 from "@/assets/bdrcs-volunteer.jpg";
import old14 from "@/assets/science-fair-presentation.jpg";
import old15 from "@/assets/robotics-workspace.jpg";
import old16 from "@/assets/startup-summit.jpg";
import old17 from "@/assets/family-childhood.jpg";
import old18 from "@/assets/siblings-swing.jpg";
import old19 from "@/assets/night-selfie.jpg";
import old20 from "@/assets/science-fair-team.jpg";
import old21 from "@/assets/electronics-experiment.jpg";
import old22 from "@/assets/smart-city-model.jpg";
import old23 from "@/assets/aquaguard-device.jpg";
import old25 from "@/assets/robot-car-selfie.jpg";
import old26 from "@/assets/club-activity.jpg";
import old30 from "@/assets/IMG_0329.jpg";
import old31 from "@/assets/IMG_2826.jpg";
import old32 from "@/assets/IMG_3143.JPG";
import old34 from "@/assets/IMG_4720_Original.jpg";
import old35 from "@/assets/IMG_C1E7806B13C8-1.jpeg";
import old36 from "@/assets/IMG_EB5A4AB44D0A-1.jpeg";
import old37 from "@/assets/gallery-extra-1.png";
import old38 from "@/assets/gallery-extra-2.png";
import old39 from "@/assets/gallery-extra-3.png";
import old40 from "@/assets/gallery-extra-4.png";
import old41 from "@/assets/gallery-extra-5.png";
import old42 from "@/assets/gallery-extra-6.png";
import old43 from "@/assets/gallery-extra-7.png";
import old44 from "@/assets/gallery-extra-8.png";
import old45 from "@/assets/gallery-extra-9.png";
import old46 from "@/assets/gallery-extra-10.png";
import old47 from "@/assets/gallery-extra-11.png";
import old48 from "@/assets/gallery-extra-12.png";
import old49 from "@/assets/gallery-extra-13.png";
import old50 from "@/assets/gallery-extra-14.png";
import old51 from "@/assets/gallery-extra-15.png";
import old52 from "@/assets/gallery-extra-16.png";
import old53 from "@/assets/gallery-extra-17.png";
import old54 from "@/assets/gallery-extra-18.png";
import old55 from "@/assets/gallery-extra-19.png";
import old56 from "@/assets/gallery-extra-20.png";
import old57 from "@/assets/gallery-extra-21.png";

import new1 from "@/assets/MAHIM GTCSC SEMINAR 1.png";
import new2 from "@/assets/science-festival.jpg";
import new4 from "@/assets/image copy 4.png";
import new5 from "@/assets/image copy 5.png";
import new6 from "@/assets/image copy 6.png";
import new7 from "@/assets/image copy 7.png";
import new8 from "@/assets/image copy 8.png";
import new9 from "@/assets/image copy 9.png";
import new10 from "@/assets/image copy 10.png";
import new11 from "@/assets/image copy 11.png";

export type GalleryImage = {
  src: string;
  alt: string;
};

export const galleryImages: GalleryImage[] = [
  { src: "/images/mahim-gtcsc-c5.png", alt: "MAHIM GTCSC C5" },
  { src: "/images/gallery-extra-22.png", alt: "Art Gallery Photo" },
  { src: old2, alt: "About Photo" },
  { src: old3, alt: "Electronics Development" },
  { src: old4, alt: "Team Collaboration" },
  { src: old5, alt: "HydroVer Prototype" },
  { src: old6, alt: "HydroVer Electronics" },
  { src: old7, alt: "Robot Car Project" },
  { src: old8, alt: "Award Ceremony" },
  { src: old9, alt: "Trophy Achievement" },
  { src: old10, alt: "Childhood Photo" },
  { src: old12, alt: "TrueMedi Prototype" },
  { src: old13, alt: "BDRCS Volunteer" },
  { src: old14, alt: "Science Fair Presentation" },
  { src: old15, alt: "Robotics Workspace" },
  { src: old16, alt: "Startup Summit" },
  { src: old17, alt: "Family Childhood" },
  { src: old18, alt: "Siblings on Swing" },
  { src: old19, alt: "Night Selfie" },
  { src: old20, alt: "Science Fair Team" },
  { src: old21, alt: "Electronics Experiment" },
  { src: old22, alt: "Smart City Model" },
  { src: old23, alt: "AquaGuard Device" },
  { src: old25, alt: "Robot Car Selfie" },
  { src: old26, alt: "Club Activity" },
  { src: old30, alt: "Photo 1" },
  { src: old31, alt: "Photo 2" },
  { src: old32, alt: "Photo 3" },
  { src: old34, alt: "Photo 4" },
  { src: old35, alt: "Photo 6" },
  { src: old36, alt: "Photo 7" },
  { src: old37, alt: "Extra Photo 1" },
  { src: old38, alt: "Extra Photo 2" },
  { src: old39, alt: "Extra Photo 3" },
  { src: old40, alt: "Extra Photo 4" },
  { src: old41, alt: "Extra Photo 5" },
  { src: old42, alt: "Extra Photo 6" },
  { src: old43, alt: "Extra Photo 7" },
  { src: old44, alt: "Extra Photo 8" },
  { src: old45, alt: "Extra Photo 9" },
  { src: old46, alt: "Extra Photo 10" },
  { src: old47, alt: "Extra Photo 11" },
  { src: old48, alt: "Extra Photo 12" },
  { src: old49, alt: "Extra Photo 13" },
  { src: old50, alt: "Extra Photo 14" },
  { src: old52, alt: "Extra Photo 16" },
  { src: old53, alt: "Extra Photo 17" },
  { src: old54, alt: "Extra Photo 18" },
  { src: old55, alt: "Extra Photo 19" },
  { src: old56, alt: "Extra Photo 20" },
  { src: old57, alt: "Extra Photo 21" },
  { src: new1, alt: "MAHIM GTCSC Seminar 1" },
  { src: new2, alt: "Science Festival" },
  { src: new4, alt: "Image Copy 4" },
  { src: new5, alt: "Image Copy 5" },
  { src: new6, alt: "Image Copy 6" },
  { src: new7, alt: "Image Copy 7" },
  { src: new8, alt: "Image Copy 8" },
  { src: new9, alt: "Image Copy 9" },
  { src: new10, alt: "Image Copy 10" },
  { src: new11, alt: "Image Copy 11" },
];
