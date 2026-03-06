import type { CSSProperties } from 'react'
import { SkeletonBlock } from './SkeletonBlock'

const cardStyle: CSSProperties = {
  width: '100%',
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 14,
  padding: '18px 16px',
}

const metaRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: 16,
}

const metricsRowStyle: CSSProperties = {
  display: 'flex',
  gap: 8,
  paddingBottom: 16,
}

const progressLabelRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: 8,
}

const progressBarWrapStyle: CSSProperties = {
  paddingTop: 0,
  paddingBottom: 12,
}

const captionRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: 0,
}

export function JourneyCardSkeleton () {
  return (
    <div style={cardStyle} role="presentation" aria-hidden="true">
      <div style={metaRowStyle}>
        <SkeletonBlock width={80} height={10} borderRadius={2} />
        <SkeletonBlock width={72} height={20} borderRadius={22} />
      </div>
      <div style={{ paddingBottom: 16 }}>
        <SkeletonBlock height={22} borderRadius={4} style={{ maxWidth: '85%' }} />
      </div>
      <div style={metricsRowStyle}>
        <SkeletonBlock height={52} borderRadius={14} style={{ flex: 1 }} />
        <SkeletonBlock height={52} borderRadius={14} style={{ flex: 1 }} />
      </div>
      <div style={progressLabelRowStyle}>
        <SkeletonBlock width={48} height={11} borderRadius={2} />
        <SkeletonBlock width={28} height={11} borderRadius={2} />
      </div>
      <div style={progressBarWrapStyle}>
        <SkeletonBlock height={8} borderRadius={4} />
      </div>
      <div style={captionRowStyle}>
        <SkeletonBlock width={100} height={11} borderRadius={2} />
      </div>
    </div>
  )
}
