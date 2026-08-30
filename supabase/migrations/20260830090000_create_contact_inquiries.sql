create table public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  identity_title text not null
    check (char_length(identity_title) between 2 and 120),
  email text not null
    check (char_length(email) <= 254),
  organization text not null
    check (char_length(organization) between 2 and 160),
  budget text
    check (budget is null or budget in ('tier1', 'tier2', 'tier3')),
  services text[] not null default '{}'
    check (cardinality(services) between 0 and 5),
  message text not null
    check (char_length(message) between 20 and 5000),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index contact_inquiries_created_at_idx
on public.contact_inquiries(created_at desc);

create index contact_inquiries_status_idx
on public.contact_inquiries(status);

create trigger contact_inquiries_set_updated_at
before update on public.contact_inquiries
for each row execute function public.set_updated_at();

alter table public.contact_inquiries enable row level security;

create policy "Active CMS admins can read contact inquiries"
on public.contact_inquiries
for select
to authenticated
using (
  exists (
    select 1 from public.cms_users
    where cms_users.user_id = auth.uid()
      and cms_users.role = 'admin'
      and cms_users.is_active = true
  )
);

create policy "Active CMS admins can update contact inquiry status"
on public.contact_inquiries
for update
to authenticated
using (
  exists (
    select 1 from public.cms_users
    where cms_users.user_id = auth.uid()
      and cms_users.role = 'admin'
      and cms_users.is_active = true
  )
)
with check (
  exists (
    select 1 from public.cms_users
    where cms_users.user_id = auth.uid()
      and cms_users.role = 'admin'
      and cms_users.is_active = true
  )
);

revoke all on public.contact_inquiries from anon;
grant select, update on public.contact_inquiries to authenticated;

create or replace function public.protect_contact_inquiry_fields()
returns trigger
language plpgsql
as $$
begin
  if new.id is distinct from old.id
    or new.identity_title is distinct from old.identity_title
    or new.email is distinct from old.email
    or new.organization is distinct from old.organization
    or new.budget is distinct from old.budget
    or new.services is distinct from old.services
    or new.message is distinct from old.message
    or new.created_at is distinct from old.created_at then
    raise exception 'Only inquiry status may be updated';
  end if;
  return new;
end;
$$;

create trigger protect_contact_inquiry_fields
before update on public.contact_inquiries
for each row execute function public.protect_contact_inquiry_fields();
