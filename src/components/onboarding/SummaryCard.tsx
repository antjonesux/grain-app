import type { ReactNode, CSSProperties } from 'react'

interface SummaryCardProps {
  label: string
  onEdit?: () => void
  children: ReactNode
}

const cardStyle: CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: '14px',
  padding: '18px 16px',
  display: 'inline-flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  marginBottom: '8px',
  boxSizing: 'border-box',
}

const headerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const labelStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '10px',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  letterSpacing: '0.12px',
  lineHeight: '1.2',
}

const editStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '10px',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: 'var(--accent)',
  letterSpacing: '0.12px',
  lineHeight: '1.2',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
}

const contentStyle: CSSProperties = {
  marginTop: '4px',
}

export const SummaryCard = ({ label, onEdit, children }: SummaryCardProps) => (
  <div style={cardStyle}>
    <div style={headerStyle}>
      <span style={labelStyle}>{label}</span>
      {onEdit && (
        <button type="button" style={editStyle} onClick={onEdit}>
          Edit
        </button>
      )}
    </div>
    <div style={contentStyle}>{children}</div>
  </div>
)
