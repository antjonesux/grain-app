import type { CSSProperties } from 'react'
import { Check } from 'lucide-react'

interface DayCardProps {
  label: string
  hours: number
  logged: boolean
  isToday: boolean
  isFuture: boolean
  onLog: () => void
}

const fmt = (h: number): string => {
  if (h === 0) return '0'
  if (Number.isInteger(h)) return String(h)
  return h.toFixed(1)
}

export const DayCard = ({
  label,
  hours,
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

  return (
    <div style={cardStyle}>
      {/* Row 1: date label + right content */}
      <div style={topRowStyle}>
        <span style={{ ...labelBaseStyle, color: labelColor }}>{label}</span>

        <div style={rightGroupStyle}>
          {logged && (
            <>
              <span style={hoursStyle}>{fmt(hours)}h invested</span>
              <Check size={14} style={{ color: 'var(--accent)' }} />
            </>
          )}
          {isToday && (
            <button type="button" onClick={onLog} style={logBtnStyle}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 3.33V12.67M3.33 8H12.67"
                  stroke="var(--accent, #10B981)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span style={logBtnTextStyle}>Log</span>
            </button>
          )}
        </div>
      </div>

      {/* Row 2: empty-state indicator for today */}
      {isToday && !logged && (
        <div style={emptyRowStyle}>
          <div style={greenDotStyle} />
          <span style={emptyTextStyle}>Nothing invested yet</span>
        </div>
      )}
    </div>
  )
}

const cardStyle: CSSProperties = {
  backgroundColor: 'var(--bg-card, #161921)',
  borderRadius: 14,
  border: '1px solid var(--border, #2A2D3A)',
  padding: '18px 16px',
}

const topRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const rightGroupStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}

const labelBaseStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '24px',
}

const hoursStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
}

const logBtnStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '4px 12px',
  background: 'var(--bg-elevated, #1E2130)',
  borderRadius: 22,
  border: 'none',
  cursor: 'pointer',
}

const logBtnTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '15px',
  fontWeight: 600,
  lineHeight: '24px',
  color: 'var(--text-secondary, #8B8FA3)',
}

const emptyRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  marginTop: 8,
}

const greenDotStyle: CSSProperties = {
  width: 4,
  height: 4,
  borderRadius: 9999,
  background: 'var(--accent, #10B981)',
}

const emptyTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary, #8B8FA3)',
}
