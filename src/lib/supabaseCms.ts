import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

const authHashParameters = new URLSearchParams(window.location.hash.slice(1))
const authQueryParameters = new URLSearchParams(window.location.search)

export const isCmsPasswordSetupCallback =
  window.location.pathname === '/cms/setup-password' &&
  (['invite', 'recovery'].includes(authHashParameters.get('type') ?? '') ||
    authQueryParameters.has('code'))

export const supabaseCmsConfigurationError =
  !supabaseUrl || !supabasePublishableKey
    ? 'CMS authentication is unavailable because Supabase is not configured.'
    : null

export const supabaseCms =
  supabaseUrl && supabasePublishableKey
    ? createClient(supabaseUrl, supabasePublishableKey, {
        auth: {
          storageKey: 'smg-cms-auth',
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : null
