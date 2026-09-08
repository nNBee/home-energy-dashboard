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
      return { hour: '2-digit', minute: '2-digit' };
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
      className='rounded-lg border border-slate-200 bg-white p-5 shadow-sm'
    >
      <div>
        <h2
          id='consumption-chart-title'
          className='text-lg font-semibold text-slate-900'
        >
          Energy consumption
        </h2>
        <p className='mt-1 text-sm text-slate-500'>
          Energy used over the selected period.
        </p>
      </div>

      <div className='mt-6 h-80'>
        {isLoading ? (
          <div
            role='status'
            className='flex h-full animate-pulse flex-col justify-between rounded-md bg-slate-50 px-6 py-8'
          >
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className='h-px w-full bg-slate-200' />
            ))}
            <span className='sr-only'>Loading consumption data…</span>
          </div>
        ) : isError ? (
          <div
            role='alert'
            className='flex h-full items-center justify-center rounded-md bg-red-50/60 px-6 text-center'
          >
            <div>
              <p className='text-sm font-medium text-red-800'>
                Consumption data is unavailable
              </p>
              <p className='mt-1 text-sm text-red-700'>
                {error?.message ?? 'Failed to load consumption data.'}
              </p>
            </div>
          </div>
        ) : !consumption || consumption.data.length === 0 ? (
          <div className='flex h-full items-center justify-center rounded-md bg-slate-50 px-6 text-center'>
            <p className='text-sm text-slate-600'>
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
              <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
              <XAxis
                dataKey='timestamp'
                tickFormatter={formatTimestamp}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis
                label={{
                  value: 'kWh',
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#64748b',
                }}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
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
                stroke='#059669'
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
