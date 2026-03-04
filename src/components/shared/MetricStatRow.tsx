import type { CSSProperties, ReactNode } from 'react'

export interface MetricStatItem {
  icon: ReactNode
  label: string
  value: string | number
}

export type MetricStatRowVariant = 'card' | 'elevated'

interface MetricStatRowProps {
  items: MetricStatItem[]
  variant?: MetricStatRowVariant
  /** Optional style for the row container (e.g. paddingBottom) */
  style?: CSSProperties
}

const rowStyle: CSSProperties = {
  display: 'flex',
  gap: 8,
}

const blockBase: CSSProperties = {
  flex: 1,
  borderRadius: 14,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}

const blockCard: CSSProperties = {
  ...blockBase,
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  paddingLeft: 14,
  paddingRight: 14,
  paddingTop: 10,
  paddingBottom: 10,
}

const blockElevated: CSSProperties = {
  ...blockBase,
  background: 'var(--bg-elevated)',
  padding: '10px 14px',
  gap: 6,
}

const labelRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
}

const labelTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '10px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.12px',
  color: 'var(--text-secondary)',
}

const valueStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '28.6px',
  color: 'var(--text-primary)',
}

export function MetricStatRow ({ items, variant = 'card', style }: MetricStatRowProps) {
  const blockStyle = variant === 'elevated' ? blockElevated : blockCard

  return (
    <div style={{ ...rowStyle, ...style }}>
      {items.map((item, index) => (
        <div key={index} style={blockStyle}>
          <div style={labelRowStyle}>
            {item.icon}
            <span style={labelTextStyle}>{item.label}</span>
          </div>
          <span style={valueStyle}>{item.value}</span>
        </div>
      ))}
    </div>
  )
}
