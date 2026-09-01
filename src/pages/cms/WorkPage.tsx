import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { ArrowDown, ArrowLeft, ArrowUp, BriefcaseBusiness, ImageOff, Pencil, Plus, Trash2 } from 'lucide-react'
import { Button } from '../../cms/components/Button'
import { InputField } from '../../cms/components/InputField'
import { resolveMedia } from '../../content/media'
import { listWork, saveWork } from '../../work/api'
import type { WorkCaseStudy, WorkCaseStudyInput, WorkStatus, WorkSystemPoint } from '../../work/types'

type FormErrors = Record<string, string>
const statuses: WorkStatus[] = ['draft', 'published', 'archived']
const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const maxImageBytes = 5 * 1024 * 1024
const blankPoint = (): WorkSystemPoint => ({ title: '', description: '', sort_order: 1 })
const emptyForm: WorkCaseStudyInput = { slug: '', number: '', category: '', sector: '', type: '', client: '', name: '', summary: '', image_url: null, image_alt: '', featured: false, challenge: '', status: 'draft', sort_order: 0, tags: [], system_points: [blankPoint()], testimonial: null }
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const normalizeTags = (value: string) => [...new Set(value.split(',').map(slugify).filter(Boolean))]

function toInput(item: WorkCaseStudy): WorkCaseStudyInput {
  return { slug: item.slug, number: item.number, category: item.category, sector: item.sector, type: item.type, client: item.client, name: item.name, summary: item.summary, image_url: item.image_url, image_alt: item.image_alt, featured: item.featured, challenge: item.challenge, status: item.status, sort_order: item.sort_order, tags: item.tags, system_points: item.system_points, testimonial: item.testimonial }
}

function validate(input: WorkCaseStudyInput, hasImage: boolean): FormErrors {
  const errors: FormErrors = {}
  if (!input.name) errors.name = 'Project name is required.'
  if (!input.slug || input.slug !== slugify(input.slug)) errors.slug = 'Use a lowercase kebab-case slug.'
  if (!Number.isInteger(input.sort_order) || input.sort_order < 0) errors.sort_order = 'Use a whole number of 0 or greater.'
  if (input.status === 'published') {
    for (const field of ['number', 'category', 'sector', 'type', 'client', 'summary', 'challenge'] as const) if (!input[field]) errors[field] = 'Required before publishing.'
    if (!hasImage) errors.image = 'An image is required before publishing.'
    if (!input.image_alt) errors.image_alt = 'Alt text is required before publishing.'
    if (!input.system_points.length || input.system_points.some((point) => !point.title || !point.description)) errors.system_points = 'Add at least one complete system point before publishing.'
  }
  if (input.system_points.some((point) => (point.title && !point.description) || (!point.title && point.description))) errors.system_points = 'Complete or remove every system point.'
  const testimonialValues = input.testimonial ? Object.values(input.testimonial) : []
  if (testimonialValues.some(Boolean) && !testimonialValues.every(Boolean)) errors.testimonial = 'Complete quote, author, and role, or leave all three empty.'
  return errors
}

