import type { ReactNode, CSSProperties } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'ghost'

interface PrimaryButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: ButtonVariant
  type?: 'button' | 'submit' | 'reset'
}

const baseStyle: CSSProperties = {
  width: '100%',
  borderRadius: '14px',
  fontFamily: "var(--grain-font-sans)",
  fontSize: '13px',
  lineHeight: '19.5px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  border: 'none',
  cursor: 'pointer',
  transition: 'opacity 150ms ease',
}

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: 'var(--accent)',
    color: 'var(--bg)',
    fontWeight: 500,
    padding: '14px 16px',
  },
  outline: {
    background: 'var(--bg-input)',
    border: '1px solid var(--border)',
    color: 'var(--text-secondary)',
    fontWeight: 500,
    padding: '14px 16px',
  },
  ghost: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    fontWeight: 400,
    padding: '4px 16px',
  },
}

const disabledStyle: CSSProperties = {
  background: 'var(--bg-input)',
  color: 'var(--text-muted)',
  fontWeight: 500,
  padding: '14px 16px',
  border: 'none',
  cursor: 'not-allowed',
}

export const PrimaryButton = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  type = 'button',
}: PrimaryButtonProps) => {
  const resolvedStyle = disabled
    ? { ...baseStyle, ...disabledStyle }
    : { ...baseStyle, ...variantStyles[variant] }

  return (
    <button
      type={type}
      style={resolvedStyle}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
