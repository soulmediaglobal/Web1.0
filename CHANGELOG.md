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
