import { useQuery } from '@tanstack/react-query';
import { fetchEnergySummary } from '../../services/energyService.ts';

export function useEnergySummary() {
  return useQuery({
    queryKey: ['energy', 'summary'],
    queryFn: fetchEnergySummary,
  });
}
