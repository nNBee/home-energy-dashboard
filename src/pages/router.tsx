import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard/Dashboard.tsx'
import { Devices } from './Devices/Devices.tsx'
import { Energy } from './Energy/Energy.tsx'
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
        element: <Energy />,
      },
      {
        path: 'devices',
        element: <Devices />,
      },
    ],
  },
])
