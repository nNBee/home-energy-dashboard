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
