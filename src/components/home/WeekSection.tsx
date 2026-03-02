import type { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import type { DayRollup } from '@/hooks'
import { getTodayStr } from '@/utils'
import { DayCard } from './DayCard'

interface WeekSectionProps {
  days: DayRollup[]
}

export const WeekSection = ({ days }: WeekSectionProps) => {
  const navigate = useNavigate()
  const today = getTodayStr()

  const sorted = [...days].sort((a, b) => {
    if (a.isToday) return -1
    if (b.isToday) return 1
    return 0
  })

  return (
    <div style={containerStyle}>
      <h3 style={headingStyle}>This week</h3>
      <div style={listStyle}>
        {sorted.map((day) => (
          <DayCard
            key={day.date}
            label={day.label}
            hours={day.hours}
            logged={day.logged}
            isToday={day.isToday}
            isFuture={day.date > today}
            onLog={() => navigate('/log')}
          />
        ))}
      </div>
    </div>
  )
}

const containerStyle: CSSProperties = {
  padding: '24px 24px 32px',
}

const headingStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '10px',
  fontWeight: 600,
  lineHeight: '12px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  margin: '0 0 12px',
}

const listStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}
