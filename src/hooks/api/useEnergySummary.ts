import { useQuery } from '@tanstack/react-query';
import { fetchEnergySummary } from '../../services/energyService.ts';
import type { EnergyRange } from '../../types/energy.ts';

export function useEnergySummary(range: EnergyRange) {
  return useQuery({
    queryKey: ['energy', 'summary', range],
    queryFn: () => fetchEnergySummary(range),
  });
}
