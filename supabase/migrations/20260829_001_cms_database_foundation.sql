create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  number text not null,
  category text not null,
  sector text not null,
  type text not null,
  client text not null,
  name text not null,
  summary text not null,
  image_url text,
  image_alt text,
  featured boolean not null default false,
  challenge text not null,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.case_study_tags (
  id uuid primary key default gen_random_uuid(),
  case_study_id uuid not null
    references public.case_studies(id)
    on delete cascade,
  tag text not null,
  created_at timestamptz not null default now(),
  unique (case_study_id, tag)
);

create table public.case_study_system_points (
  id uuid primary key default gen_random_uuid(),
  case_study_id uuid not null
    references public.case_studies(id)
    on delete cascade,
  title text not null,
  description text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.case_study_testimonials (
  id uuid primary key default gen_random_uuid(),
  case_study_id uuid not null unique
    references public.case_studies(id)
    on delete cascade,
  quote text not null,
  author text not null,
  role text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.solutions (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  number text not null,
  number_label text not null,
  short_title text not null,
  title text not null,
  description text not null,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.solution_capabilities (
  id uuid primary key default gen_random_uuid(),
  solution_id uuid not null
    references public.solutions(id)
    on delete cascade,
  label text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leadership (
  id uuid primary key default gen_random_uuid(),
  number text not null,
  name text not null,
  role text not null,
  description text not null,
  image_url text,
  image_alt text,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text,
  group_name text not null default 'general',
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================

create trigger pages_set_updated_at
before update on public.pages
for each row execute function public.set_updated_at();

create trigger case_studies_set_updated_at
before update on public.case_studies
for each row execute function public.set_updated_at();

create trigger case_study_system_points_set_updated_at
before update on public.case_study_system_points
for each row execute function public.set_updated_at();

create trigger case_study_testimonials_set_updated_at
before update on public.case_study_testimonials
for each row execute function public.set_updated_at();

create trigger solutions_set_updated_at
before update on public.solutions
for each row execute function public.set_updated_at();

create trigger solution_capabilities_set_updated_at
before update on public.solution_capabilities
for each row execute function public.set_updated_at();

create trigger leadership_set_updated_at
before update on public.leadership
for each row execute function public.set_updated_at();

create trigger site_content_set_updated_at
before update on public.site_content
for each row execute function public.set_updated_at();

-- ============================================================
-- INDEXES
-- ============================================================

create index pages_status_idx
on public.pages(status);

create index pages_sort_order_idx
on public.pages(sort_order);

create index case_studies_status_idx
on public.case_studies(status);

create index case_studies_sector_idx
on public.case_studies(sector);

create index case_studies_featured_idx
on public.case_studies(featured);

create index case_studies_sort_order_idx
on public.case_studies(sort_order);

create index case_study_tags_case_study_idx
on public.case_study_tags(case_study_id);

create index case_study_tags_tag_idx
on public.case_study_tags(tag);

create index case_study_system_points_sort_order_idx
on public.case_study_system_points(case_study_id, sort_order);

create index solutions_status_idx
on public.solutions(status);

create index solutions_sort_order_idx
on public.solutions(sort_order);

create index solution_capabilities_sort_order_idx
on public.solution_capabilities(solution_id, sort_order);

create index leadership_status_idx
on public.leadership(status);

create index leadership_sort_order_idx
on public.leadership(sort_order);

create index site_content_group_idx
on public.site_content(group_name);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.pages enable row level security;
alter table public.case_studies enable row level security;
alter table public.case_study_tags enable row level security;
alter table public.case_study_system_points enable row level security;
alter table public.case_study_testimonials enable row level security;
alter table public.solutions enable row level security;
alter table public.solution_capabilities enable row level security;
alter table public.leadership enable row level security;
alter table public.site_content enable row level security;

-- ============================================================
-- PUBLIC READ POLICIES
-- ============================================================

create policy "Public can read published pages"
on public.pages
for select
to anon
using (status = 'published');

create policy "Public can read published case studies"
on public.case_studies
for select
to anon
using (status = 'published');

create policy "Public can read tags of published case studies"
on public.case_study_tags
for select
to anon
using (
  exists (
    select 1
    from public.case_studies
    where case_studies.id = case_study_tags.case_study_id
      and case_studies.status = 'published'
  )
);

create policy "Public can read system points of published case studies"
on public.case_study_system_points
for select
to anon
using (
  exists (
    select 1
    from public.case_studies
    where case_studies.id = case_study_system_points.case_study_id
      and case_studies.status = 'published'
  )
);

create policy "Public can read testimonials of published case studies"
on public.case_study_testimonials
for select
to anon
using (
  exists (
    select 1
    from public.case_studies
    where case_studies.id = case_study_testimonials.case_study_id
      and case_studies.status = 'published'
  )
);

create policy "Public can read published solutions"
on public.solutions
for select
to anon
using (status = 'published');

create policy "Public can read capabilities of published solutions"
on public.solution_capabilities
for select
to anon
using (
  exists (
    select 1
    from public.solutions
    where solutions.id = solution_capabilities.solution_id
      and solutions.status = 'published'
  )
);

create policy "Public can read published leadership"
on public.leadership
for select
to anon
using (status = 'published');

create policy "Public can read site content"
on public.site_content
for select
to anon
using (true);
