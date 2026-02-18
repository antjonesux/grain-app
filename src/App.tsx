import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { ProtectedRoute } from '@/components/Layout/ProtectedRoute'
import { LoginPage } from '@/pages/Auth/LoginPage'
import { SignupPage } from '@/pages/Auth/SignupPage'
import { HomePage } from '@/pages/HomePage'

const AuthLoadingScreen = () => (
  <div
    className="min-h-screen flex items-center justify-center bg-[#faf9f7]"
    aria-live="polite"
    aria-busy="true"
  >
    <p className="text-stone-500 text-sm">Loading…</p>
  </div>
)

const AppRoutes = () => {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <AuthLoadingScreen />
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
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
