import { type CSSProperties, useState } from 'react'
import { OnboardingHeader } from '@/components/onboarding/OnboardingHeader'
import { ProgressBar } from '@/components/onboarding/ProgressBar'
import { SummaryCard } from '@/components/onboarding/SummaryCard'
import { Chip } from '@/components/onboarding/Chip'
import { PrimaryButton } from '@/components/onboarding/PrimaryButton'
import { Drawer } from '@/components/onboarding/Drawer'
import { TextInput } from '@/components/onboarding/TextInput'

interface SummaryScreenProps {
  destination: string
  why: string
  category: string
  actions: string[]
  hours: number
  onEdit: (screen: number) => void
  onBack: () => void
  onSaveJourney?: () => void
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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dailyHours = Math.round((hours / 7) * 10) / 10

  const handleCreateAccount = async () => {
    setAuthError(null)
    if (onCreateAccount) {
      setIsSubmitting(true)
      try {
        await onCreateAccount(firstName, email, password)
        setDrawerOpen(false)
      } catch (err) {
        setAuthError(
          err instanceof Error ? err.message : 'Something went wrong',
        )
      } finally {
        setIsSubmitting(false)
      }
    } else if (onSaveJourney) {
      setDrawerOpen(false)
      onSaveJourney()
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
        <PrimaryButton onClick={() => setDrawerOpen(true)}>
          Save your journey
        </PrimaryButton>
      </div>

      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Save your journey."
        subtitle="Create an account so your setup is waiting each week."
      >
        <div style={formSection}>
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
            <p
              style={{
                fontFamily: 'var(--grain-font-sans)',
                fontSize: '11px',
                lineHeight: '16.5px',
                color: 'var(--status-drift)',
                margin: 0,
                paddingBottom: '8px',
              }}
            >
              {authError}
            </p>
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
        </div>
      </Drawer>
    </div>
  )
}
