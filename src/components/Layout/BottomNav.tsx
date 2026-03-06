import { useLocation, useNavigate } from 'react-router-dom'
import type { CSSProperties } from 'react'

const tabs = [
  { label: 'Home', path: '/' },
  { label: 'Log', path: '/log' },
] as const

export const BottomNav = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <div style={navStyle} role="navigation" aria-label="Primary">
      {pathname === '/log' ? null : (
        <>
          {tabs.map(tab => {
            const isActive =
              tab.path === '/'
                ? pathname === '/' || pathname.startsWith('/log-details/')
                : pathname === '/log'
            const color = isActive
              ? 'var(--accent, #10B981)'
              : 'var(--text-muted, #7D8093)'
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                style={tabBtnStyle}
              >
                <TabIcon name={tab.label} color={color} />
                <span style={{ ...labelStyle, color }}>{tab.label}</span>
              </button>
            )
          })}
        </>
      )}
    </div>
  )
}

function TabIcon({ name, color }: { name: string; color: string }) {
  const shared = {
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'Home':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" {...shared} aria-hidden>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    case 'Log':
      return (
        <svg width="26" height="22" viewBox="0 0 24 24" {...shared} aria-hidden>
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      )
    default:
      return null
  }
}

const navStyle: CSSProperties = {
  width: '100%',
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 12,
  paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
  background: 'var(--bg-card, #161921)',
  borderTop: '0.94px solid var(--border, #2A2D3A)',
  display: 'flex',
  justifyContent: 'center',
  gap: 48,
  alignItems: 'center',
}

const tabBtnStyle: CSSProperties = {
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  display: 'inline-flex',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
}

const labelStyle: CSSProperties = {
  fontSize: 13,
  fontFamily: 'var(--grain-font-sans)',
  fontWeight: 500,
  lineHeight: '19.5px',
  textAlign: 'center',
}
