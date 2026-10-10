create table public.inbound_messages (
  id uuid primary key default gen_random_uuid(),
  message_type text not null check (message_type in ('anonymous', 'contact')),
  name text check (name is null or char_length(name) between 2 and 120),
  email text check (email is null or char_length(email) <= 254),
  subject text check (subject is null or char_length(subject) <= 160),
  message text not null check (char_length(message) between 2 and 4000),
  ip_address inet not null,
  country_code text check (country_code is null or country_code ~ '^[A-Z]{2}$'),
  country text,
  region text,
  city text,
  user_agent text check (user_agent is null or char_length(user_agent) <= 1024),
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  read_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (message_type = 'anonymous' and name is null and email is null and subject is null)
    or
    (message_type = 'contact' and name is not null and email is not null)
  )
);

create index inbound_messages_created_at_idx on public.inbound_messages (created_at desc);
create index inbound_messages_status_created_at_idx on public.inbound_messages (status, created_at desc);
create index inbound_messages_type_created_at_idx on public.inbound_messages (message_type, created_at desc);
create index inbound_messages_ip_created_at_idx on public.inbound_messages (ip_address, created_at desc);

create trigger inbound_messages_updated_at before update on public.inbound_messages
for each row execute function public.set_updated_at();

alter table public.inbound_messages enable row level security;

revoke all on public.inbound_messages from public, anon, authenticated;
grant select, update, delete on public.inbound_messages to authenticated;
grant select, insert, update, delete on public.inbound_messages to service_role;

create policy "admins read inbound messages" on public.inbound_messages for select to authenticated
using ((select auth.jwt()->'app_metadata'->>'role') = 'admin');

create policy "admins update inbound messages" on public.inbound_messages for update to authenticated
using ((select auth.jwt()->'app_metadata'->>'role') = 'admin')
with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');

create policy "admins delete inbound messages" on public.inbound_messages for delete to authenticated
using ((select auth.jwt()->'app_metadata'->>'role') = 'admin');

create function public.record_inbound_message(
  p_message_type text,
  p_message text,
  p_ip_address text,
  p_name text default null,
  p_email text default null,
  p_subject text default null,
  p_user_agent text default null,
  p_country_code text default null,
  p_country text default null,
  p_region text default null,
  p_city text default null
) returns uuid
language plpgsql
set search_path = ''
as $$
declare
  v_id uuid;
  v_message_type text := lower(trim(coalesce(p_message_type, '')));
  v_message text := trim(coalesce(p_message, ''));
  v_name text := nullif(trim(coalesce(p_name, '')), '');
  v_email text := nullif(lower(trim(coalesce(p_email, ''))), '');
  v_subject text := nullif(trim(coalesce(p_subject, '')), '');
  v_recent_count integer;
begin
  if v_message_type not in ('anonymous', 'contact') then
    raise exception 'Invalid message type';
  end if;
  if char_length(v_message) < 2 or char_length(v_message) > 4000 then
    raise exception 'Message must be between 2 and 4000 characters';
  end if;
  if v_message_type = 'contact' then
    if v_name is null or char_length(v_name) < 2 or char_length(v_name) > 120 then
      raise exception 'A valid name is required';
    end if;
    if v_email is null or char_length(v_email) > 254 or v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
      raise exception 'A valid email is required';
    end if;
  else
    v_name := null;
    v_email := null;
    v_subject := null;
  end if;

  select count(*)::integer into v_recent_count
  from public.inbound_messages
  where ip_address = p_ip_address::inet
    and created_at >= now() - interval '15 minutes';

  if v_recent_count >= 5 then
    raise exception 'Too many messages. Please try again later.';
  end if;

  insert into public.inbound_messages (
    message_type, name, email, subject, message, ip_address,
    country_code, country, region, city, user_agent
  ) values (
    v_message_type, v_name, v_email, left(v_subject, 160), v_message, p_ip_address::inet,
    nullif(upper(p_country_code), ''), nullif(left(p_country, 160), ''),
    nullif(left(p_region, 160), ''), nullif(left(p_city, 160), ''),
    nullif(left(p_user_agent, 1024), '')
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.record_inbound_message(text,text,text,text,text,text,text,text,text,text,text) from public, anon, authenticated;
grant execute on function public.record_inbound_message(text,text,text,text,text,text,text,text,text,text,text) to service_role;
