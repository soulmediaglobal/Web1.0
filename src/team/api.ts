import { supabaseCms } from '../lib/supabaseCms'
import type { TeamMember, TeamMemberInput } from './types'

const teamColumns = 'id,name,role,image_url,image_alt,linkedin_url,sort_order,status,member_type,published_at,updated_at'

function requireCmsClient() {
  if (!supabaseCms) throw new Error('CMS is not configured.')
  return supabaseCms
}

export async function listTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await requireCmsClient()
    .from('leadership')
    .select(teamColumns)
    .eq('member_type', 'team')
    .order('sort_order')
    .order('name')

  if (error) throw error
  return (data ?? []) as TeamMember[]
}

export async function createTeamMember(input: TeamMemberInput): Promise<TeamMember> {
  const publishedAt = input.status === 'published' ? new Date().toISOString() : null
  const { data, error } = await requireCmsClient()
    .from('leadership')
    .insert({ ...input, number: String(input.sort_order).padStart(2, '0'), member_type: 'team', description: null, email: null, published_at: publishedAt })
    .select(teamColumns)
    .single()

  if (error) throw error
  return data as TeamMember
}

export async function updateTeamMember(id: string, input: TeamMemberInput, previousStatus: TeamMember['status']): Promise<TeamMember> {
  const publishedAt = input.status === 'published' && previousStatus !== 'published' ? new Date().toISOString() : input.status === 'published' ? undefined : null
  const { data, error } = await requireCmsClient()
    .from('leadership')
    .update({ ...input, number: String(input.sort_order).padStart(2, '0'), ...(publishedAt !== undefined ? { published_at: publishedAt } : {}) })
    .eq('id', id)
    .eq('member_type', 'team')
    .select(teamColumns)
    .single()

  if (error) throw error
  return data as TeamMember
}
