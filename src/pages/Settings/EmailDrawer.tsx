import { type CSSProperties, useState, useEffect, useRef } from 'react'
import { Drawer } from '@/components/onboarding/Drawer'
import { supabase } from '@/lib/supabaseClient'

interface EmailDrawerProps {
  isOpen: boolean
  onClose: () => void
  currentEmail: string
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

const inputStyle = (filled: boolean): CSSProperties => ({
  width: '100%',
  padding: '16px',
  background: 'var(--bg-input)',
  borderRadius: '14px',
  border: '1px solid var(--border)',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  fontWeight: 400,
  color: filled ? 'var(--text-primary)' : 'var(--text-muted)',
  outline: 'none',
  boxSizing: 'border-box',
})

const readOnlyInput: CSSProperties = {
  width: '100%',
  padding: '16px',
  background: 'var(--bg-input)',
  borderRadius: '14px',
  border: '1px solid var(--border)',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  fontWeight: 400,
  color: 'var(--text-muted)',
  outline: 'none',
  boxSizing: 'border-box',
}

const inputWithIcon: CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
}

const iconWrap: CSSProperties = {
  position: 'absolute',
  right: '16px',
  display: 'flex',
  alignItems: 'center',
}

const btnBase: CSSProperties = {
  width: '100%',
  borderRadius: '14px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '14px 16px',
  border: 'none',
  cursor: 'pointer',
  transition: 'background 250ms ease, color 200ms ease, border-color 250ms ease',
}

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="var(--status-misaligned)" strokeWidth="1.2" fill="none" />
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="var(--accent)" strokeWidth="1.2" fill="none" />
  </svg>
)

const SaveCheckmark = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7.5L5.5 10.5L11.5 4.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

type DrawerPhase = 'form' | 'confirmation'

export const EmailDrawer = ({ isOpen, onClose, currentEmail }: EmailDrawerProps) => {
  const [newEmail, setNewEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [phase, setPhase] = useState<DrawerPhase>('form')
  const [sentTo, setSentTo] = useState('')
  const newRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setNewEmail('')
      setConfirmEmail('')
      setSaving(false)
      setSaved(false)
      setError(null)
      setPhase('form')
      setSentTo('')
      setTimeout(() => newRef.current?.focus(), 300)
    }
  }, [isOpen])

  const newValid = isValidEmail(newEmail)
  const confirmValid = isValidEmail(confirmEmail)
  const emailsMatch = newEmail === confirmEmail
  const isDifferent = newEmail.toLowerCase() !== currentEmail.toLowerCase()
  const canSave = newValid && confirmValid && emailsMatch && isDifferent && !saving && !saved

  const confirmHasInput = confirmEmail.length > 0
  const confirmShowError = confirmHasInput && (!confirmValid || !emailsMatch)
  const confirmShowSuccess = confirmHasInput && confirmValid && emailsMatch && isDifferent

  const handleSave = async () => {
    if (!canSave) return
    setSaving(true)
    setError(null)

    const { error: updateError } = await supabase.auth.updateUser({ email: newEmail })

    if (updateError) {
      setError(updateError.message)
      setSaving(false)
      return
    }

    setSaving(false)
    setSaved(true)
    setSentTo(newEmail)
    setTimeout(() => {
      setPhase('confirmation')
      setSaved(false)
    }, 1200)
  }

  const handleResend = async () => {
    setError(null)
    const { error: resendError } = await supabase.auth.resend({
      type: 'email_change',
      email: currentEmail,
    })
    if (resendError) setError(resendError.message)
  }

  if (phase === 'confirmation') {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} title={`We sent a confirmation link to ${sentTo}`} subtitle="Check your email to confirm your account. Then sign in to finish saving your journey.">
        <div style={{ paddingTop: '28px', paddingBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          {error && <p style={errorTextStyle}>{error}</p>}
          <button type="button" style={{ ...btnBase, background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} onClick={handleResend}>
            Resend email confirmation
          </button>
        </div>
      </Drawer>
    )
  }

  const saveBtnStyle: CSSProperties = saved
    ? { ...btnBase, background: '#1A2421', color: 'var(--accent)', border: '1px solid rgba(16,185,129,0.2)', cursor: 'default' }
    : canSave
      ? { ...btnBase, background: 'var(--accent)', color: 'var(--bg)' }
      : { ...btnBase, background: 'var(--bg-input)', color: 'var(--text-muted)', cursor: 'not-allowed' }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Email address" subtitle="A confirmation link will be sent before your email changes.">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* CURRENT */}
        <div style={{ paddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={sectionLabel}>Current</p>
          <input type="email" value={currentEmail} readOnly style={readOnlyInput} tabIndex={-1} />
        </div>

        {/* UPDATE */}
        <div style={{ paddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={sectionLabel}>Update</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              ref={newRef}
              type="email"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              placeholder="New email address"
              style={inputStyle(newEmail.length > 0)}
            />
            <div style={inputWithIcon as CSSProperties}>
              <input
                type="email"
                value={confirmEmail}
                onChange={e => setConfirmEmail(e.target.value)}
                placeholder="Confirm new email"
                style={{
                  ...inputStyle(confirmEmail.length > 0),
                  paddingRight: confirmHasInput ? '44px' : '16px',
                }}
              />
              {confirmShowError && <span style={iconWrap}><ErrorIcon /></span>}
              {confirmShowSuccess && <span style={iconWrap}><CheckIcon /></span>}
            </div>
          </div>
        </div>

        {error && <p style={errorTextStyle}>{error}</p>}

        <div style={{ paddingTop: '28px', paddingBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <button type="button" style={saveBtnStyle} disabled={!canSave && !saved} onClick={handleSave}>
            {saved && <SaveCheckmark />}
            {saving ? 'Saving…' : saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </Drawer>
  )
}

const errorTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--status-misaligned)',
  margin: 0,
}
