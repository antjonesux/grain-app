/**
 * Deployment:
 *   supabase functions deploy delete-account
 *
 * Required secrets (set via supabase secrets set):
 *   SUPABASE_URL
 *   SUPABASE_ANON_KEY
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { type CSSProperties, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabaseClient'
import { PrimaryButton } from '@/components/onboarding/PrimaryButton'
import { Drawer } from '@/components/onboarding/Drawer'

const screen: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100dvh',
  padding: '0 24px',
  background: 'var(--bg)',
}

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '28px',
  paddingBottom: '8px',
  position: 'relative',
}

const backButtonStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  flexShrink: 0,
}

const headerTitleStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '22px',
  fontWeight: 700,
  lineHeight: '28.6px',
  color: 'var(--text-primary)',
  margin: 0,
  flex: 1,
  textAlign: 'center',
  paddingRight: '20px',
}

const sectionLabelStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '10px',
  fontWeight: 600,
  lineHeight: '12px',
  letterSpacing: '0.12px',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  paddingTop: '32px',
  margin: 0,
}

const emailStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  paddingTop: '8px',
  margin: 0,
}

const actionsZone: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingTop: '28px',
  gap: '12px',
}

const destructiveLinkStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '19.5px',
  color: 'var(--status-misaligned)',
  background: 'none',
  border: 'none',
  padding: '4px 0 0 0',
  cursor: 'pointer',
  transition: 'opacity 150ms ease',
}

const drawerBody: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  paddingBottom: '32px',
}

const drawerActions: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}

const destructiveButtonStyle: CSSProperties = {
  width: '100%',
  borderRadius: '14px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '14px 16px',
  background: 'var(--status-misaligned)',
  color: 'var(--bg)',
  border: 'none',
  cursor: 'pointer',
  transition: 'opacity 150ms ease',
}

const errorStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--status-misaligned)',
  margin: 0,
}

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

export const SettingsPage = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/welcome', { replace: true })
  }

  const openDeleteDrawer = () => {
    setDeleteError(null)
    setShowDeleteConfirm(true)
  }

  const closeDeleteDrawer = () => {
    if (deleting) return
    setShowDeleteConfirm(false)
  }

  const deleteAccount = async () => {
    if (deleting) return

    setDeleting(true)
    setDeleteError(null)

    const { error, response } = await supabase.functions.invoke(
      'delete-account',
      { method: 'POST' },
    )

    if (error) {
      let msg = 'Something went wrong. Try again.'
      const res = response ?? error.context
      if (res && typeof res.json === 'function') {
        try {
          const body = await res.clone().json()
          msg = body?.error ?? body?.message ?? msg
        } catch {
          try {
            msg = await res.clone().text()
          } catch { /* exhausted */ }
        }
      } else if (error.message) {
        msg = error.message
      }
      console.error('delete-account error', { status: res?.status, msg, error })
      setDeleteError(msg)
      setDeleting(false)
      return
    }

    await signOut()
    navigate('/welcome', { replace: true })
  }

  return (
    <div style={screen}>
      <header style={headerStyle}>
        <button
          type="button"
          style={backButtonStyle}
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft />
        </button>
        <h1 style={headerTitleStyle}>Settings</h1>
      </header>

      <p style={sectionLabelStyle}>Account</p>
      <p style={emailStyle}>{user?.email ?? 'Unknown'}</p>

      <div style={actionsZone}>
        <PrimaryButton onClick={handleSignOut}>Sign out</PrimaryButton>
        <button
          type="button"
          style={destructiveLinkStyle}
          onClick={openDeleteDrawer}
        >
          Delete account
        </button>
      </div>

      <Drawer
        isOpen={showDeleteConfirm}
        onClose={closeDeleteDrawer}
        title="Delete your account?"
        subtitle="This action cannot be undone."
      >
        <div style={drawerBody}>
          {deleteError && <p style={errorStyle}>{deleteError}</p>}

          <div style={drawerActions}>
            <button
              type="button"
              style={destructiveButtonStyle}
              disabled={deleting}
              onClick={deleteAccount}
            >
              {deleting ? 'Deleting…' : 'Delete account'}
            </button>
            <PrimaryButton
              variant="outline"
              onClick={closeDeleteDrawer}
              disabled={deleting}
            >
              Cancel
            </PrimaryButton>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
