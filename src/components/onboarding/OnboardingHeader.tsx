import type { CSSProperties } from 'react'
import LogoIcon from '@/assets/logo_icon.svg?react'

interface OnboardingHeaderProps {
  onBack: (() => void) | null
}

const containerStyle: CSSProperties = {
  width: '100%',
  paddingTop: '28px',
  paddingBottom: '8px',
  display: 'inline-flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const logoGroupStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  flex: 1,
}

const logoTextStyle: CSSProperties = {
  fontFamily: "var(--grain-font-serif)",
  fontSize: '22px',
  fontWeight: 400,
  color: 'var(--text-primary)',
  letterSpacing: '0.09px',
}

const GrainLogo = () => (
  <LogoIcon
    width={20}
    height={19}
    aria-hidden="true"
    style={{
      color: 'var(--text-primary)',
    }}
  />
)

const backButtonStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  flexShrink: 0,
}

const spacerStyle: CSSProperties = {
  width: '20px',
  flexShrink: 0,
}

const ArrowLeft = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="var(--text-secondary)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="16" y1="10" x2="4" y2="10" />
    <polyline points="10 4 4 10 10 16" />
  </svg>
)

export const OnboardingHeader = ({ onBack }: OnboardingHeaderProps) => (
  <header style={containerStyle}>
    {onBack ? (
      <button
        type="button"
        style={backButtonStyle}
        onClick={onBack}
        aria-label="Go back"
      >
        <ArrowLeft />
      </button>
    ) : (
      <span style={spacerStyle} />
    )}

    <div style={logoGroupStyle}>
      <GrainLogo />
      <span style={logoTextStyle}>Grain</span>
    </div>

    <span style={spacerStyle} />
  </header>
)
