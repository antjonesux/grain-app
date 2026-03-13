import type { CSSProperties } from 'react'

const COMPLETE_TOLERANCE = 0.01

interface ProgressBarProps {
  invested: number
  commitment: number
}

function tickStyle(leftPct: number): CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    left: `${leftPct}%`,
    transform: 'translateX(-50%) translateY(-50%)',
    width: 3,
    height: 18,
    borderRadius: 2,
    background: 'var(--grain-white)',
    opacity: 0.75,
    zIndex: 2,
    pointerEvents: 'none',
  }
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
            borderRadius: '8px 0 0 8px',
            boxShadow: fillGlowFull,
          }}
        />
        <div
          style={{
            ...fillStyle,
            width: `${goldWidthPct}%`,
            backgroundColor: '#088574',
            borderRadius: '0 8px 8px 0',
            boxShadow: fillGlowFull,
            transition: 'width 240ms ease-out',
          }}
        />
        <div style={tickStyle(greenWidthPct)} />
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
      {widthPct > 4 && <div style={tickStyle(widthPct)} />}
    </div>
  )
}

const trackStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: 12,
  borderRadius: 8,
  backgroundColor: 'var(--bg)',
  overflow: 'visible',
  display: 'flex',
}

const fillStyle: CSSProperties = {
  height: '100%',
  borderRadius: 8,
  backgroundColor: '#10B981',
  transition: 'width 240ms ease-out',
}

const fillGlowSub = '0px 0px 6px 1px rgba(35, 198, 101, 0.20)'
const fillGlowFull = '0px 0px 6px 1px rgba(35, 198, 101, 0.20)'