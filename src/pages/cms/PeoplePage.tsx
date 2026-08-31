import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { ArrowLeft, ImageOff, Pencil, Plus, Trash2, Users } from 'lucide-react'
import { Button } from '../../cms/components/Button'
import { InputField } from '../../cms/components/InputField'
import { resolveMedia } from '../../content/media'
import { listPeople, savePerson } from '../../people/api'
import type { PeopleGroup, Person, PersonInput, PersonStatus } from '../../people/types'

type FormErrors = Partial<Record<keyof PersonInput | 'photo', string>>
const statuses: PersonStatus[] = ['draft', 'published', 'archived']
const acceptedPhotoTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const maxPhotoBytes = 5 * 1024 * 1024
const emptyForm: PersonInput = { name: '', role: '', description: '', email: '', image_url: null, image_alt: '', linkedin_url: '', sort_order: 0, status: 'draft' }

function isValidHttpUrl(value: string) {
  try { const url = new URL(value); return url.protocol === 'http:' || url.protocol === 'https:' } catch { return false }
}

function validate(input: PersonInput, group: PeopleGroup, hasPhoto: boolean): FormErrors {
  const errors: FormErrors = {}
  if (!input.name.trim()) errors.name = 'Name is required.'
  if (!input.role.trim()) errors.role = 'Role / title is required.'
  if (group === 'founder' && !input.description?.trim()) errors.description = 'Founder description is required.'
  if (input.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) errors.email = 'Enter a valid email address.'
  if (input.linkedin_url?.trim() && !isValidHttpUrl(input.linkedin_url)) errors.linkedin_url = 'Enter a valid http(s) URL.'
  if (hasPhoto && !input.image_alt?.trim()) errors.image_alt = 'Alt text is required when a photo is present.'
  if (!Number.isInteger(input.sort_order) || input.sort_order < 0) errors.sort_order = 'Sort order must be a whole number of 0 or greater.'
  return errors
}

