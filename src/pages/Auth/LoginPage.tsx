import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/utils'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateEmail = (value: string): string | null => {
  if (!value.trim()) return 'Email is required'
  if (!EMAIL_RE.test(value.trim())) return 'Please enter a valid email'
  return null
}

const validatePassword = (value: string): string | null => {
  if (!value) return 'Password is required'
  return null
}

const BackArrow = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, error, clearError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({ email: false, password: false })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const emailError = touched.email ? validateEmail(email) : null
  const passwordError = touched.password ? validatePassword(password) : null
  const canSubmit = !emailError && !passwordError && email.trim() && password

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    if (!canSubmit) {
      setTouched({ email: true, password: true })
      return
    }
    setIsSubmitting(true)
    try {
      await signIn(email.trim(), password)
      const from =
        (location.state as any)?.from?.pathname && typeof (location.state as any)?.from?.pathname === 'string'
          ? (location.state as any).from.pathname
          : '/'
      navigate(from, { replace: true })
    } catch {
      // Error surfaced via context
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-[#faf9f7]">
      <div className="w-full max-w-[480px]">
        <Link
          to="/welcome"
          className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-800 mb-6"
          aria-label="Back to welcome"
        >
          <BackArrow />
          <span>Back</span>
        </Link>
        <h1 className="text-xl font-medium text-stone-800 mb-1">Sign in</h1>
        <p className="text-stone-600 text-sm mb-6">
          Use your email and password to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800"
              role="alert"
            >
              {error}
            </div>
          )}

          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-stone-700 mb-1">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              className={cn(
                'w-full min-h-[44px] rounded-lg border px-3 text-stone-900 placeholder-stone-400',
                'focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400',
                emailError ? 'border-red-400 bg-red-50/50' : 'border-stone-300 bg-white'
              )}
              placeholder="you@example.com"
              aria-invalid={!!emailError}
              aria-describedby={emailError ? 'login-email-error' : undefined}
            />
            {emailError && (
              <p id="login-email-error" className="mt-1 text-sm text-red-600">
                {emailError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-stone-700 mb-1">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              className={cn(
                'w-full min-h-[44px] rounded-lg border px-3 text-stone-900 placeholder-stone-400',
                'focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400',
                passwordError ? 'border-red-400 bg-red-50/50' : 'border-stone-300 bg-white'
              )}
              placeholder="••••••••"
              aria-invalid={!!passwordError}
              aria-describedby={passwordError ? 'login-password-error' : undefined}
            />
            {passwordError && (
              <p id="login-password-error" className="mt-1 text-sm text-red-600">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className={cn(
              'w-full min-h-[44px] rounded-lg font-medium text-white',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500',
              canSubmit && !isSubmitting
                ? 'bg-stone-700 hover:bg-stone-800'
                : 'bg-stone-400 cursor-not-allowed'
            )}
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-600">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-stone-800 underline underline-offset-2 hover:text-stone-900"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
