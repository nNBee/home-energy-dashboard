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
          <p className='text-sm text-slate-500'>Loading device usage…</p>
        ) : isError ? (
          <p className='text-sm text-red-700'>
            Failed to load device usage: {error?.message}
          </p>
        ) : devices.length === 0 ? (
          <p className='text-sm text-slate-500'>
            No device usage is available for this period.
          </p>
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