function PersonForm({ group, person, onCancel, onSaved }: { group: PeopleGroup; person: Person | null; onCancel: () => void; onSaved: (person: Person) => void }) {
  const [form, setForm] = useState<PersonInput>(() => person ? { name: person.name, role: person.role, description: person.description ?? '', email: person.email ?? '', image_url: person.image_url, image_alt: person.image_alt ?? '', linkedin_url: person.linkedin_url ?? '', sort_order: person.sort_order, status: person.status } : emptyForm)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [removePhoto, setRemovePhoto] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const photoInput = useRef<HTMLInputElement>(null)
  const stagedPreview = useMemo(() => photoFile ? URL.createObjectURL(photoFile) : '', [photoFile])
  const photoPreview = stagedPreview || (removePhoto ? '' : resolveMedia(form.image_url))

  useEffect(() => () => { if (stagedPreview) URL.revokeObjectURL(stagedPreview) }, [stagedPreview])

  const setField = <K extends keyof PersonInput>(field: K, value: PersonInput[K]) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!acceptedPhotoTypes.includes(file.type)) { setErrors((current) => ({ ...current, photo: 'Use JPG, PNG, WebP, or AVIF.' })); return }
    if (file.size > maxPhotoBytes) { setErrors((current) => ({ ...current, photo: 'Photo must be 5 MB or smaller.' })); return }
    setPhotoFile(file); setRemovePhoto(false); setErrors((current) => ({ ...current, photo: undefined }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const normalized: PersonInput = { ...form, name: form.name.trim(), role: form.role.trim(), description: form.description?.trim() || null, email: form.email?.trim() || null, image_alt: form.image_alt?.trim() || null, linkedin_url: form.linkedin_url?.trim() || null }
    const nextErrors = validate(normalized, group, Boolean(photoFile || (!removePhoto && form.image_url)))
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return }
    setSaving(true); setSaveError(null)
    try { onSaved(await savePerson(group, normalized, person, photoFile, removePhoto)) }
    catch (error) { setSaveError(error instanceof Error ? error.message : `Unable to save this ${group}.`) }
    finally { setSaving(false) }
  }

  const label = group === 'founder' ? 'Founder' : 'Team member'
  return <section>
    <Button variant="outline" onClick={onCancel} startIcon={<ArrowLeft size={17} />}>Back to {group === 'founder' ? 'Founders' : 'Team'}</Button>
    <form className="cms-editor-card" onSubmit={handleSubmit} noValidate>
      <div className="cms-page-heading"><p className="cms-eyebrow">People · {group}</p><h1>{person ? `Edit ${label}` : `Add ${label}`}</h1><p>Classification is fixed to {group}. Archive the profile when it should no longer appear publicly.</p></div>
      <div className="cms-photo-editor">
        <div className="cms-photo-preview">{photoPreview ? <img src={photoPreview} alt="Current profile preview" /> : <div><ImageOff size={30} /><span>No photo</span></div>}</div>
        <div className="cms-photo-actions"><input ref={photoInput} className="cms-visually-hidden" type="file" accept={acceptedPhotoTypes.join(',')} onChange={handlePhoto} disabled={saving} /><Button variant="outline" onClick={() => photoInput.current?.click()} disabled={saving} startIcon={<Pencil size={16} />}>{photoPreview ? 'Edit photo' : 'Upload photo'}</Button><Button variant="outline" onClick={() => { setPhotoFile(null); setRemovePhoto(true); setErrors((current) => ({ ...current, photo: undefined })) }} disabled={saving || !photoPreview} startIcon={<Trash2 size={16} />}>Remove</Button><p>JPG, PNG, WebP, or AVIF. Maximum 5 MB. Changes apply when the profile is saved.</p>{errors.photo ? <p className="cms-input-hint cms-input-hint--error">{errors.photo}</p> : null}</div>
      </div>
      <div className="cms-form-grid">
        <label className="cms-form-field"><span className="cms-label">Name *</span><InputField value={form.name} onChange={(e) => setField('name', e.target.value)} error={Boolean(errors.name)} hint={errors.name} disabled={saving} /></label>
        <label className="cms-form-field"><span className="cms-label">Role / title *</span><InputField value={form.role} onChange={(e) => setField('role', e.target.value)} error={Boolean(errors.role)} hint={errors.role} disabled={saving} /></label>
        {group === 'founder' ? <label className="cms-form-field cms-form-field--wide"><span className="cms-label">Description *</span><textarea className={`cms-textarea${errors.description ? ' cms-input--error' : ''}`} value={form.description ?? ''} onChange={(e) => setField('description', e.target.value)} disabled={saving} />{errors.description ? <p className="cms-input-hint cms-input-hint--error">{errors.description}</p> : null}</label> : null}
        {group === 'founder' ? <label className="cms-form-field"><span className="cms-label">Email</span><InputField type="email" value={form.email ?? ''} onChange={(e) => setField('email', e.target.value)} error={Boolean(errors.email)} hint={errors.email} disabled={saving} /></label> : null}
        <label className="cms-form-field"><span className="cms-label">LinkedIn URL</span><InputField type="url" value={form.linkedin_url ?? ''} onChange={(e) => setField('linkedin_url', e.target.value)} error={Boolean(errors.linkedin_url)} hint={errors.linkedin_url} disabled={saving} /></label>
        <label className="cms-form-field cms-form-field--wide"><span className="cms-label">Image alt text{photoPreview ? ' *' : ''}</span><InputField value={form.image_alt ?? ''} onChange={(e) => setField('image_alt', e.target.value)} error={Boolean(errors.image_alt)} hint={errors.image_alt ?? 'Describe the person and context briefly.'} disabled={saving} /></label>
        <label className="cms-form-field"><span className="cms-label">Sort order *</span><InputField type="number" value={String(form.sort_order)} onChange={(e) => setField('sort_order', Number(e.target.value))} error={Boolean(errors.sort_order)} hint={errors.sort_order ?? 'Lower numbers appear first.'} disabled={saving} /></label>
        <label className="cms-form-field"><span className="cms-label">Status *</span><select className="cms-select" value={form.status} onChange={(e) => setField('status', e.target.value as PersonStatus)} disabled={saving}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select><p className="cms-input-hint">Only published profiles appear publicly.</p></label>
      </div>
      {saveError ? <p className="cms-alert cms-alert--error" role="alert">{saveError}</p> : null}
      <div className="cms-form-actions"><Button variant="outline" onClick={onCancel} disabled={saving}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? photoFile ? 'Uploading and saving…' : 'Saving…' : person ? 'Save changes' : `Create ${label.toLowerCase()}`}</Button></div>
    </form>
  </section>
}

