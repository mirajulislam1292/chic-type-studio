alter table public.visitor_profiles
  add column if not exists network_name text,
  add column if not exists asn text,
  add column if not exists geo_updated_at timestamptz;

comment on column public.visitor_profiles.network_name is 'Approximate ISP or network organization associated with the public IP.';
comment on column public.visitor_profiles.asn is 'Autonomous system number associated with the public IP.';
comment on column public.visitor_profiles.geo_updated_at is 'Last attempted server-side network geography refresh.';
