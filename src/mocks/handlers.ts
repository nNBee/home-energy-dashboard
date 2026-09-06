import { http, HttpResponse } from 'msw'
import { energySummary } from './data/energy.ts'

export const handlers = [
  http.get('/api/energy/summary', () => HttpResponse.json(energySummary)),
]
