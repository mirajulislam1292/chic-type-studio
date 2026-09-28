# M. Mahimmiraj Portfolio

A production-focused personal portfolio and mobile-first CMS built with React, Vite, TypeScript, Tailwind CSS and Supabase.

## Architecture

- **Public site:** code-split React routes with dynamic projects, achievements, gallery, experience, education, skills, settings and blog content.
- **CMS:** protected `/admin` routes for CRUD, publishing, media uploads, certificate attachment and persistent ordering.
- **Data:** Postgres tables protected by row-level security. Signed-out visitors can only read public records; mutations require an authenticated user whose immutable `app_metadata.role` is `admin`.
- **Media:** a public CDN-backed `portfolio-media` bucket with admin-only upload/update/delete policies, unique filenames, MIME/size checks and client-generated gallery thumbnails.
- **Fallback:** repository content remains visible before Supabase is connected, so migration does not blank the existing site.

## Local setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Environment variables:

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
VITE_SITE_URL=https://your-production-domain.example
```

The publishable key is safe for browser use because authorization is enforced by database and storage RLS. Never add a Supabase secret/service-role key to a `VITE_` variable.

## Database setup

1. Create a Supabase project.
2. Link the CLI: `npx supabase link --project-ref YOUR_PROJECT_REF`.
3. Apply the schema and migrated content: `npx supabase db push`.
4. Create the administrator in Supabase Auth (email/password).
5. In the Supabase SQL editor, assign the immutable admin role, replacing the email:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'YOUR_ADMIN_EMAIL';
```

Sign out and back in after changing app metadata so the JWT refreshes. Disable public sign-ups in Supabase Auth; this portfolio only needs one manually provisioned administrator. MFA is recommended.

## Validation

```bash
npm run lint
npm test
npm run build
```

The production build generates `robots.txt` and, when `VITE_SITE_URL` is set, `sitemap.xml`. Vercel uses `npm ci` and `npm run build` through `vercel.json`.

## Content behavior

- Existing project, achievement, gallery, experience and skill content is seeded by the migration.
- Draft/hidden records are never returned to signed-out visitors.
- Removing an achievement's certificate selection immediately removes the public certificate link.
- Uploaded object names use random UUIDs. Gallery thumbnails are generated before upload; originals are retained for the lightbox.
- Managed files are deleted only when their unique `portfolio-media` URL is explicitly removed. Repository assets and external URLs are never deleted.

