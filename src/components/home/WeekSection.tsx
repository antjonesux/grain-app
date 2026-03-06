import type { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import type { DayRollup } from '@/hooks'
import { DayCard, type DayCardProps } from './DayCard'

interface WeekSectionProps {
  days: DayRollup[]
}

export const WeekSection = ({ days }: WeekSectionProps) => {
  const navigate = useNavigate()

  const handleDayTap = (date: string) => {
    const d = days.find((x) => x.date === date)
    if (!d || d.isFuture) return
    navigate(`/log-details/${date}`)
  }

  const sorted = [...days].sort((a, b) => {
    if (a.isToday) return -1
    if (b.isToday) return 1
    return 0
  })

  return (
    <div style={containerStyle}>
      <div style={headerRowStyle}>
        <h3 style={titleStyle}>This week</h3>
        <button
          type="button"
          onClick={() => navigate('/log')}
          style={addLogButtonStyle}
        >
          + Add entry
        </button>
      </div>
      <div style={listStyle}>
        {sorted.map((day) => {
          const cardProps: DayCardProps = {
            date: day.date,
            label: day.label,
            hours: day.hours,
            actionCount: day.actionCount,
            logged: day.logged,
            isToday: day.isToday,
            isFuture: day.isFuture,
            onLog: handleDayTap,
          }
          return <DayCard key={day.date} {...cardProps} />
        })}
      </div>
    </div>
  )
}

const containerStyle: CSSProperties = {
  padding: '24px 24px 32px',
}

const headerRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 16,
}

const titleStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: 'var(--grain-h2)',
  fontWeight: 600,
  lineHeight: '12px',
  color: 'var(--text-primary)',
  margin: 0,
}

const addLogButtonStyle: CSSProperties = {
  background: 'var(--accent-soft)',
  borderRadius: 22,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 4,
  paddingBottom: 4,
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '19.5px',
  color: 'var(--accent)',
  border: 'none',
  cursor: 'pointer',
}

const listStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}
