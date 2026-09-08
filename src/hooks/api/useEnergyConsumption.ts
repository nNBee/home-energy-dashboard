import { useQuery } from '@tanstack/react-query';
import { fetchEnergyConsumption } from '../../services/energyConsumptionService.ts';
import type { EnergyRange } from '../../types/energy.ts';

export function useEnergyConsumption(range: EnergyRange) {
  return useQuery({
    queryKey: ['energy', 'consumption', range],
    queryFn: () => fetchEnergyConsumption(range),
  });
}
