import { supabase, supabaseConfigurationError } from '../lib/supabase'

export type ContactSubmission = {
  name: string
  phoneCountryCode: string
  phoneNumber: string
  email: string
  organization: string
  services: string[]
  challengingProject: string
  message: string
  website: string
}

export async function submitContactInquiry(input: ContactSubmission) {
  if (!supabase) throw new Error(supabaseConfigurationError ?? 'Submission service is unavailable.')
  const { data, error } = await supabase.functions.invoke('submit-contact-inquiry', { body: input })
  if (error) throw new Error('Unable to submit your inquiry right now. Please try again.')
  if (!data?.accepted) throw new Error(data?.error ?? 'Unable to submit your inquiry right now.')
}
