create table public.cms_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin'
    check (role in ('admin')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cms_users enable row level security;

create policy "CMS users can read own membership"
on public.cms_users
for select
to authenticated
using (
  user_id = auth.uid()
);

create trigger set_cms_users_updated_at
before update on public.cms_users
for each row
execute function public.set_updated_at();
