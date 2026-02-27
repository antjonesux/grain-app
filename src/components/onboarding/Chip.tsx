import type { CSSProperties } from 'react'

type ChipVariant = 'unselected' | 'selected' | 'static' | 'chip-button'

interface ChipProps {
  label: string
  variant?: ChipVariant
  onClick?: () => void
  onRemove?: () => void
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
    border: '1.5px dashed var(--border)',
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

const removeButton: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  padding: 0,
  marginLeft: '4px',
  cursor: 'pointer',
  borderRadius: '999px',
}

const CloseIcon = ({ color }: { color: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="4" y1="4" x2="10" y2="10" />
    <line x1="10" y1="4" x2="4" y2="10" />
  </svg>
)

export const Chip = ({
  label,
  variant = 'unselected',
  onClick,
  onRemove,
  icon,
}: ChipProps) => {
  const style = { ...baseStyle, ...variantStyles[variant] }
  const iconColor = variant === 'selected' ? 'var(--accent)' : 'var(--text-secondary)'

  return (
    <button type="button" style={style} onClick={onClick}>
      {variant === 'chip-button' && <PlusIcon />}
      {icon && <span>{icon}</span>}
      {label}
      {onRemove && (
        <span
          role="button"
          tabIndex={-1}
          aria-label={`Remove ${label}`}
          style={removeButton}
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation()
              e.preventDefault()
              onRemove()
            }
          }}
        >
          <CloseIcon color={iconColor} />
        </span>
      )}
    </button>
  )
}