function WorkForm({ item, onCancel, onSaved }: { item: WorkCaseStudy | null; onCancel: () => void; onSaved: (item: WorkCaseStudy) => void }) {
  const [form, setForm] = useState<WorkCaseStudyInput>(() => item ? toInput(item) : emptyForm)
  const [tagText, setTagText] = useState(() => form.tags.join(', '))
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [removeImage, setRemoveImage] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const imageInput = useRef<HTMLInputElement>(null)
  const stagedPreview = useMemo(() => imageFile ? URL.createObjectURL(imageFile) : '', [imageFile])
  const imagePreview = stagedPreview || (removeImage ? '' : resolveMedia(form.image_url))
  useEffect(() => () => { if (stagedPreview) URL.revokeObjectURL(stagedPreview) }, [stagedPreview])

  const setField = <K extends keyof WorkCaseStudyInput>(field: K, value: WorkCaseStudyInput[K]) => { setForm((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: '' })) }
  const setPoint = (index: number, field: 'title' | 'description', value: string) => setForm((current) => ({ ...current, system_points: current.system_points.map((point, pointIndex) => pointIndex === index ? { ...point, [field]: value } : point) }))
  const movePoint = (index: number, offset: number) => setForm((current) => { const next = [...current.system_points]; const target = index + offset; if (target < 0 || target >= next.length) return current; [next[index], next[target]] = [next[target], next[index]]; return { ...current, system_points: next } })
  const testimonial = form.testimonial ?? { quote: '', author: '', role: '' }

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; event.target.value = ''; if (!file) return
    if (!acceptedImageTypes.includes(file.type)) { setErrors((current) => ({ ...current, image: 'Use JPG, PNG, WebP, or AVIF.' })); return }
    if (file.size > maxImageBytes) { setErrors((current) => ({ ...current, image: 'Image must be 5 MB or smaller.' })); return }
    setImageFile(file); setRemoveImage(false); setErrors((current) => ({ ...current, image: '' }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const points = form.system_points.map((point, index) => ({ ...point, title: point.title.trim(), description: point.description.trim(), sort_order: index + 1 })).filter((point) => point.title || point.description)
    const cleanTestimonial = Object.values(testimonial).some((value) => value.trim()) ? { quote: testimonial.quote.trim(), author: testimonial.author.trim(), role: testimonial.role.trim() } : null
    const normalized: WorkCaseStudyInput = { ...form, slug: slugify(form.slug), number: form.number.trim(), category: form.category.trim(), sector: form.sector.trim(), type: form.type.trim(), client: form.client.trim(), name: form.name.trim(), summary: form.summary.trim(), image_alt: form.image_alt?.trim() || null, challenge: form.challenge.trim(), tags: normalizeTags(tagText), system_points: points, testimonial: cleanTestimonial }
    const nextErrors = validate(normalized, Boolean(imageFile || (!removeImage && form.image_url)))
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return }
    setSaving(true); setSaveError(null)
    try { onSaved(await saveWork(normalized, item, imageFile, removeImage)) }
    catch (error) { setSaveError(error instanceof Error ? error.message : 'Unable to save this case study.') }
    finally { setSaving(false) }
  }

  return <section>
    <Button variant="outline" onClick={onCancel} startIcon={<ArrowLeft size={17} />}>Back to Work</Button>
    <form className="cms-editor-card" onSubmit={handleSubmit} noValidate>
      <div className="cms-page-heading"><p className="cms-eyebrow">Work content</p><h1>{item ? 'Edit case study' : 'Add case study'}</h1><p>Archive content to remove it publicly. Changing a published slug also changes its public URL.</p></div>
      <div className="cms-photo-editor cms-work-image-editor">
        <div className="cms-photo-preview">{imagePreview ? <img src={imagePreview} alt="Current case study preview" /> : <div><ImageOff size={30} /><span>No image</span></div>}</div>
        <div className="cms-photo-actions"><input ref={imageInput} className="cms-visually-hidden" type="file" accept={acceptedImageTypes.join(',')} onChange={handleImage} disabled={saving} /><Button variant="outline" onClick={() => imageInput.current?.click()} disabled={saving} startIcon={<Pencil size={16} />}>{imagePreview ? 'Replace image' : 'Upload image'}</Button><Button variant="outline" onClick={() => { setImageFile(null); setRemoveImage(true) }} disabled={saving || !imagePreview} startIcon={<Trash2 size={16} />}>Remove</Button><p>JPG, PNG, WebP, or AVIF. Maximum 5 MB. Image and alt text are required to publish.</p>{errors.image ? <p className="cms-input-hint cms-input-hint--error">{errors.image}</p> : null}</div>
      </div>
      <div className="cms-form-grid">
        <label className="cms-form-field"><span className="cms-label">Project name *</span><InputField value={form.name} onChange={(e) => setField('name', e.target.value)} error={Boolean(errors.name)} hint={errors.name} disabled={saving} /></label>
        <label className="cms-form-field"><span className="cms-label">Slug *</span><InputField value={form.slug} onChange={(e) => setField('slug', e.target.value)} error={Boolean(errors.slug)} hint={errors.slug ?? 'Lowercase kebab-case. Changing it changes the public URL.'} disabled={saving} /></label>
        {(['number', 'client', 'category', 'sector', 'type'] as const).map((field) => <label className="cms-form-field" key={field}><span className="cms-label">{field === 'number' ? 'Project number' : field[0].toUpperCase() + field.slice(1)}</span><InputField value={form[field]} onChange={(e) => setField(field, e.target.value)} error={Boolean(errors[field])} hint={errors[field]} disabled={saving} /></label>)}
        <label className="cms-form-field cms-form-field--wide"><span className="cms-label">Summary</span><textarea className={`cms-textarea${errors.summary ? ' cms-input--error' : ''}`} value={form.summary} onChange={(e) => setField('summary', e.target.value)} disabled={saving} />{errors.summary ? <p className="cms-input-hint cms-input-hint--error">{errors.summary}</p> : null}</label>
        <label className="cms-form-field cms-form-field--wide"><span className="cms-label">Challenge</span><textarea className={`cms-textarea${errors.challenge ? ' cms-input--error' : ''}`} value={form.challenge} onChange={(e) => setField('challenge', e.target.value)} disabled={saving} />{errors.challenge ? <p className="cms-input-hint cms-input-hint--error">{errors.challenge}</p> : null}</label>
        <label className="cms-form-field cms-form-field--wide"><span className="cms-label">Image alt text</span><InputField value={form.image_alt ?? ''} onChange={(e) => setField('image_alt', e.target.value)} error={Boolean(errors.image_alt)} hint={errors.image_alt ?? 'Describe the project visual briefly.'} disabled={saving} /></label>
        <label className="cms-form-field cms-form-field--wide"><span className="cms-label">Filter tags</span><InputField value={tagText} onChange={(e) => setTagText(e.target.value)} hint="Comma-separated; saved as lowercase kebab-case." disabled={saving} /></label>
        <label className="cms-form-field"><span className="cms-label">Sort order *</span><InputField type="number" value={String(form.sort_order)} onChange={(e) => setField('sort_order', Number(e.target.value))} error={Boolean(errors.sort_order)} hint={errors.sort_order ?? 'Lower numbers appear first.'} disabled={saving} /></label>
        <label className="cms-form-field"><span className="cms-label">Status *</span><select className="cms-select" value={form.status} onChange={(e) => setField('status', e.target.value as WorkStatus)} disabled={saving}>{statuses.map((status) => <option key={status}>{status}</option>)}</select><p className="cms-input-hint">Only published case studies appear publicly.</p></label>
        <label className="cms-check-field cms-form-field--wide"><input type="checkbox" checked={form.featured} onChange={(e) => setField('featured', e.target.checked)} disabled={saving} /><span><strong>Featured on Home</strong><small>All published featured case studies appear in Selected Work.</small></span></label>
      </div>

      <section className="cms-repeat-section"><div className="cms-repeat-section__heading"><div><h2>System points</h2><p>Order controls the public “The System” sequence.</p></div><Button variant="outline" onClick={() => setForm((current) => ({ ...current, system_points: [...current.system_points, { ...blankPoint(), sort_order: current.system_points.length + 1 }] }))} startIcon={<Plus size={16} />}>Add point</Button></div>
        {errors.system_points ? <p className="cms-alert cms-alert--error">{errors.system_points}</p> : null}
        <div className="cms-repeat-list">{form.system_points.map((point, index) => <div className="cms-repeat-card" key={point.id ?? index}><div className="cms-repeat-card__actions"><span>Point {index + 1}</span><button type="button" onClick={() => movePoint(index, -1)} disabled={index === 0 || saving} aria-label={`Move point ${index + 1} up`}><ArrowUp size={16} /></button><button type="button" onClick={() => movePoint(index, 1)} disabled={index === form.system_points.length - 1 || saving} aria-label={`Move point ${index + 1} down`}><ArrowDown size={16} /></button><button type="button" onClick={() => setForm((current) => ({ ...current, system_points: current.system_points.filter((_, pointIndex) => pointIndex !== index) }))} disabled={saving} aria-label={`Remove point ${index + 1}`}><Trash2 size={16} /></button></div><div className="cms-form-grid"><label className="cms-form-field"><span className="cms-label">Title</span><InputField value={point.title} onChange={(e) => setPoint(index, 'title', e.target.value)} disabled={saving} /></label><label className="cms-form-field"><span className="cms-label">Description</span><InputField value={point.description} onChange={(e) => setPoint(index, 'description', e.target.value)} disabled={saving} /></label></div></div>)}</div>
      </section>

      <section className="cms-repeat-section"><div className="cms-repeat-section__heading"><div><h2>Client feedback</h2><p>Optional. Complete all three fields when used.</p></div></div>{errors.testimonial ? <p className="cms-alert cms-alert--error">{errors.testimonial}</p> : null}<div className="cms-form-grid"><label className="cms-form-field cms-form-field--wide"><span className="cms-label">Quote</span><textarea className="cms-textarea" value={testimonial.quote} onChange={(e) => setField('testimonial', { ...testimonial, quote: e.target.value })} disabled={saving} /></label><label className="cms-form-field"><span className="cms-label">Author</span><InputField value={testimonial.author} onChange={(e) => setField('testimonial', { ...testimonial, author: e.target.value })} disabled={saving} /></label><label className="cms-form-field"><span className="cms-label">Role</span><InputField value={testimonial.role} onChange={(e) => setField('testimonial', { ...testimonial, role: e.target.value })} disabled={saving} /></label></div></section>
      {saveError ? <p className="cms-alert cms-alert--error" role="alert">{saveError}</p> : null}
      <div className="cms-form-actions"><Button variant="outline" onClick={onCancel} disabled={saving}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? imageFile ? 'Uploading and saving…' : 'Saving…' : item ? 'Save changes' : 'Create case study'}</Button></div>
    </form>
  </section>
}

