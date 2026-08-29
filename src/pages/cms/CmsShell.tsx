import { useState } from 'react'
import { LogOut, Menu, PanelLeftClose, ShieldCheck, X } from 'lucide-react'
import { supabaseCms } from '../../lib/supabaseCms'
import { useAuth } from '../../auth/authContext'
import { Button } from '../../cms/components/Button'
import '../../cms/tailadmin.css'

export function CmsShell() {
  const { user, role } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
          <p className="cms-sidebar__label">Foundation</p>
          <div className="cms-sidebar__item is-active" aria-current="page"><ShieldCheck size={20} /><span>CMS Access</span></div>
        </nav>
        <div className="cms-sidebar__footer">
          <p>Authenticated as</p><strong>{user?.email ?? 'CMS user'}</strong><span>{role ?? 'unknown'} role</span>
        </div>
      </aside>

      <div className="cms-shell__body">
        <header className="cms-header">
          <button type="button" className="cms-icon-button cms-header__menu" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={22} /></button>
          <div className="cms-header__context"><PanelLeftClose size={18} /><span>CMS Foundation</span></div>
          <Button variant="outline" onClick={handleSignOut} disabled={signingOut} startIcon={<LogOut size={17} />}>
            {signingOut ? 'Signing out...' : 'Sign Out'}
          </Button>
        </header>
        <main className="cms-main">
          <div className="cms-page-heading">
            <p className="cms-eyebrow">Authenticated</p>
            <h1>CMS Foundation</h1>
            <p>Authentication is active. CMS functionality will be added in a future development task.</p>
          </div>
          <section className="cms-empty-card" aria-label="CMS authentication status">
            <div className="cms-empty-card__icon"><ShieldCheck size={28} /></div>
            <div><h2>Secure access is ready</h2><p>This empty TailAdmin-based shell is intentionally limited to authentication and authorization.</p></div>
          </section>
          {error ? <p className="cms-alert cms-alert--error" role="alert">{error}</p> : null}
        </main>
      </div>
    </div>
  )
}
