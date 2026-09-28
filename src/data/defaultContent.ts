import { galleryImages } from "./galleryImages";
import type { Achievement, BlogPost, Certificate, Education, Experience, GalleryItem, Project, SiteSettings, Skill } from "@/lib/types";

const projects = [
  ["TagWraps", "tagwraps", "Tamper-Evident NFC Packaging & Real-Time Product Verification Platform", "TagWraps provides tamper-evident packaging integrated with high-security NFC tags and cryptographic verification to eliminate counterfeit goods.", "/assets/truemedi-prototype.jpg", "/assets/about-photo.jpg", "Hardware & Cryptographic Packaging", ["NTAG 424 DNA / PN532", "AES Cryptography", "Node.js", "React"]],
  ["HydroVer", "hydrover", "Smart Water Pollution Monitoring & Autonomous Sampling Surface Vehicle", "An IoT-enabled surface vehicle designed to collect water samples and measure quality metrics in real time.", "/assets/hydrover-prototype.jpg", "/assets/hydrover-electronics.jpg", "Environmental Robotics & IoT", ["Arduino Nano", "NRF24L01", "pH Sensor", "Turbidity"]],
  ["TrueMedi", "truemedi", "Anti-Counterfeit Pharmaceutical Verification Platform", "Encrypted NFC tags on pharmaceutical packaging allow instant verification of medicine authenticity.", "/assets/truemedi-prototype.jpg", "/assets/electronics-experiment.jpg", "Healthcare & Cryptographic Security", ["PN532 NFC", "Arduino", "AES-128"]],
  ["AquaGuard", "aquaguard", "Continuous Real-Time IoT Water Quality Telemetry System", "A compact IoT device engineered for continuous water quality monitoring.", "/assets/aquaguard-device.jpg", null, "Environmental IoT & Hardware", ["ESP8266", "Water Quality Sensors", "Cloud Telemetry"]],
  ["Autonomous Robot Car", "robot-car", "4WD Obstacle Avoiding Autonomous Rover", "A custom rover that maps obstacles and executes real-time collision evasion maneuvers.", "/assets/robot-car.jpg", "/assets/robot-car-selfie.jpg", "Autonomous Robotics", ["Arduino Uno", "HC-SR04", "L298N"]],
  ["Smart City Infrastructure Model", "smart-city", "Integrated Urban Automation & Environmental Sensing System", "A scale model demonstrating interconnected smart city systems and sustainable automation.", "/assets/smart-city-model.jpg", null, "Smart Grid & Automation", ["ESP8266", "Sensors", "Relay Control"]],
  ["AEYE Edge Vision", "a-eye", "Automatic Highway Accident Detection & Emergency Dispatch System", "A low-latency computer vision system that detects collisions and alerts emergency services.", "/assets/electronics-experiment.jpg", null, "Computer Vision & Edge AI", ["ESP32-CAM", "OpenCV", "Python", "TensorFlow Lite"]],
  ["NutriDrip", "nutridrip", "Smart Automated Plant Irrigation & Soil NPK Adjustment System", "Automated precision irrigation and nutrient dosing based on live soil sensor readings.", "/assets/smart-city-model.jpg", null, "AgriTech & Smart Farming", ["ESP8266", "NPK Sensors", "IoT"]],
] as const;

export const defaultProjects: Project[] = projects.map(([name, slug, description, detail, image, secondary, category, technologies], index) => ({
  id: `seed-project-${slug}`, name, slug, short_description: description, long_description: detail, thumbnail_url: image,
  gallery_urls: secondary ? [image, secondary] : [image], technologies: [...technologies], github_url: null,
  live_url: slug === "tagwraps" ? "https://tagwraps.vercel.app/" : null, demo_url: null, category, project_date: null,
  featured: index < 5, status: "published", sort_order: index, metadata: slug === "tagwraps" ? { whitepaper_url: "/TagWraps_Whitepaper.pdf" } : {},
}));

const awards = [
  ["Silver Award", "The Queen's Commonwealth Essay Competition 2025", "The Royal Commonwealth Society", "/assets/qcec-silver-certificate.jpg"],
  ["Champion", "NextGen BD Festival, Green University of Bangladesh", "Green University of Bangladesh", null],
  ["Champion", "UIU CSE FEST 2025 — ICT Olympiad", "United International University", null],
  ["Champion", "DRMC Math Summit", "Dhaka Residential Model College", null],
  ["5th Place", "EWU NatEcon Startup Catalyst", "East West University", null],
  ["National Rank 9th", "46th National Science and Technology Fest", "Government of Bangladesh", null],
  ["National Rank 13th", "45th National Science and Technology Fest", "Government of Bangladesh", null],
];

