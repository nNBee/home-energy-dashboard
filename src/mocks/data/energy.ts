import type { EnergySummaryResponse } from '../../types/energy.ts'

export const energySummary: EnergySummaryResponse = {
  currentPowerKw: 2.4,
  consumptionKwh: 18.7,
  previousPeriodConsumptionKwh: 20.4,
  tariff: {
    pricePerKwh: 36,
    currency: 'HUF',
  },
}
