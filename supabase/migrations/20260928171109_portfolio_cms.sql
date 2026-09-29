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
values ('main', 'M. Mahimmiraj', $$Currently developing TagWraps, an innovative packaging system using NFC technology to protect the authenticity of a product through a secured cryptographic encryption method, helping the public buy and identify genuine products.$$, $$I'm Mahim from Narayanganj, Bangladesh, a technology enthusiast driven by curiosity and a passion for creating positive change through innovation.

I am a lifelong student who is always seeking knowledge. I enjoy learning from everyone, from younger individuals with fresh ideas to senior professionals with years of experience. From the beginning of my childhood, I have been fascinated by machines and constantly wondered how things work. I developed a unique hobby of taking apart electronic devices to explore their internal components and understand their functions.

Through attending various events and gaining hands-on experience with innovative engineering projects, I realized that there is a significant gap in automation and robotics development in my country. Being the son of a businessman, I have developed a vision to establish a robotics and automation company in Bangladesh.$$, '/assets/new-profile.jpg', 'mahimmiraj@outlook.com', '+880 1410 669641', 'Narayanganj, Bangladesh', '{"github":"https://github.com/mirajulislam1292","linkedin":"https://www.linkedin.com/in/mahimmiraj1292/","facebook":"https://www.facebook.com/mahimmiraj1292","instagram":"https://www.instagram.com/mahimmiraj1292"}', 'M. Mahimmiraj — Engineer, Builder & Founder', 'Portfolio of M. Mahimmiraj: engineering, robotics, IoT, product authentication and technical writing.', 'Built with curiosity in Narayanganj, Bangladesh.');

insert into public.projects (name, slug, short_description, long_description, thumbnail_url, gallery_urls, technologies, live_url, category, featured, status, sort_order, metadata) values
('TagWraps','tagwraps',$$An innovative packaging system using NFC technology to protect the authenticity of a product through a secured cryptographic encryption method, helping the public buy and identify genuine products.$$, $$In Bangladesh and across South Asia, counterfeit medicines, fake cosmetics, and fraudulent goods cause real harm to real people every day. I built TagWraps to solve that with something simple and affordable.

TagWraps is a smart NFC authentication tag embedded in a product wrapper. Each chip is cryptographically locked and registered in a cloud database. When a customer taps the tag with their smartphone, the system verifies the product as genuine or flags it as fake in real time. No app required. No special scanner. Just a phone tap.

The cost per tag is 5 to 10 taka. The protection it provides is priceless.$$,null,'{}',array['NFC Tag Type-4','AES Cryptography','Anti-Counterfeit','Hardware Security'],'https://tagwraps.vercel.app/','Hardware & Cryptographic Packaging',true,'published',0,'{"whitepaper_url":"/TagWraps_Whitepaper.pdf"}'),
('HydroVer','hydrover','Smart water pollution monitoring system with remote controlled surface vehicle for water sampling and chemical treatment.','Water pollution and ineffective monitoring of water bodies are pressing issues in Bangladesh and across the world. To address these challenges, I developed HydroVer, a multi-functional remotely controlled water surface vehicle designed for environmental monitoring, water sampling, chemical treatment, and emergency assistance applications.',null,'{}',array['Arduino Nano','NRF24L01','IoT','Environmental'],null,'Environmental Robotics & IoT',true,'published',1,'{}'),
('TrueMedi','truemedi','Fake medicine detection system using NFC technology and encrypted hash codes to verify medicine authenticity.','Counterfeit medicines pose a critical threat to public health globally, especially in developing countries like Bangladesh. TrueMedi is an innovative, affordable, and accessible fake medicine detection system developed using Arduino technology and NFC modules.',null,'{}',array['PN532 NFC','Arduino','Healthcare','Security'],null,'Healthcare & Cryptographic Security',true,'published',2,'{}'),
('AEYE','a-eye','Automatic accident detection system using OpenCV and ESP32-CAM achieving 92% accuracy for highway monitoring.','AEYE is an automatic accident detection system integrated with OpenCV for situation detection. I developed a scaled-down version of this system using an ESP32-CAM module for detecting certain accidents, achieving 92% accuracy in accident detection.',null,'{}',array['ESP32-CAM','OpenCV','Computer Vision','Safety'],null,'Computer Vision & Edge AI',true,'published',3,'{}'),
('NutriDrip','nutridrip','Automatic plant irrigation and NPK adjustment system with IoT connectivity for remote monitoring and smart watering.','NutriDrip is an automatic plant irrigation and NPK adjustment system with IoT connectivity for remote monitoring and smart watering.',null,'{}',array['ESP8266','IoT','Agriculture','Mobile App'],null,'AgriTech & Smart Farming',true,'published',4,'{}');

