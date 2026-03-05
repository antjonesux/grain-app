import type { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { MetricStatRow } from '@/components/shared/MetricStatRow'
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

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="var(--text-secondary)" strokeWidth="1.2"/>
    <path d="M8 5v3l2 2" stroke="var(--text-secondary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ActionsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 5h8M4 8h8M4 11h5" stroke="var(--text-secondary)" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

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
  const isBonus = state === 'bonus'
  const isComplete = state === 'complete'
  const rawPercent = commitment <= 0 ? 0 : (invested / commitment) * 100
  const displayPercent = isBonus || isComplete ? 100 : Math.round(rawPercent)

  return (
    <div style={cardStyle}>
      {/* A) Header row */}
      <div style={metaRowStyle}>
        <span style={metaLabelStyle}>YOUR JOURNEY</span>
        {createdAt && (
          <div style={pillBadgeStyle}>
            <span style={pillBadgeTextStyle}>🔥 {daysActive} days active</span>
          </div>
        )}
      </div>

      {/* B) Destination */}
      <p style={destinationStyle}>{destination}</p>

      {/* C) Metrics row */}
      <MetricStatRow
        variant="elevated"
        style={{ paddingBottom: 16 }}
        items={[
          { icon: <ClockIcon />, label: 'Time Invested', value: `${fmt(invested)}h` },
          { icon: <ActionsIcon />, label: 'Actions Logged', value: distinctActions },
        ]}
      />

      {/* D) Progress section */}
      <div style={{ paddingBottom: 16 }}>
        <div style={progressLabelRowStyle}>
          <span style={progressLabelStyle}>Progress</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={progressLabelStyle}>{displayPercent}%</span>
            {isBonus && (
              <span style={bonusLabelStyle}>+{fmt(bonusHours)}h bonus</span>
            )}
          </div>
        </div>
        <ProgressBar invested={invested} commitment={commitment} />
        <div style={commitmentCaptionRowStyle}>
          <span style={commitmentCaptionStyle}>Commitment: {commitment}h</span>
        </div>
      </div>

      {/* E) Completion / Bonus message */}
      {(isComplete || isBonus) && (
        <div style={trophyBannerStyle}>
          <span style={isBonus ? trophyIconBonusStyle : trophyIconCompleteStyle}>🏆</span>
          <div style={{ flex: 1 }}>
            <span style={trophyTitleStyle}>
              {isBonus ? 'Weekly commitment crushed!' : 'Weekly commitment complete!'}
            </span>
            <span style={trophyBodyStyle}>
              {isBonus
                ? `You've logged ${fmt(bonusHours)} bonus hours beyond your commitment.`
                : `You hit your ${commitment}h goal.`}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Styles ── */

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

const metaLabelStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '10px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--text-secondary)',
}

const pillBadgeStyle: CSSProperties = {
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 4,
  paddingBottom: 4,
  background: 'var(--accent-blue-glow)',
  borderRadius: 22,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const pillBadgeTextStyle: CSSProperties = {
  color: 'var(--accent-blue-text)',
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
  color: 'var(--text-primary)',
  margin: 0,
  paddingBottom: 16,
}

const progressLabelRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: 8,
}

const progressLabelStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  fontWeight: 400,
  lineHeight: '16.5px',
  color: 'var(--text-secondary)',
}

const bonusLabelStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  fontWeight: 600,
  lineHeight: '16.5px',
  color: 'var(--accent-amber)',
}

const commitmentCaptionRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: 12,
}

const commitmentCaptionStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: 11,
  fontWeight: 400,
  lineHeight: '16.5px',
  color: 'var(--text-secondary)',
}

const trophyBannerStyle: CSSProperties = {
  padding: '10px 14px',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  borderRadius: 14,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 0,
}

const trophyIconCompleteStyle: CSSProperties = {
  fontSize: 18,
  fontFamily: 'var(--grain-font-sans)',
  fontWeight: 700,
  lineHeight: '23.4px',
  color: 'var(--accent-violet)',
  flexShrink: 0,
}

const trophyIconBonusStyle: CSSProperties = {
  ...trophyIconCompleteStyle,
  color: 'var(--accent-amber)',
}

const trophyTitleStyle: CSSProperties = {
  display: 'block',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  fontWeight: 700,
  lineHeight: '16.5px',
  color: 'var(--text-primary)',
}

const trophyBodyStyle: CSSProperties = {
  display: 'block',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  fontWeight: 400,
  lineHeight: '16.5px',
  color: 'var(--text-primary)',
}

const inactiveTitleStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '18px',
  fontWeight: 700,
  lineHeight: '23.4px',
  color: 'var(--text-primary)',
  margin: 0,
  paddingBottom: 8,
}

const inactiveSubStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
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
