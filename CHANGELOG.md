# Changelog

All notable changes to the Soul Media Global Website will be documented in this file.

This changelog starts from the current production baseline. Historical changes before this point are not reconstructed individually.

---

## [1.4.3] — 2026-08-30

### Status

Implementation Complete

### Category

Changed

### Summary

Refined the Contact Us country calling-code control to keep the selected state compact and clarify local-number entry.

### Changes

- Displayed only the selected country flag and calling code beside the phone field while retaining country names in the option list.
- Added concise helper text telling users not to enter the selected country code again.
- Preserved the existing digits-only behavior, validation, submission payload, and responsive form structure.

### Files / Areas Affected

- `src/pages/ContactPage.tsx`
- `src/contact/countryCallingCodes.ts`

### Reason

Prevent long country names from truncating the phone input layout and reduce duplicate country-code entry.

### Testing / Verification

- `npm run lint` passed.
- `npm run build` passed with the existing non-blocking bundle-size warning.
- `git diff --check` passed.
- Responsive Contact checks passed at 390px and 1440px with no horizontal overflow; the selector remained compact and the adjacent phone input retained usable width.

### Known Issues

None.

### Next Action

Complete verification, commit, push, and confirm CI on the Issue #12 branch. Do not merge to `main`.

---

## [1.4.2] — 2026-08-30

### Status

Implementation Complete / Ray Approved

### Category

Changed / Security / Infrastructure

### Summary

Improved Contact Us phone and email validation with a separate country calling-code field, normalized CMS dialing values, and backward-compatible inquiry storage.

### Changes

- Added a dependency-free comprehensive country and territory calling-code selector before the local phone field.
- Restricted the local phone field to digits and aligned browser/server phone length constraints.
- Added matching client/server domain-bearing email validation.
- Persisted `phone_country_code` separately from `phone_number` through an additive nullable column.
- Extended the immutable-inquiry trigger to protect the new country-code field.
- Rendered new CMS inquiry phones as `+<country-code><digits>` while retaining stored legacy phone rendering.
- Preserved the existing CORS, RLS, service-role write boundary, Contact layout, and CMS status workflow.

### Files / Areas Affected

- `src/pages/ContactPage.tsx`
- `src/contact/`
- `src/pages/cms/ContactInquiriesPage.tsx`
- `supabase/functions/submit-contact-inquiry/`
- `supabase/migrations/20260830190000_add_contact_inquiry_country_code.sql`
- `docs/architecture/contact-inquiry-flow.md`

### Reason

Capture an explicit international calling code and a clean local phone value without rewriting legacy inquiry data or weakening the existing inquiry security boundary.

### Testing / Verification

- `npm run lint` passed.
- `npm run build` passed with the existing non-blocking bundle-size warning.
- `git diff --check` passed.
- Client sanitization removed letters and formatting characters from phone input; malformed domain-less email input failed browser validation.
- Deployed Edge Function returned HTTP 422 for non-digit phone input, an invalid country calling code, and malformed email, and HTTP 201 for a valid payload.
- Responsive Contact checks passed at 390px and 1440px with no horizontal overflow or browser console warnings/errors.
- Applied the additive migration and deployed the updated Edge Function to the linked Supabase project.

### Known Issues

- The successful deployment validation created one inquiry labeled `Issue 12 Validation Test` for authorized CMS review.

### Next Action

Commit and push the approved task branch, then confirm GitHub CI status. Do not merge to `main`.

---

## [1.4.1] — 2026-08-30

### Status

Implementation Complete / Merge-Ready Candidate

### Category

Changed / Content

### Summary

Simplified the public Contact Us form into clearer user-data, service, and briefing sections while preserving the Issue #10 security and CMS workflow.

### Changes

- Replaced identity/title and budget inputs with dedicated name and phone-number fields.
- Kept the five existing service choices unchanged and added a conditional required project-definition field for `Another Challenging Project`.
- Added matching server validation and safe data mapping for all new submission fields.
- Added backward-compatible database columns while retaining legacy identity/title and budget values for existing inquiries.
- Updated CMS inquiry display to show the new contact details and project definition with legacy-name fallback.

### Files / Areas Affected

- `src/pages/ContactPage.tsx`
- `src/contact/`
- `src/pages/cms/ContactInquiriesPage.tsx`
- `supabase/functions/submit-contact-inquiry/`
- `supabase/migrations/`
- Contact inquiry PRD and architecture documentation

### Reason

Make the inquiry form easier to understand and complete, particularly for Indonesian users, without expanding the approved Phase 1 workflow.

### Testing / Verification

- `npm run lint` passed.
- `npm run build` passed with the existing non-blocking bundle-size warning.
- `git diff --check` passed.
- Responsive Contact checks passed at 390px and 1440px without horizontal overflow or browser console warnings/errors.
- Verified all five unchanged service choices, conditional required behavior, and clearing the challenging-project value when deselected.
- Deployed the compatible migration and updated Edge Function to the linked Supabase project.
- Deployed server validation returned HTTP 422 for missing name, invalid phone, missing required challenging-project detail, and orphaned detail without its matching service.

