import minerbaOneVisual from '../assets/projects/minerba-one.png';
import briCommandCenterVisual from '../assets/projects/bri-command-center.png';
import networkMonitoringVisual from '../assets/projects/network-monitoring.png';
import apartmentTenantVisual from '../assets/projects/apartment-tenant-management.png';
import carsworldDashboardVisual from '../assets/projects/carsworld-ai-dashboard.png';
import nationalCommandCenterVisual from '../assets/projects/national-command-center.png';
import preciousContractorVisual from '../assets/projects/precious-contractor-profile.png';

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
    filterTags: ['mining'],
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
    filterTags: ['banking'],
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
    filterTags: ['telecommunications'],
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
  {
    slug: 'apartment-tenant-management',
    number: '04',
    filterTags: ['property'],
    category: 'Property / Private Sector',
    sector: 'Property',
    type: 'Mobile Product & Engineering',
    client: 'Agung Podomoro Group',
    name: 'APG Tenant Mobile App & Marketplace',
    summary:
      'An integrated Android application connecting apartment information, management communication, and direct booking for tenant services in one residential experience.',
    image: apartmentTenantVisual,
    imageAlt: 'Abstract visualization of a connected apartment tenant application and residential services marketplace',
    challenge:
      'Apartment tenants depended on separate manual channels for building information, management communication, and internal service bookings. This fragmented experience created additional coordination work for management teams and made routine tenant transactions less convenient than they needed to be.',
    systemPoints: [
      { title: 'Resident Information Hub', desc: 'Centralized apartment information and essential tenant updates in one mobile experience.' },
      { title: 'Management Communication', desc: 'Created a direct digital channel between property management and residents.' },
      { title: 'In-App Service Booking', desc: 'Enabled tenants to discover and book available residential services from the application.' },
      { title: 'Tenant Marketplace', desc: 'Brought internal service transactions into a structured mobile marketplace.' },
    ],
  },
  {
    slug: 'carsworld-ai-executive-dashboard',
    number: '05',
    filterTags: ['automotive'],
    category: 'Automotive / Private Sector',
    sector: 'Automotive',
    type: 'AI Executive Dashboard',
    client: 'Carsworld',
    name: 'Carsworld AI Executive Dashboard',
    summary:
      'An AI-powered executive dashboard transforming distributed transaction and operational data into a unified view for faster, more informed business decisions.',
    image: carsworldDashboardVisual,
    imageAlt: 'Abstract visualization of an AI-powered automotive transaction and executive intelligence dashboard',
    challenge:
      'Transaction and operational data were scattered across separate sources, limiting executive visibility into business performance and making critical insights harder to surface. Teams needed a clearer way to connect transactional activity with operational conditions and productivity priorities.',
    systemPoints: [
      { title: 'Unified Transaction View', desc: 'Consolidated distributed transaction data into a single executive perspective.' },
      { title: 'AI-Assisted Insights', desc: 'Applied AI to surface meaningful patterns across operational and transactional information.' },
      { title: 'Operational Visibility', desc: 'Connected business activity with the workflow conditions affecting productivity.' },
      { title: 'Executive Decision Support', desc: 'Presented critical signals in a form designed for faster management review and action.' },
    ],
  },
  {
    slug: 'national-command-center',
    number: '06',
    filterTags: ['law-enforcement'],
    category: 'Law Enforcement / Government',
    sector: 'Law Enforcement',
    type: 'Integrated Command Center',
    client: 'Confidential',
    name: 'National Command Center',
    summary:
      'A large-scale command center integrating multi-format regional reporting into a unified operational view for faster cross-regional analysis and decision-making.',
    image: nationalCommandCenterVisual,
    imageAlt: 'Abstract visualization of a secure national command center integrating multi-format regional data',
    challenge:
      'Operational data arrived from different regions and organizational levels in multiple formats, creating disconnected reporting flows and slowing cross-regional analysis. The client needed a scalable way to normalize those inputs without losing the context required for coordinated decision-making.',
    systemPoints: [
      { title: 'Multi-Format Data Pipeline', desc: 'Structured varied incoming data formats into a consistent integration flow.' },
      { title: 'Regional Reporting Network', desc: 'Unified reporting from different regions and organizational levels.' },
      { title: 'Command Analysis View', desc: 'Consolidated operational inputs into one environment for cross-regional analysis.' },
      { title: 'Coordinated Visibility', desc: 'Provided decision-makers with a shared view across previously separated data silos.' },
    ],
  },
  {
    slug: 'precious-contractor-company-profile',
    number: '07',
    filterTags: ['construction'],
    category: 'Construction / Private Sector',
    sector: 'Construction',
    type: 'Corporate Website',
    client: 'Precious Contractor',
    name: 'Construction Company Profile Website',
    summary:
      'A modern, high-impact company profile website presenting construction capabilities and project experience to strengthen credibility with prospective clients and investors.',
    image: preciousContractorVisual,
    imageAlt: 'Abstract visualization of a construction company profile website connecting architectural projects, blueprints, and structural capabilities',
    challenge:
      'The company lacked a professional digital presence capable of communicating its construction expertise and completed work to prospective clients and investors. Without a credible central destination for company information and project experience, establishing trust and supporting new business conversations was more difficult.',
    systemPoints: [
      { title: 'Corporate Positioning', desc: 'Structured the company profile around its capabilities, experience, and professional credibility.' },
      { title: 'Project Showcase', desc: 'Created a clear visual destination for presenting representative construction work.' },
      { title: 'Stakeholder Information', desc: 'Organized essential company information for prospective clients and investors.' },
      { title: 'Lead Generation Path', desc: 'Provided a focused digital route from project discovery to business inquiry.' },
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
