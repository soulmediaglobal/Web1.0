export type PeopleGroup = 'founder' | 'team'
export type PersonStatus = 'draft' | 'published' | 'archived'

export type Person = {
  id: string
  name: string
  role: string
  description: string | null
  email: string | null
  image_url: string | null
  image_alt: string | null
  linkedin_url: string | null
  sort_order: number
  status: PersonStatus
  member_type: PeopleGroup
  published_at: string | null
  updated_at: string
}

export type PersonInput = Pick<Person, 'name' | 'role' | 'description' | 'email' | 'image_url' | 'image_alt' | 'linkedin_url' | 'sort_order' | 'status'>
