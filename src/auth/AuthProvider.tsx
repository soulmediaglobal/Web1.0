import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabaseCms } from '../lib/supabaseCms'
import { AuthContext, type AuthContextValue, type CmsRole } from './authContext'

async function getCmsRole(userId: string): Promise<CmsRole | null> {
  if (!supabaseCms) return null

  const { data, error } = await supabaseCms
    .from('cms_users')
    .select('role')
    .eq('user_id', userId)
    .eq('is_active', true)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data?.role === 'admin' ? 'admin' : null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [role, setRole] = useState<CmsRole | null>(null)
  const [loading, setLoading] = useState(Boolean(supabaseCms))
  const [error, setError] = useState<string | null>(
    supabaseCms ? null : 'CMS authentication is not configured.',
  )

  useEffect(() => {
    if (!supabaseCms) {
      return
    }

    let active = true

    const resolveAuthorization = async (nextSession: Session | null) => {
      if (!active) return

      setSession(nextSession)
      setRole(null)
      setError(null)

      if (!nextSession?.user) {
        setLoading(false)
        return
      }

      try {
        const nextRole = await getCmsRole(nextSession.user.id)

        if (!active) return

        setRole(nextRole)
      } catch {
        if (!active) return

        setError('Unable to verify CMS access.')
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void supabaseCms.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return

      if (sessionError) {
        setError('Unable to restore CMS session.')
        setLoading(false)
        return
      }

      void resolveAuthorization(data.session)
    })

    const {
      data: { subscription },
    } = supabaseCms.auth.onAuthStateChange((_event, nextSession) => {
      setLoading(true)
      void resolveAuthorization(nextSession)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      role,
      isCmsUser: role !== null,
      loading,
      error,
    }),
    [session, role, loading, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
