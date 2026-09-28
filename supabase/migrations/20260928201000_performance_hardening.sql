create index achievements_certificate_id_idx on public.achievements (certificate_id) where certificate_id is not null;
create index blog_post_tags_tag_id_idx on public.blog_post_tags (tag_id);

create function public.is_portfolio_admin() returns boolean
language sql stable
set search_path = ''
as $$
  select coalesce((select auth.jwt())->'app_metadata'->>'role', '') = 'admin';
$$;

revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to anon, authenticated, service_role;

alter policy "public reads published projects" on public.projects
using (status = 'published' or (select public.is_portfolio_admin()));
alter policy "public reads published achievements" on public.achievements
using (status = 'published' or (select public.is_portfolio_admin()));
alter policy "public reads linked certificates" on public.certificates
using (exists (select 1 from public.achievements a where a.certificate_id = certificates.id and a.status = 'published') or (select public.is_portfolio_admin()));
alter policy "public reads published posts" on public.blog_posts
using (status = 'published' or (select public.is_portfolio_admin()));
alter policy "public reads published post tags" on public.blog_post_tags
using (exists (select 1 from public.blog_posts p where p.id = post_id and p.status = 'published') or (select public.is_portfolio_admin()));
alter policy "public reads visible gallery" on public.gallery_items
using (visible or (select public.is_portfolio_admin()));

do $$
declare table_name text;
begin
  foreach table_name in array array['projects','achievements','certificates','blog_categories','blog_tags','blog_posts','blog_post_tags','gallery_items','experiences','education','skills','site_settings']
  loop
    execute format('alter policy "admins insert %1$s" on public.%1$I with check ((select public.is_portfolio_admin()))', table_name);
    execute format('alter policy "admins update %1$s" on public.%1$I using ((select public.is_portfolio_admin())) with check ((select public.is_portfolio_admin()))', table_name);
    execute format('alter policy "admins delete %1$s" on public.%1$I using ((select public.is_portfolio_admin()))', table_name);
  end loop;
end $$;

alter policy "admins read visitor profiles" on public.visitor_profiles
using ((select public.is_portfolio_admin()));
alter policy "admins delete visitor profiles" on public.visitor_profiles
using ((select public.is_portfolio_admin()));
alter policy "admins read visitor events" on public.visitor_events
using ((select public.is_portfolio_admin()));
alter policy "admins delete visitor events" on public.visitor_events
using ((select public.is_portfolio_admin()));
alter policy "admins read analytics settings" on public.analytics_settings
using ((select public.is_portfolio_admin()));
alter policy "admins update analytics settings" on public.analytics_settings
using ((select public.is_portfolio_admin()))
with check ((select public.is_portfolio_admin()));

alter policy "admins upload portfolio media" on storage.objects
with check (bucket_id = 'portfolio-media' and (select public.is_portfolio_admin()));
alter policy "admins update portfolio media" on storage.objects
using (bucket_id = 'portfolio-media' and (select public.is_portfolio_admin()))
with check (bucket_id = 'portfolio-media' and (select public.is_portfolio_admin()));
alter policy "admins delete portfolio media" on storage.objects
using (bucket_id = 'portfolio-media' and (select public.is_portfolio_admin()));
