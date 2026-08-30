# Contact Inquiry Flow

## Security boundary

The public browser never inserts into or reads `contact_inquiries` directly. It invokes the `submit-contact-inquiry` Supabase Edge Function with the browser-safe publishable key. The function normalizes and validates the approved form fields, rejects unsupported values, and inserts with the server-managed `SUPABASE_SERVICE_ROLE_KEY`. That secret must never be added to a Vite environment variable or browser bundle.

The database has Row Level Security enabled and grants no table privileges to `anon`. Authenticated access is limited by RLS to active `admin` members of `public.cms_users`. The CMS may select inquiries and update them, while a database trigger prevents updates to every field except `status`. The status check allows only `new`, `contacted`, or `closed`.

## Data flow

1. The Contact Us form performs browser validation and submits name, an allowlisted country calling code, local phone digits, email, organization/company, selected services, an optional conditional challenging-project definition, and the briefing summary to the Edge Function. Non-digit characters are removed from the local phone field as the user types.
2. The Edge Function independently validates the email domain shape, country-code allowlist, digits-only local number, and E.164-compatible combined length before storing the country code separately from the local digits. New rows default to `new`.
3. An authorized CMS user opens Contact Inquiries to load rows through their authenticated Supabase session.
4. The CMS list opens a complete detail view and may update the status only.

## Deployment

Apply `supabase/migrations/20260830090000_create_contact_inquiries.sql`, `supabase/migrations/20260830140000_update_contact_inquiry_form_fields.sql`, and `supabase/migrations/20260830190000_add_contact_inquiry_country_code.sql` in order, then deploy `submit-contact-inquiry`. The latest additive migration adds nullable `phone_country_code` without rewriting existing rows and extends the immutable-field trigger to protect it. Supabase supplies `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to hosted Edge Functions. The function allows `https://soulmedia.id`, `http://127.0.0.1:3000`, and `http://localhost:3000`; set `PUBLIC_SITE_ORIGIN` only when an additional trusted preview or production origin is required.

## Controlled states and validation

The public form exposes native field constraints plus loading, success, and submission-error feedback. Its dependency-free selector covers countries and territories with assigned calling codes and defaults to Indonesia (`+62`). The challenging-project definition is visible and required only while its matching service is selected, and removing that service clears the field. The function independently enforces lengths, a domain-bearing email shape, the country calling-code and service allowlists, digits-only phone shape, the conditional project-definition rule, and a honeypot field. The CMS renders new phones as `+<country-code><digits>` for display and `tel:` links; legacy rows with no country-code column value retain their stored phone rendering. The CMS provides loading, empty, query-error, status-saving, and update-error states. Rate limiting or CAPTCHA is not included in the approved Phase 1 scope.
