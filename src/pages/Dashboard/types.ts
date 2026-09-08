import type { EnergySummaryResponse } from '../../types/energy';

export type DashboardSummary = EnergySummaryResponse & {
  estimatedCost: number;
  percentageChange: number | null;
};
