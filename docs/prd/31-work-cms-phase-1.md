# Work CMS Phase 1

## Objective

Add the minimum protected CMS capability required to create and maintain Work case studies already consumed by the public website, while preserving the approved public Work experience and existing Supabase content model.

## Target Persona

An active Soul Media Global CMS administrator who maintains portfolio and case-study content without editing application code.

## Problem / Need

Published Work content already lives in Supabase and is consumed by `/work`, `/work/:slug`, and Home Selected Work, but administrators cannot manage it through the existing protected CMS. Content changes currently require database or code-level intervention.

## In Scope

- Add Work navigation and a responsive case-study list to the existing CMS shell.
- List draft, published, and archived case studies in `sort_order` order.
- Create and edit all fields already consumed publicly: slug, number, category, sector, type, client, name, summary, image, image alt text, featured state, challenge, filter tags, ordered system points, optional testimonial, sort order, and status.
- Use archive as the non-destructive removal path; hard delete is not included.
- Allow editable slugs with a clear warning that changing a published slug changes its public URL; redirect history is not included.
- Require an image, image alt text, and at least one system point before publishing; drafts may remain incomplete.
- Keep project number editorially controlled and independent from sort order.
- Normalize filter tags to lowercase kebab-case without adding a separate taxonomy manager.
- Keep featured count unrestricted and preserve the current Home behavior.
- Add a public `work` Storage bucket for JPG, PNG, WebP, and AVIF case-study images up to 5 MB.
- Support staged image upload, replacement, and removal. Never delete bundled legacy assets; only CMS-managed Storage objects are eligible for cleanup.
- Add active-admin RLS policies for CMS reads and writes on case studies and their three relation tables, plus scoped Storage object policies.
- Preserve the existing anonymous published-only read boundary.
- Preserve current public ordering, filters, featured selection, adjacent navigation, routes, content presentation, responsive behavior, and Cinematic Reveal design.
- Add focused documentation and verification for the Work CMS data and media lifecycle.

## Out of Scope

- Any visual or interaction redesign of `/work`, `/work/:slug`, or unrelated public routes.
- Load More, pagination, filter redesign, or public data-fetch redesign.
- Hard delete, recycle bin, redirects for changed slugs, revisions, autosave, scheduled publishing, preview environments, or multi-stage approval.
- Rich text, block editing, page builders, galleries, video, cropping, focal-point editing, or a general media library.
- Additional CMS roles, enterprise permissions, analytics, CRM, SEO tooling, or unrelated content modules.
- Broad database redesign or new application frameworks.

## Security Architecture

- **Role:** only authenticated users with active `admin` membership in `public.cms_users`.
- **Permissions:** active admins may read, create, and update case studies and manage their tags, system points, optional testimonial, and Work media. Publish and unpublish are represented by controlled status updates. Hard delete is unavailable.
- **Security boundary:** the browser uses the existing authenticated Supabase CMS client; RLS remains authoritative for table access; no service-role credential is exposed to the browser.
- **Public boundary:** anonymous users retain published-only access to case studies and relations.
- **Storage boundary:** the public `work` bucket serves published media, while active admins alone receive scoped object select, insert, update, and delete policies.
- **Media lifecycle:** upload is staged, the database reference is saved before superseded managed media is removed, failed saves clean up newly uploaded objects, and bundled asset references are never deleted.

## Expected Behavior / Acceptance Criteria

- An active admin can open Work from the existing CMS navigation and see every case study with identifying metadata, order, featured state, and status.
- An active admin can create a draft, edit an existing published case study, and archive or republish it.
- Validation prevents publishing without all public-required fields, an image with alt text, and at least one complete system point.
- Tags and ordered system points can be added, edited, reordered, and removed in the editor.
- Testimonial fields behave as one optional complete group; partial testimonials cannot be saved as published content.
- A valid case-study image can be uploaded, previewed, replaced, or removed using the established staged-media pattern.
- Existing bundled project images remain usable until explicitly replaced and are never removed by the CMS.
- Slug uniqueness errors and slug-change consequences are communicated clearly.
- Status transitions maintain `published_at` consistently with existing CMS patterns.
- Anonymous users cannot read drafts or archived Work content and cannot perform table or Storage writes.
- `/work`, `/work/:slug`, and Home Selected Work retain their approved output and behavior for unchanged content.
- Lint and production build pass, and authenticated CMS plus public regression checks cover desktop and mobile behavior.

## Recommended Implementation Sequence

1. Add Work table and relation RLS plus scoped Work Storage migration.
2. Add typed Work CMS models and data/media operations.
3. Add Work list and editor to the existing CMS shell.
4. Extend media resolution for managed Work images while retaining bundled mappings.
5. Verify authorization, validation, media lifecycle, relation editing, and public regressions.
6. Complete approval, changelog, metrics, CI, PR, and merge-ready workflow.

## Relevant Constraints

- Issue #29 / PR #30 is closed; Cinematic Reveal is the immutable public visual baseline for this task.
- Reuse the existing React, TypeScript, Supabase, TailAdmin CMS, authentication, authorization, and component patterns.
- Do not add dependencies unless a demonstrated requirement cannot be met by the current stack.
