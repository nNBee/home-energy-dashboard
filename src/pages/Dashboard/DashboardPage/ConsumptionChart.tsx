import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type {
  EnergyConsumptionResponse,
  EnergyRange,
} from '../../../types/energy.ts';

type ConsumptionChartProps = {
  range: EnergyRange;
  consumption: EnergyConsumptionResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

function getTimestampFormatOptions(
  range: EnergyRange,
): Intl.DateTimeFormatOptions {
  switch (range) {
    case 'today':
      return { hour: '2-digit', minute: '2-digit', hour12: false };
    case 'week':
      return { weekday: 'short' };
    case 'month':
      return { day: 'numeric' };
  }
}

export function ConsumptionChart({
  range,
  consumption,
  isLoading,
  isError,
  error,
}: ConsumptionChartProps) {
  const timestampFormatter = new Intl.DateTimeFormat(
    undefined,
    getTimestampFormatOptions(range),
  );

  const formatTimestamp = (timestamp: string) =>
    timestampFormatter.format(new Date(timestamp));

  return (
    <section
      aria-labelledby='consumption-chart-title'
      className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5'
    >
      <div>
        <h2
          id='consumption-chart-title'
          className='text-lg font-semibold text-slate-900 dark:text-slate-100'
        >
          Energy consumption
        </h2>
        <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
          Energy used over the selected period.
        </p>
      </div>

      <div className='mt-6 h-80'>
        {isLoading ? (
          <div
            role='status'
            className='flex h-full animate-pulse flex-col justify-between rounded-md bg-slate-50 px-6 py-8 dark:bg-slate-950/50'
          >
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className='h-px w-full bg-slate-200 dark:bg-slate-800'
              />
            ))}
            <span className='sr-only'>Loading consumption data…</span>
          </div>
        ) : isError ? (
          <div
            role='alert'
            className='flex h-full items-center justify-center rounded-md bg-red-50/60 px-6 text-center dark:bg-red-950/30'
          >
            <div>
              <p className='text-sm font-medium text-red-800 dark:text-red-300'>
                Consumption data is unavailable
              </p>
              <p className='mt-1 text-sm text-red-700 dark:text-red-400'>
                {error?.message ?? 'Failed to load consumption data.'}
              </p>
            </div>
          </div>
        ) : !consumption || consumption.data.length === 0 ? (
          <div className='flex h-full items-center justify-center rounded-md bg-slate-50 px-6 text-center dark:bg-slate-950/50'>
            <p className='text-sm text-slate-600 dark:text-slate-400'>
              No consumption data is available for this period.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              accessibilityLayer
              data={consumption.data}
              margin={{ top: 8, right: 16, bottom: 8, left: 8 }}
            >
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='var(--chart-grid)'
              />
              <XAxis
                dataKey='timestamp'
                minTickGap={28}
                tickFormatter={formatTimestamp}
                tick={{ fill: 'var(--chart-text)', fontSize: 12 }}
                tickLine={false}
                tickMargin={8}
                axisLine={{ stroke: 'var(--chart-axis)' }}
              />
              <YAxis
                label={{
                  value: 'kWh',
                  angle: -90,
                  position: 'insideLeft',
                  fill: 'var(--chart-text)',
                }}
                tick={{ fill: 'var(--chart-text)', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--chart-tooltip-background)',
                  border: '1px solid var(--chart-tooltip-border)',
                  borderRadius: '0.5rem',
                  color: 'var(--chart-tooltip-text)',
                }}
                itemStyle={{ color: 'var(--chart-tooltip-text)' }}
                labelStyle={{ color: 'var(--chart-tooltip-text)' }}
                labelFormatter={(timestamp) =>
                  formatTimestamp(String(timestamp))
                }
                formatter={(value) => [
                  `${Number(value).toFixed(2)} kWh`,
                  'Consumption',
                ]}
              />
              <Line
                type='monotone'
                dataKey='consumptionKwh'
                stroke='var(--color-emerald-500)'
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
