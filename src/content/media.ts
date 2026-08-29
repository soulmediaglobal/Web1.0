import minerbaOneVisual from '../assets/projects/minerba-one.png'
import briCommandCenterVisual from '../assets/projects/bri-command-center.png'
import networkMonitoringVisual from '../assets/projects/network-monitoring.png'
import apartmentTenantVisual from '../assets/projects/apartment-tenant-management.png'
import carsworldDashboardVisual from '../assets/projects/carsworld-ai-dashboard.png'
import nationalCommandCenterVisual from '../assets/projects/national-command-center.png'
import preciousContractorVisual from '../assets/projects/precious-contractor-profile.png'
import strategyVisual from '../assets/services/strategy.png'
import productVisual from '../assets/services/product.png'
import aiIntegrationVisual from '../assets/services/ai-integration.png'
import cloudPlatformVisual from '../assets/services/cloud-platform.png'
import rayhanImg from '../assets/ray.png'
import tomyImg from '../assets/tomy.png'

const existingMedia: Record<string, string> = {
  'projects/minerba-one.png': minerbaOneVisual, 'projects/bri-command-center.png': briCommandCenterVisual,
  'projects/network-monitoring.png': networkMonitoringVisual, 'projects/apartment-tenant-management.png': apartmentTenantVisual,
  'projects/carsworld-ai-dashboard.png': carsworldDashboardVisual, 'projects/national-command-center.png': nationalCommandCenterVisual,
  'projects/precious-contractor-profile.png': preciousContractorVisual, 'services/strategy.png': strategyVisual,
  'services/product.png': productVisual, 'services/ai-integration.png': aiIntegrationVisual,
  'services/cloud-platform.png': cloudPlatformVisual, 'leadership/ray.png': rayhanImg, 'leadership/tomy.png': tomyImg,
}
export function resolveMedia(path: string | null): string { return path ? existingMedia[path] ?? path : '' }
