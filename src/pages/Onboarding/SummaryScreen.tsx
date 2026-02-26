import { type CSSProperties, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { OnboardingHeader } from '@/components/onboarding/OnboardingHeader'
import { ProgressBar } from '@/components/onboarding/ProgressBar'
import { SummaryCard } from '@/components/onboarding/SummaryCard'
import { Chip } from '@/components/onboarding/Chip'
import { PrimaryButton } from '@/components/onboarding/PrimaryButton'
import { Drawer } from '@/components/onboarding/Drawer'
import { TextInput } from '@/components/onboarding/TextInput'

type SignupStatus = 'idle' | 'pendingConfirmation'

interface SummaryScreenProps {
  destination: string
  why: string
  category: string
  actions: string[]
  hours: number
  onEdit: (screen: number) => void
  onBack: () => void
  onSaveJourney?: () => Promise<void>
  onCreateAccount?: (name: string, email: string, password: string) => Promise<void>
  showOAuth?: boolean
}

const screen: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '100dvh',
  padding: '0 24px',
  background: 'var(--bg)',
}

const topSection: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflowY: 'auto',
}

const headingStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '22px',
  fontWeight: 700,
  lineHeight: '28.6px',
  color: 'var(--text-primary)',
  paddingTop: '32px',
  paddingBottom: '8px',
  margin: 0,
}

const subheadStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  paddingBottom: '20px',
  margin: 0,
}

const destinationText: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '15px',
  fontWeight: 600,
  lineHeight: '24px',
  color: 'var(--text-primary)',
  margin: 0,
}

const chipsWrap: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
}

const valueRow: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'baseline',
  gap: '4px',
}

const hoursValue: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '16px',
  color: 'var(--accent)',
}

const slashStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '16px',
  color: 'var(--text-muted)',
}

const dailyBreakdown: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  fontWeight: 400,
  lineHeight: '16.5px',
  color: 'var(--text-muted)',
  margin: 0,
  paddingTop: '4px',
}

const ctaZone: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '28px',
  paddingBottom: '56px',
  gap: '12px',
}

const formSection: CSSProperties = {
  paddingBottom: '40px',
}

const inputStack: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  paddingBottom: '14px',
}

const dividerRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  paddingTop: '12px',
  paddingBottom: '12px',
}

const dividerLine: CSSProperties = {
  flex: 1,
  height: '1px',
  background: 'var(--border)',
}

const dividerText: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  fontWeight: 400,
  lineHeight: '16.5px',
  color: 'var(--text-muted)',
}

const oauthStack: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}

const errorText: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  lineHeight: '16.5px',
  color: 'var(--status-drift)',
  margin: 0,
  paddingBottom: '8px',
}

const resendHelperText: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  lineHeight: '16.5px',
  color: 'var(--status-aligned)',
  margin: 0,
  paddingTop: '8px',
}

const confirmationText: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  margin: 0,
  paddingBottom: '20px',
}

