export type ContentStatus = "draft" | "published" | "hidden";

export interface BaseRecord {
  id: string;
  created_at?: string;
  updated_at?: string;
  sort_order: number;
}

export interface Project extends BaseRecord {
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  thumbnail_url: string | null;
  gallery_urls: string[];
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  demo_url: string | null;
  category: string;
  project_date: string | null;
  featured: boolean;
  status: ContentStatus;
  metadata: Record<string, unknown>;
}

export interface Certificate extends BaseRecord {
  title: string;
  file_url: string;
  file_type: "image" | "pdf" | "external";
  issuer: string | null;
  issued_at: string | null;
}

export interface Achievement extends BaseRecord {
  title: string;
  short_description: string;
  full_description: string;
  organization: string | null;
  achievement_date: string | null;
  category: string;
  image_url: string | null;
  external_url: string | null;
  featured: boolean;
  status: ContentStatus;
  certificate_id: string | null;
  certificate?: Certificate | null;
}

export interface BlogPost extends BaseRecord {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  author: string;
  category: string;
  tags: string[];
  published_at: string | null;
  featured: boolean;
  status: "draft" | "published";
  seo_title: string | null;
  seo_description: string | null;
  social_image_url: string | null;
}

export interface GalleryItem extends BaseRecord {
  title: string | null;
  caption: string | null;
  description: string | null;
  alt_text: string;
  category: string | null;
  image_url: string;
  thumbnail_url: string;
  featured: boolean;
  visible: boolean;
}

export interface Experience extends BaseRecord {
  position: string;
  company: string;
  description: string;
  start_date: string | null;
  end_date: string | null;
  current: boolean;
  technologies: string[];
  external_url: string | null;
}

export interface Education extends BaseRecord {
  institution: string;
  degree: string;
  field: string | null;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
}

export interface Skill extends BaseRecord {
  name: string;
  category: string;
  level: string | null;
}

export interface SiteSettings {
  id: string;
  name: string;
  short_bio: string;
  about_content: string;
  profile_image_url: string | null;
  email: string;
  phone: string | null;
  location: string | null;
  social_links: Record<string, string>;
  seo_title: string;
  seo_description: string;
  footer_text: string;
  updated_at?: string;
}

export type CollectionName =
  | "projects"
  | "achievements"
  | "certificates"
  | "blog_posts"
  | "gallery_items"
  | "experiences"
  | "education"
  | "skills";

export type CmsRecord = Project | Achievement | Certificate | BlogPost | GalleryItem | Experience | Education | Skill;

export interface AnalyticsBreakdown {
  label: string;
  count: number;
}

export interface VisitorAnalytics {
  total_visits: number;
  unique_visitors: number;
  today_visits: number;
  week_visits: number;
  month_visits: number;
  top_pages: AnalyticsBreakdown[];
  devices: AnalyticsBreakdown[];
  browsers: AnalyticsBreakdown[];
  operating_systems: AnalyticsBreakdown[];
  countries: AnalyticsBreakdown[];
}

export interface VisitorProfile {
  id: string;
  ip_address: string;
  first_visit_at: string;
  last_visit_at: string;
  visit_count: number;
  browser: string | null;
  operating_system: string | null;
  device_type: string | null;
  country_code: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  network_name: string | null;
  asn: string | null;
  geo_updated_at: string | null;
}

export interface VisitorEvent {
  id: number;
  visitor_id: string;
  visited_at: string;
  path: string;
  referrer: string | null;
  user_agent: string | null;
  browser: string | null;
  operating_system: string | null;
  device_type: string | null;
}

export interface InboundMessage {
  id: string;
  message_type: "anonymous" | "contact";
  name: string | null;
  email: string | null;
  subject: string | null;
  message: string;
  ip_address: string;
  country_code: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  user_agent: string | null;
  status: "new" | "read" | "archived";
  read_at: string | null;
  created_at: string;
  updated_at: string;
}
