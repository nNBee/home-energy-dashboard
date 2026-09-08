type SummaryCardProps = {
  label: string;
  value: string | number;
  unit?: string;
};

export function SummaryCard({ label, value, unit }: SummaryCardProps) {
  return (
    <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5'>
      <dl>
        <dt className='text-sm font-medium text-slate-500 dark:text-slate-400'>
          {label}
        </dt>
        <dd className='mt-2 flex items-baseline gap-1'>
          <span className='text-2xl font-semibold text-slate-900 dark:text-slate-100'>
            {value}
          </span>
          {unit && (
            <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
              {unit}
            </span>
          )}
        </dd>
      </dl>
    </div>
  );
}
