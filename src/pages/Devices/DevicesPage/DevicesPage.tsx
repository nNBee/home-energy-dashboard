import { DeviceBreakdown } from '../../../components/energy/DeviceBreakdown/DeviceBreakdown.tsx';
import { EnergyRangeSelector } from '../../../components/energy/EnergyRangeSelector/EnergyRangeSelector.tsx';
import { SummaryCard } from '../../../components/UI/SummaryCard/SummaryCard.tsx';
import type {
  DeviceEnergyBreakdownResponse,
  EnergyRange,
} from '../../../types/energy.ts';

type DevicesPageProps = {
  range: EnergyRange;
  onRangeChange: (range: EnergyRange) => void;
  breakdown: DeviceEnergyBreakdownResponse | undefined;
  totalDeviceConsumptionKwh: number | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export function DevicesPage({
  range,
  onRangeChange,
  breakdown,
  totalDeviceConsumptionKwh,
  isLoading,
  isError,
  error,
}: DevicesPageProps) {
  const hasNoDeviceData = !breakdown || breakdown.devices.length === 0;

  return (
    <div className='space-y-6'>
      <header className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <h1 className='text-2xl font-semibold text-slate-900 dark:text-slate-100'>
            Devices
          </h1>
          <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
            Device-level household energy consumption for the selected period.
          </p>
        </div>

        <EnergyRangeSelector
          value={range}
          onChange={onRangeChange}
          ariaLabel='Device energy range'
        />
      </header>

      <div aria-busy={isLoading} className='max-w-sm'>
        {isLoading ? (
          <div className='min-h-24 animate-pulse rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900'>
            <div className='h-4 w-36 rounded bg-slate-200 dark:bg-slate-700' />
            <div className='mt-3 h-7 w-20 rounded bg-slate-100 dark:bg-slate-800' />
          </div>
        ) : isError ? (
          <div
            role='alert'
            className='min-h-24 rounded-lg border border-red-100 bg-red-50/60 p-5 dark:border-red-900/50 dark:bg-red-950/30'
          >
            <p className='text-sm font-medium text-red-800 dark:text-red-300'>
              Device consumption is unavailable
            </p>
            <p className='mt-1 text-sm text-red-700 dark:text-red-400'>
              {error?.message ?? 'Failed to load device consumption.'}
            </p>
          </div>
        ) : hasNoDeviceData || totalDeviceConsumptionKwh === undefined ? (
          <div className='min-h-24 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900'>
            <p className='text-sm font-medium text-slate-700 dark:text-slate-300'>
              No device consumption summary is available for this period.
            </p>
          </div>
        ) : (
          <SummaryCard
            label='Total device consumption'
            value={totalDeviceConsumptionKwh.toFixed(2)}
            unit='kWh'
          />
        )}
      </div>

      <DeviceBreakdown
        breakdown={breakdown}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </div>
  );
}
