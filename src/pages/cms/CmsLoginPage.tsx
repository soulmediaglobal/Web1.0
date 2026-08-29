import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { supabaseCms, supabaseCmsConfigurationError } from '../../lib/supabaseCms'
import { useAuth } from '../../auth/authContext'
import { Button } from '../../cms/components/Button'
import { InputField } from '../../cms/components/InputField'
import { Label } from '../../cms/components/Label'
import '../../cms/tailadmin.css'

export function CmsLoginPage() {
  const { session, isCmsUser, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  if (!loading && session && isCmsUser) {
    return <Navigate to="/cms" replace />
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!supabaseCms) {
      setMessage(
        supabaseCmsConfigurationError ??
          'CMS authentication is unavailable.',
      )
      return
    }

    setSubmitting(true)
    setMessage(null)

    const { error } = await supabaseCms.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      setMessage('Invalid email or password.')
    }

    setSubmitting(false)
  }

  async function handleSignOut() {
    if (!supabaseCms) return

    setSubmitting(true)
    setMessage(null)

    const { error } = await supabaseCms.auth.signOut()

    if (error) {
      setMessage('Unable to sign out. Please try again.')
      setSubmitting(false)
    }
  }

  if (!loading && session && !isCmsUser) {
    return (
      <main className="cms-tailadmin cms-auth-page">
        <div className="cms-auth-grid">
          <section className="cms-auth-panel">
            <div className="cms-auth-content">
              <div className="cms-auth-card">
                <p className="cms-eyebrow cms-eyebrow--error">Access Denied</p>
                <h1 className="cms-auth-title">CMS access is not enabled.</h1>
                <p className="cms-auth-copy">You are signed in, but this account is not an active CMS user.</p>
                {message ? <p className="cms-alert cms-alert--error" role="alert">{message}</p> : null}
                <Button variant="outline" fullWidth onClick={handleSignOut} disabled={submitting}>
                  {submitting ? 'Signing out...' : 'Sign Out'}
                </Button>
              </div>
            </div>
          </section>
          <CmsAuthBrand />
        </div>
      </main>
    )
  }

  return (
    <main className="cms-tailadmin cms-auth-page">
      <div className="cms-auth-grid">
        <section className="cms-auth-panel">
          <div className="cms-auth-content">
            <div className="cms-auth-heading">
              <p className="cms-eyebrow">Soul Media Global</p>
              <h1 className="cms-auth-title">Sign in to CMS</h1>
              <p className="cms-auth-copy">Enter your email and password to continue.</p>
            </div>
            <form onSubmit={handleLogin} className="cms-auth-card">
              <div className="cms-form-field">
                <Label htmlFor="cms-email">Email</Label>
                <InputField
                  id="cms-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  disabled={submitting}
                />
              </div>
              <div className="cms-form-field">
                <Label htmlFor="cms-password">Password</Label>
                <InputField
                  id="cms-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  disabled={submitting}
                />
              </div>
              {message ? <p className="cms-alert cms-alert--error" role="alert">{message}</p> : null}
              <Button type="submit" fullWidth disabled={submitting}>
                {submitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </div>
        </section>
        <CmsAuthBrand />
      </div>
    </main>
  )
}

function CmsAuthBrand() {
  return (
    <aside className="cms-auth-brand" aria-label="Soul Media Global CMS">
      <div className="cms-auth-brand__mark" aria-hidden="true">SMG</div>
      <p className="cms-eyebrow">Soul Media Global</p>
      <h2>Content Management System</h2>
      <p>Secure administrative access for Soul Media Global.</p>
    </aside>
  )
}
