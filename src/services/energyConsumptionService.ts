import type {
  EnergyConsumptionResponse,
  EnergyRange,
} from '../types/energy.ts';

export async function fetchEnergyConsumption(
  range: EnergyRange,
): Promise<EnergyConsumptionResponse> {
  const response = await fetch(`/api/energy/consumption?range=${range}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch energy consumption: ${response.status}`);
  }

  return response.json() as Promise<EnergyConsumptionResponse>;
}
