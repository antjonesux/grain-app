import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/utils'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

const validateEmail = (value: string): string | null => {
  if (!value.trim()) return 'Email is required'
  if (!EMAIL_RE.test(value.trim())) return 'Please enter a valid email'
  return null
}

const validatePassword = (value: string): string | null => {
  if (!value) return 'Password is required'
  if (value.length < MIN_PASSWORD_LENGTH) return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
  return null
}

export const SignupPage = () => {
  const navigate = useNavigate()
  const { signUp, error, clearError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({ email: false, password: false })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const emailError = touched.email ? validateEmail(email) : null
  const passwordError = touched.password ? validatePassword(password) : null
  const canSubmit = !emailError && !passwordError && email.trim() && password.length >= MIN_PASSWORD_LENGTH

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    if (!canSubmit) {
      setTouched({ email: true, password: true })
      return
    }
    setIsSubmitting(true)
    try {
      await signUp(email.trim(), password)
      navigate('/', { replace: true })
    } catch {
      // Error surfaced via context
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-[#faf9f7]">
      <div className="w-full max-w-[480px]">
        <h1 className="text-xl font-medium text-stone-800 mb-1">Create an account</h1>
        <p className="text-stone-600 text-sm mb-6">
          Enter your email and choose a password.
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
            <label htmlFor="signup-email" className="block text-sm font-medium text-stone-700 mb-1">
              Email
            </label>
            <input
              id="signup-email"
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
              aria-describedby={emailError ? 'signup-email-error' : undefined}
            />
            {emailError && (
              <p id="signup-email-error" className="mt-1 text-sm text-red-600">
                {emailError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-stone-700 mb-1">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              className={cn(
                'w-full min-h-[44px] rounded-lg border px-3 text-stone-900 placeholder-stone-400',
                'focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400',
                passwordError ? 'border-red-400 bg-red-50/50' : 'border-stone-300 bg-white'
              )}
              placeholder="At least 6 characters"
              aria-invalid={!!passwordError}
              aria-describedby={passwordError ? 'signup-password-error' : undefined}
            />
            {passwordError && (
              <p id="signup-password-error" className="mt-1 text-sm text-red-600">
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
            {isSubmitting ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-stone-800 underline underline-offset-2 hover:text-stone-900"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
