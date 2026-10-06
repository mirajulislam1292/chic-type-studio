import { galleryImages } from "./galleryImages";
import type { Achievement, BlogPost, Certificate, Education, Experience, GalleryItem, Project, SiteSettings, Skill } from "@/lib/types";

const projects = [
  ["TagWraps", "tagwraps", "An innovative packaging system using NFC technology to protect the authenticity of a product through a secured cryptographic encryption method, helping the public buy and identify genuine products.", "In Bangladesh and across South Asia, counterfeit medicines, fake cosmetics, and fraudulent goods cause real harm to real people every day. I built TagWraps to solve that with something simple and affordable.\n\nTagWraps is a smart NFC authentication tag embedded in a product wrapper. Each chip is cryptographically locked and registered in a cloud database. When a customer taps the tag with their smartphone, the system verifies the product as genuine or flags it as fake in real time. No app required. No special scanner. Just a phone tap.\n\nThe cost per tag is 5 to 10 taka. The protection it provides is priceless.", "/assets/truemedi-prototype.jpg", "/assets/about-photo.jpg", "Hardware & Cryptographic Packaging", ["NFC Tag Type-4", "AES Cryptography", "Anti-Counterfeit", "Hardware Security"]],
  ["HydroVer", "hydrover", "Smart water pollution monitoring system with remote controlled surface vehicle for water sampling and chemical treatment.", "Water pollution and ineffective monitoring of water bodies are pressing issues in Bangladesh and across the world. To address these challenges, I developed HydroVer, a multi-functional remotely controlled water surface vehicle designed for environmental monitoring, water sampling, chemical treatment, and emergency assistance applications.", "/assets/hydrover-prototype.jpg", "/assets/hydrover-electronics.jpg", "Environmental Robotics & IoT", ["Arduino Nano", "NRF24L01", "IoT", "Environmental"]],
  ["TrueMedi", "truemedi", "Fake medicine detection system using NFC technology and encrypted hash codes to verify medicine authenticity.", "Counterfeit medicines pose a critical threat to public health globally, especially in developing countries like Bangladesh. TrueMedi is an innovative, affordable, and accessible fake medicine detection system developed using Arduino technology and NFC modules.", "/assets/truemedi-prototype.jpg", "/assets/electronics-experiment.jpg", "Healthcare & Cryptographic Security", ["PN532 NFC", "Arduino", "Healthcare", "Security"]],
  ["AEYE", "a-eye", "Automatic accident detection system using OpenCV and ESP32-CAM achieving 92% accuracy for highway monitoring.", "AEYE is an automatic accident detection system integrated with OpenCV for situation detection. I developed a scaled-down version of this system using an ESP32-CAM module for detecting certain accidents, achieving 92% accuracy in accident detection.", "/assets/electronics-experiment.jpg", null, "Computer Vision & Edge AI", ["ESP32-CAM", "OpenCV", "Computer Vision", "Safety"]],
  ["NutriDrip", "nutridrip", "Automatic plant irrigation and NPK adjustment system with IoT connectivity for remote monitoring and smart watering.", "NutriDrip is an automatic plant irrigation and NPK adjustment system with IoT connectivity for remote monitoring and smart watering.", "/assets/smart-city-model.jpg", null, "AgriTech & Smart Farming", ["ESP8266", "IoT", "Agriculture", "Mobile App"]],
] as const;

export const defaultProjects: Project[] = projects.map(([name, slug, description, detail, image, secondary, category, technologies], index) => ({
  id: `seed-project-${slug}`, name, slug, short_description: description, long_description: detail, thumbnail_url: image,
  gallery_urls: secondary ? [image, secondary] : [image], technologies: [...technologies], github_url: null,
  live_url: slug === "tagwraps" ? "https://tagwraps.vercel.app/" : null, demo_url: null, category, project_date: null,
  featured: index < 5, status: "published", sort_order: index, metadata: slug === "tagwraps" ? { whitepaper_url: "/TagWraps_Whitepaper.pdf" } : {},
}));

