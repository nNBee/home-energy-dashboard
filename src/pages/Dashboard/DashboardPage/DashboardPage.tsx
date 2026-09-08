import { SummaryCard } from '../../../components/UI/SummaryCard/SummaryCard';
import type { DashboardSummary } from '../types';

type DashboardPageProps = {
  summary: DashboardSummary;
};

export function DashboardPage({ summary }: DashboardPageProps) {
  const {
    currentPowerKw,
    consumptionKwh,
    estimatedCost,
    percentageChange,
    tariff,
  } = summary;

  return (
    <div className='space-y-6'>
      <header>
        <h1 className='text-2xl font-semibold text-slate-900'>Dashboard</h1>
        <p className='mt-1 text-sm text-slate-500'>
          An overview of your current energy usage.
        </p>
      </header>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <SummaryCard label='Current power' value={currentPowerKw} unit='kW' />
        <SummaryCard label='Consumption' value={consumptionKwh} unit='kWh' />
        <SummaryCard
          label='Estimated cost'
          value={estimatedCost.toFixed(2)}
          unit={tariff.currency}
        />
        <SummaryCard
          label='Change vs previous period'
          value={percentageChange === null ? '—' : percentageChange.toFixed(2)}
          unit={percentageChange === null ? undefined : '%'}
        />
      </div>
    </div>
  );
}
