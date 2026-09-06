import { useEnergySummary } from '../../hooks/api/useEnergySummary.ts';
import { DashboardPage } from './DashboardPage/DashboardPage.tsx';

export function Dashboard() {
  const { data, isLoading, isError, error } = useEnergySummary();

  if (isLoading) {
    return <p>Loading energy summary…</p>;
  }

  if (isError) {
    return <p>Failed to load energy summary: {error.message}</p>;
  }

  if (!data) {
    return null;
  }

  return <DashboardPage energySummary={data} />;
}
