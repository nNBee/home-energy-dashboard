import { Outlet } from 'react-router-dom'
import { Navigation } from '../components/UI/Navigation/Navigation.tsx'

export function Root() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100 md:flex">
      <Navigation />
      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 md:px-10 md:py-10">
        <div className="mx-auto w-full max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
