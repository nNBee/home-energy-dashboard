import type {
  DeviceEnergyBreakdownResponse,
  EnergyRange,
} from '../types/energy.ts';

export async function fetchDeviceEnergyBreakdown(
  range: EnergyRange,
): Promise<DeviceEnergyBreakdownResponse> {
  const response = await fetch(`/api/energy/devices?range=${range}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch device energy usage: ${response.status}`);
  }

  return response.json() as Promise<DeviceEnergyBreakdownResponse>;
}
