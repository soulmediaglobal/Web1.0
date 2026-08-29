# Supabase Public Content Runtime

The public website uses the browser-safe Supabase publishable key and `select` operations only. `ContentProvider` loads one snapshot for each content domain on page load, while `api.ts` owns database response transformation and deterministic child ordering. Components receive presentation-ready typed content through the shared context.

Supabase is the canonical runtime source. There is no static editorial fallback. The small `media.ts` map preserves the existing bundled Phase 1 assets until a separate Supabase Storage task is approved.

## Published domains

- `case_studies`, `case_study_tags`, `case_study_system_points`, and optional `case_study_testimonials`
- `solutions` and `solution_capabilities`
- `leadership`
- `pages` metadata
- Namespaced `site_content`

Parent and child visibility is enforced by the existing anonymous RLS policies. Runtime queries also order parent records by `sort_order` followed by a stable key (`slug`, `key`, or `name`). Child rows are sorted by `sort_order` and `id` in the transformation layer.

## Site content key registry

All keys are typed in `src/content/types.ts`. Missing keys fall back only to structural UI copy so the relevant section remains usable; domain records never fall back to a parallel static dataset.

| Key | Required | Consumer |
| --- | --- | --- |
| `shared.footer.tagline` | Optional | Global footer |
| `shared.footer.practice` | Optional | Global footer |
| `shared.footer.location` | Optional | Global footer |
| `home.services.eyebrow` | Optional | Home Services |
| `home.services.title` | Optional | Home Services |
| `home.services.description` | Optional | Home Services |
| `home.work.eyebrow` | Optional | Home Selected Work |
| `home.work.title` | Optional | Home Selected Work |
| `home.work.description` | Optional | Home Selected Work |
| `home.leadership.eyebrow` | Optional | Home Leadership |
| `home.leadership.title` | Optional | Home Leadership |
| `home.leadership.description` | Optional | Home Leadership |
| `solutions.intro` | Optional | Solutions page |
| `work.intro` | Optional | Work page |

## Controlled states

- Missing environment configuration and query/network failures render an error state without breaking the application shell.
- Missing required domain rows render an empty state.
- Loading renders an announced loading state.
- Invalid, draft, archived, or missing work slugs render an explicit case-study not-found state.
- Error details are visible only in development.

## Environment

Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in local, CI, preview, and production environments. Never expose a secret or service-role key to Vite/browser code.
