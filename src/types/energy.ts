export type EnergyRange = 'today' | 'week' | 'month';

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

export type EnergyConsumptionPoint = {
  timestamp: string;
  consumptionKwh: number;
};

export type EnergyConsumptionResponse = {
  range: EnergyRange;
  data: EnergyConsumptionPoint[];
};

export type DeviceEnergyUsage = {
  id: string;
  name: string;
  consumptionKwh: number;
};

export type DeviceEnergyBreakdownResponse = {
  range: EnergyRange;
  devices: DeviceEnergyUsage[];
};
