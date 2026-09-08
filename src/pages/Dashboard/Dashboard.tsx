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
import type { DashboardSummary } from './types.ts';

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

  let summary: DashboardSummary | undefined;

  if (data) {
    const estimatedCost = calculateEstimatedCost(
      data.consumptionKwh,
      data.tariff.pricePerKwh,
    );
    const percentageChange = calculatePercentageChange(
      data.consumptionKwh,
      data.previousPeriodConsumptionKwh,
    );

    summary = {
      ...data,
      estimatedCost,
      percentageChange,
    };
  }

  return (
    <DashboardPage
      summary={summary}
      isSummaryLoading={isLoading}
      isSummaryError={isError}
      summaryError={error}
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
