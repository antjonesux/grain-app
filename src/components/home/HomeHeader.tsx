import type { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings, Calendar } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

interface HomeHeaderProps {
  weekStart: string
  weekEnd: string
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const formatWeekRange = (start: string, end: string): string => {
  const s = new Date(start + 'T00:00:00')
  const e = new Date(end + 'T00:00:00')
  return `${MONTHS[s.getMonth()]} ${s.getDate()} – ${MONTHS[e.getMonth()]} ${e.getDate()}`
}

export const HomeHeader = ({ weekStart, weekEnd }: HomeHeaderProps) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const firstName =
    user?.user_metadata?.first_name ??
    user?.user_metadata?.name ??
    'there'

  return (
    <div style={containerStyle}>
      <div style={topRowStyle}>
        <h1 style={greetingStyle}>Hey, {firstName}.</h1>
        <button
          type="button"
          onClick={() => navigate('/settings')}
          aria-label="Settings"
          style={settingsBtnStyle}
        >
          <Settings size={18} />
        </button>
      </div>
      <div style={weekRowStyle}>
        <Calendar size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <span style={weekTextStyle}>{formatWeekRange(weekStart, weekEnd)}</span>
      </div>
    </div>
  )
}

const containerStyle: CSSProperties = {
  padding: '24px 24px 16px',
}

const topRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const greetingStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '22px',
  fontWeight: 700,
  lineHeight: '28.6px',
  color: 'var(--text-primary)',
  margin: 0,
}

const settingsBtnStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--text-muted)',
  cursor: 'pointer',
  padding: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '999px',
}

const weekRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  marginTop: 8,
}

const weekTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-muted)',
}