### Known Issues

The final production submission and authorized CMS smoke checks still require live access and approved test data.

### Next Action

Confirm task-branch CI, then complete one successful production submission and the authorized CMS list/detail/status smoke test before merge approval.

---

## [1.4.0] — 2026-08-30

### Status

Merge Ready

### Category

Added / Changed / Security

### Summary

Connected the existing public Contact Us form to a secured Supabase inquiry workflow and added the first operational CMS area for reviewing inquiries and updating their status.

### Changes

- Added the `contact_inquiries` schema with constrained preserved form fields, timestamps, and `new` / `contacted` / `closed` statuses.
- Added RLS policies that deny anonymous table access and reuse the active-admin `cms_users` allowlist for CMS reads and updates.
- Restricted CMS database updates to the status field with a database trigger.
- Added a Supabase Edge Function as the public write boundary with independent normalization, validation, allowlists, and a honeypot check; no privileged secret is exposed to browser code.
- Replaced simulated Contact Us submission with real loading, success, and error behavior while preserving the existing fields and responsive composition.
- Added responsive CMS inquiry list, full detail, empty/error/loading states, and status updates.
- Revised unverified NDA, encryption, and 24-hour SLA claims into accurate operational copy.
- Documented the inquiry data flow, security boundary, and deployment requirements.

### Files / Areas Affected

- `src/pages/ContactPage.tsx`
- `src/contact/`
- `src/pages/cms/`
- `src/cms/tailadmin.css`
- `supabase/migrations/`
- `supabase/functions/submit-contact-inquiry/`
- `docs/architecture/contact-inquiry-flow.md`

### Reason

Deliver the approved Issue #10 Phase 1 flow from public inquiry submission through authorized CMS follow-up without introducing email, assignment, integrations, analytics, automation, or other deferred workflow features.

### Testing / Verification

- `npm run lint` passed.
- `npm run build` passed with the existing non-blocking bundle-size warning.
- `git diff --check` passed.
- Schema constraints, grants, RLS policies, immutable inquiry fields, and Edge Function validation were reviewed against the approved public/CMS security boundary.
- Applied the migration to the linked Supabase project and deployed the Edge Function with production-origin CORS configuration.
- Confirmed the deployed function returns HTTP 422 for invalid input and anonymous table reads return HTTP 401 permission denied.
- Verified Contact at 390px and 1440px without horizontal overflow, confirmed responsive navigation/form behavior and required fields, and observed no browser console errors or warnings.
- Verified unauthenticated `/cms` access still redirects to the responsive CMS login route without console errors or warnings.

### Known Issues

- An authorized CMS session and a real approved inquiry are still required for final manual list/detail/status and successful-submission production smoke checks.
- Rate limiting and CAPTCHA are not included in the approved Phase 1 scope.

### Next Action

Complete the authorized-CMS and successful-submission smoke checks, then obtain Ray's merge approval after branch CI passes.

---

## [1.0.0] — 2026-08-28

### Status

Initial Production Baseline

### Summary

Established the current Soul Media Global Website as the official baseline for future development tracking.

### Existing Public Structure

- Home
- Solutions
- Work
- Work Detail / Case Study
- About
- Contact

### Existing Core Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Supabase client dependency
- Three.js
- Lucide React

### CMS

- Not built yet
- No official CMS architecture established at this baseline

### Notes

- This release represents the current production state at the moment formal changelog tracking begins.
- Development history before v1.0.0 is not reconstructed individually and remains available through Git commit history.
- All future notable changes must be documented here before being pushed to GitHub.

---

## [1.1.0] — 2026-08-29

### Status

Completed

### Category

Infrastructure / Database / Security

### Summary

Established and verified the Supabase CMS database foundation for future CMS-backed content.

### Changes

- Created and verified nine CMS tables in the linked Supabase project.
- Enabled Row Level Security on the CMS tables.
- Added and verified public read policies on the appropriate content tables.
- Added and verified required indexes and `updated_at` triggers.
- Added repository safeguards so local Supabase environment files are ignored while `.env.example` may remain tracked.

### Files / Areas Affected

- Linked Supabase project and remote database schema.
- `.gitignore`
- `CHANGELOG.md`

### Reason

Provide a secure, structured data foundation before authentication, write access, media storage, CMS administration, or frontend content migration are implemented.

### Testing / Verification

- Confirmed the repository is linked to the intended Supabase project.
- Verified all nine CMS tables on the remote database.
- Verified Row Level Security, public read policies, required indexes, and `updated_at` triggers.
- Confirmed no `.env` file is tracked or staged.

### Known Issues

- CMS authentication, write policies, media storage, admin UI, and frontend integration are not included in this task.
- The public website continues to use its existing static and hardcoded content sources.

### Next Action

Close the CMS Database Foundation task in Chapter 6, then create separate tasks for the remaining CMS and frontend integration work.

---

## [1.3.0] — 2026-08-30

