import type { CSSProperties } from 'react'

const COMPLETE_TOLERANCE = 0.01

interface ProgressBarProps {
  invested: number
  commitment: number
}

export const ProgressBar = ({ invested, commitment }: ProgressBarProps) => {
  if (commitment <= 0) {
    return <div style={trackStyle} />
  }

  const ratio = invested / commitment
  const isBonus = invested > commitment + COMPLETE_TOLERANCE

  if (isBonus) {
    const overflowPct = Math.min(
      ((invested - commitment) / commitment) * 100,
      50,
    )
    const totalPct = 100 + overflowPct
    const greenWidthPct = (100 / totalPct) * 100
    const goldWidthPct = (overflowPct / totalPct) * 100

    return (
      <div style={trackStyle}>
        <div
          style={{
            ...fillStyle,
            width: `${greenWidthPct}%`,
            borderRadius: '4px 0 0 4px',
            boxShadow: fillGlowFull,
          }}
        />
        <div
          style={{
            ...fillStyle,
            width: `${goldWidthPct}%`,
            backgroundColor: 'var(--accent-amber)',
            borderRadius: '0 4px 4px 0',
            transition: 'width 240ms ease-out',
          }}
        />
      </div>
    )
  }

  const widthPct = Math.min(Math.max(ratio * 100, 0), 100)
  const atOrBeyondFull = ratio >= 1

  return (
    <div style={trackStyle}>
      <div
        style={{
          ...fillStyle,
          width: `${widthPct}%`,
          boxShadow: atOrBeyondFull ? fillGlowFull : fillGlowSub,
        }}
      />
    </div>
  )
}

const trackStyle: CSSProperties = {
  width: '100%',
  height: 8,
  borderRadius: 4,
  backgroundColor: 'var(--progress-track-bg, var(--bg-elevated))',
  overflow: 'hidden',
  display: 'flex',
}

const fillStyle: CSSProperties = {
  height: '100%',
  borderRadius: 4,
  backgroundColor: 'var(--accent-blue)',
  transition: 'width 240ms ease-out',
}

const fillGlowSub = '0px 0px 8px 1px rgba(59, 130, 246, 0.30)'
const fillGlowFull = '0px 0px 8px 1px rgba(59, 130, 246, 0.70)'
