import { useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { PageHeader } from '@/components/Layout/PageHeader'
import { BottomNav } from '@/components/Layout/BottomNav'

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
  const showPageHeader = pathname !== '/'

  return (
    <div className="mx-auto flex h-dvh max-h-dvh max-w-[480px] flex-col bg-[#faf9f7]">
      {showPageHeader && <PageHeader title={title} />}
      <main
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
        role="main"
      >
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
