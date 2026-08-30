import { supabase, supabaseConfigurationError } from '../lib/supabase'
import { resolveMedia } from './media'
import { siteContentKeys, type CaseStudy, type ContentSnapshot, type Leader, type PeopleGroup, type SiteContent, type SiteContentKey, type Solution } from './types'
type Ordered = { sort_order: number; id: string }
type CaseStudyRow = { id: string; slug: string; number: string; category: string; sector: string; type: string; client: string; name: string; summary: string; image_url: string | null; image_alt: string | null; featured: boolean; challenge: string; case_study_tags: { tag: string }[]; case_study_system_points: (Ordered & { title: string; description: string })[]; case_study_testimonials: { quote: string; author: string; role: string } | null }
type SolutionRow = { id: string; key: string; number: string; number_label: string; short_title: string; title: string; description: string; solution_capabilities: (Ordered & { label: string })[] }
type LeaderRow = { id: string; number: string; name: string; role: string; description: string | null; image_url: string | null; image_alt: string | null; member_type?: PeopleGroup | null; email?: string | null; linkedin_url?: string | null }
const byOrderThenId = (a: Ordered, b: Ordered) => a.sort_order - b.sort_order || a.id.localeCompare(b.id)

async function loadPublishedContent(): Promise<ContentSnapshot> {
  if (!supabase) throw new Error(supabaseConfigurationError ?? 'Supabase is not configured.')
  const [caseResult, solutionResult, leadershipResult, pagesResult, contentResult] = await Promise.all([
    supabase.from('case_studies').select('*,case_study_tags(tag),case_study_system_points(id,title,description,sort_order),case_study_testimonials(quote,author,role)').order('sort_order').order('slug'),
    supabase.from('solutions').select('*,solution_capabilities(id,label,sort_order)').order('sort_order').order('key'),
    supabase.from('leadership').select('*').order('sort_order').order('name'),
    supabase.from('pages').select('slug,title').order('sort_order').order('slug'),
    supabase.from('site_content').select('key,value').in('key', [...siteContentKeys]).order('key'),
  ])
  const failure = [caseResult, solutionResult, leadershipResult, pagesResult, contentResult].find((result) => result.error)
  if (failure?.error) throw new Error(failure.error.message)
  const caseStudies = ((caseResult.data ?? []) as CaseStudyRow[]).map<CaseStudy>((row) => ({
    id: row.id, slug: row.slug, number: row.number, filterTags: row.case_study_tags.map(({ tag }) => tag).sort(), category: row.category,
    sector: row.sector, type: row.type, client: row.client, name: row.name, summary: row.summary, image: resolveMedia(row.image_url),
    imageAlt: row.image_alt ?? '', featured: row.featured, challenge: row.challenge,
    systemPoints: [...row.case_study_system_points].sort(byOrderThenId).map((point) => ({ title: point.title, desc: point.description })),
    testimonial: row.case_study_testimonials ?? undefined,
  }))
  const solutions = ((solutionResult.data ?? []) as SolutionRow[]).map<Solution>((row) => ({ id: row.id, key: row.key, num: row.number, numLabel: row.number_label, shortTitle: row.short_title, title: row.title, desc: row.description, chips: [...row.solution_capabilities].sort(byOrderThenId).map(({ label }) => label) }))
  const leadership = ((leadershipResult.data ?? []) as LeaderRow[]).map<Leader>((row) => ({ id: row.id, number: row.number, name: row.name, role: row.role, description: row.description ?? '', image: resolveMedia(row.image_url), imageAlt: row.image_alt ?? row.name, group: row.member_type === 'team' ? 'team' : 'founder', email: row.email ?? undefined, linkedinUrl: row.linkedin_url ?? undefined }))
  const siteContent = Object.fromEntries((contentResult.data ?? []).filter((row) => siteContentKeys.includes(row.key as SiteContentKey) && typeof row.value === 'string').map(({ key, value }) => [key, value])) as SiteContent
  return { caseStudies, solutions, leadership, pages: pagesResult.data ?? [], siteContent }
}

let contentRequest: Promise<ContentSnapshot> | null = null
export function fetchPublishedContent(): Promise<ContentSnapshot> {
  contentRequest ??= loadPublishedContent()
  return contentRequest
}
