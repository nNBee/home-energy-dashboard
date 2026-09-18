import {
  Heater,
  Plug,
  PlugZap,
  ShowerHead,
  Snowflake,
  Zap,
} from 'lucide-react';
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

function getDeviceIcon(deviceId: string) {
  switch (deviceId) {
    case 'heat-pump':
      return Heater;
    case 'water-heater':
      return ShowerHead;
    case 'air-conditioner':
      return Snowflake;
    case 'other':
      return PlugZap;
    default:
      return Plug;
  }
}

export function DevicesPage({
  range,
  onRangeChange,
  breakdown,
  totalDeviceConsumptionKwh,
  isLoading,
  isError,
  error,
}: DevicesPageProps) {
  const devices = breakdown
    ? [...breakdown.devices].sort(
        (first, second) => second.consumptionKwh - first.consumptionKwh,
      )
    : [];
  const hasNoDeviceData = devices.length === 0;

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
            icon={<Zap aria-hidden='true' size={20} strokeWidth={1.75} />}
          />
        )}
      </div>

      <section aria-labelledby='device-consumption-title'>
        <div>
          <h2
            id='device-consumption-title'
            className='text-lg font-semibold text-slate-900 dark:text-slate-100'
          >
            Device consumption
          </h2>
          <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
            Each device&apos;s share of consumption for the selected period.
          </p>
        </div>

        <div className='mt-6'>
          {isLoading ? (
            <div role='status'>
              <ul
                aria-hidden='true'
                className='grid grid-cols-1 gap-4 md:grid-cols-2'
              >
                {Array.from({ length: 4 }, (_, index) => (
                  <li
                    key={index}
                    className='min-h-44 animate-pulse rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900'
                  >
                    <div className='h-4 w-28 rounded bg-slate-200 dark:bg-slate-700' />
                    <div className='mt-6 h-8 w-24 rounded bg-slate-100 dark:bg-slate-800' />
                    <div className='mt-2 h-4 w-16 rounded bg-slate-100 dark:bg-slate-800' />
                    <div className='mt-5 h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800' />
                  </li>
                ))}
              </ul>
              <span className='sr-only'>Loading device usage…</span>
            </div>
          ) : isError ? (
            <div
              role='alert'
              className='flex min-h-44 items-center justify-center rounded-lg border border-red-100 bg-red-50/60 px-6 text-center dark:border-red-900/50 dark:bg-red-950/30'
            >
              <div>
                <p className='text-sm font-medium text-red-800 dark:text-red-300'>
                  Device usage is unavailable
                </p>
                <p className='mt-1 text-sm text-red-700 dark:text-red-400'>
                  {error?.message ?? 'Failed to load device usage.'}
                </p>
              </div>
            </div>
          ) : hasNoDeviceData || totalDeviceConsumptionKwh === undefined ? (
            <div className='flex min-h-44 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 text-center dark:border-slate-800 dark:bg-slate-900'>
              <p className='text-sm text-slate-600 dark:text-slate-400'>
                No device usage is available for this period.
              </p>
            </div>
          ) : (
            <ul className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {devices.map((device) => {
                const DeviceIcon = getDeviceIcon(device.id);
                const percentage =
                  totalDeviceConsumptionKwh === 0
                    ? 0
                    : (device.consumptionKwh /
                        totalDeviceConsumptionKwh) *
                      100;

                return (
                  <li
                    key={device.id}
                    className='rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900'
                  >
                    <div className='flex items-start justify-between gap-4'>
                      <h3 className='text-base font-medium text-slate-900 dark:text-slate-100'>
                        {device.name}
                      </h3>
                      <span className='flex size-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'>
                        <DeviceIcon
                          aria-hidden='true'
                          size={20}
                          strokeWidth={1.75}
                        />
                      </span>
                    </div>

                    <p className='mt-5 flex items-baseline gap-1 text-3xl font-semibold tabular-nums text-slate-900 dark:text-slate-100'>
                      {device.consumptionKwh.toFixed(1)}
                      <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                        kWh
                      </span>
                    </p>
                    <p className='mt-1 text-sm font-medium tabular-nums text-slate-500 dark:text-slate-400'>
                      {percentage.toFixed(1)}% of total consumption
                    </p>

                    <div
                      role='progressbar'
                      aria-label={`${device.name} share of total device consumption`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={percentage}
                      className='mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700'
                    >
                      <div
                        className='h-full rounded-full bg-emerald-500'
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
