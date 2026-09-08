import type { DashboardSummary } from '../types';
type DashboardPageProps = {
  summary: DashboardSummary;
};

export function DashboardPage({ summary }: DashboardPageProps) {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        <li>Current power: {summary.currentPowerKw} kW</li>
        <li>Consumption: {summary.consumptionKwh} kWh</li>
        <li>
          Previous period consumption: {summary.previousPeriodConsumptionKwh}{' '}
          kWh
        </li>
        <li>
          Tariff: {summary.tariff.pricePerKwh} {summary.tariff.currency}/kWh
        </li>
      </ul>
    </div>
  );
}
