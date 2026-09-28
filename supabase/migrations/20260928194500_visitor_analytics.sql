create table public.visitor_profiles (
  id uuid primary key default gen_random_uuid(),
  ip_address inet not null unique,
  first_visit_at timestamptz not null default now(),
  last_visit_at timestamptz not null default now(),
  visit_count bigint not null default 0 check (visit_count >= 0),
  browser text,
  operating_system text,
  device_type text,
  country_code text check (country_code is null or country_code ~ '^[A-Z]{2}$'),
  country text,
  region text,
  city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.visitor_events (
  id bigint generated always as identity primary key,
  visitor_id uuid not null references public.visitor_profiles(id) on delete cascade,
  visited_at timestamptz not null default now(),
  path text not null check (char_length(path) between 1 and 2048),
  referrer text check (referrer is null or char_length(referrer) <= 2048),
  user_agent text check (user_agent is null or char_length(user_agent) <= 1024),
  browser text,
  operating_system text,
  device_type text
);

create table public.analytics_settings (
  id text primary key default 'main' check (id = 'main'),
  retention_days integer not null default 180 check (retention_days between 7 and 730),
  updated_at timestamptz not null default now()
);

insert into public.analytics_settings (id, retention_days) values ('main', 180);

create index visitor_profiles_last_visit_idx on public.visitor_profiles (last_visit_at desc);
create index visitor_profiles_country_idx on public.visitor_profiles (country, last_visit_at desc);
create index visitor_events_visitor_time_idx on public.visitor_events (visitor_id, visited_at desc);
create index visitor_events_time_idx on public.visitor_events (visited_at desc);
create index visitor_events_path_time_idx on public.visitor_events (path, visited_at desc);
create index visitor_events_device_time_idx on public.visitor_events (device_type, visited_at desc);
create index visitor_events_browser_time_idx on public.visitor_events (browser, visited_at desc);
create index visitor_events_os_time_idx on public.visitor_events (operating_system, visited_at desc);

create trigger visitor_profiles_updated_at before update on public.visitor_profiles
for each row execute function public.set_updated_at();
create trigger analytics_settings_updated_at before update on public.analytics_settings
for each row execute function public.set_updated_at();

alter table public.visitor_profiles enable row level security;
alter table public.visitor_events enable row level security;
alter table public.analytics_settings enable row level security;

revoke all on public.visitor_profiles, public.visitor_events, public.analytics_settings from anon, authenticated;
grant select, delete on public.visitor_profiles, public.visitor_events to authenticated;
grant select, update on public.analytics_settings to authenticated;
grant usage, select on sequence public.visitor_events_id_seq to service_role;

create policy "admins read visitor profiles" on public.visitor_profiles for select to authenticated
using ((select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "admins delete visitor profiles" on public.visitor_profiles for delete to authenticated
using ((select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "admins read visitor events" on public.visitor_events for select to authenticated
using ((select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "admins delete visitor events" on public.visitor_events for delete to authenticated
using ((select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "admins read analytics settings" on public.analytics_settings for select to authenticated
using ((select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "admins update analytics settings" on public.analytics_settings for update to authenticated
using ((select auth.jwt()->'app_metadata'->>'role') = 'admin')
with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');

create function public.record_visitor_event(
  p_ip_address text,
  p_path text,
  p_referrer text default null,
  p_user_agent text default null,
  p_browser text default null,
  p_operating_system text default null,
  p_device_type text default null,
  p_country_code text default null,
  p_country text default null,
  p_region text default null,
  p_city text default null
) returns uuid
language plpgsql
set search_path = ''
as $$
declare
  v_visitor_id uuid;
  v_is_duplicate boolean;
begin
  if p_path is null or char_length(p_path) < 1 or char_length(p_path) > 2048 then
    raise exception 'Invalid analytics path';
  end if;

  insert into public.visitor_profiles (
    ip_address, browser, operating_system, device_type,
    country_code, country, region, city
  ) values (
    p_ip_address::inet, nullif(p_browser, ''), nullif(p_operating_system, ''), nullif(p_device_type, ''),
    nullif(upper(p_country_code), ''), nullif(p_country, ''), nullif(p_region, ''), nullif(p_city, '')
  )
  on conflict (ip_address) do update set
    browser = coalesce(excluded.browser, public.visitor_profiles.browser),
    operating_system = coalesce(excluded.operating_system, public.visitor_profiles.operating_system),
    device_type = coalesce(excluded.device_type, public.visitor_profiles.device_type),
    country_code = coalesce(excluded.country_code, public.visitor_profiles.country_code),
    country = coalesce(excluded.country, public.visitor_profiles.country),
    region = coalesce(excluded.region, public.visitor_profiles.region),
    city = coalesce(excluded.city, public.visitor_profiles.city)
  returning id into v_visitor_id;

  perform 1 from public.visitor_profiles where id = v_visitor_id for update;

  select exists (
    select 1 from public.visitor_events
    where visitor_id = v_visitor_id
      and path = p_path
      and visited_at >= now() - interval '5 seconds'
  ) into v_is_duplicate;

  if not v_is_duplicate then
    insert into public.visitor_events (
      visitor_id, path, referrer, user_agent, browser, operating_system, device_type
    ) values (
      v_visitor_id, p_path, nullif(left(p_referrer, 2048), ''), nullif(left(p_user_agent, 1024), ''),
      nullif(p_browser, ''), nullif(p_operating_system, ''), nullif(p_device_type, '')
    );

    update public.visitor_profiles set
      first_visit_at = case when visit_count = 0 then now() else first_visit_at end,
      last_visit_at = now(),
      visit_count = visit_count + 1
    where id = v_visitor_id;
  end if;

  return v_visitor_id;
end;
$$;

revoke all on function public.record_visitor_event(text,text,text,text,text,text,text,text,text,text,text) from public, anon, authenticated;
grant execute on function public.record_visitor_event(text,text,text,text,text,text,text,text,text,text,text) to service_role;

create function public.get_visitor_analytics() returns jsonb
language plpgsql stable
set search_path = ''
as $$
declare
  v_result jsonb;
begin
  if coalesce(auth.jwt()->'app_metadata'->>'role', '') <> 'admin' then
    raise exception 'Admin access required' using errcode = '42501';
  end if;

  select jsonb_build_object(
    'total_visits', (select count(*) from public.visitor_events),
    'unique_visitors', (select count(*) from public.visitor_profiles),
    'today_visits', (select count(*) from public.visitor_events where visited_at >= date_trunc('day', now())),
    'week_visits', (select count(*) from public.visitor_events where visited_at >= date_trunc('week', now())),
    'month_visits', (select count(*) from public.visitor_events where visited_at >= date_trunc('month', now())),
    'top_pages', coalesce((select jsonb_agg(to_jsonb(x)) from (
      select path as label, count(*)::bigint as count from public.visitor_events
      group by path order by count(*) desc, path limit 10
    ) x), '[]'::jsonb),
    'devices', coalesce((select jsonb_agg(to_jsonb(x)) from (
      select coalesce(device_type, 'Unknown') as label, count(*)::bigint as count from public.visitor_events
      group by device_type order by count(*) desc limit 10
    ) x), '[]'::jsonb),
    'browsers', coalesce((select jsonb_agg(to_jsonb(x)) from (
      select coalesce(browser, 'Unknown') as label, count(*)::bigint as count from public.visitor_events
      group by browser order by count(*) desc limit 10
    ) x), '[]'::jsonb),
    'operating_systems', coalesce((select jsonb_agg(to_jsonb(x)) from (
      select coalesce(operating_system, 'Unknown') as label, count(*)::bigint as count from public.visitor_events
      group by operating_system order by count(*) desc limit 10
    ) x), '[]'::jsonb),
    'countries', coalesce((select jsonb_agg(to_jsonb(x)) from (
      select coalesce(country, country_code, 'Unknown') as label, count(*)::bigint as count from public.visitor_profiles
      group by country, country_code order by count(*) desc limit 10
    ) x), '[]'::jsonb)
  ) into v_result;

  return v_result;
end;
$$;

revoke all on function public.get_visitor_analytics() from public, anon;
grant execute on function public.get_visitor_analytics() to authenticated;

create function public.purge_visitor_analytics(p_retention_days integer) returns bigint
language plpgsql
set search_path = ''
as $$
declare
  v_deleted bigint;
begin
  if coalesce(auth.jwt()->'app_metadata'->>'role', '') <> 'admin' then
    raise exception 'Admin access required' using errcode = '42501';
  end if;
  if p_retention_days < 7 or p_retention_days > 730 then
    raise exception 'Retention must be between 7 and 730 days';
  end if;

  delete from public.visitor_events where visited_at < now() - make_interval(days => p_retention_days);
  get diagnostics v_deleted = row_count;
  delete from public.visitor_profiles where not exists (
    select 1 from public.visitor_events where visitor_id = public.visitor_profiles.id
  );
  update public.analytics_settings set retention_days = p_retention_days where id = 'main';
  return v_deleted;
end;
$$;

revoke all on function public.purge_visitor_analytics(integer) from public, anon;
grant execute on function public.purge_visitor_analytics(integer) to authenticated;