export function WorkPage() {
  const [items, setItems] = useState<WorkCaseStudy[]>([])
  const [editing, setEditing] = useState<WorkCaseStudy | null | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const load = useCallback(async () => { setLoading(true); setError(null); try { setItems(await listWork()) } catch { setError('Unable to load case studies.') } finally { setLoading(false) } }, [])
  useEffect(() => { let active = true; void listWork().then((data) => { if (active) setItems(data) }).catch(() => { if (active) setError('Unable to load case studies.') }).finally(() => { if (active) setLoading(false) }); return () => { active = false } }, [])
  if (editing !== undefined) return <WorkForm item={editing} onCancel={() => setEditing(undefined)} onSaved={(saved) => { setItems((current) => [...current.filter(({ id }) => id !== saved.id), saved].sort((a, b) => a.sort_order - b.sort_order || a.slug.localeCompare(b.slug))); setEditing(undefined); setSuccess(`${saved.name} was saved successfully.`) }} />
  return <section><div className="cms-page-heading cms-page-heading--actions"><div><p className="cms-eyebrow">Portfolio content</p><h1>Work</h1><p>Manage the case studies used by Work, Work Detail, and Home Selected Work.</p></div><Button onClick={() => { setSuccess(null); setEditing(null) }} startIcon={<Plus size={17} />}>Add case study</Button></div>
    {success ? <p className="cms-alert cms-alert--success cms-page-alert" role="status">{success}</p> : null}
    {error ? <div className="cms-state-group"><p className="cms-alert cms-alert--error" role="alert">{error}</p><Button variant="outline" onClick={() => void load()}>Try again</Button></div> : null}
    {loading ? <p className="cms-state" role="status">Loading case studies…</p> : null}
    {!loading && !error && !items.length ? <section className="cms-empty-card"><div className="cms-empty-card__icon"><BriefcaseBusiness size={28} /></div><div><h2>No case studies yet</h2><p>Create a draft and publish it when all public content is complete.</p><Button onClick={() => setEditing(null)} startIcon={<Plus size={17} />}>Add case study</Button></div></section> : null}
    {!loading && items.length ? <div className="cms-table-wrap"><table className="cms-table cms-work-table"><thead><tr><th>Project</th><th>Client / Sector</th><th>Featured</th><th>Order</th><th>Status</th></tr></thead><tbody>{items.map((item) => <tr key={item.id} onClick={() => { setSuccess(null); setEditing(item) }} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter') setEditing(item) }}><td><strong>{item.number} · {item.name}</strong><span>/work/{item.slug}</span></td><td>{item.client}<span>{item.sector}</span></td><td>{item.featured ? 'Yes' : 'No'}</td><td>{item.sort_order}</td><td><span className={`cms-status cms-status--${item.status}`}>{item.status}</span></td></tr>)}</tbody></table></div> : null}
  </section>
}
