# Contact Inquiry Flow

## Security boundary

The public browser never inserts into or reads `contact_inquiries` directly. It invokes the `submit-contact-inquiry` Supabase Edge Function with the browser-safe publishable key. The function normalizes and validates the approved form fields, rejects unsupported values, and inserts with the server-managed `SUPABASE_SERVICE_ROLE_KEY`. That secret must never be added to a Vite environment variable or browser bundle.

The database has Row Level Security enabled and grants no table privileges to `anon`. Authenticated access is limited by RLS to active `admin` members of `public.cms_users`. The CMS may select inquiries and update them, while a database trigger prevents updates to every field except `status`. The status check allows only `new`, `contacted`, or `closed`.

## Data flow

1. The existing Contact Us form performs browser validation and submits the preserved fields to the Edge Function.
2. The Edge Function repeats validation and inserts a normalized record. New rows default to `new`.
3. An authorized CMS user opens Contact Inquiries to load rows through their authenticated Supabase session.
4. The CMS list opens a complete detail view and may update the status only.

## Deployment

Apply `supabase/migrations/20260830090000_create_contact_inquiries.sql`, then deploy `submit-contact-inquiry`. Supabase supplies `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to hosted Edge Functions. Set `PUBLIC_SITE_ORIGIN` to the production website origin so the function returns a restricted CORS origin; preview environments may set their corresponding origin during verification.

## Controlled states and validation

The public form exposes native field constraints plus loading, success, and submission-error feedback. The function independently enforces lengths, email shape, budget/service allowlists, and includes a honeypot field. The CMS provides loading, empty, query-error, status-saving, and update-error states. Rate limiting or CAPTCHA is not included in the approved Phase 1 scope.
