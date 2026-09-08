import type { DeviceEnergyBreakdownResponse } from '../../../types/energy.ts';

type DeviceBreakdownProps = {
  breakdown: DeviceEnergyBreakdownResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export function DeviceBreakdown({
  breakdown,
  isLoading,
  isError,
  error,
}: DeviceBreakdownProps) {
  const devices = breakdown
    ? [...breakdown.devices].sort(
        (first, second) => second.consumptionKwh - first.consumptionKwh,
      )
    : [];
  const totalConsumption = devices.reduce(
    (total, device) => total + device.consumptionKwh,
    0,
  );

  return (
    <section
      aria-labelledby='device-breakdown-title'
      className='rounded-lg border border-slate-200 bg-white p-5 shadow-sm'
    >
      <div>
        <h2
          id='device-breakdown-title'
          className='text-lg font-semibold text-slate-900'
        >
          Device breakdown
        </h2>
        <p className='mt-1 text-sm text-slate-500'>
          Energy consumption by device for the selected period.
        </p>
      </div>

      <div className='mt-6'>
        {isLoading ? (
          <div role='status'>
            <ul
              aria-hidden='true'
              className='grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2'
            >
              {Array.from({ length: 4 }, (_, index) => (
                <li key={index} className='animate-pulse'>
                  <div className='flex items-center justify-between gap-4'>
                    <div className='h-4 w-28 rounded bg-slate-200' />
                    <div className='h-4 w-16 rounded bg-slate-100' />
                  </div>
                  <div className='mt-3 flex items-center gap-3'>
                    <div className='h-2 flex-1 rounded-full bg-slate-100' />
                    <div className='h-3 w-12 rounded bg-slate-100' />
                  </div>
                </li>
              ))}
            </ul>
            <span className='sr-only'>Loading device usage…</span>
          </div>
        ) : isError ? (
          <div
            role='alert'
            className='flex min-h-28 items-center justify-center rounded-md bg-red-50/60 px-6 text-center'
          >
            <div>
              <p className='text-sm font-medium text-red-800'>
                Device usage is unavailable
              </p>
              <p className='mt-1 text-sm text-red-700'>
                {error?.message ?? 'Failed to load device usage.'}
              </p>
            </div>
          </div>
        ) : devices.length === 0 ? (
          <div className='flex min-h-28 items-center justify-center rounded-md bg-slate-50 px-6 text-center'>
            <p className='text-sm text-slate-600'>
              No device usage is available for this period.
            </p>
          </div>
        ) : (
          <ul className='grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2'>
            {devices.map((device) => {
              const percentage =
                totalConsumption === 0
                  ? 0
                  : (device.consumptionKwh / totalConsumption) * 100;

              return (
                <li key={device.id}>
                  <div className='flex items-center justify-between gap-4'>
                    <span className='text-sm font-medium text-slate-900'>
                      {device.name}
                    </span>

                    <span className='text-sm font-semibold tabular-nums text-slate-700'>
                      {device.consumptionKwh.toFixed(1)}{' '}
                      <span className='font-medium text-slate-500'>kWh</span>
                    </span>
                  </div>

                  <div className='mt-3 flex items-center gap-3'>
                    <div
                      role='progressbar'
                      aria-label={`${device.name} share of device energy consumption`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={percentage}
                      className='h-2 flex-1 rounded-full bg-slate-200'
                    >
                      <div
                        className='h-full rounded-full bg-emerald-500'
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <span className='w-12 text-right text-xs font-medium tabular-nums text-slate-500'>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
