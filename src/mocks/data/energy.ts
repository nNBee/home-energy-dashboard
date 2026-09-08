import type {
  EnergyRange,
  EnergySummaryResponse,
} from '../../types/energy.ts'

export const energySummaries = {
  today: {
    currentPowerKw: 2.4,
    consumptionKwh: 18.7,
    previousPeriodConsumptionKwh: 20.4,
    tariff: {
      pricePerKwh: 36,
      currency: 'HUF',
    },
  },
  week: {
    currentPowerKw: 2.4,
    consumptionKwh: 126.8,
    previousPeriodConsumptionKwh: 134.2,
    tariff: {
      pricePerKwh: 36,
      currency: 'HUF',
    },
  },
  month: {
    currentPowerKw: 2.4,
    consumptionKwh: 548.6,
    previousPeriodConsumptionKwh: 571.3,
    tariff: {
      pricePerKwh: 36,
      currency: 'HUF',
    },
  },
} satisfies Record<EnergyRange, EnergySummaryResponse>
