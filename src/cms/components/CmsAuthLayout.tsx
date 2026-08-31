import type { ReactNode } from 'react'
import logo from '../../assets/Logo.png'

type CmsAuthLayoutProps = {
  eyebrow: string
  title: string
  copy: ReactNode
  children: ReactNode
  error?: boolean
}

export function CmsAuthLayout({
  eyebrow,
  title,
  copy,
  children,
  error = false,
}: CmsAuthLayoutProps) {
  return (
    <main className="cms-tailadmin cms-auth-page">
      <div className="cms-auth-watermark" aria-hidden="true">CMS</div>
      <section className="cms-auth-monolith" aria-label="Soul Media Global CMS authentication">
        <header className="cms-auth-monolith__header">
          <img src={logo} alt="Soul Media Global" className="cms-auth-logo" />
          <p className="cms-auth-index">
            Secure access
            <span>CMS / 01</span>
          </p>
        </header>

        <div className="cms-auth-heading">
          <p className={`cms-auth-kicker${error ? ' cms-auth-kicker--error' : ''}`}>{eyebrow}</p>
          <h1 className="cms-auth-title">{title}</h1>
          <div className="cms-auth-copy">{copy}</div>
        </div>

        {children}

        <p className="cms-auth-security-note">
          Authorized personnel only · Session protected by Supabase Auth
        </p>
      </section>
    </main>
  )
}
