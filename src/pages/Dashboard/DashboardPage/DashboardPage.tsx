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
  summary: DashboardSummary | undefined;
  isSummaryLoading: boolean;
  isSummaryError: boolean;
  summaryError: Error | null;
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
  isSummaryLoading,
  isSummaryError,
  summaryError,
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
  return (
    <div className='space-y-6'>
      <header className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <h1 className='text-2xl font-semibold text-slate-900 dark:text-slate-100'>
            Dashboard
          </h1>
          <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
            An overview of your current energy usage.
          </p>
        </div>

        <div
          aria-label='Energy summary range'
          className='inline-flex self-start rounded-lg border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:self-auto'
          role='group'
        >
          {rangeOptions.map((option) => (
            <button
              key={option.value}
              type='button'
              aria-pressed={range === option.value}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:focus-visible:outline-emerald-400 ${
                range === option.value
                  ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
              }`}
              onClick={() => onRangeChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </header>

      <div
        aria-busy={isSummaryLoading}
        className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'
      >
        {isSummaryLoading ? (
          Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className='min-h-24 animate-pulse rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900'
            >
              <div className='h-4 w-24 rounded bg-slate-200 dark:bg-slate-700' />
              <div className='mt-3 h-7 w-20 rounded bg-slate-100 dark:bg-slate-800' />
            </div>
          ))
        ) : isSummaryError ? (
          <div
            role='alert'
            className='min-h-24 rounded-lg border border-red-100 bg-red-50/60 p-5 dark:border-red-900/50 dark:bg-red-950/30 md:col-span-2 lg:col-span-4'
          >
            <p className='text-sm font-medium text-red-800 dark:text-red-300'>
              Energy summary is unavailable
            </p>
            <p className='mt-1 text-sm text-red-700 dark:text-red-400'>
              {summaryError?.message ?? 'Failed to load the energy summary.'}
            </p>
          </div>
        ) : !summary ? (
          <div className='min-h-24 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 md:col-span-2 lg:col-span-4'>
            <p className='text-sm font-medium text-slate-700 dark:text-slate-300'>
              No energy summary is available for this period.
            </p>
          </div>
        ) : (
          <>
            <SummaryCard
              label='Current power'
              value={summary.currentPowerKw}
              unit='kW'
            />
            <SummaryCard
              label='Consumption'
              value={summary.consumptionKwh}
              unit='kWh'
            />
            <SummaryCard
              label='Estimated cost'
              value={summary.estimatedCost.toFixed(2)}
              unit={summary.tariff.currency}
            />
            <SummaryCard
              label='Change vs previous period'
              value={
                summary.percentageChange === null
                  ? '—'
                  : summary.percentageChange.toFixed(2)
              }
              unit={summary.percentageChange === null ? undefined : '%'}
            />
          </>
        )}
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
