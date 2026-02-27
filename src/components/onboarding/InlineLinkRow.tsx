import type { CSSProperties, ReactNode } from 'react'

interface InlineLinkRowProps {
  children: ReactNode
  align?: 'left' | 'center' | 'right'
}

const baseStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '21px',
  color: 'var(--text-secondary)',
  margin: 0,
  padding: '4px 16px',
}

export const InlineLinkRow = ({
  children,
  align = 'center',
}: InlineLinkRowProps) => (
  <p style={{ ...baseStyle, textAlign: align }}>{children}</p>
)
