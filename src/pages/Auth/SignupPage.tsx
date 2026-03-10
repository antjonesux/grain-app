import { useState, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { PrimaryButton } from '@/components/onboarding/PrimaryButton'
import { InlineLinkButton } from '@/components/onboarding/InlineLinkButton'
import { getSignUpError } from '@/lib/errorMessages'
import { meetsMinLength, PASSWORD_HINT } from '@/lib/passwordValidation'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateEmail = (value: string): string | null => {
  if (!value.trim()) return 'Email is required'
  if (!EMAIL_RE.test(value.trim())) return 'Please enter a valid email'
  return null
}

/* ── Styles ── */

const pageStyle: CSSProperties = {
  minHeight: '100dvh',
  background: 'var(--bg)',
  padding: '0 24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}

const containerStyle: CSSProperties = {
  width: '100%',
  maxWidth: '480px',

}

const headlineStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '22px',
  fontWeight: 700,
  lineHeight: '28.6px',
  color: 'var(--text-primary)',
  margin: 0,
  paddingBottom: '4px',
}

const subheadStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  margin: 0,
  paddingBottom: '24px',
}

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}

const errorBannerStyle: CSSProperties = {
  background: 'var(--status-misaligned-soft)',
  border: '1px solid var(--status-misaligned)',
  borderRadius: '14px',
  padding: '12px 16px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  color: 'var(--status-misaligned)',
}

const labelStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  display: 'block',
  paddingBottom: '6px',
}

const inputStyle = (focused: boolean, hasError: boolean): CSSProperties => ({
  width: '100%',
  padding: '16px',
  background: 'var(--bg-input)',
  borderRadius: '14px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 400,
  color: 'var(--text-primary)',
  outline: 'none',
  boxSizing: 'border-box' as const,
  transition: 'border-color 150ms ease',
  border: hasError
    ? '1px solid var(--status-misaligned)'
    : focused
      ? '1px solid var(--accent-glow)'
      : '1px solid var(--border)',
})

const fieldErrorStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  fontWeight: 400,
  lineHeight: '16.5px',
  color: 'var(--status-misaligned)',
  margin: 0,
  paddingTop: '4px',
}

const hintStyle = (met: boolean): CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 12px',
  borderRadius: '22px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  lineHeight: '16.5px',
  fontWeight: 400,
  color: met ? 'var(--accent)' : 'var(--text-secondary)',
})

const inputWrap: CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
}

const toggleBtn: CSSProperties = {
  position: 'absolute',
  right: '16px',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
}

const HintCircle = ({ met }: { met: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke={met ? 'var(--accent)' : 'var(--text-secondary)'} strokeWidth="1" fill="none" />
  </svg>
)

const ErrorCircle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="var(--status-misaligned)" strokeWidth="1.2" fill="none" />
  </svg>
)

const CheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="var(--accent)" strokeWidth="1.2" fill="none" />
  </svg>
)

const bottomLinkStyle: CSSProperties = {
  paddingTop: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
}

const bottomTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  margin: 0,
}

/* ── Component ── */

export const SignupPage = () => {
  const navigate = useNavigate()
  const { signUp, error, clearError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [touched, setTouched] = useState({ email: false, password: false })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const emailError = touched.email ? validateEmail(email) : null
  const meetsLength = meetsMinLength(password)
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0
  const confirmHasInput = confirmPassword.length > 0
  const confirmShowError = confirmHasInput && !passwordsMatch
  const confirmShowSuccess = confirmHasInput && passwordsMatch
  const canSubmit =
    !emailError &&
    email.trim() !== '' &&
    meetsLength &&
    passwordsMatch &&
    !isSubmitting

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
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={headlineStyle}>Create an account</h1>
        <p style={subheadStyle}>Enter your email and choose a password.</p>

        <form onSubmit={handleSubmit} style={formStyle}>
          {error && (
            <div style={errorBannerStyle} role="alert">
              {getSignUpError(error)}
            </div>
          )}

          <div>
            <label htmlFor="signup-email" style={labelStyle}>
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => {
                setEmailFocused(false)
                setTouched((t) => ({ ...t, email: true }))
              }}
              style={inputStyle(emailFocused, !!emailError)}
              placeholder="you@example.com"
              aria-invalid={!!emailError}
              aria-describedby={emailError ? 'signup-email-error' : undefined}
            />
            {emailError && (
              <p id="signup-email-error" style={fieldErrorStyle}>
                {emailError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="signup-password" style={labelStyle}>
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              style={inputStyle(passwordFocused, false)}
              placeholder={PASSWORD_HINT}
              aria-invalid={touched.password && !meetsLength}
              aria-describedby={password.length > 0 ? 'signup-password-hint' : undefined}
            />
            {password.length > 0 && (
              <span id="signup-password-hint" style={{ ...hintStyle(meetsLength), marginTop: 6, display: 'inline-flex' }}>
                <HintCircle met={meetsLength} />
                {PASSWORD_HINT}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="signup-confirm-password" style={labelStyle}>
              Confirm password
            </label>
            <div style={inputWrap}>
              <input
                id="signup-confirm-password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                style={{
                  ...inputStyle(passwordFocused, confirmShowError),
                  paddingRight: confirmHasInput ? 44 : 16,
                }}
                placeholder="Confirm password"
                aria-invalid={confirmShowError}
                aria-describedby={confirmHasInput && confirmShowError ? 'signup-confirm-status' : undefined}
              />
              {confirmShowError && <span style={{ ...toggleBtn, cursor: 'default' }}><ErrorCircle /></span>}
              {confirmShowSuccess && <span style={{ ...toggleBtn, cursor: 'default' }}><CheckCircle /></span>}
            </div>
            {confirmHasInput && confirmShowError && (
              <p id="signup-confirm-status" style={fieldErrorStyle}>
                Passwords do not match
              </p>
            )}
          </div>

          <PrimaryButton
            type="submit"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? 'Creating account…' : 'Sign up'}
          </PrimaryButton>
        </form>

        <div style={bottomLinkStyle}>
          <p style={bottomTextStyle}>Already have an account?</p>
          <InlineLinkButton underline onClick={() => navigate('/login')}>
            Sign in
          </InlineLinkButton>
        </div>
      </div>
    </div>
  )
}
