import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-[#faf9f7]"
        aria-live="polite"
        aria-busy="true"
      >
        <p className="text-stone-500 text-sm">Loading…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/welcome" state={{ from: location }} replace />
  }

  return <>{children}</>
}
