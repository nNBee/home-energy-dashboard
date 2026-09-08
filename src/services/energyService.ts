import type {
  EnergyRange,
  EnergySummaryResponse,
} from '../types/energy.ts';

export async function fetchEnergySummary(
  range: EnergyRange,
): Promise<EnergySummaryResponse> {
  const response = await fetch(`/api/energy/summary?range=${range}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch energy summary: ${response.status}`);
  }

  return response.json() as Promise<EnergySummaryResponse>;
}
