import type { CSSProperties } from 'react'

interface OnboardingHeaderProps {
  onBack: (() => void) | null
}

const containerStyle: CSSProperties = {
  width: '100%',
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
  fontSize: '18px',
  fontWeight: 400,
  color: 'var(--text-primary)',
  letterSpacing: '0.09px',
  textShadow: '0 0 24px rgba(16, 185, 129, 0.5)',
}

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

const GrainLogo = () => (
  <svg
    width="18"
    height="17"
    viewBox="0 0 18 17"
    fill="none"
    aria-hidden="true"
    style={{ filter: 'drop-shadow(0 0 24px rgba(16, 185, 129, 0.6))' }}
  >
    <path
      d="M9 0C9 0 3.5 3.5 2 8.5C0.5 13.5 4 16.5 9 16.5C14 16.5 17.5 13.5 16 8.5C14.5 3.5 9 0 9 0ZM9 13C7 13 5.5 11.5 6 9.5C6.5 7.5 9 5 9 5C9 5 11.5 7.5 12 9.5C12.5 11.5 11 13 9 13Z"
      fill="var(--text-primary)"
    />
  </svg>
)

const ChevronLeft = () => (
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
    <polyline points="13 15 8 10 13 5" />
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
        <ChevronLeft />
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
