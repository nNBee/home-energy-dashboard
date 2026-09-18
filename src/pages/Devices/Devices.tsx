import { useState } from 'react';
import { useDeviceEnergyBreakdown } from '../../hooks/api/useDeviceEnergyBreakdown.ts';
import type { EnergyRange } from '../../types/energy.ts';
import { DevicesPage } from './DevicesPage/DevicesPage.tsx';

export function Devices() {
  const [range, setRange] = useState<EnergyRange>('today');
  const { data, isLoading, isError, error } =
    useDeviceEnergyBreakdown(range);
  const totalDeviceConsumptionKwh = data?.devices.reduce(
    (total, device) => total + device.consumptionKwh,
    0,
  );

  return (
    <DevicesPage
      range={range}
      onRangeChange={setRange}
      breakdown={data}
      totalDeviceConsumptionKwh={totalDeviceConsumptionKwh}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
}
