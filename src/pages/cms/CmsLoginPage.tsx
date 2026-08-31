import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { supabaseCms, supabaseCmsConfigurationError } from '../../lib/supabaseCms'
import { useAuth } from '../../auth/authContext'
import { Button } from '../../cms/components/Button'
import { CmsAuthLayout } from '../../cms/components/CmsAuthLayout'
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
      <CmsAuthLayout
        eyebrow="Access denied"
        title="CMS access is not enabled."
        copy="You are signed in, but this account is not an active CMS user."
        error
      >
        <div className="cms-auth-actions">
          {message ? <p className="cms-alert cms-alert--error" role="alert">{message}</p> : null}
          <Button variant="outline" fullWidth onClick={handleSignOut} disabled={submitting}>
            {submitting ? 'Signing out...' : 'Sign Out'}
          </Button>
        </div>
      </CmsAuthLayout>
    )
  }

  return (
    <CmsAuthLayout
      eyebrow="Soul Media Global CMS"
      title="Sign in."
      copy="Manage the stories, people, and work behind Soul Media Global."
    >
      <form onSubmit={handleLogin} className="cms-auth-form">
        <div className="cms-form-field">
          <Label htmlFor="cms-email">Email address</Label>
          <InputField
            id="cms-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@soulmedia.id"
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
          {submitting ? 'Signing in...' : 'Sign in securely'}
        </Button>
      </form>
    </CmsAuthLayout>
  )
}
