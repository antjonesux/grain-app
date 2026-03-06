import type { CSSProperties } from 'react'
import { PrimaryButton } from '@/components/onboarding/PrimaryButton'
import { InlineLinkButton } from '@/components/onboarding/InlineLinkButton'
import { InlineLinkRow } from '@/components/onboarding/InlineLinkRow'
import appIconCircle from '@/assets/app_icon_circle.svg'

interface WelcomeScreenProps {
  onNext: () => void
  onSignIn: () => void
}

const screen: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '100dvh',
  padding: '0 24px',
  background: 'var(--bg)',
  maxWidth: 480,
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  boxSizing: 'border-box',
}

const topSection: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const logoArea: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '88px',
  gap: '12px',
}

const wordmark: CSSProperties = {
  fontFamily: 'var(--grain-font-serif)',
  fontSize: '32px',
  fontWeight: 400,
  color: 'var(--accent)',
  letterSpacing: '0.16px',
  margin: 0,
}

const headline: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '26px',
  fontWeight: 700,
  lineHeight: '33.8px',
  color: 'var(--text-primary)',
  textAlign: 'center',
  maxWidth: '222px',
  paddingTop: '32px',
  margin: 0,
}

const tagline: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '24px',
  color: 'var(--text-secondary)',
  textAlign: 'center',
  paddingTop: '24px',
  margin: 0,
}

const ctaZone: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '28px',
  paddingBottom: '56px',
  gap: '12px',
}

export const WelcomeScreen = ({ onNext, onSignIn }: WelcomeScreenProps) => (
  <div style={screen}>
    <div style={topSection}>
      <div style={logoArea}>
        <img src={appIconCircle} alt="Grain" width={150} height={150} />
        <p style={wordmark}>Grain</p>
      </div>
      <h1 style={headline}>Your time tells the truth.</h1>
      <p style={tagline}>
        See if your week reflects what you say matters most.
      </p>
    </div>

    <div style={ctaZone}>
      <PrimaryButton onClick={onNext}>Get started</PrimaryButton>
      <InlineLinkRow>
        Already have an account?{' '}
        <InlineLinkButton underline onClick={onSignIn}>Sign in</InlineLinkButton>
      </InlineLinkRow>
    </div>
  </div>
)
