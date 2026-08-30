alter table public.contact_inquiries
  add column phone_country_code text
    check (phone_country_code is null or phone_country_code ~ '^[0-9]{1,4}$');

create or replace function public.protect_contact_inquiry_fields()
returns trigger
language plpgsql
as $$
begin
  if new.id is distinct from old.id
    or new.identity_title is distinct from old.identity_title
    or new.name is distinct from old.name
    or new.phone_country_code is distinct from old.phone_country_code
    or new.phone_number is distinct from old.phone_number
    or new.email is distinct from old.email
    or new.organization is distinct from old.organization
    or new.budget is distinct from old.budget
    or new.services is distinct from old.services
    or new.challenging_project is distinct from old.challenging_project
    or new.message is distinct from old.message
    or new.created_at is distinct from old.created_at then
    raise exception 'Only inquiry status may be updated';
  end if;
  return new;
end;
$$;
