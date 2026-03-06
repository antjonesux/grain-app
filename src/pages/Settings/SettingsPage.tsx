import { type CSSProperties, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import type { ThemeMode } from '@/lib/theme/theme'
import { NameDrawer } from './NameDrawer'
import { EmailDrawer } from './EmailDrawer'
import { PasswordDrawer } from './PasswordDrawer'
import { AppearanceDrawer } from './AppearanceDrawer'
import { SignOutDrawer } from './SignOutDrawer'
import { DeleteAccountDrawer } from './DeleteAccountDrawer'

type ActiveDrawer = 'name' | 'email' | 'password' | 'appearance' | 'signout' | 'delete' | null

const themeLabel = (mode: ThemeMode): string =>
  mode === 'dark' ? 'Dark' : mode === 'light' ? 'Light' : 'System'

/* ---------- SVG icons ---------- */

const ArrowLeft = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="var(--text-secondary)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="16" y1="10" x2="4" y2="10" />
    <polyline points="10 4 4 10 10 16" />
  </svg>
)

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M6 4L10 8L6 12"
      stroke="var(--text-muted)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/* ---------- styles ---------- */

const screen: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100dvh',
  padding: '0 24px',
  background: 'var(--bg, #faf9f7)',
}

const headerBlock: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 20,
  paddingBottom: 8,
  gap: 12,
}

const backBtn: CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
}

const pageTitle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '22px',
  fontWeight: 700,
  lineHeight: '28.6px',
  color: 'var(--text-primary)',
  margin: 0,
}

const section: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '20px',
  gap: '12px',
}

const sectionLabel: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '10px',
  fontWeight: 600,
  lineHeight: '12px',
  letterSpacing: '0.12px',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  margin: 0,
}

const card: CSSProperties = {
  background: 'var(--bg-card)',
  borderRadius: '14px',
  border: '1px solid var(--border)',
  padding: '18px 16px',
}

const rowStyle = (hasBorder: boolean): CSSProperties => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  background: 'none',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderBottom: hasBorder ? '1px solid var(--border)' : 'none',
  width: '100%',
  textAlign: 'left',
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: hasBorder ? '12px' : 0,
})

const rowLabel: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '24px',
  color: 'var(--text-primary)',
}

const rowRight: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}

const rowValue: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-muted)',
}

const signOutBtn: CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  background: 'var(--bg-card)',
  borderRadius: '14px',
  border: '1px solid var(--border)',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  fontWeight: 500,
  color: 'var(--text-primary)',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  boxSizing: 'border-box',
}

const deleteBtn: CSSProperties = {
  width: '100%',
  padding: '4px 16px',
  borderRadius: '14px',
  background: 'none',
  border: 'none',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  fontWeight: 400,
  color: 'var(--status-misaligned)',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
}

/* ---------- component ---------- */

export const SettingsPage = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { mode, setMode } = useTheme()

  const [activeDrawer, setActiveDrawer] = useState<ActiveDrawer>(null)

  const userName =
    user?.user_metadata?.first_name ??
    user?.user_metadata?.name ??
    ''
  const [displayName, setDisplayName] = useState(userName)
  const userEmail = user?.email ?? ''

  const close = useCallback(() => setActiveDrawer(null), [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/welcome', { replace: true })
  }

  const handleDeleted = async () => {
    await signOut()
    navigate('/welcome', { replace: true })
  }

  return (
    <div style={screen}>
      {/* Header */}
      <div style={headerBlock}>
        <button type="button" style={backBtn} onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowLeft />
        </button>
        <h1 style={pageTitle}>Settings</h1>
      </div>

      {/* Account section */}
      <div style={section}>
        <p style={sectionLabel}>Account</p>
        <div style={card}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Name row */}
            <button type="button" style={rowStyle(true) as CSSProperties} onClick={() => setActiveDrawer('name')}>
              <span style={rowLabel}>Name</span>
              <span style={rowRight}>
                <span style={rowValue}>{displayName || '—'}</span>
                <ChevronRight />
              </span>
            </button>

            {/* Email row */}
            <button type="button" style={rowStyle(true) as CSSProperties} onClick={() => setActiveDrawer('email')}>
              <span style={rowLabel}>Email address</span>
              <span style={rowRight}>
                <span style={rowValue}>{userEmail}</span>
                <ChevronRight />
              </span>
            </button>

            {/* Password row */}
            <button type="button" style={rowStyle(false) as CSSProperties} onClick={() => setActiveDrawer('password')}>
              <span style={rowLabel}>Password</span>
              <span style={rowRight}>
                <span style={rowValue}>******</span>
                <ChevronRight />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Appearance section */}
      <div style={section}>
        <p style={sectionLabel}>Appearance</p>
        <div style={card}>
          <button type="button" style={rowStyle(false) as CSSProperties} onClick={() => setActiveDrawer('appearance')}>
            <span style={rowLabel}>Theme</span>
            <span style={rowRight}>
              <span style={rowValue}>{themeLabel(mode)}</span>
              <ChevronRight />
            </span>
          </button>
        </div>
      </div>

      {/* Actions */}
      <div style={section}>
        <button type="button" style={signOutBtn} onClick={() => setActiveDrawer('signout')}>
          Sign out
        </button>
        <button type="button" style={deleteBtn} onClick={() => setActiveDrawer('delete')}>
          Delete account
        </button>
      </div>

      {/* Drawers */}
      <NameDrawer
        isOpen={activeDrawer === 'name'}
        onClose={close}
        currentName={displayName || userName}
        onSaved={setDisplayName}
      />
      <EmailDrawer
        isOpen={activeDrawer === 'email'}
        onClose={close}
        currentEmail={userEmail}
      />
      <PasswordDrawer
        isOpen={activeDrawer === 'password'}
        onClose={close}
      />
      <AppearanceDrawer
        isOpen={activeDrawer === 'appearance'}
        onClose={close}
        mode={mode}
        onSelect={(m) => { setMode(m); close() }}
      />
      <SignOutDrawer
        isOpen={activeDrawer === 'signout'}
        onClose={close}
        onConfirm={handleSignOut}
      />
      <DeleteAccountDrawer
        isOpen={activeDrawer === 'delete'}
        onClose={close}
        onDeleted={handleDeleted}
      />
    </div>
  )
}
