import type { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import type { DayRollup } from '@/hooks'
import { getTodayStr } from '@/utils'
import { DayCard, type DayCardProps } from './DayCard'

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
      <h3 style={headingStyle}>This Week</h3>
      <div style={listStyle}>
        {sorted.map((day) => {
          const cardProps: DayCardProps = {
            label: day.label,
            hours: day.hours,
            actionCount: day.actionCount,
            logged: day.logged,
            isToday: day.isToday,
            isFuture: day.date > today,
            onLog: () => navigate('/log'),
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

const headingStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: 'var(--grain-h2)',
  fontWeight: 600,
  lineHeight: '12px',
  color: 'var(--text-primary)',
  margin: '0 0 16px',
}

const listStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}
