import type { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import type { HomeState } from '@/hooks'
import { ProgressBar } from './ProgressBar'

interface JourneyCardProps {
  state: HomeState
  destination: string
  invested: number
  commitment: number
  distinctActions: number
  bonusHours: number
  createdAt?: string
}

const fmt = (h: number): string => {
  if (h === 0) return '0'
  if (Number.isInteger(h)) return String(h)
  return h.toFixed(1)
}

const getDaysActive = (createdAt?: string): number => {
  if (!createdAt) return 0
  const created = new Date(createdAt)
  const now = new Date()
  return Math.max(1, Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)))
}

const InactiveCard = () => {
  const navigate = useNavigate()

  return (
    <div style={cardStyle}>
      <p style={inactiveTitleStyle}>No active journey</p>
      <p style={inactiveSubStyle}>
        Start something worth investing in.
      </p>
      <button
        type="button"
        onClick={() => navigate('/onboarding')}
        style={ctaBtnStyle}
      >
        Begin My Journey
      </button>
    </div>
  )
}

export const JourneyCard = ({
  state,
  destination,
  invested,
  commitment,
  distinctActions,
  bonusHours,
  createdAt,
}: JourneyCardProps) => {
  const navigate = useNavigate()

  if (state === 'no-journey') return <InactiveCard />

  const daysActive = getDaysActive(createdAt)

  return (
    <div style={cardStyle}>
      {/* 1. Meta row */}
      <div style={metaRowStyle}>
        <span style={metaLabelStyle}>YOUR JOURNEY</span>
        <div style={pillBadgeStyle}>
          <span style={pillBadgeTextStyle}>🔥 {daysActive} days active</span>
        </div>
      </div>

      {/* 2. Destination */}
      <p style={destinationStyle}>{destination}</p>

      {/* 3. Stats — hours invested only */}
      <div style={statsColumnStyle}>
        <div>
          <span style={statValueStyle}>{fmt(invested)}h</span>
          <span style={statInlineLabelStyle}> invested this week</span>
        </div>
        {state === 'bonus' && (
          <p style={bonusBeyondStyle}>
            {fmt(bonusHours)}h beyond your commitment
          </p>
        )}
      </div>

      {/* 4. Progress bar */}
      <div style={barWrapStyle}>
        <ProgressBar invested={invested} commitment={commitment} />
      </div>

      {/* 5. Actions logged + commitment row */}
      <div style={belowBarRowStyle}>
        <span style={belowBarTextStyle}>{distinctActions} actions logged</span>
        <span style={{ ...belowBarTextStyle, flex: '1 1 0', textAlign: 'right' as const }}>
          {commitment}h commitment
        </span>
      </div>

      {/* 6. Warning banner */}
      {(state === 'zero' || state === 'progress') && (
        <div style={warningWrapStyle}>
          <div style={warningMutedStyle}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="var(--text-secondary, #8B8FA3)" strokeWidth="1.2"/>
              <path d="M8 5v3.5M8 11h.01" stroke="var(--text-secondary, #8B8FA3)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span style={warningMutedTextStyle}>Nothing invested today</span>
          </div>
        </div>
      )}

      {(state === 'complete' || state === 'bonus') && (
        <div style={warningWrapStyle}>
          <div style={warningGoldStyle}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="var(--status-drift, #D9B86C)" strokeWidth="1.2"/>
              <path d="M8 5v3.5M8 11h.01" stroke="var(--status-drift, #D9B86C)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span style={warningGoldTextStyle}>
              You&#39;ve reached your weekly commitment. Everything beyond this is bonus.
            </span>
          </div>
        </div>
      )}

      {/* 7. Log your time button */}
      <div style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
        <button
          type="button"
          onClick={() => navigate('/log')}
          style={logBtnStyle}
        >
          <span style={logBtnTextStyle}>Log your time</span>
        </button>
      </div>
    </div>
  )
}

/* ── Styles ── */

const cardStyle: CSSProperties = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 14,
  padding: '18px 16px',
  margin: '0 24px',
}

const metaRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: 16,
  width: '100%',
}

const metaLabelStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '10px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--text-muted, #7D8093)',
}

const pillBadgeStyle: CSSProperties = {
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

const pillBadgeTextStyle: CSSProperties = {
  color: 'var(--text-secondary, #8B8FA3)',
  fontSize: '10px',
  fontFamily: 'var(--grain-font-sans)',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.12px',
}

const destinationStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '18px',
  fontWeight: 700,
  lineHeight: '23.4px',
  color: 'var(--text-primary, #F0F0F5)',
  margin: 0,
  paddingBottom: 24,
}

const statsColumnStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  paddingBottom: 20,
}

const statValueStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '24px',
  color: 'var(--text-primary, #F0F0F5)',
}

const statInlineLabelStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '16px',
  color: 'var(--accent, #10B981)',
}

const bonusBeyondStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-muted, #7D8093)',
  margin: 0,
}

const barWrapStyle: CSSProperties = {
  paddingBottom: 20,
}

const belowBarRowStyle: CSSProperties = {
  alignSelf: 'stretch',
  paddingBottom: 16,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 8,
}

const belowBarTextStyle: CSSProperties = {
  flex: '1 1 0',
  color: 'var(--text-secondary, #8B8FA3)',
  fontSize: '13px',
  fontFamily: 'var(--grain-font-sans)',
  fontWeight: 400,
  lineHeight: '19.5px',
}

const warningWrapStyle: CSSProperties = {
  alignSelf: 'stretch',
  paddingBottom: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const warningMutedStyle: CSSProperties = {
  alignSelf: 'stretch',
  paddingLeft: 14,
  paddingRight: 14,
  paddingTop: 10,
  paddingBottom: 10,
  background: 'var(--bg-elevated, #1E2130)',
  borderRadius: 14,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 8,
}

const warningMutedTextStyle: CSSProperties = {
  flex: '1 1 0',
  color: 'var(--text-secondary, #8B8FA3)',
  fontSize: '11px',
  fontFamily: 'var(--grain-font-sans)',
  fontWeight: 400,
  lineHeight: '16.5px',
}

const warningGoldStyle: CSSProperties = {
  alignSelf: 'stretch',
  paddingLeft: 14,
  paddingRight: 14,
  paddingTop: 10,
  paddingBottom: 10,
  background: 'var(--status-drift-soft, #25231F)',
  borderRadius: 14,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 8,
}

const warningGoldTextStyle: CSSProperties = {
  flex: '1 1 0',
  color: 'var(--status-drift, #D9B86C)',
  fontSize: '11px',
  fontFamily: 'var(--grain-font-sans)',
  fontWeight: 400,
  lineHeight: '16.5px',
}

const logBtnStyle: CSSProperties = {
  alignSelf: 'stretch',
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 4,
  paddingBottom: 4,
  background: 'var(--accent-soft, #1A2421)',
  borderRadius: 22,
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 4,
}

const logBtnTextStyle: CSSProperties = {
  color: 'var(--accent, #10B981)',
  fontSize: '15px',
  fontFamily: 'var(--grain-font-sans)',
  fontWeight: 600,
  lineHeight: '24px',
}

const inactiveTitleStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '18px',
  fontWeight: 700,
  lineHeight: '23.4px',
  color: 'var(--text-primary, #F0F0F5)',
  margin: 0,
  paddingBottom: 8,
}

const inactiveSubStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary, #8B8FA3)',
  margin: 0,
  paddingBottom: 20,
}

const ctaBtnStyle: CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  backgroundColor: 'var(--accent)',
  color: 'var(--bg)',
  border: 'none',
  borderRadius: 14,
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '19.5px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}
