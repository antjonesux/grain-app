import type { CSSProperties } from 'react'

interface ProgressBarProps {
  step: number
  total?: number
}

const wrapperStyle: CSSProperties = {
  paddingTop: '24px',
  paddingBottom: '8px',
}

const containerStyle: CSSProperties = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'center',
}

const activeDotStyle: CSSProperties = {
  width: '24px',
  height: '4px',
  background: 'var(--accent)',
  borderRadius: '2px',
}

const inactiveDotStyle: CSSProperties = {
  width: '8px',
  height: '4px',
  background: 'var(--border)',
  borderRadius: '2px',
}

export const ProgressBar = ({ step, total = 5 }: ProgressBarProps) => (
  <div style={wrapperStyle}>
    <div style={containerStyle} role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          style={i < step ? activeDotStyle : inactiveDotStyle}
        />
      ))}
    </div>
  </div>
)