### Status

Implementation Complete / Ray Approved

### Category

Added / Changed / Security

### Summary

Established the authenticated CMS foundation with explicit Supabase authorization and a TailAdmin-based administrative UI shell while keeping the public website isolated and unchanged.

### Changes

- Added CMS email/password authentication using Supabase Auth.
- Added explicit CMS authorization through the `public.cms_users` allowlist, separate from authentication.
- Added active-admin membership verification for protected CMS access.
- Added protected `/cms` and `/cms/login` routes.
- Added persistent CMS sessions with isolated Supabase auth storage.
- Added logout handling and authenticated unauthorized-user handling.
- Added an Access Denied state for authenticated users without active CMS access.
- Integrated TailAdmin React form primitives into the CMS login experience.
- Added a responsive TailAdmin-style authenticated CMS shell with header and sidebar foundation.
- Scoped TailAdmin styling to the CMS so public website styles and routes remain unaffected.
- Kept dashboard widgets, CMS content CRUD, public signup, OAuth, password-reset UI, notifications, charts, calendars, maps, and other CMS features outside this release scope.

### Files / Areas Affected

- `src/auth/`
- `src/cms/`
- `src/pages/cms/`
- `src/lib/supabaseCms.ts`
- CMS routing in `src/App.tsx`
- `supabase/migrations/`
- `CHANGELOG.md`

### Reason

Provide the minimum secure authentication, authorization, and administrative interface foundation required before future CMS write-access and content-management capabilities are introduced.

### Testing / Verification

- Authorized CMS login and protected-route access passed.
- Active-admin allowlist authorization passed.
- Authenticated unauthorized-user access boundary passed.
- Logout and session persistence passed.
- CMS login smoke check passed without console errors or warnings.
- Public homepage smoke check passed without console errors or warnings.
- `git diff --check` passed.
- `npm run lint` passed.
- `npm run build` passed.
- Build reports only a non-blocking bundle-size warning.

### Next Action

Synchronize project-state documentation, then proceed with Ray-owned commit and push followed by the GitHub CI quality gate.

---

## [1.2.0] — 2026-08-29

### Status

Merge Ready

### Category

Added / Changed / Content / Infrastructure

### Summary

Connected the public website to the existing Supabase CMS foundation as its canonical runtime content source while preserving the approved public experience.

### Changes

- Added a typed, read-only content layer and one shared runtime snapshot for published case studies and relations, solutions and capabilities, leadership, pages metadata, and namespaced site copy.
- Seeded the approved published website baseline into Supabase with deterministic ordering and existing Phase 1 media references.
- Reused canonical case-study data for Home Selected Work and Work routes, canonical solutions for Home and Solutions, and canonical leadership for Home and About.
- Added controlled loading, empty, configuration-error, query-error, and explicit unpublished/invalid work not-found states.
- Removed the duplicate static case-study dataset and retained only presentation/media mappings in code.
- Added environment documentation, runtime architecture/key registry documentation, and branch CI checks.

### Files / Areas Affected

- `src/content/`
- `src/lib/supabase.ts`
- `src/components/ContentState.tsx`
- Home, Solutions, Work, Work Detail, About, and shared footer consumers
- `supabase/migrations/20260829160000_seed_published_website_content.sql`
- `.env.example`
- `.github/workflows/ci.yml`
- `docs/architecture/supabase-content-runtime.md`
- Removed `src/data/caseStudies.ts`

### Reason

Make Supabase the single public runtime content source so approved editorial changes appear on reload without a frontend rebuild or duplicated datasets.

### Testing / Verification

- Verified the intended remote project, nine-table schema foundation, anonymous RLS reads, published content parity, relations, featured flags, and deterministic ordering.
- Verified all six public routes, invalid work slug handling, tag filtering, desktop/tablet/mobile layout widths, and a clean browser console.
- Passed `npm ci`, `npm run lint`, and `npm run build` locally.
- GitHub Actions CI result is recorded on the task branch after push.

### Known Issues

- Existing bundled media remains mapped in frontend code for Phase 1; Supabase Storage is intentionally out of scope.
- Production and preview hosts must provide the two public Vite environment values documented in `.env.example`.
- No attributable testimonial is currently published, so Client Feedback remains hidden as designed.

### Next Action

Ray performs the final manual merge after branch CI passes and environment configuration is confirmed on the deployment host.

---

## [1.2.0] — 2026-08-30

### Status

Post-Merge Completion / Synchronization

### Category

Documentation / Release Synchronization

### Summary

Completed the post-merge documentation sync for Web v1.2.0 after the public website Supabase content integration task was completed and merged.

### Completion Record

- PR #6 was merged into `main`.
- Issue #5 was closed and completed.
- CI passed on the task branch before merge.
- The public website Supabase content integration is now part of canonical `main`.
- No Web Version bump is required because this entry records post-merge completion rather than new implementation work.

### Next Action

This task is complete. Continue with the authentication/write-access foundation or the next pending milestone according to the current project state.
