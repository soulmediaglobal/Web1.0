import { supabaseCms } from '../lib/supabaseCms'
import type { WorkCaseStudy, WorkCaseStudyInput, WorkSystemPoint, WorkTestimonial } from './types'

export const workImageBucket = 'work'
export const workImagePrefix = 'storage://work/'
const columns = 'id,slug,number,category,sector,type,client,name,summary,image_url,image_alt,featured,challenge,status,sort_order,published_at,updated_at,case_study_tags(tag),case_study_system_points(id,title,description,sort_order),case_study_testimonials(quote,author,role)'
type WorkRow = Omit<WorkCaseStudy, 'tags' | 'system_points' | 'testimonial'> & { case_study_tags: { tag: string }[]; case_study_system_points: WorkSystemPoint[]; case_study_testimonials: WorkTestimonial | WorkTestimonial[] | null }

function client() { if (!supabaseCms) throw new Error('CMS is not configured.'); return supabaseCms }
function mapRow(row: WorkRow): WorkCaseStudy {
  const testimonial = Array.isArray(row.case_study_testimonials) ? row.case_study_testimonials[0] ?? null : row.case_study_testimonials
  return { ...row, tags: row.case_study_tags.map(({ tag }) => tag).sort(), system_points: [...row.case_study_system_points].sort((a, b) => a.sort_order - b.sort_order), testimonial, case_study_tags: undefined, case_study_system_points: undefined, case_study_testimonials: undefined } as unknown as WorkCaseStudy
}
export function workImagePath(reference: string | null) { return reference?.startsWith(workImagePrefix) ? reference.slice(workImagePrefix.length) : null }

export async function listWork(): Promise<WorkCaseStudy[]> {
  const { data, error } = await client().from('case_studies').select(columns).order('sort_order').order('slug')
  if (error) throw error
  return ((data ?? []) as unknown as WorkRow[]).map(mapRow)
}

export async function saveWork(input: WorkCaseStudyInput, existing: WorkCaseStudy | null, imageFile: File | null, removeImage: boolean) {
  let uploadedPath: string | null = null
  let nextImage = removeImage ? null : input.image_url
  if (imageFile) {
    const extension = ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' } as Record<string, string>)[imageFile.type]
    uploadedPath = `case-studies/${crypto.randomUUID()}.${extension}`
    const { error } = await client().storage.from(workImageBucket).upload(uploadedPath, imageFile, { contentType: imageFile.type, upsert: false })
    if (error) throw error
    nextImage = `${workImagePrefix}${uploadedPath}`
  }
  try {
    const content = { slug: input.slug, number: input.number, category: input.category, sector: input.sector, type: input.type, client: input.client, name: input.name, summary: input.summary, image_url: nextImage, image_alt: input.image_alt, featured: input.featured, challenge: input.challenge, status: input.status, sort_order: input.sort_order }
    const { data: id, error: saveError } = await client().rpc('save_work_case_study', { p_id: existing?.id ?? null, p_content: content, p_tags: input.tags, p_points: input.system_points, p_testimonial: input.testimonial })
    if (saveError) throw saveError
    const previousPath = workImagePath(existing?.image_url ?? null)
    if (previousPath && previousPath !== uploadedPath && (removeImage || uploadedPath)) await client().storage.from(workImageBucket).remove([previousPath])
    const { data, error } = await client().from('case_studies').select(columns).eq('id', id as string).single()
    if (error) throw error
    return mapRow(data as unknown as WorkRow)
  } catch (error) {
    if (uploadedPath) await client().storage.from(workImageBucket).remove([uploadedPath])
    throw error
  }
}
