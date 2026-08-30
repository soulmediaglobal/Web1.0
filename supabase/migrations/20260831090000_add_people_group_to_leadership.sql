alter table public.leadership
add column member_type text not null default 'founder'
check (member_type in ('founder', 'team'));

alter table public.leadership
add column email text,
add column linkedin_url text;

alter table public.leadership
alter column description drop not null;

create index leadership_member_type_sort_order_idx
on public.leadership(member_type, sort_order);
