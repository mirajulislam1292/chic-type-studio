create table public.volunteering (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  organization text not null,
  description text not null default '',
  start_date date,
  end_date date,
  current boolean not null default false,
  cause text,
  external_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create index volunteering_order_idx on public.volunteering (sort_order, start_date desc);

create trigger volunteering_updated_at
before update on public.volunteering
for each row execute function public.set_updated_at();

alter table public.volunteering enable row level security;

revoke all on public.volunteering from anon, authenticated;
grant select on public.volunteering to anon;
grant select, insert, update, delete on public.volunteering to authenticated;
grant all on public.volunteering to service_role;

create policy "public reads volunteering"
on public.volunteering for select to anon, authenticated
using (true);

create policy "admins insert volunteering"
on public.volunteering for insert to authenticated
with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

create policy "admins update volunteering"
on public.volunteering for update to authenticated
using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

create policy "admins delete volunteering"
on public.volunteering for delete to authenticated
using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

insert into public.volunteering (
  id,
  role,
  organization,
  description,
  start_date,
  end_date,
  current,
  external_url,
  sort_order,
  created_at,
  updated_at
)
select
  id,
  position,
  company,
  description,
  start_date,
  end_date,
  current,
  external_url,
  0,
  created_at,
  updated_at
from public.experiences
where position = 'RCY Volunteer, ICT Department'
  and company = 'Bangladesh Red Crescent Youth, Narayanganj Unit'
on conflict (id) do nothing;

delete from public.experiences as experience
where experience.position = 'RCY Volunteer, ICT Department'
  and experience.company = 'Bangladesh Red Crescent Youth, Narayanganj Unit'
  and exists (
    select 1
    from public.volunteering as volunteer
    where volunteer.id = experience.id
  );