export function PeoplePage() {
  const [group, setGroup] = useState<PeopleGroup>('founder')
  const [people, setPeople] = useState<Person[]>([])
  const [editing, setEditing] = useState<Person | null | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const load = useCallback(async (nextGroup: PeopleGroup) => { setLoading(true); setError(null); try { setPeople(await listPeople(nextGroup)) } catch { setError(`Unable to load ${nextGroup === 'founder' ? 'Founders' : 'Team members'}.`) } finally { setLoading(false) } }, [])
  useEffect(() => { let active = true; void listPeople(group).then((data) => { if (active) setPeople(data) }).catch(() => { if (active) setError(`Unable to load ${group === 'founder' ? 'Founders' : 'Team members'}.`) }).finally(() => { if (active) setLoading(false) }); return () => { active = false } }, [group])

  const changeGroup = (nextGroup: PeopleGroup) => { setGroup(nextGroup); setEditing(undefined); setSuccess(null); setError(null); setLoading(true) }
  if (editing !== undefined) return <PersonForm group={group} person={editing} onCancel={() => setEditing(undefined)} onSaved={(saved) => { setPeople((current) => [...current.filter(({ id }) => id !== saved.id), saved].sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name))); setEditing(undefined); setSuccess(`${saved.name} was saved successfully.`) }} />

  const groupLabel = group === 'founder' ? 'Founder' : 'Team member'
  return <section>
    <div className="cms-page-heading cms-page-heading--actions"><div><p className="cms-eyebrow">About content</p><h1>People</h1><p>Manage Founder leadership and the Team roster from one protected content area.</p></div><Button onClick={() => { setSuccess(null); setEditing(null) }} startIcon={<Plus size={17} />}>Add {groupLabel}</Button></div>
    <div className="cms-tabs" role="tablist" aria-label="People groups"><button type="button" role="tab" aria-selected={group === 'founder'} className={group === 'founder' ? 'is-active' : ''} onClick={() => changeGroup('founder')}>Founders</button><button type="button" role="tab" aria-selected={group === 'team'} className={group === 'team' ? 'is-active' : ''} onClick={() => changeGroup('team')}>Team</button></div>
    {success ? <p className="cms-alert cms-alert--success" role="status">{success}</p> : null}
    {error ? <div className="cms-state-group"><p className="cms-alert cms-alert--error" role="alert">{error}</p><Button variant="outline" onClick={() => void load(group)}>Try again</Button></div> : null}
    {loading ? <p className="cms-state" role="status">Loading {group === 'founder' ? 'Founders' : 'Team members'}…</p> : null}
    {!loading && !error && people.length === 0 ? <section className="cms-empty-card"><div className="cms-empty-card__icon"><Users size={28} /></div><div><h2>No {group === 'founder' ? 'Founders' : 'Team members'} yet</h2><p>Create a draft profile when its content is ready.</p><Button onClick={() => setEditing(null)} startIcon={<Plus size={17} />}>Add {groupLabel}</Button></div></section> : null}
    {!loading && people.length > 0 ? <div className="cms-table-wrap"><table className="cms-table cms-team-table"><thead><tr><th>Person</th><th>Role</th><th>Photo</th><th>Order</th><th>Status</th></tr></thead><tbody>{people.map((person) => <tr key={person.id} onClick={() => { setSuccess(null); setEditing(person) }} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter') setEditing(person) }}><td><strong>{person.name}</strong><span>{person.image_alt ?? 'No alt text'}</span></td><td>{person.role}</td><td>{person.image_url ? 'Attached' : 'None'}</td><td>{person.sort_order}</td><td><span className={`cms-status cms-status--${person.status}`}>{person.status}</span></td></tr>)}</tbody></table></div> : null}
  </section>
}
