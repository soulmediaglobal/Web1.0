# Connect Public Website to Supabase CMS Content

**GitHub Issue:** [#5 — Connect public website to Supabase CMS content](https://github.com/soulmediaglobal/Web1.0/issues/5)  
**Status:** Complete

## Objective

Connect the published public website to the existing Supabase CMS database foundation so approved editorial content is read from Supabase instead of duplicated hardcoded/static frontend sources, while preserving the current design, routes, interactions, accessibility, and responsive behavior.

## Target Persona

- Soul Media Global content/website operators who need portfolio, solutions, leadership, and essential website copy to update without a frontend deployment.
- Public visitors who need current, consistent content.
- Developers who need one typed runtime content source.

## Problem / Need

The public website still reads content from TypeScript arrays, constants, and JSX. Case studies, featured work, solutions, leadership, filters, and page/shared copy are duplicated across consumers. The Supabase schema and anonymous published-content read foundation exist, but the frontend does not use them.

## Scope

- Add a typed Supabase read/data-access layer separating database responses, transformation, and presentation.
- Integrate published:
  - `case_studies`, tags, system points, and optional testimonials for Work index/detail.
  - Featured case studies for Home Selected Work from the same case-study dataset.
  - `solutions` and capabilities for Home Services and Solutions.
  - `leadership` for Home and About.
  - Essential approved page/shared copy via `pages` metadata and documented namespaced `site_content` keys.
- Reuse one dataset per content domain and remove duplicate independent hardcoded datasets after rollout.
- Preserve slugs, ordering, wording, featured state, alt text, relations, and existing media paths/approved hosted asset URLs for Phase 1.
- Derive Work filters from published tags where practical; use only a small presentation mapping if the existing design requires curated order or labels.
- Handle loading, empty, missing-record, configuration-error, and query-error states without crashing the application shell.
- Allow an explicit temporary static fallback only as a rollout safety net. Supabase becomes the canonical runtime source after cutover; do not retain a permanent parallel source.
- Use straightforward route/page-load reads. Do not add unnecessary cache/revalidation architecture without a demonstrated need.
- Seed/migrate only content already approved for public display; do not publish unreviewed draft claims.

## Out of Scope

- CMS Admin UI/dashboard.
- Authentication, roles, or user management.
- CMS write operations: create, update, delete, publish, or unpublish.
- Supabase Storage or media upload/replacement/deletion/management.
- Contact inquiry persistence or email delivery.
- Visual redesign, new routes, navigation changes, or animation overhaul.
- Analytics, personalization, localization, search, preview mode, or editorial version history.
- Governance or Development-Rules changes.

## Acceptance Criteria

- [ ] Public frontend reads published case studies, featured work, solutions/capabilities, leadership, and approved essential site/page copy from Supabase.
- [ ] Published content changes appear without rebuilding/redeploying the frontend, at least on the next visit/reload.
- [ ] Draft/archived parent records and their child records are not exposed anonymously.
- [ ] Ordering uses `sort_order` plus deterministic secondary ordering.
- [ ] `/work` shows the actual published count, tag-derived filtering, and existing featured/standard layout.
- [ ] `/work/:slug` loads the matching published case study, system points, optional testimonial, and adjacent navigation.
- [ ] Invalid, missing, draft, or archived slugs render an explicit not-found state and do not silently redirect to `/work`.
- [ ] Home Selected Work, Services/Solutions, and Home/About Leadership reuse their respective canonical datasets.
- [ ] Required/optional `site_content` keys are documented and typed; missing optional content does not break sections or cause runtime errors.
- [ ] Missing required content, invalid/missing Supabase configuration, empty tables, and network/query failures produce controlled states and keep the application shell healthy.
- [ ] All six existing routes retain their visual hierarchy, layout, responsive behavior, interactions, keyboard behavior, and reduced-motion behavior.
- [ ] Existing image paths/URLs, alt text, lazy loading, and aspect treatment continue to work.
- [ ] Browser uses only the public/publishable Supabase client and read operations; no privileged credential is shipped.
- [ ] Supabase is canonical after rollout; duplicate static domain datasets and temporary fallback are removed or tracked for immediate removal after verified stabilization.
- [ ] Initial CMS data has parity with the currently published website, excluding unapproved drafts.
- [ ] `npm ci`, lint, TypeScript/production build, CI, route-level manual checks, and browser-console verification pass.

## Dependencies / Constraints

- Follow the latest `Development-Rules.md` workflow: issue → dedicated branch → pre-work verification → implementation → testing → Ray approval → changelog → commit/push → CI/merge-ready verification.
- Verify the remote Supabase schema, RLS/public policies, and actual content before cutover.
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` must be configured in local, preview, CI, and production.
- Product owner must approve the initial production dataset, namespaced `site_content` key registry, and content ownership boundary.
- `site_content` has no draft/published lifecycle; store only approved public copy there in this phase.
- Preserve existing public URLs and case-study slugs.
- Use the existing React/TypeScript/Vite/Supabase stack and visual system; add no CMS framework, state library, backend, or dependency without a clear need.
- Keep structural UI/accessibility labels, animation configuration, geometry, styles, and layout constants in code.

## Rollout / Testing Notes

1. Inventory remote schema/content and verify anonymous publication behavior.
2. Define typed content contracts and namespaced content-key registry.
3. Seed current approved public content and verify parity against the static baseline.
4. Enable reads in preview/staging, including explicit error/not-found states.
5. Test published/draft/archived visibility, empty/optional relations, configuration/network failures, ordering conflicts, filters, featured selection, adjacent navigation, and missing/broken media.
6. Verify every route on desktop, tablet, and mobile, including keyboard and reduced motion.
7. Cut over production with temporary fallback only if needed; monitor query, key, image, and route failures.
8. After stability is verified, remove fallback/duplicate data so Supabase remains canonical.
