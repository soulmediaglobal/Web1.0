import { supabaseCms } from '../lib/supabaseCms'
import type { PeopleGroup, Person, PersonInput } from './types'

export const peoplePhotoBucket = 'people'
export const peoplePhotoPrefix = 'storage://people/'
const personColumns = 'id,name,role,description,email,image_url,image_alt,linkedin_url,sort_order,status,member_type,published_at,updated_at'

function requireCmsClient() {
  if (!supabaseCms) throw new Error('CMS is not configured.')
  return supabaseCms
}

export function peoplePhotoPath(reference: string | null) {
  return reference?.startsWith(peoplePhotoPrefix) ? reference.slice(peoplePhotoPrefix.length) : null
}

export async function listPeople(group: PeopleGroup): Promise<Person[]> {
  const { data, error } = await requireCmsClient().from('leadership').select(personColumns).eq('member_type', group).order('sort_order').order('name')
  if (error) throw error
  return (data ?? []) as Person[]
}

async function persistPerson(group: PeopleGroup, input: PersonInput, person?: Person) {
  const publishedAt = input.status === 'published' && person?.status !== 'published' ? new Date().toISOString() : input.status === 'published' ? undefined : null
  const values = { ...input, number: String(input.sort_order).padStart(2, '0'), member_type: group, ...(publishedAt !== undefined ? { published_at: publishedAt } : {}) }
  const query = person
    ? requireCmsClient().from('leadership').update(values).eq('id', person.id).eq('member_type', group)
    : requireCmsClient().from('leadership').insert({ ...values, published_at: publishedAt ?? null })
  const { data, error } = await query.select(personColumns).single()
  if (error) throw error
  return data as Person
}

export async function savePerson(group: PeopleGroup, input: PersonInput, person: Person | null, photoFile: File | null, removePhoto: boolean) {
  let uploadedPath: string | null = null
  let nextImageUrl = removePhoto ? null : input.image_url

  if (photoFile) {
    const extension = ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' } as Record<string, string>)[photoFile.type]
    uploadedPath = `${group}/${crypto.randomUUID()}.${extension}`
    const { error } = await requireCmsClient().storage.from(peoplePhotoBucket).upload(uploadedPath, photoFile, { contentType: photoFile.type, upsert: false })
    if (error) throw error
    nextImageUrl = `${peoplePhotoPrefix}${uploadedPath}`
  }

  try {
    const saved = await persistPerson(group, { ...input, image_url: nextImageUrl }, person ?? undefined)
    const previousPath = peoplePhotoPath(person?.image_url ?? null)
    if (previousPath && previousPath !== uploadedPath && (removePhoto || uploadedPath)) {
      await requireCmsClient().storage.from(peoplePhotoBucket).remove([previousPath])
    }
    return saved
  } catch (error) {
    if (uploadedPath) await requireCmsClient().storage.from(peoplePhotoBucket).remove([uploadedPath])
    throw error
  }
}
