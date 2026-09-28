create extension if not exists pgcrypto;

create type public.content_status as enum ('draft', 'published', 'hidden');
create type public.certificate_file_type as enum ('image', 'pdf', 'external');

create table public.certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 160),
  file_url text not null,
  file_type public.certificate_file_type not null default 'external',
  issuer text,
  issued_at date,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  short_description text not null default '',
  long_description text not null default '',
  thumbnail_url text,
  gallery_urls text[] not null default '{}',
  technologies text[] not null default '{}',
  github_url text,
  live_url text,
  demo_url text,
  category text not null default '',
  project_date date,
  featured boolean not null default false,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 160),
  short_description text not null default '',
  full_description text not null default '',
  organization text,
  achievement_date date,
  category text not null default '',
  image_url text,
  external_url text,
  featured boolean not null default false,
  status public.content_status not null default 'draft',
  certificate_id uuid references public.certificates(id) on delete set null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  created_at timestamptz not null default now()
);

create table public.blog_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  created_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 200),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  excerpt text not null default '',
  content text not null default '',
  cover_image_url text,
  author text not null default 'M. Mahimmiraj',
  category text not null default 'Engineering',
  tags text[] not null default '{}',
  published_at timestamptz,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  seo_title text,
  seo_description text,
  social_image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_post_tags (
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  tag_id uuid not null references public.blog_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  caption text,
  description text,
  alt_text text not null check (char_length(alt_text) between 1 and 240),
  category text,
  image_url text not null,
  thumbnail_url text not null,
  featured boolean not null default false,
  visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  position text not null,
  company text not null,
  description text not null default '',
  start_date date,
  end_date date,
  current boolean not null default false,
  technologies text[] not null default '{}',
  external_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create table public.education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  degree text not null,
  field text,
  description text,
  start_date date,
  end_date date,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'General',
  level text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  id text primary key default 'main' check (id = 'main'),
  name text not null,
  short_bio text not null default '',
  about_content text not null default '',
  profile_image_url text,
  email text not null,
  phone text,
  location text,
  social_links jsonb not null default '{}'::jsonb,
  seo_title text not null,
  seo_description text not null,
  footer_text text not null default '',
  updated_at timestamptz not null default now()
);

create index projects_public_order_idx on public.projects (status, featured desc, sort_order);
create index achievements_public_order_idx on public.achievements (status, featured desc, sort_order);
create index blog_posts_publication_idx on public.blog_posts (status, published_at desc);
create index blog_posts_category_idx on public.blog_posts (category, status, published_at desc);
create index gallery_items_public_order_idx on public.gallery_items (visible, sort_order);
create index experiences_order_idx on public.experiences (sort_order);
create index education_order_idx on public.education (sort_order);
create index skills_category_order_idx on public.skills (category, sort_order);

create function public.set_updated_at() returns trigger
language plpgsql
set search_path = ''
as $$ begin new.updated_at = now(); return new; end; $$;

create trigger projects_updated_at before update on public.projects for each row execute function public.set_updated_at();
create trigger achievements_updated_at before update on public.achievements for each row execute function public.set_updated_at();
create trigger certificates_updated_at before update on public.certificates for each row execute function public.set_updated_at();
create trigger blog_posts_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();
create trigger gallery_items_updated_at before update on public.gallery_items for each row execute function public.set_updated_at();
create trigger experiences_updated_at before update on public.experiences for each row execute function public.set_updated_at();
create trigger education_updated_at before update on public.education for each row execute function public.set_updated_at();
create trigger skills_updated_at before update on public.skills for each row execute function public.set_updated_at();
create trigger site_settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.achievements enable row level security;
alter table public.certificates enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_tags enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_post_tags enable row level security;
alter table public.gallery_items enable row level security;
alter table public.experiences enable row level security;
alter table public.education enable row level security;
alter table public.skills enable row level security;
alter table public.site_settings enable row level security;

revoke all on all tables in schema public from anon, authenticated;
grant select on public.projects, public.achievements, public.certificates, public.blog_categories, public.blog_tags, public.blog_posts, public.blog_post_tags, public.gallery_items, public.experiences, public.education, public.skills, public.site_settings to anon;
grant select, insert, update, delete on public.projects, public.achievements, public.certificates, public.blog_categories, public.blog_tags, public.blog_posts, public.blog_post_tags, public.gallery_items, public.experiences, public.education, public.skills, public.site_settings to authenticated;

