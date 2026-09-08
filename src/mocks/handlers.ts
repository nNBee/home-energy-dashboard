import { http, HttpResponse } from 'msw';
import type { EnergyRange } from '../types/energy.ts';
import { energySummaries } from './data/energy.ts';

export const handlers = [
  http.get('/api/energy/summary', ({ request }) => {
    const url = new URL(request.url);
    const rangeParam = url.searchParams.get('range');

    const range: EnergyRange =
      rangeParam === 'week' || rangeParam === 'month' ? rangeParam : 'today';

    return HttpResponse.json(energySummaries[range]);
  }),
];
