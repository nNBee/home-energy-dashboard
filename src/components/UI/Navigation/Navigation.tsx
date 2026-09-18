import { HousePlug, LayoutDashboard, Plug, Zap } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigationItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
  { icon: Zap, label: 'Energy', to: '/energy' },
  { icon: Plug, label: 'Devices', to: '/devices' },
]

export function Navigation() {
  return (
    <nav
      aria-label="Primary navigation"
      className="border-b border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900 sm:px-8 md:min-h-screen md:w-60 md:flex-none md:border-r md:border-b-0 md:px-5 md:py-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:block">
        <p className="flex shrink-0 items-center gap-2.5 text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <HousePlug
              aria-hidden="true"
              className="size-5"
              strokeWidth={1.75}
            />
          </span>
          <span>Home Energy</span>
        </p>
        <ul className="flex items-center gap-1 md:mt-10 md:flex-col md:items-stretch md:gap-2">
          {navigationItems.map(({ icon: Icon, label, to }) => (
            <li key={to}>
              <NavLink
                end={to === '/'}
                to={to}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:focus-visible:outline-emerald-400',
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
                  ].join(' ')
                }
              >
                <Icon
                  aria-hidden="true"
                  className="size-5 shrink-0"
                  strokeWidth={1.75}
                />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