export const defaultCertificates: Certificate[] = [{
  id: "seed-certificate-qcec",
  title: "QCEC 2025 Silver Award Certificate",
  file_url: "/assets/qcec-silver-certificate.jpg",
  file_type: "image",
  issuer: "The Royal Commonwealth Society",
  issued_at: "2025-01-01",
  sort_order: 0,
}];

export const defaultAchievements: Achievement[] = awards.map(([title, description, organization, image], index) => ({
  id: `seed-achievement-${index + 1}`,
  title: title as string,
  short_description: description as string,
  full_description: description as string,
  organization: organization as string,
  achievement_date: null,
  category: index < 5 ? "Award" : "National ranking",
  image_url: image as string | null,
  external_url: index === 0 ? "/essays/qcec" : null,
  featured: index < 5,
  status: "published",
  certificate_id: index === 0 ? "seed-certificate-qcec" : null,
  certificate: index === 0 ? defaultCertificates[0] : null,
  sort_order: index,
}));

export const defaultExperiences: Experience[] = [
  ["Founder & Lead Developer", "TagWraps — Product Authenticity Startup", "Independently developing a cryptographic NFC verification system to combat counterfeit consumer goods across Bangladeshi supply chains.", "2026-01-01", null, true, "https://tagwraps.vercel.app/"],
  ["Lead Developer & Technical Architect", "Scholars Cafe", "Built the platform from scratch and coordinate the intern technical team, code review and platform operations.", "2026-01-01", null, true, "https://www.scholarscafe.com/"],
  ["Graphic Design Intern", "Scholars Cafe", "Produced visual communications and promotional materials aligned with brand guidelines.", "2025-04-01", "2025-12-01", false, null],
  ["President, Science Club", "Government Tolaram College", "Directed a student-led science and technology club and organized workshops and outreach initiatives.", "2025-05-01", "2026-05-01", false, null],
  ["RCY Volunteer, ICT Department", "Bangladesh Red Crescent Youth", "Coordinate digital communication during emergency response and climate adaptation programs.", "2024-05-01", null, true, null],
].map(([position, company, description, start, end, current, url], index) => ({
  id: `seed-experience-${index + 1}`,
  position: position as string,
  company: company as string,
  description: description as string,
  start_date: start as string,
  end_date: end as string | null,
  current: current as boolean,
  technologies: [],
  external_url: url as string | null,
  sort_order: index,
}));

export const defaultEducation: Education[] = [];

export const defaultSkills: Skill[] = ["Arduino & Embedded C++", "IoT systems", "Robotics", "React", "Hardware prototyping", "Computer vision"].map((name, index) => ({
  id: `seed-skill-${index + 1}`,
  name,
  category: index < 3 ? "Engineering" : "Software",
  level: null,
  sort_order: index,
}));

export const defaultGallery: GalleryItem[] = galleryImages.map((image, index) => ({
  id: `seed-gallery-${index + 1}`,
  title: null,
  caption: null,
  description: null,
  alt_text: image.alt === "Gallery photo" ? `Mahimmiraj portfolio photo ${index + 1}` : image.alt,
  category: null,
  image_url: image.fullSrc,
  thumbnail_url: image.src,
  featured: index < 6,
  visible: true,
  sort_order: index,
}));

export const defaultPosts: BlogPost[] = [];

export const defaultSettings: SiteSettings = {
  id: "main",
  name: "M. Mahimmiraj",
  short_bio: "Building TagWraps: secure NFC packaging that helps people identify genuine products.",
  about_content: "I'm Mahim from Narayanganj, Bangladesh, a technology enthusiast driven by curiosity and a passion for creating positive change through innovation. I have been fascinated by machines since childhood and want to establish a robotics and automation company in Bangladesh.",
  profile_image_url: "/assets/new-profile.jpg",
  email: "mahimmiraj@outlook.com",
  phone: "+880 1410 669641",
  location: "Narayanganj, Bangladesh",
  social_links: {
    github: "https://github.com/mirajulislam1292",
    linkedin: "https://www.linkedin.com/in/mahimmiraj1292/",
    facebook: "https://www.facebook.com/mahimmiraj1292",
    instagram: "https://www.instagram.com/mahimmiraj1292",
  },
  seo_title: "M. Mahimmiraj — Engineer, Builder & Founder",
  seo_description: "Portfolio of M. Mahimmiraj: engineering, robotics, IoT, product authentication and technical writing.",
  footer_text: "Built with curiosity in Narayanganj, Bangladesh.",
};

export const fallbackCollections = {
  projects: defaultProjects,
  achievements: defaultAchievements,
  certificates: defaultCertificates,
  blog_posts: defaultPosts,
  gallery_items: defaultGallery,
  experiences: defaultExperiences,
  education: defaultEducation,
  skills: defaultSkills,
};
