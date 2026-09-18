import type { EnergyConsumptionResponse } from '../types/energy.ts';

export type ConsumptionStatistics = {
  totalConsumptionKwh: number;
  averageConsumptionKwh: number;
  peakConsumptionKwh: number;
};

export function calculateEstimatedCost(
  consumptionKwh: number,
  pricePerKwh: number,
): number {
  return consumptionKwh * pricePerKwh;
}

export function calculatePercentageChange(
  current: number,
  previous: number,
): number | null {
  if (previous === 0) {
    return null; // Avoid division by zero
  }
  return ((current - previous) / previous) * 100;
}

export function calculateConsumptionStatistics(
  consumption: EnergyConsumptionResponse,
): ConsumptionStatistics {
  if (consumption.data.length === 0) {
    return {
      totalConsumptionKwh: 0,
      averageConsumptionKwh: 0,
      peakConsumptionKwh: 0,
    };
  }

  let totalConsumptionKwh = 0;
  let peakConsumptionKwh = consumption.data[0].consumptionKwh;

  for (const point of consumption.data) {
    totalConsumptionKwh += point.consumptionKwh;
    peakConsumptionKwh = Math.max(
      peakConsumptionKwh,
      point.consumptionKwh,
    );
  }

  return {
    totalConsumptionKwh,
    averageConsumptionKwh:
      totalConsumptionKwh / consumption.data.length,
    peakConsumptionKwh,
  };
}