with certificate as (
  insert into public.certificates (title, file_url, file_type, issuer, issued_at)
  values ('QCEC 2025 Silver Award Certificate','/assets/qcec-silver-certificate.jpg','image','The Royal Commonwealth Society','2025-01-01') returning id
)
insert into public.achievements (title, short_description, full_description, organization, category, image_url, external_url, featured, status, certificate_id, sort_order)
select 'Silver Award','The Queen''s Commonwealth Essay Competition 2025','The Queen''s Commonwealth Essay Competition 2025','The Royal Commonwealth Society','Major Awards & Championships','/assets/qcec-silver-certificate.jpg','/essays/qcec',true,'published',id,0 from certificate;

insert into public.achievements (title, short_description, full_description, organization, category, featured, status, sort_order) values
('Champion','NextGen BD Festival, Green University of Bangladesh','NextGen BD Festival, Green University of Bangladesh',null,'Major Awards & Championships',true,'published',1),
('Champion','UIU CSE FEST 2025 (ICT Olympiad)','UIU CSE FEST 2025 (ICT Olympiad)',null,'Major Awards & Championships',true,'published',2),
('Champion','DRMC Math Summit','DRMC Math Summit',null,'Major Awards & Championships',true,'published',3),
('5th Place','EWU NatEcon Startup Catalyst','EWU NatEcon Startup Catalyst',null,'Major Awards & Championships',true,'published',4),
('President, Govt. Tolaram College Science Club (2024-2025)','','',null,'Leadership & Organizational Roles',false,'published',5),
('Youth Volunteer (ICT Dept.), Bangladesh Red Crescent Society (BDRCS), Narayanganj Unit','','',null,'Leadership & Organizational Roles',false,'published',6),
('Member, Team Atlas (Robotics)','','',null,'Leadership & Organizational Roles',false,'published',7),
('District Champion & National Rank 9th, 46th National Science and Technology Fest','','',null,'National & District Rankings',false,'published',8),
('District Champion & National Rank 13th, 45th National Science and Technology Fest','','',null,'National & District Rankings',false,'published',9),
('District Champion, Bangladesh Wildlife Olympiad (Narayanganj)','','',null,'National & District Rankings',false,'published',10),
('7th Place, Ibn Al-Haytham Science Fest 2024','','',null,'National & District Rankings',false,'published',11),
('9th Place, Al-Khwarizmi Science Fest 2025','','',null,'National & District Rankings',false,'published',12),
('Bangladesh Mathematical Olympiad (BdMO)','','',null,'Olympiad Finalist & Participation',false,'published',13),
('Bangladesh Physics Olympiad (BdPhO)','','',null,'Olympiad Finalist & Participation',false,'published',14),
('Bangladesh Robotics Olympiad (BdRO)','','',null,'Olympiad Finalist & Participation',false,'published',15),
('Bangladesh Artificial Intelligence Olympiad (BdAiO)','','',null,'Olympiad Finalist & Participation',false,'published',16),
('Bangladesh Wildlife Olympiad','','',null,'Olympiad Finalist & Participation',false,'published',17),
('Bangladesh English Olympiad','','',null,'Olympiad Finalist & Participation',false,'published',18),
('Bangladesh Environmental Olympiad','','',null,'Olympiad Finalist & Participation',false,'published',19),
('National Earth Olympiad','','',null,'Olympiad Finalist & Participation',false,'published',20),
('Basic to Advanced Robotics, Team Atlas','','',null,'Technical Training & Certifications',false,'published',21),
('ML Data Handling & Image Recognition, Team Atlas','','',null,'Technical Training & Certifications',false,'published',22),
('Computer 101, Govt. Tolaram College (Grade: A+)','','',null,'Technical Training & Certifications',false,'published',23),
('Cyber Hygiene, The Asia Foundation & Sajeda Foundation','','',null,'Technical Training & Certifications',false,'published',24),
('Green Day Training (GDT), Bangladesh Youth Environmental Initiative (BYEI)','','',null,'Technical Training & Certifications',false,'published',25),
('AAA Training, Bangladesh Red Crescent Society (BDRCS)','','',null,'Technical Training & Certifications',false,'published',26),
('MIS & Data Management, BDRCS','','',null,'Technical Training & Certifications',false,'published',27),
('ICRC & Standard Volunteering, BDRCS','','',null,'Technical Training & Certifications',false,'published',28),
('Art of Problem Definition, Passport to Earning (P2E) Bangladesh','','',null,'Technical Training & Certifications',false,'published',29);

