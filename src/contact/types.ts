export type InquiryStatus = 'new' | 'contacted' | 'closed'

export type ContactInquiry = {
  id: string
  identity_title: string
  email: string
  organization: string
  budget: string | null
  services: string[]
  message: string
  status: InquiryStatus
  created_at: string
  updated_at: string
}

export const serviceLabels: Record<string, string> = {
  'strategy-product': 'Digital Strategy & Product Architecture',
  'software-enterprise': 'Custom Software & Enterprise Applications',
  'ai-automation': 'AI, Automation & System Integration',
  'cloud-platform': 'Cloud & Platform Engineering',
  'challenging-project': 'Another Challenging Project',
}

export const budgetLabels: Record<string, string> = {
  tier1: '< $10,000 USD',
  tier2: '$10,000–$50,000 USD',
  tier3: '$50,000+ USD (Enterprise)',
}
