import { useState } from 'react'
import { BriefcaseBusiness, Inbox, LogOut, Menu, PanelLeftClose, Users, X } from 'lucide-react'
import { supabaseCms } from '../../lib/supabaseCms'
import { useAuth } from '../../auth/authContext'
import { Button } from '../../cms/components/Button'
import '../../cms/tailadmin.css'
import { ContactInquiriesPage } from './ContactInquiriesPage'
import { PeoplePage } from './PeoplePage'
import { WorkPage } from './WorkPage'

type CmsView = 'inquiries' | 'people' | 'work'

export function CmsShell() {
  const { user, role } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<CmsView>('inquiries')
  const selectView = (nextView: CmsView) => { setView(nextView); setSidebarOpen(false) }

  async function handleSignOut() {
    if (!supabaseCms) return
    setSigningOut(true)
    setError(null)
    const { error: signOutError } = await supabaseCms.auth.signOut()
    if (signOutError) {
      setError('Unable to sign out. Please try again.')
      setSigningOut(false)
    }
  }

  return (
    <div className="cms-tailadmin cms-shell">
      <button type="button" className={`cms-sidebar-backdrop${sidebarOpen ? ' is-visible' : ''}`} onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />
      <aside className={`cms-sidebar${sidebarOpen ? ' is-open' : ''}`}>
        <div className="cms-sidebar__brand">
          <span className="cms-sidebar__logo">SMG</span>
          <div><strong>Soul Media Global</strong><span>CMS</span></div>
          <button type="button" className="cms-icon-button cms-sidebar__close" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X size={20} /></button>
        </div>
        <nav className="cms-sidebar__nav" aria-label="CMS navigation">
          <p className="cms-sidebar__label">Operations</p>
          <button type="button" className={`cms-sidebar__item${view === 'inquiries' ? ' is-active' : ''}`} aria-current={view === 'inquiries' ? 'page' : undefined} onClick={() => selectView('inquiries')}><Inbox size={20} /><span>Contact Inquiries</span></button>
          <p className="cms-sidebar__label cms-sidebar__label--section">Content</p>
          <button type="button" className={`cms-sidebar__item${view === 'people' ? ' is-active' : ''}`} aria-current={view === 'people' ? 'page' : undefined} onClick={() => selectView('people')}><Users size={20} /><span>People</span></button>
          <button type="button" className={`cms-sidebar__item${view === 'work' ? ' is-active' : ''}`} aria-current={view === 'work' ? 'page' : undefined} onClick={() => selectView('work')}><BriefcaseBusiness size={20} /><span>Work</span></button>
        </nav>
        <div className="cms-sidebar__footer">
          <p>Authenticated as</p><strong>{user?.email ?? 'CMS user'}</strong><span>{role ?? 'unknown'} role</span>
        </div>
      </aside>

      <div className="cms-shell__body">
        <header className="cms-header">
          <button type="button" className="cms-icon-button cms-header__menu" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={22} /></button>
          <div className="cms-header__context"><PanelLeftClose size={18} /><span>{view === 'people' ? 'People' : view === 'work' ? 'Work' : 'Contact Inquiries'}</span></div>
          <Button variant="outline" onClick={handleSignOut} disabled={signingOut} startIcon={<LogOut size={17} />}>
            {signingOut ? 'Signing out...' : 'Sign Out'}
          </Button>
        </header>
        <main className="cms-main">
          {view === 'people' ? <PeoplePage /> : view === 'work' ? <WorkPage /> : <ContactInquiriesPage />}
          {error ? <p className="cms-alert cms-alert--error" role="alert">{error}</p> : null}
        </main>
      </div>
    </div>
  )
}
