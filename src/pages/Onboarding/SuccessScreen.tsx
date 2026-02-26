import { type CSSProperties, useEffect, useState } from 'react'

interface SuccessScreenProps {
  onContinue: () => void
}

const screen: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100dvh',
  padding: '0 24px',
  background: 'var(--bg)',
}

const content: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const circle: CSSProperties = {
  width: 94,
  height: 94,
  borderRadius: 999,
  overflow: 'hidden',
  background: 'var(--status-aligned-soft)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const headingStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '22px',
  fontWeight: 700,
  lineHeight: '28.6px',
  color: 'var(--text-primary)',
  textAlign: 'center',
  paddingTop: '24px',
  paddingBottom: '8px',
  margin: 0,
}

const subheadStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  textAlign: 'center',
  margin: 0,
}

const AUTO_NAV_DELAY = 2500

export const SuccessScreen = ({ onContinue }: SuccessScreenProps) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    const timer = setTimeout(onContinue, AUTO_NAV_DELAY)
    return () => clearTimeout(timer)
  }, [onContinue])

  return (
    <div
      style={{
        ...screen,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease-out',
      }}
    >
      <div style={content}>
        <div style={circle}>
          <svg
            width={48}
            height={48}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 25l10 9 18-18"
              stroke="var(--status-aligned)"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 style={headingStyle}>First log saved.</h1>
        <p style={subheadStyle}>Your journey has begun.</p>
      </div>
    </div>
  )
}
