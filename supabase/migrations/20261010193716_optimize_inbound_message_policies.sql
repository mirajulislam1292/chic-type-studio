drop policy "admins read inbound messages" on public.inbound_messages;
drop policy "admins update inbound messages" on public.inbound_messages;
drop policy "admins delete inbound messages" on public.inbound_messages;

create policy "admins read inbound messages" on public.inbound_messages for select to authenticated
using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

create policy "admins update inbound messages" on public.inbound_messages for update to authenticated
using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

create policy "admins delete inbound messages" on public.inbound_messages for delete to authenticated
using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');
