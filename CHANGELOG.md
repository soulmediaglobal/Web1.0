# Changelog

All notable changes to the Soul Media Global Website will be documented in this file.

This changelog starts from the current production baseline. Historical changes before this point are not reconstructed individually.

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
