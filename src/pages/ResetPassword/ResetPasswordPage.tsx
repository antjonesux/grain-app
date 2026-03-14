import { useState, useEffect, useCallback, useRef, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { OnboardingHeader } from '@/components/onboarding/OnboardingHeader'
import { PrimaryButton } from '@/components/onboarding/PrimaryButton'
import { supabase } from '@/lib/supabaseClient'
import { meetsMinLength, PASSWORD_HINT } from '@/lib/passwordValidation'
import { errors } from '@/lib/errorMessages'
import { PasswordCheckCircle, PasswordErrorCircle, PasswordHintCircle } from '@/components/icons/PasswordValidationIcon'

type PageState = 'loading' | 'error' | 'ready'

function parseHashParams(hash: string): Record<string, string> {
  const params: Record<string, string> = {}
  if (!hash || hash.charAt(0) !== '#') return params
  const rest = hash.slice(1)
  rest.split('&').forEach((pair) => {
    const [key, value] = pair.split('=')
    if (key && value) params[key] = decodeURIComponent(value.replace(/\+/g, ' '))
  })
  return params
}

async function establishRecoverySession(): Promise<{ ok: true } | { ok: false; message: string }> {
  const { search, hash } = window.location
  const searchParams = new URLSearchParams(search)
  const hashParams = parseHashParams(hash)

  const hashError = hashParams.error || hashParams.error_description
  if (hashError) {
    console.debug('[ResetPassword] hash error:', hashError)
    return { ok: false, message: errors.expiredLink }
  }

  const code = searchParams.get('code')
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) return { ok: false, message: errors.expiredLink }
    if (data.session) {
      window.history.replaceState({}, document.title, `${window.location.origin}/reset-password`)
      return { ok: true }
    }
  }

  const accessToken = hashParams.access_token
  const refreshToken = hashParams.refresh_token
  if (accessToken && refreshToken) {
    const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
    if (error) return { ok: false, message: errors.expiredLink }
    window.history.replaceState({}, document.title, `${window.location.origin}/reset-password`)
    return { ok: true }
  }

  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    window.history.replaceState({}, document.title, `${window.location.origin}/reset-password`)
    return { ok: true }
  }

  return { ok: false, message: errors.expiredLink }
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
  color: met ? 'var(--status-aligned)' : 'var(--status-misaligned)',
})

const inputWrap: CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
}

const iconPos: CSSProperties = {
  position: 'absolute',
  right: '16px',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'default',
  display: 'flex',
  alignItems: 'center',
}

/* ----- Styles ----- */

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

const subtextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  paddingBottom: '20px',
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

const inputStyle = (filled: boolean): CSSProperties => ({
  width: '100%',
  padding: '16px',
  background: 'var(--bg-input)',
  borderRadius: '14px',
  border: '1px solid var(--border)',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 400,
  color: filled ? 'var(--text-primary)' : 'var(--text-muted)',
  outline: 'none',
  boxSizing: 'border-box',
})

const errorStyle: CSSProperties = {
  background: 'var(--status-misaligned-soft)',
  border: '1px solid var(--status-misaligned)',
  borderRadius: '14px',
  padding: '12px 16px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  color: 'var(--status-misaligned)',
  marginBottom: '8px',
}

const loadingStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  color: 'var(--text-muted)',
  padding: '24px 0',
  margin: 0,
}

const errorStateWrapStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  paddingTop: '8px',
}

export const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const [pageState, setPageState] = useState<PageState>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const hasRunRef = useRef(false)

  const establishSession = useCallback(async () => {
    const result = await establishRecoverySession()
    if (result.ok) {
      setPageState('ready')
      setErrorMessage(null)
    } else {
      setPageState('error')
      setErrorMessage(result.message)
    }
  }, [])

  useEffect(() => {
    if (hasRunRef.current) return
    hasRunRef.current = true

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' && session) {
        setPageState('ready')
        setErrorMessage(null)
      }
    })

    establishSession()

    return () => subscription.unsubscribe()
  }, [establishSession])

  const goToLogin = () => navigate('/login')

  const meetsLength = meetsMinLength(newPassword)
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0
  const canSubmit = meetsLength && passwordsMatch && !isSubmitting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitError(null)
    setIsSubmitting(true)

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      setSubmitError(error.message.includes('expired') || error.message.includes('invalid') ? errors.expiredLink : errors.savePassword)
      setIsSubmitting(false)
      return
    }

    await supabase.auth.signOut()
    setIsSubmitting(false)
    navigate('/login?reset=1', { replace: true })
  }

  if (pageState === 'loading') {
    return (
      <div style={pageStyle}>
        <OnboardingHeader onBack={() => navigate('/login')} />
        <h1 style={headlineStyle}>Set a new password</h1>
        <p style={loadingStyle}>Loading…</p>
      </div>
    )
  }

  if (pageState === 'error') {
    return (
      <div style={pageStyle}>
        <OnboardingHeader onBack={goToLogin} />
        <h1 style={headlineStyle}>Set a new password</h1>
        <div style={errorStateWrapStyle}>
          <p style={errorStyle} role="alert">
            {errorMessage}
          </p>
          <p style={subtextStyle}>
            This link may be invalid or expired. Request a new one from the sign in page.
          </p>
          <PrimaryButton onClick={goToLogin}>Back to sign in</PrimaryButton>
        </div>
      </div>
    )
  }

  return (
    <div style={pageStyle}>
      <OnboardingHeader onBack={goToLogin} />
      <h1 style={headlineStyle}>Set a new password</h1>
      <p style={subtextStyle}>Choose a strong password you'll remember.</p>

      {submitError && (
        <div style={errorStyle} role="alert">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} style={cardStyle}>
        <div style={inputSectionStyle}>
          <div>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              autoComplete="new-password"
              style={inputStyle(newPassword.length > 0)}
            />
            {newPassword.length > 0 && (
              <span style={{ ...hintStyle(meetsLength), marginTop: 6, display: 'inline-flex' }}>
                <PasswordHintCircle met={meetsLength} />
                {PASSWORD_HINT}
              </span>
            )}
          </div>
          <div style={inputWrap}>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              autoComplete="new-password"
              style={{
                ...inputStyle(confirmPassword.length > 0),
                paddingRight: confirmPassword.length > 0 ? 44 : 16,
              }}
            />
            {confirmPassword.length > 0 && newPassword !== confirmPassword && <span style={iconPos}><PasswordErrorCircle /></span>}
            {confirmPassword.length > 0 && newPassword === confirmPassword && <span style={iconPos}><PasswordCheckCircle /></span>}
          </div>
        </div>
        <PrimaryButton type="submit" disabled={!canSubmit}>
          {isSubmitting ? 'Saving…' : 'Save password'}
        </PrimaryButton>
      </form>
    </div>
  )
}
