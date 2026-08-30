insert into public.leadership (
  number,
  name,
  role,
  description,
  image_url,
  image_alt,
  linkedin_url,
  status,
  sort_order,
  published_at,
  member_type
)
select
  seed.number,
  seed.name,
  seed.role,
  null,
  seed.image_url,
  seed.image_alt,
  seed.linkedin_url,
  'published',
  seed.sort_order,
  now(),
  'team'
from (
  values
    ('01', 'Nadia Aulia', 'Product Designer', 'team-samples/nadia-aulia.png', 'Sample portrait for Nadia Aulia', 'https://www.linkedin.com/', 1),
    ('02', 'Dimas Prakoso', 'Software Engineer', 'team-samples/dimas-prakoso.png', 'Sample portrait for Dimas Prakoso', 'https://www.linkedin.com/', 2),
    ('03', 'Keisha Mahendra', 'Project Manager', 'team-samples/keisha-mahendra.png', 'Sample portrait for Keisha Mahendra', 'https://www.linkedin.com/', 3),
    ('04', 'Raka Adinata', 'Business Analyst', 'team-samples/raka-adinata.png', 'Sample portrait for Raka Adinata', 'https://www.linkedin.com/', 4)
) as seed(number, name, role, image_url, image_alt, linkedin_url, sort_order)
where not exists (
  select 1
  from public.leadership existing
  where existing.member_type = 'team'
    and existing.name = seed.name
);
