export type InquiryStatus = 'new' | 'contacted' | 'closed'

export type ContactInquiry = {
  id: string
  identity_title: string | null
  name: string | null
  phone_country_code: string | null
  phone_number: string | null
  email: string
  organization: string
  budget: string | null
  services: string[]
  challenging_project: string | null
  message: string
  status: InquiryStatus
  created_at: string
  updated_at: string
}

export function formatInquiryPhone(inquiry: Pick<ContactInquiry, 'phone_country_code' | 'phone_number'>) {
  if (!inquiry.phone_number) return null
  return inquiry.phone_country_code ? `+${inquiry.phone_country_code}${inquiry.phone_number}` : inquiry.phone_number
}

export const serviceLabels: Record<string, string> = {
  'strategy-product': 'Digital Strategy & Product Architecture',
  'software-enterprise': 'Custom Software & Enterprise Applications',
  'ai-automation': 'AI, Automation & System Integration',
  'cloud-platform': 'Cloud & Platform Engineering',
  'challenging-project': 'Another Challenging Project',
}
