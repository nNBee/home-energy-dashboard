import { lazy } from 'react'

export const LazyEnergy = lazy(() =>
  import('./Energy/Energy.tsx').then(({ Energy }) => ({
    default: Energy,
  })),
)

export const LazyDevices = lazy(() =>
  import('./Devices/Devices.tsx').then(({ Devices }) => ({
    default: Devices,
  })),
)

export function RouteLoadingFallback() {
  return (
    <div
      role="status"
      className="min-h-24 animate-pulse rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-3 h-4 w-64 max-w-full rounded bg-slate-100 dark:bg-slate-800" />
      <span className="sr-only">Loading page…</span>
    </div>
  )
}
