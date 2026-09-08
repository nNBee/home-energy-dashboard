import { useState } from 'react';
import { useDeviceEnergyBreakdown } from '../../hooks/api/useDeviceEnergyBreakdown.ts';
import { useEnergyConsumption } from '../../hooks/api/useEnergyConsumption.ts';
import { useEnergySummary } from '../../hooks/api/useEnergySummary.ts';
import type { EnergyRange } from '../../types/energy.ts';
import {
  calculateEstimatedCost,
  calculatePercentageChange,
} from '../../utils/energy.ts';
import { DashboardPage } from './DashboardPage/DashboardPage.tsx';

export function Dashboard() {
  const [range, setRange] = useState<EnergyRange>('today');
  const { data, isLoading, isError, error } = useEnergySummary(range);
  const {
    data: consumption,
    isLoading: isConsumptionLoading,
    isError: isConsumptionError,
    error: consumptionError,
  } = useEnergyConsumption(range);
  const {
    data: deviceBreakdown,
    isLoading: isDeviceBreakdownLoading,
    isError: isDeviceBreakdownError,
    error: deviceBreakdownError,
  } = useDeviceEnergyBreakdown(range);

  if (isLoading) {
    return <p>Loading energy summary…</p>;
  }

  if (isError) {
    return <p>Failed to load energy summary: {error.message}</p>;
  }

  if (!data) {
    return null;
  }

  const estimatedCost = calculateEstimatedCost(
    data.consumptionKwh,
    data.tariff.pricePerKwh,
  );
  const percentageChange = calculatePercentageChange(
    data.consumptionKwh,
    data.previousPeriodConsumptionKwh,
  );

  const summary = {
    ...data,
    estimatedCost,
    percentageChange,
  };

  return (
    <DashboardPage
      summary={summary}
      range={range}
      onRangeChange={setRange}
      consumption={consumption}
      isConsumptionLoading={isConsumptionLoading}
      isConsumptionError={isConsumptionError}
      consumptionError={consumptionError}
      deviceBreakdown={deviceBreakdown}
      isDeviceBreakdownLoading={isDeviceBreakdownLoading}
      isDeviceBreakdownError={isDeviceBreakdownError}
      deviceBreakdownError={deviceBreakdownError}
    />
  );
}
