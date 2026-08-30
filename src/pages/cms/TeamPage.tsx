import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { ArrowLeft, Plus, Users } from 'lucide-react'
import { Button } from '../../cms/components/Button'
import { InputField } from '../../cms/components/InputField'
import { createTeamMember, listTeamMembers, updateTeamMember } from '../../team/api'
import type { TeamMember, TeamMemberInput, TeamMemberStatus } from '../../team/types'

type FormErrors = Partial<Record<keyof TeamMemberInput, string>>
const statuses: TeamMemberStatus[] = ['draft', 'published', 'archived']
const emptyForm: TeamMemberInput = { name: '', role: '', image_url: '', image_alt: '', linkedin_url: '', sort_order: 0, status: 'draft' }

function isValidUrl(value: string) {
  try { const url = new URL(value); return url.protocol === 'http:' || url.protocol === 'https:' } catch { return false }
}

function validate(input: TeamMemberInput): FormErrors {
  const errors: FormErrors = {}
  if (!input.name.trim()) errors.name = 'Name is required.'
  if (!input.role.trim()) errors.role = 'Role / title is required.'
  if (!input.image_url?.trim()) errors.image_url = 'Photo URL or approved media path is required.'
  else if (!isValidUrl(input.image_url) && !/^[a-z0-9][a-z0-9/_-]*\.[a-z0-9]+$/i.test(input.image_url)) errors.image_url = 'Enter an http(s) URL or a valid media path.'
  if (!input.image_alt?.trim()) errors.image_alt = 'Image alt text is required.'
  if (input.linkedin_url?.trim() && !isValidUrl(input.linkedin_url)) errors.linkedin_url = 'Enter a valid http(s) URL.'
  if (!Number.isInteger(input.sort_order) || input.sort_order < 0) errors.sort_order = 'Sort order must be a whole number of 0 or greater.'
  return errors
}

function TeamForm({ member, onCancel, onSaved }: { member: TeamMember | null; onCancel: () => void; onSaved: (member: TeamMember) => void }) {
  const [form, setForm] = useState<TeamMemberInput>(() => member ? { name: member.name, role: member.role, image_url: member.image_url ?? '', image_alt: member.image_alt ?? '', linkedin_url: member.linkedin_url ?? '', sort_order: member.sort_order, status: member.status } : emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const setField = <K extends keyof TeamMemberInput>(field: K, value: TeamMemberInput[K]) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const normalized = { ...form, name: form.name.trim(), role: form.role.trim(), image_url: form.image_url?.trim() || null, image_alt: form.image_alt?.trim() || null, linkedin_url: form.linkedin_url?.trim() || null }
    const nextErrors = validate(normalized)
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return }
    setSaving(true); setSaveError(null)
    try {
      const saved = member ? await updateTeamMember(member.id, normalized, member.status) : await createTeamMember(normalized)
      onSaved(saved)
    } catch { setSaveError('Unable to save this Team member. Check your access and try again.') }
    finally { setSaving(false) }
  }

  return <section>
    <Button variant="outline" onClick={onCancel} startIcon={<ArrowLeft size={17} />}>Back to Team</Button>
    <form className="cms-editor-card" onSubmit={handleSubmit} noValidate>
      <div className="cms-page-heading"><p className="cms-eyebrow">Team content</p><h1>{member ? 'Edit Team Member' : 'Add Team Member'}</h1><p>Team membership is fixed. Founder records cannot be managed from this screen.</p></div>
      <div className="cms-form-grid">
        <label className="cms-form-field"><span className="cms-label">Name *</span><InputField value={form.name} onChange={(e) => setField('name', e.target.value)} error={Boolean(errors.name)} hint={errors.name} disabled={saving} /></label>
        <label className="cms-form-field"><span className="cms-label">Role / title *</span><InputField value={form.role} onChange={(e) => setField('role', e.target.value)} error={Boolean(errors.role)} hint={errors.role} disabled={saving} /></label>
        <label className="cms-form-field cms-form-field--wide"><span className="cms-label">Photo URL or media path *</span><InputField value={form.image_url ?? ''} onChange={(e) => setField('image_url', e.target.value)} placeholder="https://… or leadership/name.webp" error={Boolean(errors.image_url)} hint={errors.image_url ?? 'Media upload is not configured; use an approved URL or existing media path.'} disabled={saving} /></label>
        <label className="cms-form-field cms-form-field--wide"><span className="cms-label">Image alt text *</span><InputField value={form.image_alt ?? ''} onChange={(e) => setField('image_alt', e.target.value)} error={Boolean(errors.image_alt)} hint={errors.image_alt ?? 'Describe the person and context briefly.'} disabled={saving} /></label>
        <label className="cms-form-field cms-form-field--wide"><span className="cms-label">LinkedIn URL</span><InputField type="url" value={form.linkedin_url ?? ''} onChange={(e) => setField('linkedin_url', e.target.value)} placeholder="https://www.linkedin.com/in/…" error={Boolean(errors.linkedin_url)} hint={errors.linkedin_url} disabled={saving} /></label>
        <label className="cms-form-field"><span className="cms-label">Sort order *</span><InputField type="number" value={String(form.sort_order)} onChange={(e) => setField('sort_order', Number(e.target.value))} error={Boolean(errors.sort_order)} hint={errors.sort_order ?? 'Lower numbers appear first.'} disabled={saving} /></label>
        <label className="cms-form-field"><span className="cms-label">Status *</span><select className="cms-select" value={form.status} onChange={(e) => setField('status', e.target.value as TeamMemberStatus)} disabled={saving}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select><p className="cms-input-hint">Only published members appear on the public About page.</p></label>
      </div>
      {saveError ? <p className="cms-alert cms-alert--error" role="alert">{saveError}</p> : null}
      <div className="cms-form-actions"><Button variant="outline" onClick={onCancel} disabled={saving}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? 'Saving…' : member ? 'Save changes' : 'Create member'}</Button></div>
    </form>
  </section>
}