create policy "public reads published projects" on public.projects for select to anon, authenticated using (status = 'published' or (select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "public reads published achievements" on public.achievements for select to anon, authenticated using (status = 'published' or (select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "public reads linked certificates" on public.certificates for select to anon, authenticated using (exists (select 1 from public.achievements a where a.certificate_id = certificates.id and a.status = 'published') or (select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "public reads categories" on public.blog_categories for select to anon, authenticated using (true);
create policy "public reads tags" on public.blog_tags for select to anon, authenticated using (true);
create policy "public reads published posts" on public.blog_posts for select to anon, authenticated using (status = 'published' or (select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "public reads published post tags" on public.blog_post_tags for select to anon, authenticated using (exists (select 1 from public.blog_posts p where p.id = post_id and p.status = 'published') or (select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "public reads visible gallery" on public.gallery_items for select to anon, authenticated using (visible or (select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "public reads experience" on public.experiences for select to anon, authenticated using (true);
create policy "public reads education" on public.education for select to anon, authenticated using (true);
create policy "public reads skills" on public.skills for select to anon, authenticated using (true);
create policy "public reads settings" on public.site_settings for select to anon, authenticated using (true);

do $$
declare table_name text;
begin
  foreach table_name in array array['projects','achievements','certificates','blog_categories','blog_tags','blog_posts','blog_post_tags','gallery_items','experiences','education','skills','site_settings']
  loop
    execute format('create policy "admins insert %1$s" on public.%1$I for insert to authenticated with check ((select auth.jwt()->''app_metadata''->>''role'') = ''admin'')', table_name);
    execute format('create policy "admins update %1$s" on public.%1$I for update to authenticated using ((select auth.jwt()->''app_metadata''->>''role'') = ''admin'') with check ((select auth.jwt()->''app_metadata''->>''role'') = ''admin'')', table_name);
    execute format('create policy "admins delete %1$s" on public.%1$I for delete to authenticated using ((select auth.jwt()->''app_metadata''->>''role'') = ''admin'')', table_name);
  end loop;
end $$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-media', 'portfolio-media', true, 10485760, array['image/jpeg','image/png','image/webp','image/avif','image/gif','application/pdf'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "admins upload portfolio media" on storage.objects for insert to authenticated with check (bucket_id = 'portfolio-media' and (select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "admins update portfolio media" on storage.objects for update to authenticated using (bucket_id = 'portfolio-media' and (select auth.jwt()->'app_metadata'->>'role') = 'admin') with check (bucket_id = 'portfolio-media' and (select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "admins delete portfolio media" on storage.objects for delete to authenticated using (bucket_id = 'portfolio-media' and (select auth.jwt()->'app_metadata'->>'role') = 'admin');

insert into public.site_settings (id, name, short_bio, about_content, profile_image_url, email, phone, location, social_links, seo_title, seo_description, footer_text)
values ('main', 'M. Mahimmiraj', 'Building TagWraps: secure NFC packaging that helps people identify genuine products.', 'I''m Mahim from Narayanganj, Bangladesh, a technology enthusiast driven by curiosity and a passion for creating positive change through innovation. I have been fascinated by machines since childhood and want to establish a robotics and automation company in Bangladesh.', '/assets/new-profile.jpg', 'mahimmiraj@outlook.com', '+880 1410 669641', 'Narayanganj, Bangladesh', '{"github":"https://github.com/mirajulislam1292","linkedin":"https://www.linkedin.com/in/mahimmiraj1292/","facebook":"https://www.facebook.com/mahimmiraj1292","instagram":"https://www.instagram.com/mahimmiraj1292"}', 'M. Mahimmiraj — Engineer, Builder & Founder', 'Portfolio of M. Mahimmiraj: engineering, robotics, IoT, product authentication and technical writing.', 'Built with curiosity in Narayanganj, Bangladesh.');

insert into public.projects (name, slug, short_description, long_description, thumbnail_url, gallery_urls, technologies, live_url, category, featured, status, sort_order, metadata) values
('TagWraps','tagwraps','Tamper-Evident NFC Packaging & Real-Time Product Verification Platform','TagWraps provides tamper-evident packaging integrated with high-security NFC tags and proprietary cryptographic encryption to eliminate counterfeit goods.','/assets/truemedi-prototype.jpg',array['/assets/truemedi-prototype.jpg','/assets/about-photo.jpg'],array['NTAG 424 DNA / PN532','AES-128 / ECC Cryptography','Node.js','React'],'https://tagwraps.vercel.app/','Hardware & Cryptographic Packaging',true,'published',0,'{"whitepaper_url":"/TagWraps_Whitepaper.pdf"}'),
('HydroVer','hydrover','Smart Water Pollution Monitoring & Autonomous Sampling Surface Vehicle','An IoT-enabled remote controlled surface vehicle designed to collect water samples, measure quality metrics and administer treatments.','/assets/hydrover-prototype.jpg',array['/assets/hydrover-prototype.jpg','/assets/hydrover-electronics.jpg'],array['Arduino Nano','NRF24L01','pH Sensor','Turbidity'],null,'Environmental Robotics & IoT',true,'published',1,'{}'),
('TrueMedi','truemedi','Anti-Counterfeit Pharmaceutical Verification Platform','Encrypted NFC tags on pharmaceutical packaging allow instant verification of medicine authenticity.','/assets/truemedi-prototype.jpg',array['/assets/truemedi-prototype.jpg','/assets/electronics-experiment.jpg'],array['PN532 NFC','Arduino','AES-128'],null,'Healthcare & Cryptographic Security',true,'published',2,'{}'),
('AquaGuard','aquaguard','Continuous Real-Time IoT Water Quality Telemetry System','A compact IoT device engineered for continuous water quality monitoring in rivers, lakes and industrial drainage.','/assets/aquaguard-device.jpg',array['/assets/aquaguard-device.jpg'],array['ESP8266','Water Quality Sensors','Cloud Telemetry'],null,'Environmental IoT & Hardware',true,'published',3,'{}'),
('Autonomous Robot Car','robot-car','4WD Obstacle Avoiding Autonomous Rover','A custom autonomous rover that maps obstacles and executes real-time collision evasion maneuvers.','/assets/robot-car.jpg',array['/assets/robot-car.jpg','/assets/robot-car-selfie.jpg'],array['Arduino Uno','HC-SR04','L298N'],null,'Autonomous Robotics',false,'published',4,'{}'),
('Smart City Infrastructure Model','smart-city','Integrated Urban Automation & Environmental Sensing System','A scale model demonstrating interconnected smart city systems and sustainable automation.','/assets/smart-city-model.jpg',array['/assets/smart-city-model.jpg'],array['ESP8266','Sensors','Relay Control'],null,'Smart Grid & Automation',false,'published',5,'{}'),
('AEYE Edge Vision','a-eye','Automatic Highway Accident Detection & Emergency Dispatch System','A low-latency computer vision system that detects vehicle collisions and alerts emergency services.','/assets/electronics-experiment.jpg',array['/assets/electronics-experiment.jpg'],array['ESP32-CAM','OpenCV','Python','TensorFlow Lite'],null,'Computer Vision & Edge AI',true,'published',6,'{}'),
('NutriDrip','nutridrip','Smart Automated Plant Irrigation & Soil NPK Adjustment System','Automated precision irrigation and nutrient dosing based on live soil sensor readings.','/assets/smart-city-model.jpg',array['/assets/smart-city-model.jpg'],array['ESP8266','NPK Sensors','IoT'],null,'AgriTech & Smart Farming',true,'published',7,'{}');

with certificate as (
  insert into public.certificates (title, file_url, file_type, issuer, issued_at)
  values ('QCEC 2025 Silver Award Certificate','/assets/qcec-silver-certificate.jpg','image','The Royal Commonwealth Society','2025-01-01') returning id
)
insert into public.achievements (title, short_description, full_description, organization, category, image_url, external_url, featured, status, certificate_id, sort_order)
select 'Silver Award','The Queen''s Commonwealth Essay Competition 2025','Silver Award in the senior category of The Queen''s Commonwealth Essay Competition 2025.','The Royal Commonwealth Society','Award','/assets/qcec-silver-certificate.jpg','/essays/qcec',true,'published',id,0 from certificate;

insert into public.achievements (title, short_description, full_description, organization, category, featured, status, sort_order) values
('Champion','NextGen BD Festival, Green University of Bangladesh','Champion at NextGen BD Festival.','Green University of Bangladesh','Award',true,'published',1),
('Champion','UIU CSE FEST 2025 — ICT Olympiad','Champion at UIU CSE FEST 2025 ICT Olympiad.','United International University','Award',true,'published',2),
('Champion','DRMC Math Summit','Champion at the DRMC Math Summit.','Dhaka Residential Model College','Award',true,'published',3),
('5th Place','EWU NatEcon Startup Catalyst','Fifth place at EWU NatEcon Startup Catalyst.','East West University','Award',true,'published',4),
('National Rank 9th','46th National Science and Technology Fest','District Champion and National Rank 9th.','Government of Bangladesh','National ranking',false,'published',5),
('National Rank 13th','45th National Science and Technology Fest','District Champion and National Rank 13th.','Government of Bangladesh','National ranking',false,'published',6);

insert into public.experiences (position, company, description, start_date, end_date, current, external_url, sort_order) values
('Founder & Lead Developer','TagWraps — Product Authenticity Startup','Developing a cryptographic NFC verification system to combat counterfeit consumer goods.','2026-01-01',null,true,'https://tagwraps.vercel.app/',0),
('Lead Developer & Technical Architect','Scholars Cafe','Built the platform and coordinate the technical team, review and operations.','2026-01-01',null,true,'https://www.scholarscafe.com/',1),
('Graphic Design Intern','Scholars Cafe','Produced visual communications and promotional materials aligned with brand guidelines.','2025-04-01','2025-12-01',false,null,2),
('President, Science Club','Government Tolaram College','Directed a student-led science and technology club and organized workshops.','2025-05-01','2026-05-01',false,null,3),
('RCY Volunteer, ICT Department','Bangladesh Red Crescent Youth','Coordinate digital communication during emergency response and climate programs.','2024-05-01',null,true,null,4);

insert into public.skills (name, category, sort_order) values
('Arduino & Embedded C++','Engineering',0),('IoT systems','Engineering',1),('Robotics','Engineering',2),('React','Software',3),('Hardware prototyping','Engineering',4),('Computer vision','Software',5);

with images(path, ord) as (
  select value, ordinality - 1 from unnest(array[
    '16267556-e1ed-4280-b139-10c4b43ef20f.jpg','IMG_0329.jpg','IMG_3143.JPG','IMG_3822.jpg','IMG_3828.jpg','IMG_4569.jpg','IMG_5782_Original.jpg','aquaguard-device.jpg','award-ceremony.jpg','bdrcs-volunteer.jpg','childhood-photo.jpg','club-activity.jpg','dev-workspace.jpg','electronics-experiment.jpg','f3a36a5d-383e-4f1d-9b25-5ce51c37cb5b 2.jpg','family-childhood.jpg','gallery-extra-10.png','gallery-extra-11.png','gallery-extra-12.png','gallery-extra-13.png','gallery-extra-14.png','gallery-extra-15.png','gallery-extra-16.png','gallery-extra-17.png','gallery-extra-19.png','gallery-extra-2.png','gallery-extra-20.png','gallery-extra-21.png','gallery-extra-3.png','gallery-extra-4.png','gallery-extra-5.png','gallery-extra-8.png','gallery-extra-9.png','hydrover-electronics.jpg','hydrover-prototype.jpg','mountain-photo.jpg','new-profile-2.png','night-selfie.jpg','project-electronics.jpg','robot-car-selfie.jpg','robot-car.jpg','robotics-workspace.jpg','science-fair-presentation.jpg','science-fair-team.jpg','science-festival.jpg','siblings-swing.jpg','smart-city-model.jpg','startup-summit.jpg','team-work.jpg','trophy-photo.jpg','truemedi-prototype.jpg'
  ]) with ordinality as t(value, ordinality)
)
insert into public.gallery_items (alt_text, image_url, thumbnail_url, featured, visible, sort_order)
select 'Mahimmiraj portfolio photo ' || (ord + 1), '/assets/' || path, '/assets/gallery-thumbs/' || path, ord < 6, true, ord from images;
