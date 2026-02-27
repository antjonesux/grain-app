import type { ButtonHTMLAttributes, CSSProperties } from 'react'

interface InlineLinkButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  underline?: boolean
  align?: 'left' | 'center' | 'right'
}

const baseStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '19.5px',
  color: 'var(--accent)',
  background: 'none',
  border: 'none',
  padding: '4px 0 0 0',
  cursor: 'pointer',
  transition: 'opacity 150ms ease',
}

export const InlineLinkButton = ({
  underline = false,
  align,
  disabled,
  children,
  ...rest
}: InlineLinkButtonProps) => {
  const style: CSSProperties = {
    ...baseStyle,
    textDecoration: underline ? 'underline' : 'none',
    textAlign: align,
    ...(disabled && { opacity: 0.45, cursor: 'not-allowed' }),
  }

  return (
    <button type="button" style={style} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
