import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { ProtectedRoute } from '@/components/Layout/ProtectedRoute'
import { AppShell } from '@/components/Layout/AppShell'
import { WelcomeScreen } from '@/pages/Onboarding/WelcomeScreen'
import { DRAFT_KEY, OnboardingPage } from '@/pages/Onboarding/OnboardingPage'
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

const WelcomeRoute = () => {
  const navigate = useNavigate()
  return (
    <WelcomeScreen
      onNext={() => navigate('/onboarding')}
      onSignIn={() => navigate('/login')}
    />
  )
}

const OnboardingRoute = () => {
  const { user, session } = useAuth()
  const location = useLocation()
  const isAuthed = !!user && !!session
  const hasResume = !!(location.state as { resume?: string } | null)?.resume
  const hasDraft = !!localStorage.getItem(DRAFT_KEY)
  console.log('[OnboardingRoute]', { isAuthed, hasResume, hasDraft })

  if (isAuthed && !hasResume && !hasDraft) {
    return <Navigate to="/" replace />
  }

  return <OnboardingPage />
}

const LoginRoute = () => {
  const { user, session } = useAuth()
  const location = useLocation()
  const isAuthed = !!user && !!session
  console.log('[LoginRoute]', { isAuthed, state: location.state })

  if (isAuthed) {
    const state = location.state as { from?: string; resume?: string } | null
    if (state?.from) {
      return <Navigate to={state.from} state={{ resume: state.resume }} replace />
    }
    return <Navigate to="/" replace />
  }

  return <LoginPage />
}

const AppRoutes = () => {
  const { isLoading, user, session } = useAuth()
  const isAuthed = !!user && !!session

  if (isLoading) {
    return <AuthLoadingScreen />
  }

  return (
    <Routes>
      <Route
        path="/welcome"
        element={isAuthed ? <Navigate to="/" replace /> : <WelcomeRoute />}
      />
      <Route
        path="/onboarding/*"
        element={<OnboardingRoute />}
      />
      <Route
        path="/login"
        element={<LoginRoute />}
      />
      <Route
        path="/signup"
        element={isAuthed ? <Navigate to="/" replace /> : <SignupPage />}
      />
      <Route
        path="/"
        element={
          isAuthed ? (
            <AuthenticatedLayout>
              <HomePage />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/welcome" replace />
          )
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
        element={<Navigate to="/welcome" replace />}
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
