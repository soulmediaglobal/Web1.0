-- Active CMS admins may manage Team rows only. Founder rows remain outside
-- this capability even if a malicious client supplies a different member_type.
create policy "Active CMS admins can read team members"
on public.leadership
for select
to authenticated
using (
  member_type = 'team'
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = auth.uid()
      and cms_users.role = 'admin'
      and cms_users.is_active = true
  )
);

create policy "Active CMS admins can create team members"
on public.leadership
for insert
to authenticated
with check (
  member_type = 'team'
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = auth.uid()
      and cms_users.role = 'admin'
      and cms_users.is_active = true
  )
);

create policy "Active CMS admins can update team members"
on public.leadership
for update
to authenticated
using (
  member_type = 'team'
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = auth.uid()
      and cms_users.role = 'admin'
      and cms_users.is_active = true
  )
)
with check (
  member_type = 'team'
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = auth.uid()
      and cms_users.role = 'admin'
      and cms_users.is_active = true
  )
);