export function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [editing, setEditing] = useState<TeamMember | null | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true); setError(null)
    try { setMembers(await listTeamMembers()) } catch { setError('Unable to load Team members.') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => {
    let active = true
    void listTeamMembers().then((data) => {
      if (active) setMembers(data)
    }).catch(() => {
      if (active) setError('Unable to load Team members.')
    }).finally(() => {
      if (active) setLoading(false)
    })
    return () => { active = false }
  }, [])

  if (editing !== undefined) return <TeamForm member={editing} onCancel={() => setEditing(undefined)} onSaved={(saved) => { setMembers((current) => [...current.filter(({ id }) => id !== saved.id), saved].sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name))); setEditing(undefined); setSuccess(`${saved.name} was saved successfully.`) }} />

  return <section>
    <div className="cms-page-heading cms-page-heading--actions"><div><p className="cms-eyebrow">About content</p><h1>Team</h1><p>Manage the Team roster shown on the public About page. Founder records are excluded.</p></div><Button onClick={() => { setSuccess(null); setEditing(null) }} startIcon={<Plus size={17} />}>Add Team member</Button></div>
    {success ? <p className="cms-alert cms-alert--success" role="status">{success}</p> : null}
    {error ? <div className="cms-state-group"><p className="cms-alert cms-alert--error" role="alert">{error}</p><Button variant="outline" onClick={() => void load()}>Try again</Button></div> : null}
    {loading ? <p className="cms-state" role="status">Loading Team members…</p> : null}
    {!loading && !error && members.length === 0 ? <section className="cms-empty-card"><div className="cms-empty-card__icon"><Users size={28} /></div><div><h2>No Team members yet</h2><p>Create a draft Team member when the real profile and photo are ready.</p><Button onClick={() => setEditing(null)} startIcon={<Plus size={17} />}>Add Team member</Button></div></section> : null}
    {!loading && members.length > 0 ? <div className="cms-table-wrap"><table className="cms-table cms-team-table"><thead><tr><th>Member</th><th>Role</th><th>Order</th><th>Status</th><th>Updated</th></tr></thead><tbody>{members.map((member) => <tr key={member.id} onClick={() => { setSuccess(null); setEditing(member) }} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter') setEditing(member) }}><td><strong>{member.name}</strong><span>{member.image_alt ?? 'No alt text'}</span></td><td>{member.role}</td><td>{member.sort_order}</td><td><span className={`cms-status cms-status--${member.status}`}>{member.status}</span></td><td>{new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(member.updated_at))}</td></tr>)}</tbody></table></div> : null}
  </section>
}
