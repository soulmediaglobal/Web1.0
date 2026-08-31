create policy "Active CMS admins can read people photo objects"
on storage.objects
for select
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
