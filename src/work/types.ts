export type WorkStatus = 'draft' | 'published' | 'archived'
export type WorkSystemPoint = { id?: string; title: string; description: string; sort_order: number }
export type WorkTestimonial = { quote: string; author: string; role: string }
export type WorkCaseStudy = {
  id: string; slug: string; number: string; category: string; sector: string; type: string; client: string; name: string
  summary: string; image_url: string | null; image_alt: string | null; featured: boolean; challenge: string; status: WorkStatus
  sort_order: number; published_at: string | null; updated_at: string; tags: string[]; system_points: WorkSystemPoint[]; testimonial: WorkTestimonial | null
}
export type WorkCaseStudyInput = Omit<WorkCaseStudy, 'id' | 'published_at' | 'updated_at'>
