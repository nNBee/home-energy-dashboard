import type { EnergySummaryResponse } from '../types/energy.ts';

export async function fetchEnergySummary(): Promise<EnergySummaryResponse> {
  const response = await fetch('/api/energy/summary');

  if (!response.ok) {
    throw new Error(`Failed to fetch energy summary: ${response.status}`);
  }

  return response.json() as Promise<EnergySummaryResponse>;
}
