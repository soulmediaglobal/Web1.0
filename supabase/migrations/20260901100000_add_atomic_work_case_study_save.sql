-- Save a case-study parent and all editable relations in one RLS-protected transaction.
create or replace function public.save_work_case_study(
  p_id uuid,
  p_content jsonb,
  p_tags text[],
  p_points jsonb,
  p_testimonial jsonb
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  target_id uuid;
  next_status text := p_content->>'status';
  previous_status text;
begin
  if p_id is null then
    insert into public.case_studies (
      slug, number, category, sector, type, client, name, summary, image_url,
      image_alt, featured, challenge, status, sort_order, published_at
    ) values (
      p_content->>'slug', p_content->>'number', p_content->>'category', p_content->>'sector',
      p_content->>'type', p_content->>'client', p_content->>'name', p_content->>'summary',
      p_content->>'image_url', p_content->>'image_alt', (p_content->>'featured')::boolean,
      p_content->>'challenge', next_status, (p_content->>'sort_order')::integer,
      case when next_status = 'published' then now() else null end
    ) returning id into target_id;
  else
    select status into previous_status from public.case_studies where id = p_id;
    if not found then raise exception 'Case study not found.'; end if;
    update public.case_studies set
      slug = p_content->>'slug', number = p_content->>'number', category = p_content->>'category',
      sector = p_content->>'sector', type = p_content->>'type', client = p_content->>'client',
      name = p_content->>'name', summary = p_content->>'summary', image_url = p_content->>'image_url',
      image_alt = p_content->>'image_alt', featured = (p_content->>'featured')::boolean,
      challenge = p_content->>'challenge', status = next_status,
      sort_order = (p_content->>'sort_order')::integer,
      published_at = case
        when next_status = 'published' and previous_status <> 'published' then now()
        when next_status <> 'published' then null
        else published_at
      end
    where id = p_id;
    target_id := p_id;
  end if;

  delete from public.case_study_tags where case_study_id = target_id;
  insert into public.case_study_tags (case_study_id, tag)
  select target_id, tag from unnest(coalesce(p_tags, array[]::text[])) as tag;

  delete from public.case_study_system_points where case_study_id = target_id;
  insert into public.case_study_system_points (case_study_id, title, description, sort_order)
  select target_id, point->>'title', point->>'description', (point->>'sort_order')::integer
  from jsonb_array_elements(coalesce(p_points, '[]'::jsonb)) as point;

  delete from public.case_study_testimonials where case_study_id = target_id;
  if p_testimonial is not null and p_testimonial <> 'null'::jsonb then
    insert into public.case_study_testimonials (case_study_id, quote, author, role)
    values (target_id, p_testimonial->>'quote', p_testimonial->>'author', p_testimonial->>'role');
  end if;

  return target_id;
end;
$$;

revoke all on function public.save_work_case_study(uuid, jsonb, text[], jsonb, jsonb) from public;
grant execute on function public.save_work_case_study(uuid, jsonb, text[], jsonb, jsonb) to authenticated;
