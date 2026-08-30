export type InquiryStatus = 'new' | 'contacted' | 'closed'

export type ContactInquiry = {
  id: string
  identity_title: string | null
  name: string | null
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

export const serviceLabels: Record<string, string> = {
  'strategy-product': 'Digital Strategy & Product Architecture',
  'software-enterprise': 'Custom Software & Enterprise Applications',
  'ai-automation': 'AI, Automation & System Integration',
  'cloud-platform': 'Cloud & Platform Engineering',
  'challenging-project': 'Another Challenging Project',
}
