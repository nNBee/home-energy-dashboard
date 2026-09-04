export type EnergyRange = 'day' | 'week' | 'month';

export type Tariff = {
  pricePerKwh: number;
  currency: 'HUF';
};

export type EnergySummaryResponse = {
  currentPowerKw: number;
  consumptionKwh: number;
  previousPeriodConsumptionKwh: number;
  tariff: Tariff;
};
