# Redesign Work Index with Cinematic Reveal Layout

**GitHub Issue:** [#29 — Redesign Work index with Cinematic Reveal layout](https://github.com/soulmediaglobal/Web1.0/issues/29)

**Status:** Implementation complete — Ray approved on 2026-09-01

## Target Persona

Prospective clients and decision-makers evaluating Soul Media Global through its portfolio.

## Goal

Turn the `/work` index into a curated, image-led editorial experience with stable full-width compositions and clearer case-study affordance.

## Scope

- Equal-height cards within deterministic desktop rows.
- Curated 12-column recipes including `7+5`, `3+5+4`, and `5+7`.
- Dark, slightly enlarged and desaturated default imagery with a subtle desktop reveal.
- Always-visible client/category, project number, title, and case-study action.
- Reduced information density for narrow cards.
- Stable gap-free tablet rows and uniform full-width mobile cards.
- Visible mobile previews and reduced-motion support.
- Existing filters, published content, navigation, colors, and typography.

## Out of Scope

- Work CMS, CRUD, migrations, or database redesign.
- Work Detail or unrelated public routes.
- New dependencies.
- New testimonials, metrics, or other invented content.

## Product Decisions

- A final single project occupies a full desktop row.
- Curated 12-column recipes begin at `1200px`; tablet rows divide their available width evenly.
- Narrow desktop cards omit the summary while retaining essential metadata and affordance.

## Acceptance Criteria

- Every row fills its container without masonry, row spans, or holes.
- Desktop card height is consistent and positions do not change across refreshes.
- Essential information never depends on hover.
- Desktop hover clarifies imagery, settles scale, and reveals the concise preview upward.
- Mobile cards are uniform, full-width, single-column, and show their previews directly.
- Motion is subtle and respects `prefers-reduced-motion`.
- Desktop, tablet, and mobile layouts pass verification.

## Completion Verification

- `git diff --check`, `npm run lint`, and `npm run build` passed; build retained the existing non-blocking bundle-size warning.
- Browser verification passed at 1440 px desktop, 900 px tablet, and 390 px mobile widths without horizontal overflow or console errors.
- Desktop rendered the approved `7+5`, `3+5+4`, and `5+7` row sequence with equal card heights.
- Tablet rows remained gap-free, mobile cards were uniform with visible previews, and a single filtered result occupied a full-width row.
- Ray manually reviewed and approved the local implementation.
- Load More remains a future high-volume portfolio enhancement outside Issue #29.
