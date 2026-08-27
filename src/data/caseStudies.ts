import minerbaOneVisual from '../assets/projects/minerba-one.png';
import briCommandCenterVisual from '../assets/projects/bri-command-center.png';
import networkMonitoringVisual from '../assets/projects/network-monitoring.png';

export type SystemPoint = {
  title: string;
  desc: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type CaseStudy = {
  slug: string;
  number: string;
  filterTags: string[];
  category: string;
  sector: string;
  type: string;
  client: string;
  name: string;
  summary: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  challenge: string;
  systemPoints: SystemPoint[];
  /**
   * Optional — only include this once there is a real, attributable quote
   * from the client. Never fabricate a quote and attach it to a real
   * organization. Leave undefined and the detail page hides the section.
   */
  testimonial?: Testimonial;
};

/**
 * TODO(content): challenge / systemPoints are drafted from the existing
 * marketing summary for each project. Review and refine with the delivery
 * team before this goes live — nothing here is a verified client quote or
 * measured statistic. testimonial is intentionally left empty until a real
 * quote is provided.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'minerbaone',
    number: '01',
    filterTags: ['gov'],
    category: 'Mining / Government',
    sector: 'Government',
    type: 'Platform Build',
    client: 'Kementerian ESDM',
    name: 'MinerbaOne',
    summary:
      'An integrated digital platform unifying governance, licensing workflows, monitoring, and sector data for mineral and coal mining.',
    image: minerbaOneVisual,
    imageAlt: 'Abstract visualization of an integrated digital mining governance platform',
    featured: true,
    challenge:
      'Licensing and oversight for mineral and coal mining were spread across disconnected tools and manual review steps, making approvals slow and sector-wide visibility difficult for regulators.',
    systemPoints: [
      { title: 'Unified Licensing', desc: 'A single workflow for permit submission and review.' },
      { title: 'Sector Monitoring', desc: 'Consolidated visibility into mining activity and compliance.' },
      { title: 'Sector Data Hub', desc: 'Centralized data across regions and licensing bodies.' },
      { title: 'Governance Controls', desc: 'Structured access for regulators and operators.' },
    ],
  },
  {
    slug: 'bri-command-center',
    number: '02',
    filterTags: ['bank'],
    category: 'Banking / State-owned Company',
    sector: 'Banking',
    type: 'Command Center',
    client: 'Bank Rakyat Indonesia',
    name: 'BRI Digital Command Center',
    summary:
      'A centralized command center connecting real-time sentiment and audience insights with business performance indicators.',
    image: briCommandCenterVisual,
    imageAlt: 'Abstract visualization of a banking intelligence and digital monitoring command center',
    challenge:
      'Sentiment signals, audience insight, and business performance data lived in separate systems, making it hard to see how public perception connected to actual business outcomes in one place.',
    systemPoints: [
      { title: 'Unified Dashboard', desc: 'Sentiment and performance data in a single command view.' },
      { title: 'Real-Time Feeds', desc: 'Continuously updated audience and market signals.' },
      { title: 'Cross-Team Visibility', desc: 'Shared view across communications and business teams.' },
    ],
  },
  {
    slug: 'network-monitoring',
    number: '03',
    filterTags: ['telco', 'gov'],
    category: 'Communication / Government',
    sector: 'Telecommunications',
    type: 'National Monitoring System',
    client: 'Kementerian Komunikasi dan Informasi',
    name: 'Internet Connection Network Monitoring',
    summary:
      'A nationwide digital map visualizing 2G and 3G coverage, performance, and network quality across regions.',
    image: networkMonitoringVisual,
    imageAlt: 'Abstract visualization of nationwide telecommunications network monitoring across Indonesia',
    challenge:
      'Understanding network coverage and quality nationwide meant piecing together regional reports with no single, current view of where connectivity was strong, weak, or missing.',
    systemPoints: [
      { title: 'National Coverage Map', desc: 'A live map of 2G and 3G coverage by region.' },
      { title: 'Quality Tracking', desc: 'Ongoing visibility into network performance, not just presence.' },
      { title: 'Regional Breakdown', desc: 'Drill-down views for provincial and local oversight.' },
    ],
  },
];

export function getCaseStudyBySlug(slug: string | undefined): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAdjacentCaseStudies(slug: string): { prev?: CaseStudy; next?: CaseStudy } {
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index === -1) return {};
  const prev = index > 0 ? caseStudies[index - 1] : caseStudies[caseStudies.length - 1];
  const next = index < caseStudies.length - 1 ? caseStudies[index + 1] : caseStudies[0];
  return { prev, next };
}
