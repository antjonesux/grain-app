import type { CSSProperties } from 'react'

interface HourBlockProps {
  label: string
  selected: boolean
  onClick: () => void
}

const baseStyle: CSSProperties = {
  padding: '8px 14px',
  borderRadius: '8px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  fontWeight: 500,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  background: 'transparent',
  cursor: 'pointer',
}

const unselectedStyle: CSSProperties = {
  border: '1px solid var(--border)',
  color: 'var(--text-muted)',
}

const selectedStyle: CSSProperties = {
  border: '1px solid var(--accent)',
  color: 'var(--accent)',
}

export const HourBlock = ({ label, selected, onClick }: HourBlockProps) => (
  <button
    type="button"
    style={{ ...baseStyle, ...(selected ? selectedStyle : unselectedStyle) }}
    onClick={onClick}
  >
    {label}
  </button>
)
