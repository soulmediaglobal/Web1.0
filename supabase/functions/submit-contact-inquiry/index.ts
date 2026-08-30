import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const allowedServices = new Set([
  'strategy-product',
  'software-enterprise',
  'ai-automation',
  'cloud-platform',
  'challenging-project',
])
const allowedBudgets = new Set(['tier1', 'tier2', 'tier3'])
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const headers = {
  'Access-Control-Allow-Origin': Deno.env.get('PUBLIC_SITE_ORIGIN') ?? '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
}

function response(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), { status, headers })
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers })
  if (request.method !== 'POST') return response({ error: 'Method not allowed.' }, 405)

  let input: Record<string, unknown>
  try {
    input = await request.json()
  } catch {
    return response({ error: 'Invalid request body.' }, 400)
  }

  const identityTitle = typeof input.identityTitle === 'string' ? input.identityTitle.trim() : ''
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : ''
  const organization = typeof input.organization === 'string' ? input.organization.trim() : ''
  const budget = typeof input.budget === 'string' ? input.budget : ''
  const services = Array.isArray(input.services) ? input.services : []
  const message = typeof input.message === 'string' ? input.message.trim() : ''
  const website = typeof input.website === 'string' ? input.website.trim() : ''

  if (website) return response({ accepted: true }, 202)
  if (identityTitle.length < 2 || identityTitle.length > 120) return response({ error: 'Identity/title must be 2–120 characters.' }, 422)
  if (!emailPattern.test(email) || email.length > 254) return response({ error: 'Enter a valid email address.' }, 422)
  if (organization.length < 2 || organization.length > 160) return response({ error: 'Organization must be 2–160 characters.' }, 422)
  if (budget && !allowedBudgets.has(budget)) return response({ error: 'Invalid budget selection.' }, 422)
  if (services.length > 5 || services.some((value) => typeof value !== 'string' || !allowedServices.has(value))) return response({ error: 'Invalid service selection.' }, 422)
  if (message.length < 20 || message.length > 5000) return response({ error: 'Briefing must be 20–5,000 characters.' }, 422)

  const url = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !serviceKey) return response({ error: 'Submission service is unavailable.' }, 503)

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } })
  const { error } = await admin.from('contact_inquiries').insert({
    identity_title: identityTitle,
    email,
    organization,
    budget: budget || null,
    services,
    message,
  })

  if (error) {
    console.error('Contact inquiry insert failed', error.code)
    return response({ error: 'Unable to submit your inquiry right now.' }, 500)
  }

  return response({ accepted: true }, 201)
})
