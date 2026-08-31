# Expand People CMS with Founder Management and Photo Uploads

**GitHub Issue:** [#19 — Expand People CMS with Founder management and photo uploads](https://github.com/soulmediaglobal/Web1.0/issues/19)

## Target Persona

Ray and authorized Soul Media Global CMS administrators managing public Founder and Team profiles.

## Goal

Expand Team CMS into one protected People area with separate Founder and Team management, then replace manual photo URL entry with secure photo upload, replacement, and removal.

## Scope

- Founder and Team list, create, and edit flows with fixed membership classification.
- Existing draft, published, archived, and numeric ordering model.
- Founder description and optional contact fields where already consumed publicly.
- Public Supabase Storage bucket dedicated to People photos.
- Staged photo selection and preview with Edit photo and Remove actions.
- JPG, PNG, WebP, and AVIF validation with a 5 MB maximum.
- Database-first replacement/removal so the active photo reference is updated before an old managed object is removed.
- Active-admin leadership and Storage RLS.
- Safe photo-empty rendering on Home and About.

## Security Architecture

- **Role:** active `admin` membership in `public.cms_users`.
- **Content permissions:** active admins can read, create, update, publish, and archive Founder and Team records. Person hard deletion is not exposed.
- **Storage permissions:** active admins can select, insert, update, and delete only objects in the `people` bucket under `founder/` or `team/` paths. Object selection is required for controlled replacement/removal operations.
- **Public boundary:** the bucket is public because approved published profiles are public website content. Public users receive no upload, update, or deletion policy.
- **Legacy boundary:** bundled image references are never deleted by CMS. Only references using `storage://people/` are treated as CMS-managed objects.

## Out of Scope

- General media library, cropper, or image editing.
- Person hard deletion.
- Unrelated CMS domains or public redesign.

## Acceptance Criteria

- Founder and Team are independently manageable from People CMS.
- Photo URLs are not manually editable.
- Existing, staged, and missing-photo states render safely.
- Edit photo uploads a validated replacement on Save.
- Remove clears the database reference and removes only a CMS-managed object.
- RLS prevents broad authenticated content or Storage writes.
- Public missing-photo states do not render broken images.
- Local quality gates and authenticated/public smoke checks pass.
