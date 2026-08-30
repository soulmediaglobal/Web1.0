export type TeamMemberStatus = 'draft' | 'published' | 'archived'

export type TeamMember = {
  id: string
  name: string
  role: string
  image_url: string | null
  image_alt: string | null
  linkedin_url: string | null
  sort_order: number
  status: TeamMemberStatus
  member_type: 'team'
  published_at: string | null
  updated_at: string
}

export type TeamMemberInput = Pick<TeamMember, 'name' | 'role' | 'image_url' | 'image_alt' | 'linkedin_url' | 'sort_order' | 'status'>
