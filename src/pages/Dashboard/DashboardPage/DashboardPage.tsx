import { SummaryCard } from '../../../components/UI/SummaryCard/SummaryCard';
import type {
  DeviceEnergyBreakdownResponse,
  EnergyConsumptionResponse,
  EnergyRange,
} from '../../../types/energy.ts';
import type { DashboardSummary } from '../types';
import { ConsumptionChart } from './ConsumptionChart.tsx';
import { DeviceBreakdown } from './DeviceBreakdown.tsx';

type DashboardPageProps = {
  summary: DashboardSummary;
  range: EnergyRange;
  onRangeChange: (range: EnergyRange) => void;
  consumption: EnergyConsumptionResponse | undefined;
  isConsumptionLoading: boolean;
  isConsumptionError: boolean;
  consumptionError: Error | null;
  deviceBreakdown: DeviceEnergyBreakdownResponse | undefined;
  isDeviceBreakdownLoading: boolean;
  isDeviceBreakdownError: boolean;
  deviceBreakdownError: Error | null;
};

const rangeOptions = [
  { label: 'Today', value: 'today' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
] satisfies ReadonlyArray<{ label: string; value: EnergyRange }>;

export function DashboardPage({
  summary,
  range,
  onRangeChange,
  consumption,
  isConsumptionLoading,
  isConsumptionError,
  consumptionError,
  deviceBreakdown,
  isDeviceBreakdownLoading,
  isDeviceBreakdownError,
  deviceBreakdownError,
}: DashboardPageProps) {
  const {
    currentPowerKw,
    consumptionKwh,
    estimatedCost,
    percentageChange,
    tariff,
  } = summary;

  return (
    <div className='space-y-6'>
      <header className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <h1 className='text-2xl font-semibold text-slate-900'>Dashboard</h1>
          <p className='mt-1 text-sm text-slate-500'>
            An overview of your current energy usage.
          </p>
        </div>

        <div
          aria-label='Energy summary range'
          className='inline-flex self-start rounded-lg border border-slate-200 bg-white p-1 shadow-sm sm:self-auto'
          role='group'
        >
          {rangeOptions.map((option) => (
            <button
              key={option.value}
              type='button'
              aria-pressed={range === option.value}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                range === option.value
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
              onClick={() => onRangeChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
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

      <ConsumptionChart
        range={range}
        consumption={consumption}
        isLoading={isConsumptionLoading}
        isError={isConsumptionError}
        error={consumptionError}
      />

      <DeviceBreakdown
        breakdown={deviceBreakdown}
        isLoading={isDeviceBreakdownLoading}
        isError={isDeviceBreakdownError}
        error={deviceBreakdownError}
      />
    </div>
  );
}
