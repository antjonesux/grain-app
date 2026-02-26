import type { CSSProperties } from 'react'

type ChipVariant = 'unselected' | 'selected' | 'static' | 'chip-button'

interface ChipProps {
  label: string
  variant?: ChipVariant
  onClick?: () => void
  icon?: string
}

const baseStyle: CSSProperties = {
  borderRadius: '22px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  fontWeight: 400,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  background: 'none',
}

const variantStyles: Record<ChipVariant, CSSProperties> = {
  unselected: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    color: 'var(--text-secondary)',
    padding: '10px 16px',
    gap: '8px',
  },
  selected: {
    background: 'var(--accent-soft)',
    border: '1.5px solid var(--accent)',
    color: 'var(--accent)',
    padding: '10px 16px',
    gap: '4px',
  },
  static: {
    background: 'var(--bg-elevated)',
    border: 'none',
    color: 'var(--text-secondary)',
    padding: '4px 12px',
    gap: '4px',
    cursor: 'default',
  },
  'chip-button': {
    background: 'transparent',
    border: '1.5px solid var(--border)',
    color: 'var(--text-secondary)',
    padding: '10px 12px',
    gap: '4px',
  },
}

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="var(--text-secondary)"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="8" y1="3" x2="8" y2="13" />
    <line x1="3" y1="8" x2="13" y2="8" />
  </svg>
)

export const Chip = ({
  label,
  variant = 'unselected',
  onClick,
  icon,
}: ChipProps) => {
  const style = { ...baseStyle, ...variantStyles[variant] }

  return (
    <button type="button" style={style} onClick={onClick}>
      {variant === 'chip-button' && <PlusIcon />}
      {icon && <span>{icon}</span>}
      {label}
    </button>
  )
}
