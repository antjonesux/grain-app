import type { CSSProperties } from 'react'
import { SkeletonBlock } from './SkeletonBlock'

const cardStyle: CSSProperties = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 14,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}

const topRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const noteBlockStyle: CSSProperties = {
  marginTop: 12,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 8,
  paddingBottom: 8,
}

export function LogEntrySkeleton () {
  return (
    <div style={cardStyle} role="presentation" aria-hidden="true">
      <div style={topRowStyle}>
        <SkeletonBlock width={48} height={14} borderRadius={2} />
        <SkeletonBlock width={44} height={24} borderRadius={22} />
      </div>
      <SkeletonBlock height={20} borderRadius={4} style={{ width: '70%' }} />
      <div style={noteBlockStyle}>
        <SkeletonBlock height={32} borderRadius={8} />
      </div>
    </div>
  )
}
