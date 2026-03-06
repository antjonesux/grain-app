import type { CSSProperties } from 'react'
import { SkeletonBlock } from './SkeletonBlock'

const cardStyle: CSSProperties = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 14,
  padding: 16,
}

const topRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const pillsRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginTop: 8,
}

export function DayCardSkeleton () {
  return (
    <div style={cardStyle} role="presentation" aria-hidden="true">
      <div style={topRowStyle}>
        <SkeletonBlock width={64} height={24} borderRadius={4} />
      </div>
      <div style={pillsRowStyle}>
        <SkeletonBlock width={88} height={28} borderRadius={22} />
        <SkeletonBlock width={100} height={28} borderRadius={22} />
      </div>
    </div>
  )
}
