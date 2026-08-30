import { useEffect, useState } from 'react'
import { ArrowLeft, Inbox } from 'lucide-react'
import { serviceLabels, type ContactInquiry, type InquiryStatus } from '../../contact/types'
import { supabaseCms } from '../../lib/supabaseCms'
import { Button } from '../../cms/components/Button'

const statuses: InquiryStatus[] = ['new', 'contacted', 'closed']
const formatDate = (value: string) => new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))

export function ContactInquiriesPage() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([])
  const [selected, setSelected] = useState<ContactInquiry | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!supabaseCms) return
    let active = true
    void supabaseCms.from('contact_inquiries').select('*').order('created_at', { ascending: false }).then(({ data, error: queryError }) => {
      if (!active) return
      if (queryError) setError('Unable to load contact inquiries.')
      else setInquiries((data ?? []) as ContactInquiry[])
      setLoading(false)
    })
    return () => { active = false }
  }, [])

  async function updateStatus(status: InquiryStatus) {
    if (!supabaseCms || !selected || status === selected.status) return
    setSaving(true)
    setError(null)
    const { data, error: updateError } = await supabaseCms.from('contact_inquiries').update({ status }).eq('id', selected.id).select('*').single()
    if (updateError) setError('Unable to update the inquiry status.')
    else {
      const updated = data as ContactInquiry
      setSelected(updated)
      setInquiries((current) => current.map((item) => item.id === updated.id ? updated : item))
    }
    setSaving(false)
  }

  if (selected) return (
    <section>
      <Button variant="outline" onClick={() => { setSelected(null); setError(null) }} startIcon={<ArrowLeft size={17} />}>Back to inquiries</Button>
      <div className="cms-detail-card">
        <div className="cms-detail-card__heading">
          <div><p className="cms-eyebrow">Inquiry detail</p><h1>{selected.name ?? selected.identity_title ?? 'Unnamed inquiry'}</h1><p>{selected.organization}</p></div>
          <span className={`cms-status cms-status--${selected.status}`}>{selected.status}</span>
        </div>
        <dl className="cms-detail-grid">
          <div><dt>Email</dt><dd><a href={`mailto:${selected.email}`}>{selected.email}</a></dd></div>
          <div><dt>Phone</dt><dd>{selected.phone_number ? <a href={`tel:${selected.phone_number}`}>{selected.phone_number}</a> : 'Not provided (legacy inquiry)'}</dd></div>
          <div><dt>Submitted</dt><dd>{formatDate(selected.created_at)}</dd></div>
          <div><dt>Services</dt><dd>{selected.services.length ? selected.services.map((service) => serviceLabels[service] ?? service).join(', ') : 'Not specified'}</dd></div>
        </dl>
        {selected.challenging_project ? <div className="cms-message"><h2>Challenging project</h2><p>{selected.challenging_project}</p></div> : null}
        <div className="cms-message"><h2>Briefing</h2><p>{selected.message}</p></div>
        <div className="cms-status-control">
          <label htmlFor="inquiry-status">Status</label>
          <select id="inquiry-status" value={selected.status} disabled={saving} onChange={(event) => void updateStatus(event.target.value as InquiryStatus)}>
            {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          {saving ? <span>Saving…</span> : null}
        </div>
        {error ? <p className="cms-alert cms-alert--error" role="alert">{error}</p> : null}
      </div>
    </section>
  )

  return (
    <section>
      <div className="cms-page-heading"><p className="cms-eyebrow">Operations</p><h1>Contact Inquiries</h1><p>Review incoming contact requests and keep their follow-up status current.</p></div>
      {error ? <p className="cms-alert cms-alert--error" role="alert">{error}</p> : null}
      {loading ? <p className="cms-state" role="status">Loading inquiries…</p> : null}
      {!loading && !error && inquiries.length === 0 ? <section className="cms-empty-card"><div className="cms-empty-card__icon"><Inbox size={28} /></div><div><h2>No inquiries yet</h2><p>New public contact submissions will appear here.</p></div></section> : null}
      {!loading && inquiries.length > 0 ? (
        <div className="cms-table-wrap"><table className="cms-table">
          <thead><tr><th>Sender / organization</th><th>Service / project type</th><th>Submitted</th><th>Status</th></tr></thead>
          <tbody>{inquiries.map((inquiry) => <tr key={inquiry.id} onClick={() => setSelected(inquiry)} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter') setSelected(inquiry) }}><td><strong>{inquiry.name ?? inquiry.identity_title ?? 'Unnamed inquiry'}</strong><span>{inquiry.organization}</span></td><td>{inquiry.services.length ? inquiry.services.map((service) => serviceLabels[service] ?? service).join(', ') : 'Not specified'}</td><td>{formatDate(inquiry.created_at)}</td><td><span className={`cms-status cms-status--${inquiry.status}`}>{inquiry.status}</span></td></tr>)}</tbody>
        </table></div>
      ) : null}
    </section>
  )
}
