import { useState, type CSSProperties } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { OnboardingHeader } from '@/components/onboarding/OnboardingHeader'
import { TextInput } from '@/components/onboarding/TextInput'
import { PrimaryButton } from '@/components/onboarding/PrimaryButton'

interface LoginPageProps {
  showOAuth?: boolean
}

/* ── Icons ── */

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z"
      stroke="var(--text-muted)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="var(--text-muted)" strokeWidth="1.8" />
  </svg>
)

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
      stroke="var(--text-muted)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="1"
      y1="1"
      x2="23"
      y2="23"
      stroke="var(--text-muted)"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)

/* ── Styles ── */

const pageStyle: CSSProperties = {
  minHeight: '100dvh',
  background: 'var(--bg)',
  padding: '0 24px',
  display: 'flex',
  flexDirection: 'column',
}

const headlineStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '22px',
  fontWeight: 700,
  lineHeight: '28.6px',
  color: 'var(--text-primary)',
  paddingTop: '32px',
  paddingBottom: '16px',
  margin: 0,
}

const cardStyle: CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: '14px',
  padding: '18px 16px',
}

const inputSectionStyle: CSSProperties = {
  paddingBottom: '14px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}

const passwordWrapperStyle: CSSProperties = {
  position: 'relative',
}

const passwordInputStyle = (focused: boolean, hasValue: boolean): CSSProperties => ({
  width: '100%',
  padding: '16px',
  paddingRight: hasValue ? '48px' : '16px',
  background: 'var(--bg-input)',
  borderRadius: '14px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  fontWeight: 400,
  color: 'var(--text-primary)',
  outline: 'none',
  boxSizing: 'border-box' as const,
  transition: 'border-color 150ms ease',
  border: focused ? '1px solid var(--accent-glow)' : '1px solid var(--border)',
})

const eyeToggleStyle: CSSProperties = {
  position: 'absolute',
  right: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const submitBaseStyle: CSSProperties = {
  width: '100%',
  borderRadius: '14px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  border: 'none',
  padding: '14px 16px',
  transition: 'opacity 150ms ease',
}

const submitEnabledStyle: CSSProperties = {
  ...submitBaseStyle,
  background: 'var(--accent)',
  color: 'var(--bg)',
  cursor: 'pointer',
}

const submitDisabledStyle: CSSProperties = {
  ...submitBaseStyle,
  background: 'var(--bg-input)',
  color: 'var(--text-muted)',
  cursor: 'not-allowed',
}

const dividerWrapperStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 0',
}

const dividerLineStyle: CSSProperties = {
  flex: 1,
  height: '1px',
  background: 'var(--border)',
}

const dividerTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  fontWeight: 400,
  lineHeight: '16.5px',
  color: 'var(--text-muted)',
}

const oauthSectionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}

const bottomLinkStyle: CSSProperties = {
  paddingTop: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
}

const bottomTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  padding: '4px 0',
  margin: 0,
}

const signUpLinkStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  textDecoration: 'underline',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
}

const errorStyle: CSSProperties = {
  background: 'rgba(239, 68, 68, 0.1)',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  borderRadius: '14px',
  padding: '12px 16px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  color: '#ef4444',
  marginBottom: '8px',
}

/* ── Component ── */

export const LoginPage = ({ showOAuth = true }: LoginPageProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, error, clearError } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = email.trim() !== '' && password !== ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || isSubmitting) return
    clearError()
    setIsSubmitting(true)
    try {
      await signIn(email.trim(), password)
      const stateData = location.state as
        | { from?: string; resume?: string }
        | null
      const from = stateData?.from ?? '/'
      const resume = stateData?.resume
      navigate(from, { replace: true, state: resume ? { resume } : undefined })
    } catch {
      // Error surfaced via AuthContext
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = !canSubmit || isSubmitting

  return (
    <div style={pageStyle}>
      <OnboardingHeader onBack={() => navigate('/welcome')} />

      <h1 style={headlineStyle}>Sign in</h1>

      {error && (
        <div style={errorStyle} role="alert">{error}</div>
      )}

      <form onSubmit={handleSubmit} style={cardStyle}>
        <div style={inputSectionStyle}>
          <TextInput
            value={email}
            onChange={setEmail}
            placeholder="Email address"
            type="email"
          />

          <div style={passwordWrapperStyle}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              data-icon={password ? 'true' : undefined}
              style={passwordInputStyle(passwordFocused, password.length > 0)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            {password && (
              <button
                type="button"
                style={eyeToggleStyle}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          style={isDisabled ? submitDisabledStyle : submitEnabledStyle}
        >
          {isSubmitting ? 'Signing In…' : 'Sign In'}
        </button>

        {showOAuth && (
          <>
            <div style={dividerWrapperStyle}>
              <div style={dividerLineStyle} />
              <span style={dividerTextStyle}>or</span>
              <div style={dividerLineStyle} />
            </div>

            <div style={oauthSectionStyle}>
              <PrimaryButton variant="outline">Continue with Google</PrimaryButton>
              <PrimaryButton variant="outline">Continue with Apple</PrimaryButton>
            </div>
          </>
        )}
      </form>

      <div style={bottomLinkStyle}>
        <p style={bottomTextStyle}>
          Don't have an account?{' '}
          <button
            type="button"
            style={signUpLinkStyle}
            onClick={() => navigate('/welcome')}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}
