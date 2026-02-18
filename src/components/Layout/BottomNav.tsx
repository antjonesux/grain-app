import { NavLink } from 'react-router-dom'
import { cn } from '@/utils'

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/log', label: 'Log', icon: LogIcon },
  { to: '/review', label: 'Review', icon: ReviewIcon },
  { to: '/journey', label: 'Journey', icon: JourneyIcon },
] as const

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function LogIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function ReviewIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )
}

function JourneyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

export const BottomNav = () => (
  <nav
    className="flex-shrink-0 border-t border-stone-200 bg-[#faf9f7] pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]"
    role="navigation"
    aria-label="Primary"
  >
    <ul className="mx-auto flex max-w-[480px] items-center justify-around">
      {navItems.map(({ to, label, icon: Icon }) => (
        <li key={to} className="flex-1">
          <NavLink
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-0.5 py-2 text-stone-500 transition-colors active:bg-stone-100',
                isActive && 'text-stone-800 font-medium'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={cn(
                    'h-6 w-6',
                    isActive ? 'text-stone-800' : 'text-stone-500'
                  )}
                />
                <span className="text-xs">{label}</span>
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
)