insert into public.experiences (position, company, description, start_date, end_date, current, external_url, sort_order) values
('Founder & Lead Developer','TagWraps - Product Authenticity Startup',$$Independently developing a blockchain-integrated verification system to combat counterfeit consumer goods across Bangladeshi supply chains.
Sole developer responsible for architecture, backend API design, and real-time product authentication features.$$,'2026-01-01',null,true,'https://tagwraps.vercel.app/',0),
('Lead Developer & Technical Architect','Scholars Cafe - Student Consulting Platform',$$Built the entire Scholars Cafe platform from scratch as the primary developer and technical architect behind the website.
Engineered frontend interfaces, backend services, responsive design, and deployment pipelines from the ground up.
Coordinating the intern technical team, conducting code reviews, and maintaining platform operations that empower students with EPT, SAT prep, university applications, and scholarship pathways.$$,'2026-01-01',null,true,'https://www.scholarscafe.com/',1),
('Graphic Design Intern','Scholars Cafe','Produced visual communications and promotional materials aligned with brand guidelines and audience engagement objectives.','2025-04-01','2025-12-01',false,null,2),
('President, Science Club (GTCSC) - EC 2024-2025','Government Tolaram College, Narayanganj',$$Directed a student-led science and technology club; organized seminars, inter-college workshops, and outreach initiatives.
Managed a committee to execute events promoting STEM education across the district.$$,'2025-05-01','2026-05-01',false,null,3),
('RCY Volunteer, ICT Department','Bangladesh Red Crescent Youth, Narayanganj Unit',$$Coordinated digital communication during emergency response operations.
Contributed to climate adaptation programs and participated in multiple national environmental training initiatives.$$,'2024-05-01',null,true,null,4);

insert into public.skills (name, category, sort_order) values
('Arduino & Embedded C++','Engineering',0),('IoT systems','Engineering',1),('Robotics','Engineering',2),('React','Software',3),('Hardware prototyping','Engineering',4),('Computer vision','Software',5);

with images(path, ord) as (
  select value, ordinality - 1 from unnest(array[
    '16267556-e1ed-4280-b139-10c4b43ef20f.jpg','IMG_0329.jpg','IMG_3143.JPG','IMG_3822.jpg','IMG_3828.jpg','IMG_4569.jpg','IMG_5782_Original.jpg','aquaguard-device.jpg','award-ceremony.jpg','bdrcs-volunteer.jpg','childhood-photo.jpg','club-activity.jpg','dev-workspace.jpg','electronics-experiment.jpg','f3a36a5d-383e-4f1d-9b25-5ce51c37cb5b 2.jpg','family-childhood.jpg','gallery-extra-10.png','gallery-extra-11.png','gallery-extra-12.png','gallery-extra-13.png','gallery-extra-14.png','gallery-extra-15.png','gallery-extra-16.png','gallery-extra-17.png','gallery-extra-19.png','gallery-extra-2.png','gallery-extra-20.png','gallery-extra-21.png','gallery-extra-3.png','gallery-extra-4.png','gallery-extra-5.png','gallery-extra-8.png','gallery-extra-9.png','hydrover-electronics.jpg','hydrover-prototype.jpg','mountain-photo.jpg','new-profile-2.png','night-selfie.jpg','project-electronics.jpg','robot-car-selfie.jpg','robot-car.jpg','robotics-workspace.jpg','science-fair-presentation.jpg','science-fair-team.jpg','science-festival.jpg','siblings-swing.jpg','smart-city-model.jpg','startup-summit.jpg','team-work.jpg','trophy-photo.jpg','truemedi-prototype.jpg'
  ]) with ordinality as t(value, ordinality)
)
insert into public.gallery_items (alt_text, image_url, thumbnail_url, featured, visible, sort_order)
select 'Mahimmiraj portfolio photo ' || (ord + 1), '/assets/' || path, '/assets/gallery-thumbs/' || path, ord < 6, true, ord from images;
