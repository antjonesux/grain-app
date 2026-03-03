import type { CSSProperties } from 'react'

interface ProgressBarProps {
  invested: number
  commitment: number
}

export const ProgressBar = ({ invested, commitment }: ProgressBarProps) => {
  if (commitment <= 0) {
    return <div style={trackStyle} />
  }

  const ratio = invested / commitment
  const isBonus = invested > commitment + 0.01
  const isComplete = !isBonus && Math.abs(invested - commitment) <= 0.01

  if (isBonus) {
    const overflowPct = Math.min(
      ((invested - commitment) / commitment) * 100,
      50,
    )
    const totalPct = 100 + overflowPct
    const greenFrac = (100 / totalPct) * 100
    const goldFrac = (overflowPct / totalPct) * 100

    return (
      <div style={trackStyle}>
        <div
          style={{
            ...fillBase,
            width: `${greenFrac}%`,
            backgroundColor: 'var(--accent, #10B981)',
            borderRadius: '4px 0 0 4px',
          }}
        />
        <div
          style={{
            ...fillBase,
            width: `${goldFrac}%`,
            backgroundColor: 'var(--status-drift)',
            borderRadius: '0 4px 4px 0',
          }}
        />
      </div>
    )
  }

  const resolvedTrack: CSSProperties = isComplete
    ? { ...trackStyle, backgroundColor: 'var(--accent, #10B981)' }
    : trackStyle

  const widthPct = Math.min(ratio * 100, 100)

  return (
    <div style={resolvedTrack}>
      <div
        style={{
          ...fillBase,
          width: `${widthPct}%`,
          backgroundColor: 'var(--accent, #10B981)',
          borderRadius: 4,
        }}
      />
    </div>
  )
}

const trackStyle: CSSProperties = {
  width: '100%',
  height: 8,
  borderRadius: 4,
  backgroundColor: 'var(--accent-glow, #1F3D35)',
  display: 'flex',
  overflow: 'hidden',
}

const fillBase: CSSProperties = {
  height: '100%',
}
