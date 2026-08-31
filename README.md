# Soul Media Global Website

Official website and protected content-management application for Soul Media Global. The public experience presents the company, capabilities, selected work, case studies, founders, team, and contact flow at [soulmedia.id](https://soulmedia.id).

## Application

- Public routes: `/`, `/solutions`, `/work`, `/work/:slug`, `/about`, and `/contact`.
- Protected CMS routes: `/cms`, including People management and contact inquiries.
- Frontend: React 19, TypeScript, Vite, React Router, and Tailwind CSS.
- Backend: Supabase database, authentication, Row Level Security, Storage, and Edge Functions.
- Hosting and delivery: GitHub CI and Netlify.

## Local development

Create `.env.local` from `.env.example` and provide the browser-safe Supabase project values. Never expose a Supabase service-role key through a `VITE_` variable.

```bash
npm install
npm run dev
```

Quality gates:

```bash
npm run lint
npm run build
```

## Content and CMS

Supabase is the canonical runtime source for published content. Public reads use the publishable key and Row Level Security. CMS access additionally requires an authenticated user with active `admin` membership in `public.cms_users`.

People CMS manages Founder and Team records independently. Photo changes are staged until Save and accept JPG, PNG, WebP, or AVIF files up to 5 MB. CMS-managed photos use the public `people` bucket under `founder/` and `team/`; bundled legacy assets remain repository-owned and are never deleted by CMS.

See:

- [`Development-Rules.md`](Development-Rules.md) for canonical project rules and current state.
- [`CHANGELOG.md`](CHANGELOG.md) for release history.
- [`docs/architecture/supabase-content-runtime.md`](docs/architecture/supabase-content-runtime.md) for public content delivery.
- [`docs/architecture/people-cms-and-storage.md`](docs/architecture/people-cms-and-storage.md) for People CMS and photo lifecycle.
- [`docs/architecture/contact-inquiry-flow.md`](docs/architecture/contact-inquiry-flow.md) for inquiry submission and administration.
- [`docs/prd/`](docs/prd/) for approved product requirements.

## Database changes

Supabase migrations are stored in `supabase/migrations/` and must be applied in filename order. Issue #19 introduced:

- `20260831200000_add_people_cms_and_storage.sql`
- `20260831201000_add_people_storage_admin_read.sql`

Both migrations are applied to the production Supabase project.

## Deployment

Pull requests must pass dependency installation, lint, and production build checks. Netlify provides deploy previews and serves production from the apex domain; `www.soulmedia.id` redirects to `soulmedia.id`.
