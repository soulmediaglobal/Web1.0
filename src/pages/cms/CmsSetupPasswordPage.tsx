import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/authContext'
import { Button } from '../../cms/components/Button'
import { InputField } from '../../cms/components/InputField'
import { Label } from '../../cms/components/Label'
import {
  isCmsPasswordSetupCallback,
  supabaseCms,
  supabaseCmsConfigurationError,
} from '../../lib/supabaseCms'
import { CmsAuthBrand } from './CmsLoginPage'
import '../../cms/tailadmin.css'

const minimumPasswordLength = 12

export function CmsSetupPasswordPage() {
  const navigate = useNavigate()
  const { session, isCmsUser, loading, error: authError } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!supabaseCms) {
      setMessage(
        supabaseCmsConfigurationError ??
          'CMS authentication is unavailable.',
      )
      return
    }

    if (password.length < minimumPasswordLength) {
      setMessage(`Password must be at least ${minimumPasswordLength} characters.`)
      return
    }

    if (password !== confirmation) {
      setMessage('Passwords do not match.')
      return
    }

    setSubmitting(true)
    setMessage(null)

    const { error } = await supabaseCms.auth.updateUser({ password })

    if (error) {
      setMessage('Unable to set your password. Request a new invitation and try again.')
      setSubmitting(false)
      return
    }

    navigate('/cms', { replace: true })
  }

  if (!isCmsPasswordSetupCallback) {
    if (!loading && session && isCmsUser) {
      return <Navigate to="/cms" replace />
    }

    return (
      <SetupPasswordState
        eyebrow="Invalid Link"
        title="This setup link cannot be used."
        copy="Open the latest CMS invitation email, or ask an administrator to send a new invitation."
      />
    )
  }

  if (loading) {
    return (
      <SetupPasswordState
        eyebrow="Soul Media Global"
        title="Checking your invitation..."
        copy="Please wait while we verify your CMS access."
      />
    )
  }

  if (authError || !session || !isCmsUser) {
    return (
      <SetupPasswordState
        eyebrow="Access Denied"
        title="This invitation is invalid or expired."
        copy={authError ?? 'Ask an administrator to send a new CMS invitation.'}
      />
    )
  }

  return (
    <main className="cms-tailadmin cms-auth-page">
      <div className="cms-auth-grid">
        <section className="cms-auth-panel">
          <div className="cms-auth-content">
            <div className="cms-auth-heading">
              <p className="cms-eyebrow">CMS Invitation</p>
              <h1 className="cms-auth-title">Set up your password</h1>
              <p className="cms-auth-copy">
                Create a password for {session.user.email}. Use at least {minimumPasswordLength} characters.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="cms-auth-card">
              <div className="cms-form-field">
                <Label htmlFor="cms-new-password">New password</Label>
                <InputField
                  id="cms-new-password"
                  name="new-password"
                  type="password"
                  autoComplete="new-password"
                  minLength={minimumPasswordLength}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a secure password"
                  disabled={submitting}
                />
              </div>
              <div className="cms-form-field">
                <Label htmlFor="cms-confirm-password">Confirm password</Label>
                <InputField
                  id="cms-confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  minLength={minimumPasswordLength}
                  required
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                  placeholder="Repeat your password"
                  disabled={submitting}
                />
              </div>
              {message ? <p className="cms-alert cms-alert--error" role="alert">{message}</p> : null}
              <Button type="submit" fullWidth disabled={submitting}>
                {submitting ? 'Saving password...' : 'Set Password'}
              </Button>
            </form>
          </div>
        </section>
        <CmsAuthBrand />
      </div>
    </main>
  )
}

function SetupPasswordState({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy: string
}) {
  return (
    <main className="cms-tailadmin cms-auth-page">
      <div className="cms-auth-grid">
        <section className="cms-auth-panel">
          <div className="cms-auth-content">
            <div className="cms-auth-card">
              <p className="cms-eyebrow cms-eyebrow--error">{eyebrow}</p>
              <h1 className="cms-auth-title">{title}</h1>
              <p className="cms-auth-copy">{copy}</p>
              <Link to="/cms/login" className="cms-button cms-button--outline cms-button--full">
                Return to Sign In
              </Link>
            </div>
          </div>
        </section>
        <CmsAuthBrand />
      </div>
    </main>
  )
}
