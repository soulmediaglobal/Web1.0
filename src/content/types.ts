export type ContentStatus = 'loading' | 'ready' | 'empty' | 'error'
export type SystemPoint = { title: string; desc: string }
export type Testimonial = { quote: string; author: string; role: string }
export type CaseStudy = {
  id: string; slug: string; number: string; filterTags: string[]; category: string; sector: string; type: string
  client: string; name: string; summary: string; image: string; imageAlt: string; featured: boolean; challenge: string
  systemPoints: SystemPoint[]; testimonial?: Testimonial
}
export type Solution = { id: string; key: string; num: string; numLabel: string; shortTitle: string; title: string; desc: string; chips: string[] }
export type Leader = { id: string; number: string; name: string; role: string; description: string; image: string; imageAlt: string }
export type PageMetadata = { slug: string; title: string }
export const siteContentKeys = [
  'shared.footer.tagline', 'shared.footer.practice', 'shared.footer.location',
  'home.services.eyebrow', 'home.services.title', 'home.services.description',
  'home.work.eyebrow', 'home.work.title', 'home.work.description',
  'home.leadership.eyebrow', 'home.leadership.title', 'home.leadership.description',
  'solutions.intro', 'work.intro',
] as const
export type SiteContentKey = (typeof siteContentKeys)[number]
export type SiteContent = Partial<Record<SiteContentKey, string>>
export type ContentSnapshot = { caseStudies: CaseStudy[]; solutions: Solution[]; leadership: Leader[]; pages: PageMetadata[]; siteContent: SiteContent }
