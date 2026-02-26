import { type ReactNode, type CSSProperties, useEffect } from 'react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.6)',
  zIndex: 50,
  transition: 'opacity 300ms ease',
}

const drawerStyle: CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: '0 24px',
  background: 'var(--bg-card)',
  borderTopLeftRadius: '22px',
  borderTopRightRadius: '22px',
  border: '1px solid var(--border)',
  borderBottom: 'none',
  zIndex: 51,
  transition: 'transform 300ms ease',
  boxSizing: 'border-box',
  maxHeight: '90vh',
  overflowY: 'auto',
}

const closeRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: '24px',
  paddingBottom: '8px',
}

const closeButtonStyle: CSSProperties = {
  width: '20px',
  height: '20px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const titleStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '22px',
  lineHeight: '28.6px',
  fontWeight: 700,
  color: 'var(--text-primary)',
  paddingTop: '32px',
  paddingBottom: '8px',
}

const subtitleStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  fontWeight: 400,
  color: 'var(--text-muted)',
  paddingBottom: '20px',
}

const contentStyle: CSSProperties = {
  paddingBottom: '24px',
}

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="var(--text-secondary)"
    aria-hidden="true"
  >
    <path d="M15.3 4.7a1 1 0 0 0-1.4 0L10 8.6 6.1 4.7a1 1 0 0 0-1.4 1.4L8.6 10l-3.9 3.9a1 1 0 1 0 1.4 1.4L10 11.4l3.9 3.9a1 1 0 0 0 1.4-1.4L11.4 10l3.9-3.9a1 1 0 0 0 0-1.4z" />
  </svg>
)

export const Drawer = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: DrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div
        style={overlayStyle}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={drawerStyle}
      >
        <div style={closeRowStyle}>
          <button
            type="button"
            style={closeButtonStyle}
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
        <div style={titleStyle}>{title}</div>
        {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
        <div style={contentStyle}>{children}</div>
      </div>
    </>
  )
}
