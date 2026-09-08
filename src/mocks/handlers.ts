import { http, HttpResponse } from 'msw';
import type { EnergyRange } from '../types/energy.ts';
import { energyConsumption } from './data/consumption.ts';
import { deviceEnergyBreakdowns } from './data/devices.ts';
import { energySummaries } from './data/energy.ts';

export const handlers = [
  http.get('/api/energy/summary', ({ request }) => {
    const url = new URL(request.url);
    const rangeParam = url.searchParams.get('range');

    const range: EnergyRange =
      rangeParam === 'week' || rangeParam === 'month' ? rangeParam : 'today';

    return HttpResponse.json(energySummaries[range]);
  }),
  http.get('/api/energy/consumption', ({ request }) => {
    const url = new URL(request.url);
    const rangeParam = url.searchParams.get('range');

    const range: EnergyRange =
      rangeParam === 'week' || rangeParam === 'month' ? rangeParam : 'today';

    return HttpResponse.json(energyConsumption[range]);
  }),
  http.get('/api/energy/devices', ({ request }) => {
    const url = new URL(request.url);
    const rangeParam = url.searchParams.get('range');

    const range: EnergyRange =
      rangeParam === 'week' || rangeParam === 'month' ? rangeParam : 'today';

    return HttpResponse.json(deviceEnergyBreakdowns[range]);
  }),
];
