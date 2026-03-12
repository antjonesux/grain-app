import type { CSSProperties } from 'react'
import { PrimaryButton } from '@/components/onboarding/PrimaryButton'
import { InlineLinkButton } from '@/components/onboarding/InlineLinkButton'
import { InlineLinkRow } from '@/components/onboarding/InlineLinkRow'
import LogoIcon from '@/assets/logo_icon.svg?react'

interface WelcomeScreenProps {
  onNext: () => void
  onSignIn: () => void
}

const screen: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '100dvh',
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
  paddingTop: '64px',
  gap: '16px',
}

const logoGroupStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
}

const logoTextStyle: CSSProperties = {
  fontFamily: "var(--grain-font-serif)",
  fontSize: '40px',
  fontWeight: 400,
  color: 'var(--text-primary)',
  letterSpacing: '0.09px',
  textShadow: '0 0 24px rgba(16, 185, 129, 0.3)',
}

const GrainLogo = () => (
  <LogoIcon
    width={40}
    height={39}
    aria-hidden="true"
    style={{
      color: 'var(--text-primary)',
      filter: 'drop-shadow(0 0 24px rgba(16, 185, 129, 0.3))',
    }}
  />
)

const headline: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '26px',
  fontWeight: 700,
  lineHeight: '33.8px',
  color: 'var(--text-primary)',
  textAlign: 'center',
  paddingTop: '112px',
  margin: 0,
}

const tagline: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '24px',
  color: 'var(--text-secondary)',
  textAlign: 'center',
  paddingTop: '8px',
  margin: 0,
}

const ctaZone: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '48px',
  paddingBottom: '40px',
  gap: '12px',
}

export const WelcomeScreen = ({ onNext, onSignIn }: WelcomeScreenProps) => (
  <div style={screen}>
    <div style={topSection}>
      <div style={logoArea}>
        <div style={logoGroupStyle}>
          <GrainLogo />
          <span style={logoTextStyle}>Grain</span>
        </div>
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