const achievements = [
  ["Silver Award", "The Queen's Commonwealth Essay Competition 2025", "Major Awards & Championships"],
  ["Champion", "NextGen BD Festival, Green University of Bangladesh", "Major Awards & Championships"],
  ["Champion", "UIU CSE FEST 2025 (ICT Olympiad)", "Major Awards & Championships"],
  ["Champion", "DRMC Math Summit", "Major Awards & Championships"],
  ["5th Place", "EWU NatEcon Startup Catalyst", "Major Awards & Championships"],
  ["President, Govt. Tolaram College Science Club (2024-2025)", "", "Leadership & Organizational Roles"],
  ["Youth Volunteer (ICT Dept.), Bangladesh Red Crescent Society (BDRCS), Narayanganj Unit", "", "Leadership & Organizational Roles"],
  ["Member, Team Atlas (Robotics)", "", "Leadership & Organizational Roles"],
  ["District Champion & National Rank 9th, 46th National Science and Technology Fest", "", "National & District Rankings"],
  ["District Champion & National Rank 13th, 45th National Science and Technology Fest", "", "National & District Rankings"],
  ["District Champion, Bangladesh Wildlife Olympiad (Narayanganj)", "", "National & District Rankings"],
  ["7th Place, Ibn Al-Haytham Science Fest 2024", "", "National & District Rankings"],
  ["9th Place, Al-Khwarizmi Science Fest 2025", "", "National & District Rankings"],
  ["Bangladesh Mathematical Olympiad (BdMO)", "", "Olympiad Finalist & Participation"],
  ["Bangladesh Physics Olympiad (BdPhO)", "", "Olympiad Finalist & Participation"],
  ["Bangladesh Robotics Olympiad (BdRO)", "", "Olympiad Finalist & Participation"],
  ["Bangladesh Artificial Intelligence Olympiad (BdAiO)", "", "Olympiad Finalist & Participation"],
  ["Bangladesh Wildlife Olympiad", "", "Olympiad Finalist & Participation"],
  ["Bangladesh English Olympiad", "", "Olympiad Finalist & Participation"],
  ["Bangladesh Environmental Olympiad", "", "Olympiad Finalist & Participation"],
  ["National Earth Olympiad", "", "Olympiad Finalist & Participation"],
  ["Basic to Advanced Robotics, Team Atlas", "", "Technical Training & Certifications"],
  ["ML Data Handling & Image Recognition, Team Atlas", "", "Technical Training & Certifications"],
  ["Computer 101, Govt. Tolaram College (Grade: A+)", "", "Technical Training & Certifications"],
  ["Cyber Hygiene, The Asia Foundation & Sajeda Foundation", "", "Technical Training & Certifications"],
  ["Green Day Training (GDT), Bangladesh Youth Environmental Initiative (BYEI)", "", "Technical Training & Certifications"],
  ["AAA Training, Bangladesh Red Crescent Society (BDRCS)", "", "Technical Training & Certifications"],
  ["MIS & Data Management, BDRCS", "", "Technical Training & Certifications"],
  ["ICRC & Standard Volunteering, BDRCS", "", "Technical Training & Certifications"],
  ["Art of Problem Definition, Passport to Earning (P2E) Bangladesh", "", "Technical Training & Certifications"],
] as const;

export const defaultCertificates: Certificate[] = [{
  id: "seed-certificate-qcec",
  title: "QCEC 2025 Silver Award Certificate",
  file_url: "/assets/qcec-silver-certificate.jpg",
  file_type: "image",
  issuer: "The Royal Commonwealth Society",
  issued_at: "2025-01-01",
  sort_order: 0,
}];

export const defaultAchievements: Achievement[] = achievements.map(([title, description, category], index) => ({
  id: `seed-achievement-${index + 1}`,
  title: title as string,
  short_description: description as string,
  full_description: description as string,
  organization: index === 0 ? "The Royal Commonwealth Society" : null,
  achievement_date: null,
  category,
  image_url: index === 0 ? "/assets/qcec-silver-certificate.jpg" : null,
  external_url: index === 0 ? "/essays/qcec" : null,
  featured: index < 5,
  status: "published",
  certificate_id: index === 0 ? "seed-certificate-qcec" : null,
  certificate: index === 0 ? defaultCertificates[0] : null,
  sort_order: index,
}));

export const defaultExperiences: Experience[] = [
  ["Founder & Lead Developer", "TagWraps - Product Authenticity Startup", "Independently developing a blockchain-integrated verification system to combat counterfeit consumer goods across Bangladeshi supply chains.\nSole developer responsible for architecture, backend API design, and real-time product authentication features.", "2026-01-01", null, true, "https://tagwraps.vercel.app/"],
  ["Lead Developer & Technical Architect", "Scholars Cafe - Student Consulting Platform", "Built the entire Scholars Cafe platform from scratch as the primary developer and technical architect behind the website.\nEngineered frontend interfaces, backend services, responsive design, and deployment pipelines from the ground up.\nCoordinating the intern technical team, conducting code reviews, and maintaining platform operations that empower students with EPT, SAT prep, university applications, and scholarship pathways.", "2026-01-01", null, true, "https://www.scholarscafe.com/"],
  ["Graphic Design Intern", "Scholars Cafe", "Produced visual communications and promotional materials aligned with brand guidelines and audience engagement objectives.", "2025-04-01", "2025-12-01", false, null],
  ["President, Science Club (GTCSC) - EC 2024-2025", "Government Tolaram College, Narayanganj", "Directed a student-led science and technology club; organized seminars, inter-college workshops, and outreach initiatives.\nManaged a committee to execute events promoting STEM education across the district.", "2025-05-01", "2026-05-01", false, null],
  ["RCY Volunteer, ICT Department", "Bangladesh Red Crescent Youth, Narayanganj Unit", "Coordinated digital communication during emergency response operations.\nContributed to climate adaptation programs and participated in multiple national environmental training initiatives.", "2024-05-01", null, true, null],
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
  short_bio: "Currently developing TagWraps, an innovative packaging system using NFC technology to protect the authenticity of a product through a secured cryptographic encryption method, helping the public buy and identify genuine products.",
  about_content: "I'm Mahim from Narayanganj, Bangladesh, a technology enthusiast driven by curiosity and a passion for creating positive change through innovation.\n\nI am a lifelong student who is always seeking knowledge. I enjoy learning from everyone, from younger individuals with fresh ideas to senior professionals with years of experience. From the beginning of my childhood, I have been fascinated by machines and constantly wondered how things work. I developed a unique hobby of taking apart electronic devices to explore their internal components and understand their functions.\n\nThrough attending various events and gaining hands-on experience with innovative engineering projects, I realized that there is a significant gap in automation and robotics development in my country. Being the son of a businessman, I have developed a vision to establish a robotics and automation company in Bangladesh.",
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
  seo_title: "M. Mahimmiraj — Builder & Innovator",
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
