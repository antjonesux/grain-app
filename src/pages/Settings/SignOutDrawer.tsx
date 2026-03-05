import type { CSSProperties } from 'react'
import { Drawer } from '@/components/onboarding/Drawer'

interface SignOutDrawerProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const btnBase: CSSProperties = {
  width: '100%',
  borderRadius: '14px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  border: 'none',
  cursor: 'pointer',
}

const primaryBtn: CSSProperties = {
  ...btnBase,
  background: 'var(--accent)',
  color: 'var(--bg)',
  fontWeight: 500,
  padding: '14px 16px',
}

const ghostBtn: CSSProperties = {
  ...btnBase,
  background: 'transparent',
  color: 'var(--text-primary)',
  fontWeight: 400,
  padding: '4px 16px',
}

export const SignOutDrawer = ({ isOpen, onClose, onConfirm }: SignOutDrawerProps) => (
  <Drawer
    isOpen={isOpen}
    onClose={onClose}
    title="Sign out?"
    subtitle="You'll need to sign in again to access your progress."
  >
    <div style={{ paddingTop: '28px', paddingBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <button type="button" style={primaryBtn} onClick={onConfirm}>
        Sign out
      </button>
      <button type="button" style={ghostBtn} onClick={onClose}>
        Cancel
      </button>
    </div>
  </Drawer>
)
