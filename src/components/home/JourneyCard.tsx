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
  if (state === 'no-journey') return <InactiveCard />

  const daysActive = getDaysActive(createdAt)

  return (
    <div style={cardStyle}>
      {/* Meta row */}
      <div style={metaRowStyle}>
        <span style={metaLabelStyle}>YOUR JOURNEY</span>
        <div style={metaRightStyle}>
          <div style={checkCircleStyle}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 6L5 8.5L9.5 3.5"
                stroke="var(--status-aligned, #6EDCB1)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span style={daysActiveStyle}>{daysActive} days active</span>
        </div>
      </div>

      <p style={destinationStyle}>{destination}</p>

      {/* Stats — vertical stack, inline per row */}
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
        <div>
          <span style={statValueStyle}>{distinctActions}</span>
          <span style={statInlineLabelStyle}> actions logged</span>
        </div>
      </div>

      <div style={barWrapStyle}>
        <ProgressBar invested={invested} commitment={commitment} />
      </div>

      {state === 'bonus' ? (
        <div style={bonusPillStyle}>
          <span style={bonusPillTextStyle}>
            You've reached your weekly commitment. Everything beyond this is bonus.
          </span>
        </div>
      ) : (
        <span style={commitmentLabelStyle}>{commitment}h commitment</span>
      )}
    </div>
  )
}

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

const metaRightStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}

const checkCircleStyle: CSSProperties = {
  width: 16,
  height: 16,
  borderRadius: 999,
  background: 'var(--status-aligned-soft, #192827)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const daysActiveStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '19.5px',
  color: 'var(--text-muted, #7D8093)',
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

const barWrapStyle: CSSProperties = {
  paddingBottom: 20,
}

const commitmentLabelStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '19.5px',
  color: 'var(--text-secondary, #8B8FA3)',
  display: 'block',
  paddingBottom: 8,
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
  color: 'var(--status-drift, #D9B86C)',
  margin: 0,
}

const bonusPillStyle: CSSProperties = {
  backgroundColor: 'var(--accent-soft, #1A2421)',
  borderRadius: 22,
  padding: '10px 16px',
}

const bonusPillTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--accent, #10B981)',
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
