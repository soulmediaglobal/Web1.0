alter table public.contact_inquiries
  alter column identity_title drop not null,
  add column name text
    check (name is null or char_length(name) between 2 and 120),
  add column phone_number text
    check (phone_number is null or char_length(phone_number) between 5 and 30),
  add column challenging_project text
    check (challenging_project is null or char_length(challenging_project) between 5 and 1000),
  add constraint contact_inquiries_challenging_project_service_check
    check (
      (name is null and phone_number is null)
      or (challenging_project is null and not ('challenging-project' = any(services)))
      or (challenging_project is not null and 'challenging-project' = any(services))
    );

create or replace function public.protect_contact_inquiry_fields()
returns trigger
language plpgsql
as $$
begin
  if new.id is distinct from old.id
    or new.identity_title is distinct from old.identity_title
    or new.name is distinct from old.name
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
