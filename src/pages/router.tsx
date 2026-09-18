import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard/Dashboard.tsx'
import {
  LazyDevices,
  LazyEnergy,
  RouteLoadingFallback,
} from './LazyRoutes.tsx'
import { Root } from './Root.tsx'

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'energy',
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <LazyEnergy />
          </Suspense>
        ),
      },
      {
        path: 'devices',
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <LazyDevices />
          </Suspense>
        ),
      },
    ],
  },
])
