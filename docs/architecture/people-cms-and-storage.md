# People CMS and Storage

## Purpose

The protected People CMS manages Founder and Team profiles that feed the public Home and About experiences. Founder and Team use the same `leadership` content model but remain isolated by the fixed `member_type` value.

## Authorization boundary

- The user must be authenticated through Supabase Auth.
- The user must have active `admin` membership in `public.cms_users`.
- Active admins may select, create, and update Founder and Team records. The UI exposes archive rather than hard deletion.
- Existing public policies continue to expose published content only.

Founder policies and the Storage bucket are introduced by `20260831200000_add_people_cms_and_storage.sql`. Object-read access required for controlled replacement and removal is introduced by `20260831201000_add_people_storage_admin_read.sql`. The earlier Team policies remain in effect.

## People records

The CMS provides separate Founder and Team tabs with list, create, and edit flows. Each record uses numeric ordering and the canonical `draft`, `published`, or `archived` status. Founder records additionally support description and optional contact fields consumed by the public presentation.

The write layer fixes `member_type` from the selected tab; administrators do not enter or change it manually. Queries and updates retain the group filter to prevent cross-group leakage.

## Photo lifecycle

The public `people` bucket accepts CMS-managed objects only under:

- `founder/`
- `team/`

Allowed formats are JPG, PNG, WebP, and AVIF, with a 5 MB maximum enforced by both the CMS validation and bucket configuration.

Photo selection, replacement, and removal are staged locally. No Storage or database mutation occurs until Save.

On replacement, the new object is uploaded, the database reference is updated, and only then may the previous CMS-managed object be removed. On removal, the database reference is cleared before object cleanup. This database-first order avoids leaving a published record pointing to a deleted object.

Only references using `storage://people/` are considered CMS-managed and eligible for cleanup. Bundled paths resolved through `src/content/media.ts`, external URLs, and other legacy references are never deleted by CMS.

## Public rendering

Published Founder and Team records are read through the shared typed content layer. Managed Storage references are resolved to public bucket URLs; bundled legacy paths continue through the presentation media map. Missing or unusable photo references render a safe empty-photo state on Home and About.

## Verification state

Issue #19 migrations are applied in production. Authenticated CMS isolation, staging and validation flows, responsive layouts, public rendering, CI, Netlify preview, production deployment, and TLS were verified. Production profile data was deliberately left unchanged during smoke testing.
