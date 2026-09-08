type SummaryCardProps = {
  label: string;
  value: string | number;
  unit?: string;
};

export function SummaryCard({ label, value, unit }: SummaryCardProps) {
  return (
    <div className='rounded-lg border border-slate-200 bg-white p-5 shadow-sm'>
      <dl>
        <dt className='text-sm font-medium text-slate-500'>{label}</dt>
        <dd className='mt-2 flex items-baseline gap-1'>
          <span className='text-2xl font-semibold text-slate-900'>{value}</span>
          {unit && (
            <span className='text-sm font-medium text-slate-500'>{unit}</span>
          )}
        </dd>
      </dl>
    </div>
  );
}
