import type { EnergyRange } from '../../../types/energy.ts';

type EnergyRangeSelectorProps = {
  value: EnergyRange;
  onChange: (range: EnergyRange) => void;
  ariaLabel: string;
};

const rangeOptions = [
  { label: 'Today', value: 'today' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
] satisfies ReadonlyArray<{ label: string; value: EnergyRange }>;

export function EnergyRangeSelector({
  value,
  onChange,
  ariaLabel,
}: EnergyRangeSelectorProps) {
  return (
    <div
      aria-label={ariaLabel}
      className='inline-flex self-start rounded-lg border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:self-auto'
      role='group'
    >
      {rangeOptions.map((option) => (
        <button
          key={option.value}
          type='button'
          aria-pressed={value === option.value}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:focus-visible:outline-emerald-400 ${
            value === option.value
              ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
