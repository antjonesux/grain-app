import type { CSSProperties } from 'react'

export interface DayCardProps {
  label: string
  hours: number
  actionCount: number
  logged: boolean
  isToday: boolean
  isFuture: boolean
  onLog: () => void | Promise<void>
}

const fmt = (h: number): string => {
  if (h === 0) return '0'
  if (Number.isInteger(h)) return String(h)
  return h.toFixed(1)
}

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3.33 8l2.67 2.67 6.67-5.34" stroke="var(--accent, #10B981)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChevronRight = () => (
  <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4l4 4-4 4" stroke="var(--text-muted, #7D8093)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
)

export const DayCard = ({
  label,
  hours,
  actionCount,
  logged,
  isToday,
  isFuture,
  onLog,
}: DayCardProps) => {
  const labelColor = isToday
    ? 'var(--accent, #10B981)'
    : isFuture
      ? 'var(--text-muted, #7D8093)'
      : 'var(--text-secondary, #8B8FA3)'

  const showChevron = !isFuture
  const showPills = logged && (isToday || !isFuture)
  const showEmptyState = isToday && !logged

  const content = (
    <>
      <div style={topRowStyle}>
        <span style={{ ...labelBaseStyle, color: labelColor }}>{label}</span>
        {showChevron && <ChevronRight />}
      </div>

      {showEmptyState && (
        <div style={emptyRowStyle}>
          <div style={goldDotStyle} />
          <span style={emptyTextStyle}>Nothing invested yet</span>
        </div>
      )}

      {showPills && (
        <div style={pillsRowStyle}>
          <div style={pillStyle}>
            <CheckIcon />
            <span style={pillTextStyle}>{fmt(hours)}h invested</span>
          </div>
          <div style={pillStyle}>
            <CheckIcon />
            <span style={pillTextStyle}>{actionCount} actions logged</span>
          </div>
        </div>
      )}
    </>
  )

  if (isFuture) return <div style={cardStyle}>{content}</div>

  return (
    <button type="button" onClick={onLog} style={cardButtonStyle}>
      {content}
    </button>
  )
}

const cardStyle: CSSProperties = {
  backgroundColor: 'var(--bg-card, #161921)',
  borderRadius: 14,
  border: '1px solid var(--border, #2A2D3A)',
  padding: '18px 16px',
}

const cardButtonStyle: CSSProperties = {
  ...{
    backgroundColor: 'var(--bg-card, #161921)',
    borderRadius: 14,
    border: '1px solid var(--border, #2A2D3A)',
    padding: '18px 16px',
  },
  width: '100%',
  cursor: 'pointer',
  textAlign: 'left' as const,
}

const topRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const labelBaseStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '24px',
}

const emptyRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  marginTop: 8,
}

const goldDotStyle: CSSProperties = {
  width: 4,
  height: 4,
  borderRadius: 9999,
  background: 'var(--status-drift, #D9B86C)',
}

const emptyTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary, #8B8FA3)',
}

const pillsRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginTop: 8,
}

const pillStyle: CSSProperties = {
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 4,
  paddingBottom: 4,
  background: 'var(--bg-elevated, #1E2130)',
  borderRadius: 22,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 4,
}

const pillTextStyle: CSSProperties = {
  color: 'var(--text-secondary, #8B8FA3)',
  fontSize: '13px',
  fontFamily: 'var(--grain-font-sans)',
  fontWeight: 400,
  lineHeight: '19.5px',
}
