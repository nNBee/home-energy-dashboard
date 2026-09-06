import type { EnergySummaryResponse } from '../../../types/energy.ts';

type DashboardPageProps = {
  energySummary: EnergySummaryResponse;
};

export function DashboardPage({ energySummary }: DashboardPageProps) {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        <li>Current power: {energySummary.currentPowerKw} kW</li>
        <li>Consumption: {energySummary.consumptionKwh} kWh</li>
        <li>
          Previous period consumption:{' '}
          {energySummary.previousPeriodConsumptionKwh} kWh
        </li>
        <li>
          Tariff: {energySummary.tariff.pricePerKwh}{' '}
          {energySummary.tariff.currency}/kWh
        </li>
      </ul>
    </div>
  );
}
