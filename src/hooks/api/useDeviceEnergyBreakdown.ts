import { useQuery } from '@tanstack/react-query';
import { fetchDeviceEnergyBreakdown } from '../../services/deviceEnergyService.ts';
import type { EnergyRange } from '../../types/energy.ts';

export function useDeviceEnergyBreakdown(range: EnergyRange) {
  return useQuery({
    queryKey: ['energy', 'devices', range],
    queryFn: () => fetchDeviceEnergyBreakdown(range),
  });
}
