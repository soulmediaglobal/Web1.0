import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './authContext'

export function RequireCmsUser() {
  const { session, isCmsUser, loading, error } = useAuth()

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-[#e5e2e1] grid place-items-center px-6">
        <p className="font-mono text-sm uppercase tracking-[0.18em] text-white/60">
          Checking CMS access...
        </p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-[#e5e2e1] grid place-items-center px-6">
        <div className="max-w-md text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#d0190f]">
            CMS Access Error
          </p>
          <h1 className="mt-4 text-3xl font-semibold">
            Unable to verify access
          </h1>
          <p className="mt-3 text-sm text-white/60">{error}</p>
        </div>
      </main>
    )
  }

  if (!session) {
    return <Navigate to="/cms/login" replace />
  }

  if (!isCmsUser) {
    return <Navigate to="/cms/login?unauthorized=1" replace />
  }

  return <Outlet />
}
