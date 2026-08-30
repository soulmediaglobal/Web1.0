import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const allowedServices = new Set([
  'strategy-product',
  'software-enterprise',
  'ai-automation',
  'cloud-platform',
  'challenging-project',
])
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[0-9]+$/
const allowedCountryCallingCodes = new Set([
  '1', '7', '20', '27', '30', '31', '32', '33', '34', '36', '39', '40', '41', '43', '44', '45', '46', '47', '48', '49',
  '51', '52', '53', '54', '55', '56', '57', '58', '60', '61', '62', '63', '64', '65', '66', '81', '82', '84', '86',
  '90', '91', '92', '93', '94', '95', '98', '211', '212', '213', '216', '218', '220', '221', '222', '223', '224',
  '225', '226', '227', '228', '229', '230', '231', '232', '233', '234', '235', '236', '237', '238', '239', '240',
  '241', '242', '243', '244', '245', '246', '247', '248', '249', '250', '251', '252', '253', '254', '255', '256', '257',
  '258', '260', '261', '262', '263', '264', '265', '266', '267', '268', '269', '290', '291', '297', '298', '299',
  '350', '351', '352', '353', '354', '355', '356', '357', '358', '359', '370', '371', '372', '373', '374', '375',
  '376', '377', '378', '380', '381', '382', '383', '385', '386', '387', '389', '420', '421', '423', '500', '501',
  '502', '503', '504', '505', '506', '507', '508', '509', '590', '591', '592', '593', '594', '595', '596', '597',
  '598', '599', '670', '672', '673', '674', '675', '676', '677', '678', '679', '680', '681', '682', '683', '685',
  '686', '687', '688', '689', '690', '691', '692', '850', '852', '853', '855', '856', '880', '886', '960', '961',
  '962', '963', '964', '965', '966', '967', '968', '970', '971', '972', '973', '974', '975', '976', '977', '992',
  '993', '994', '995', '996', '998', '1242', '1246', '1264', '1268', '1284', '1340', '1345', '1441', '1473',
  '1649', '1658', '1664', '1670', '1671', '1684', '1721', '1758', '1767', '1784', '1787', '1809', '1829',
  '1849', '1868', '1869', '1876', '1939',
])

const allowedOrigins = new Set([
  'https://soulmedia.id',
  'http://127.0.0.1:3000',
  'http://localhost:3000',
])
const configuredSiteOrigin = Deno.env.get('PUBLIC_SITE_ORIGIN')
if (configuredSiteOrigin) allowedOrigins.add(configuredSiteOrigin)

function corsHeaders(request: Request) {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  }
  const origin = request.headers.get('origin')
  if (origin && allowedOrigins.has(origin)) headers['Access-Control-Allow-Origin'] = origin
  return headers
}

function response(request: Request, body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders(request) })
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(request) })
  if (request.method !== 'POST') return response(request, { error: 'Method not allowed.' }, 405)

  let input: Record<string, unknown>
  try {
    input = await request.json()
  } catch {
    return response(request, { error: 'Invalid request body.' }, 400)
  }

  const name = typeof input.name === 'string' ? input.name.trim() : ''
  const phoneCountryCode = typeof input.phoneCountryCode === 'string' ? input.phoneCountryCode.trim() : ''
  const phoneNumber = typeof input.phoneNumber === 'string' ? input.phoneNumber.trim() : ''
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : ''
  const organization = typeof input.organization === 'string' ? input.organization.trim() : ''
  const services = Array.isArray(input.services) ? input.services : []
  const challengingProject = typeof input.challengingProject === 'string' ? input.challengingProject.trim() : ''
  const message = typeof input.message === 'string' ? input.message.trim() : ''
  const website = typeof input.website === 'string' ? input.website.trim() : ''

  if (website) return response(request, { accepted: true }, 202)
  if (name.length < 2 || name.length > 120) return response(request, { error: 'Name must be 2–120 characters.' }, 422)
  if (!allowedCountryCallingCodes.has(phoneCountryCode)) return response(request, { error: 'Select a valid country calling code.' }, 422)
  if (phoneNumber.length < 4 || phoneNumber.length > 14 || !phonePattern.test(phoneNumber) || phoneCountryCode.length + phoneNumber.length > 15) return response(request, { error: 'Enter a valid phone number using digits only.' }, 422)
  if (!emailPattern.test(email) || email.length > 254) return response(request, { error: 'Enter a valid email address.' }, 422)
  if (organization.length < 2 || organization.length > 160) return response(request, { error: 'Organization must be 2–160 characters.' }, 422)
  if (services.length > 5 || services.some((value) => typeof value !== 'string' || !allowedServices.has(value))) return response(request, { error: 'Invalid service selection.' }, 422)
  if (services.includes('challenging-project') && (challengingProject.length < 5 || challengingProject.length > 1000)) return response(request, { error: 'Describe your challenging project in 5–1,000 characters.' }, 422)
  if (!services.includes('challenging-project') && challengingProject) return response(request, { error: 'Challenging project details require the matching service selection.' }, 422)
  if (message.length < 20 || message.length > 5000) return response(request, { error: 'Briefing must be 20–5,000 characters.' }, 422)

  const url = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !serviceKey) return response(request, { error: 'Submission service is unavailable.' }, 503)

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } })
  const { error } = await admin.from('contact_inquiries').insert({
    name,
    phone_country_code: phoneCountryCode,
    phone_number: phoneNumber,
    email,
    organization,
    services,
    challenging_project: challengingProject || null,
    message,
  })

  if (error) {
    console.error('Contact inquiry insert failed', error.code)
    return response(request, { error: 'Unable to submit your inquiry right now.' }, 500)
  }

  return response(request, { accepted: true }, 201)
})
