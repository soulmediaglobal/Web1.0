-- Work CMS Phase 1: active-admin table access and managed case-study media.
create policy "Active CMS admins can read case studies"
on public.case_studies for select to authenticated
using (exists (select 1 from public.cms_users where user_id = auth.uid() and role = 'admin' and is_active = true));

create policy "Active CMS admins can create case studies"
on public.case_studies for insert to authenticated
with check (exists (select 1 from public.cms_users where user_id = auth.uid() and role = 'admin' and is_active = true));

create policy "Active CMS admins can update case studies"
on public.case_studies for update to authenticated
using (exists (select 1 from public.cms_users where user_id = auth.uid() and role = 'admin' and is_active = true))
with check (exists (select 1 from public.cms_users where user_id = auth.uid() and role = 'admin' and is_active = true));

create policy "Active CMS admins can manage case study tags"
on public.case_study_tags for all to authenticated
using (exists (select 1 from public.cms_users where user_id = auth.uid() and role = 'admin' and is_active = true))
with check (exists (select 1 from public.cms_users where user_id = auth.uid() and role = 'admin' and is_active = true));

create policy "Active CMS admins can manage case study system points"
on public.case_study_system_points for all to authenticated
using (exists (select 1 from public.cms_users where user_id = auth.uid() and role = 'admin' and is_active = true))
with check (exists (select 1 from public.cms_users where user_id = auth.uid() and role = 'admin' and is_active = true));

create policy "Active CMS admins can manage case study testimonials"
on public.case_study_testimonials for all to authenticated
using (exists (select 1 from public.cms_users where user_id = auth.uid() and role = 'admin' and is_active = true))
with check (exists (select 1 from public.cms_users where user_id = auth.uid() and role = 'admin' and is_active = true));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('work', 'work', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "Active CMS admins can read work media"
on storage.objects for select to authenticated
using (bucket_id = 'work' and (storage.foldername(name))[1] = 'case-studies' and exists (select 1 from public.cms_users where user_id = auth.uid() and role = 'admin' and is_active = true));

create policy "Active CMS admins can upload work media"
on storage.objects for insert to authenticated
with check (bucket_id = 'work' and (storage.foldername(name))[1] = 'case-studies' and exists (select 1 from public.cms_users where user_id = auth.uid() and role = 'admin' and is_active = true));

create policy "Active CMS admins can update work media"
on storage.objects for update to authenticated
using (bucket_id = 'work' and (storage.foldername(name))[1] = 'case-studies' and exists (select 1 from public.cms_users where user_id = auth.uid() and role = 'admin' and is_active = true))
with check (bucket_id = 'work' and (storage.foldername(name))[1] = 'case-studies' and exists (select 1 from public.cms_users where user_id = auth.uid() and role = 'admin' and is_active = true));

create policy "Active CMS admins can remove work media"
on storage.objects for delete to authenticated
using (bucket_id = 'work' and (storage.foldername(name))[1] = 'case-studies' and exists (select 1 from public.cms_users where user_id = auth.uid() and role = 'admin' and is_active = true));