export const SummaryScreen = ({
  destination,
  why: _why,
  category: _category,
  actions,
  hours,
  onEdit,
  onBack,
  onSaveJourney,
  onCreateAccount,
  showOAuth = false,
}: SummaryScreenProps) => {
  const navigate = useNavigate()
  const { user, error: authCtxError, resendConfirmationEmail } = useAuth()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signupStatus, setSignupStatus] = useState<SignupStatus>('idle')
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [resendCooldown, setResendCooldown] = useState(0)
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current)
    }
  }, [])

  const dailyHours = Math.round((hours / 7) * 10) / 10

  const handleCreateAccount = async () => {
    setAuthError(null)

    if (!firstName.trim() || !email.trim() || !password) {
      setAuthError('Please fill out all fields.')
      return
    }

    if (!onCreateAccount) return

    setIsSubmitting(true)
    try {
      await onCreateAccount(firstName, email, password)
      setSignupStatus('pendingConfirmation')
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : 'Something went wrong',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveJourney = async () => {
    if (!onSaveJourney) return
    setSaveError(null)
    setIsSaving(true)
    try {
      await onSaveJourney()
      navigate('/', { replace: true })
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : 'Failed to save journey',
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleSignInRedirect = () => {
    navigate('/login', { state: { from: '/onboarding', resume: 'summary' } })
  }

  const handleResend = async () => {
    if (resendCooldown > 0) return
    setResendStatus('sending')
    try {
      await resendConfirmationEmail(email)
      setResendStatus('sent')
      setResendCooldown(45)
      cooldownRef.current = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            if (cooldownRef.current) clearInterval(cooldownRef.current)
            cooldownRef.current = null
            setResendStatus('idle')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch {
      setResendStatus('error')
    }
  }

  return (
    <div style={screen}>
      <div style={topSection}>
        <OnboardingHeader onBack={onBack} />
        <ProgressBar step={5} total={5} />

        <h1 style={headingStyle}>Your journey.</h1>
        <p style={subheadStyle}>
          Here's what you're about to commit to.
        </p>

        <SummaryCard label="DESTINATION" onEdit={() => onEdit(1)}>
          <p style={destinationText}>{destination}</p>
        </SummaryCard>

        <SummaryCard label="ACTIONS" onEdit={() => onEdit(3)}>
          <div style={chipsWrap}>
            {actions.map((action) => (
              <Chip key={action} label={action} variant="static" />
            ))}
          </div>
        </SummaryCard>

        <SummaryCard label="WEEKLY COMMITMENT" onEdit={() => onEdit(4)}>
          <div style={valueRow}>
            <span style={hoursValue}>{hours}h</span>
            <span style={slashStyle}>/</span>
            <span style={slashStyle}>week</span>
          </div>
          <p style={dailyBreakdown}>
            That's about {dailyHours} hours per day
          </p>
        </SummaryCard>
      </div>

      <div style={ctaZone}>
        {user ? (
          <>
            {saveError && <p style={errorText}>{saveError}</p>}
            <PrimaryButton disabled={isSaving} onClick={handleSaveJourney}>
              {isSaving ? 'Saving\u2026' : 'Save Journey'}
            </PrimaryButton>
          </>
        ) : (
          <>
            <PrimaryButton onClick={() => setDrawerOpen(true)}>
              Save your journey
            </PrimaryButton>
          </>
        )}
      </div>

      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={signupStatus === 'pendingConfirmation' ? 'Confirm your email' : 'Save your journey.'}
        subtitle={signupStatus === 'pendingConfirmation' ? undefined : 'Create an account so your setup is waiting each week.'}
      >
        <div style={formSection}>
          {signupStatus === 'pendingConfirmation' ? (
            <>
              <p style={confirmationText}>
                Check your email to confirm your account. Then sign in to
                finish saving your journey.
              </p>
              <PrimaryButton
                variant="ghost"
                disabled={resendStatus === 'sending' || resendCooldown > 0}
                onClick={handleResend}
              >
                {resendStatus === 'sending'
                  ? 'Sending\u2026'
                  : resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : 'Resend confirmation email'}
              </PrimaryButton>
              {resendStatus === 'sent' && resendCooldown > 0 && (
                <p style={resendHelperText}>
                  Confirmation email sent. Check your inbox (and spam).
                </p>
              )}
              {resendStatus === 'error' && authCtxError && (
                <p style={errorText}>{authCtxError}</p>
              )}
              <PrimaryButton onClick={handleSignInRedirect}>
                Go to Sign In
              </PrimaryButton>
            </>
          ) : (
            <>
              <div style={inputStack}>
                <TextInput
                  value={firstName}
                  onChange={setFirstName}
                  placeholder="First name"
                />
                <TextInput
                  value={email}
                  onChange={setEmail}
                  placeholder="Email address"
                />
                <TextInput
                  value={password}
                  onChange={setPassword}
                  placeholder="Password"
                  type="password"
                />
              </div>
              {authError && (
                <p style={errorText}>{authError}</p>
              )}
              <PrimaryButton
                disabled={isSubmitting}
                onClick={handleCreateAccount}
              >
                {isSubmitting ? 'Creating...' : 'Create Account'}
              </PrimaryButton>

              {showOAuth && (
                <>
                  <div style={dividerRow}>
                    <div style={dividerLine} />
                    <span style={dividerText}>or</span>
                    <div style={dividerLine} />
                  </div>
                  <div style={oauthStack}>
                    <PrimaryButton variant="outline">
                      Continue with Google
                    </PrimaryButton>
                    <PrimaryButton variant="outline">
                      Continue with Apple
                    </PrimaryButton>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Drawer>
    </div>
  )
}
