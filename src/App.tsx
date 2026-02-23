import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { ProtectedRoute } from '@/components/Layout/ProtectedRoute'
import { AppShell } from '@/components/Layout/AppShell'
import { LoginPage } from '@/pages/Auth/LoginPage'
import { SignupPage } from '@/pages/Auth/SignupPage'
import { HomePage } from '@/pages/Home/HomePage'
import { LogPage } from '@/pages/Log/LogPage'
import { ReviewPage } from '@/pages/Review/ReviewPage'
import { JourneyPage } from '@/pages/Journey/JourneyPage'
import { SettingsPage } from '@/pages/Settings/SettingsPage'

const AuthLoadingScreen = () => (
  <div
    className="min-h-screen flex items-center justify-center bg-[#faf9f7]"
    aria-live="polite"
    aria-busy="true"
  >
    <p className="text-stone-500 text-sm">Loading…</p>
  </div>
)

interface AuthenticatedLayoutProps {
  children: ReactNode
}

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => (
  <ProtectedRoute>
    <AppShell>{children}</AppShell>
  </ProtectedRoute>
)

const AppRoutes = () => {
  const { isLoading, user, session } = useAuth()
  const isAuthed = !!user && !!session

  if (isLoading) {
    return <AuthLoadingScreen />
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthed ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={isAuthed ? <Navigate to="/" replace /> : <SignupPage />}
      />
      <Route
        path="/"
        element={
          <AuthenticatedLayout>
            <HomePage />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/log"
        element={
          <AuthenticatedLayout>
            <LogPage />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/review"
        element={
          <AuthenticatedLayout>
            <ReviewPage />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/journey"
        element={
          <AuthenticatedLayout>
            <JourneyPage />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <AuthenticatedLayout>
            <SettingsPage />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="*"
        element={<Navigate to={isAuthed ? '/' : '/login'} replace />}
      />
    </Routes>
  )
}

export const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AuthProvider>
)
