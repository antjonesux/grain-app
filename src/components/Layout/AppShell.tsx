import { useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { PageHeader } from '@/components/Layout/PageHeader'

const PATH_TITLES: Record<string, string> = {
  '/': 'Home',
  '/log': 'Log',
  '/review': 'Review',
  '/journey': 'Journey',
  '/settings': 'Settings',
}

interface AppShellProps {
  children: ReactNode
}

export const AppShell = ({ children }: AppShellProps) => {
  const { pathname } = useLocation()
  const title = PATH_TITLES[pathname] ?? 'Home'
  const hideHeader =
    pathname === '/' ||
    pathname === '/log' ||
    pathname === '/review' ||
    pathname === '/journey' ||
    pathname === '/settings' ||
    pathname.startsWith('/log-details/')

  return (
    <div className="mx-auto flex h-dvh max-h-dvh max-w-[480px] flex-col bg-[#faf9f7]">
      {!hideHeader && <PageHeader title={title} />}
      <main
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
        role="main"
      >
        {children}
      </main>
    </div>
  )
}
