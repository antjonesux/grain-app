import type { CSSProperties } from 'react'
import { PrimaryButton } from '@/components/onboarding/PrimaryButton'

interface WelcomeScreenProps {
  onNext: () => void
  onSignIn: () => void
}

const GrainLogo = () => (
  <svg width="50" height="49" viewBox="0 0 50 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M25 4C18.5 4 13 8.5 13 16c0 6 3 10 7 13.5C23.5 32.5 25 36 25 40c0-4 1.5-7.5 5-10.5 4-3.5 7-7.5 7-13.5C37 8.5 31.5 4 25 4Zm0 6c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6Z"
      fill="var(--text-primary)"
      style={{ filter: 'drop-shadow(0 2px 4px rgba(40,47,75,0.15))' }}
    />
  </svg>
)

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
  alignItems: 'center',
}

const logoArea: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '88px',
  gap: '12px',
}

const logoCircle: CSSProperties = {
  width: '94px',
  height: '94px',
  borderRadius: '999px',
  background: 'linear-gradient(165deg, #10B981 0%, #059669 100%)',
  boxShadow: '0 0 24px #1F3D35',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
        <div style={logoCircle}>
          <GrainLogo />
        </div>
        <p style={wordmark}>Grain</p>
      </div>
      <h1 style={headline}>Your time tells the truth.</h1>
      <p style={tagline}>
        See if your week reflects what you say matters most.
      </p>
    </div>

    <div style={ctaZone}>
      <PrimaryButton onClick={onNext}>Begin My Journey</PrimaryButton>
      <PrimaryButton variant="ghost" onClick={onSignIn}>
        I already have an account
      </PrimaryButton>
    </div>
  </div>
)
