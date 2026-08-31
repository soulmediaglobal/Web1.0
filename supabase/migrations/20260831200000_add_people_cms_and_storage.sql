create policy "Active CMS admins can read founder members"
on public.leadership
for select
to authenticated
using (
  member_type = 'founder'
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = auth.uid()
      and cms_users.role = 'admin'
      and cms_users.is_active = true
  )
);

create policy "Active CMS admins can create founder members"
on public.leadership
for insert
to authenticated
with check (
  member_type = 'founder'
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = auth.uid()
      and cms_users.role = 'admin'
      and cms_users.is_active = true
  )
);

create policy "Active CMS admins can update founder members"
on public.leadership
for update
to authenticated
using (
  member_type = 'founder'
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = auth.uid()
      and cms_users.role = 'admin'
      and cms_users.is_active = true
  )
)
with check (
  member_type = 'founder'
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = auth.uid()
      and cms_users.role = 'admin'
      and cms_users.is_active = true
  )
);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'people',
  'people',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Active CMS admins can upload people photos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'people'
  and (storage.foldername(name))[1] in ('founder', 'team')
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = auth.uid()
      and cms_users.role = 'admin'
      and cms_users.is_active = true
  )
);

create policy "Active CMS admins can update people photos"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'people'
  and (storage.foldername(name))[1] in ('founder', 'team')
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = auth.uid()
      and cms_users.role = 'admin'
      and cms_users.is_active = true
  )
)
with check (
  bucket_id = 'people'
  and (storage.foldername(name))[1] in ('founder', 'team')
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = auth.uid()
      and cms_users.role = 'admin'
      and cms_users.is_active = true
  )
);

create policy "Active CMS admins can remove people photos"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'people'
  and (storage.foldername(name))[1] in ('founder', 'team')
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = auth.uid()
      and cms_users.role = 'admin'
      and cms_users.is_active = true
  )
);
