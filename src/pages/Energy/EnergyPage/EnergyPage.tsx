import { ConsumptionChart } from '../../../components/energy/ConsumptionChart/ConsumptionChart.tsx';
import { EnergyRangeSelector } from '../../../components/energy/EnergyRangeSelector/EnergyRangeSelector.tsx';
import { SummaryCard } from '../../../components/UI/SummaryCard/SummaryCard.tsx';
import type {
  EnergyConsumptionResponse,
  EnergyRange,
} from '../../../types/energy.ts';
import type { ConsumptionStatistics } from '../../../utils/energy.ts';

type EnergyPageProps = {
  range: EnergyRange;
  onRangeChange: (range: EnergyRange) => void;
  consumption: EnergyConsumptionResponse | undefined;
  statistics: ConsumptionStatistics | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

function getStatisticsLabels(range: EnergyRange) {
  return {
    total: 'Total consumption',
    average: range === 'today' ? 'Average per hour' : 'Average per day',
    peak: range === 'today' ? 'Peak hourly usage' : 'Peak daily usage',
  };
}

export function EnergyPage({
  range,
  onRangeChange,
  consumption,
  statistics,
  isLoading,
  isError,
  error,
}: EnergyPageProps) {
  const hasNoConsumptionData =
    !consumption || consumption.data.length === 0;
  const statisticsLabels = getStatisticsLabels(range);

  return (
    <div className='space-y-6'>
      <header className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <h1 className='text-2xl font-semibold text-slate-900 dark:text-slate-100'>
            Energy
          </h1>
          <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
            Detailed household energy consumption for the selected period.
          </p>
        </div>

        <EnergyRangeSelector
          value={range}
          onChange={onRangeChange}
          ariaLabel='Energy consumption range'
        />
      </header>

      <div
        aria-busy={isLoading}
        className='grid grid-cols-1 gap-4 md:grid-cols-3'
      >
        {isLoading ? (
          Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className='min-h-24 animate-pulse rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900'
            >
              <div className='h-4 w-28 rounded bg-slate-200 dark:bg-slate-700' />
              <div className='mt-3 h-7 w-20 rounded bg-slate-100 dark:bg-slate-800' />
            </div>
          ))
        ) : isError ? (
          <div
            role='alert'
            className='min-h-24 rounded-lg border border-red-100 bg-red-50/60 p-5 dark:border-red-900/50 dark:bg-red-950/30 md:col-span-3'
          >
            <p className='text-sm font-medium text-red-800 dark:text-red-300'>
              Energy statistics are unavailable
            </p>
            <p className='mt-1 text-sm text-red-700 dark:text-red-400'>
              {error?.message ?? 'Failed to load energy consumption.'}
            </p>
          </div>
        ) : hasNoConsumptionData || !statistics ? (
          <div className='min-h-24 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 md:col-span-3'>
            <p className='text-sm font-medium text-slate-700 dark:text-slate-300'>
              No energy statistics are available for this period.
            </p>
          </div>
        ) : (
          <>
            <SummaryCard
              label={statisticsLabels.total}
              value={statistics.totalConsumptionKwh.toFixed(2)}
              unit='kWh'
            />
            <SummaryCard
              label={statisticsLabels.average}
              value={statistics.averageConsumptionKwh.toFixed(2)}
              unit='kWh'
            />
            <SummaryCard
              label={statisticsLabels.peak}
              value={statistics.peakConsumptionKwh.toFixed(2)}
              unit='kWh'
            />
          </>
        )}
      </div>

      <ConsumptionChart
        range={range}
        consumption={consumption}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </div>
  );
}
