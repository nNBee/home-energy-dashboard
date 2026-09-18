import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { server } from '../../test/server.ts';
import type { EnergyConsumptionResponse } from '../../types/energy.ts';
import { Dashboard } from './Dashboard.tsx';

function renderDashboard() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>,
  );
}

describe('Dashboard', () => {
  it('renders the initial Today summary from the API', async () => {
    renderDashboard();

    expect(
      screen.getByRole('heading', { name: 'Dashboard' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Today' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    expect(await screen.findByText('2.4')).toBeInTheDocument();
    expect(await screen.findByText('18.7')).toBeInTheDocument();
    expect(screen.getByText('Current power')).toBeInTheDocument();
    expect(screen.getByText('Consumption')).toBeInTheDocument();
  });

  it('loads the Week summary when the user changes range', async () => {
    renderDashboard();

    const todayButton = screen.getByRole('button', { name: 'Today' });
    const weekButton = screen.getByRole('button', { name: 'Week' });

    expect(todayButton).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(weekButton);

    expect(todayButton).toHaveAttribute('aria-pressed', 'false');
    expect(weekButton).toHaveAttribute('aria-pressed', 'true');
    expect(await screen.findByText('126.8')).toBeInTheDocument();
  });

  it('shows the summary error state when the API fails', async () => {
    server.use(
      http.get('/api/energy/summary', () =>
        HttpResponse.json({ message: 'Server error' }, { status: 500 }),
      ),
    );

    renderDashboard();

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Energy summary is unavailable');
    expect(alert).toHaveTextContent('Failed to fetch energy summary: 500');
  });

  it('shows the consumption empty state for an empty API response', async () => {
    server.use(
      http.get('/api/energy/consumption', () =>
        HttpResponse.json({
          range: 'today',
          data: [],
        } satisfies EnergyConsumptionResponse),
      ),
    );

    renderDashboard();

    expect(
      await screen.findByText(
        'No consumption data is available for this period.',
      ),
    ).toBeInTheDocument();
  });
});
