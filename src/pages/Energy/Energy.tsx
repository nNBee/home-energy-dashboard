import { useState } from 'react';
import { useEnergyConsumption } from '../../hooks/api/useEnergyConsumption.ts';
import type { EnergyRange } from '../../types/energy.ts';
import { calculateConsumptionStatistics } from '../../utils/energy.ts';
import { EnergyPage } from './EnergyPage/EnergyPage.tsx';

export function Energy() {
  const [range, setRange] = useState<EnergyRange>('today');
  const { data, isLoading, isError, error } = useEnergyConsumption(range);
  const statistics = data
    ? calculateConsumptionStatistics(data)
    : undefined;

  return (
    <EnergyPage
      range={range}
      onRangeChange={setRange}
      consumption={data}
      statistics={statistics}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
}
