import { type CSSProperties, useState, useEffect, useRef } from 'react'
import { Drawer } from '@/components/onboarding/Drawer'
import { supabase } from '@/lib/supabaseClient'
import { errors } from '@/lib/errorMessages'
import { meetsMinLength, PASSWORD_HINT } from '@/lib/passwordValidation'

interface PasswordDrawerProps {
  isOpen: boolean
  onClose: () => void
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
  paddingRight: '44px',
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

const readOnlyPasswordStyle: CSSProperties = {
  width: '100%',
  padding: '16px',
  paddingRight: '44px',
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

const disabledPasswordStyle: CSSProperties = {
  ...readOnlyPasswordStyle,
  cursor: 'not-allowed',
  opacity: 0.9,
}

const inputWrap: CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
}

const disabledInputWrap: CSSProperties = {
  ...inputWrap,
  cursor: 'default',
}

const toggleBtn: CSSProperties = {
  position: 'absolute',
  right: '16px',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
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

const ghostLink: CSSProperties = {
  width: '100%',
  borderRadius: '14px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  fontWeight: 400,
  textDecoration: 'underline',
  color: 'var(--text-secondary)',
  background: 'none',
  border: 'none',
  padding: '4px 16px',
  cursor: 'pointer',
  textAlign: 'center',
}

const hintStyle = (met: boolean): CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 12px',
  borderRadius: '22px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  lineHeight: '16.5px',
  fontWeight: 400,
  color: met ? 'var(--accent)' : 'var(--text-secondary)',
})

const EyeIcon = ({ muted }: { muted?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <ellipse cx="8" cy="8" rx="6" ry="4" stroke={muted ? 'var(--text-muted)' : 'var(--text-muted)'} strokeWidth="1.2" fill="none" />
  </svg>
)

const HintCircle = ({ met }: { met: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke={met ? 'var(--accent)' : 'var(--text-secondary)'} strokeWidth="1" fill="none" />
  </svg>
)

const ErrorCircle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="var(--status-misaligned)" strokeWidth="1.2" fill="none" />
  </svg>
)

const CheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="var(--accent)" strokeWidth="1.2" fill="none" />
  </svg>
)

const SaveCheckmark = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7.5L5.5 10.5L11.5 4.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const PasswordDrawer = ({ isOpen, onClose }: PasswordDrawerProps) => {
  const [showCurrent, setShowCurrent] = useState(false)
  const [newPw, setNewPw] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [confirmPw, setConfirmPw] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [forgotMessage, setForgotMessage] = useState<string | null>(null)
  const newRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setShowCurrent(false)
      setNewPw('')
      setShowNew(false)
      setConfirmPw('')
      setSaving(false)
      setSaved(false)
      setError(null)
      setForgotMessage(null)
    }
  }, [isOpen])

  const meetsLength = meetsMinLength(newPw)
  const passwordsMatch = newPw === confirmPw && confirmPw.length > 0
  const confirmHasInput = confirmPw.length > 0
  const confirmShowError = confirmHasInput && !passwordsMatch
  const confirmShowSuccess = confirmHasInput && passwordsMatch

  const canSave = meetsLength && passwordsMatch && !saving && !saved

  const handleSave = async () => {
    if (!canSave) return
    setSaving(true)
    setError(null)

    const { error: updateErr } = await supabase.auth.updateUser({ password: newPw })

    if (updateErr) {
      setError(updateErr.message.includes('same') || updateErr.message.includes('identical') ? errors.samePassword : errors.savePassword)
      setSaving(false)
      return
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => onClose(), 1200)
  }

  const handleForgotPassword = async () => {
    setForgotMessage(null)
    setError(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.email) {
      setForgotMessage(errors.noEmail)
      return
    }
    const redirectTo = `${window.location.origin}/reset-password`
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(user.email, { redirectTo })
    if (resetError) {
      setForgotMessage(errors.resetLink)
      return
    }
    setForgotMessage('Check your email for a link to reset your password.')
  }

  const saveBtnStyle: CSSProperties = saved
    ? { ...btnBase, background: '#1A2421', color: 'var(--accent)', border: '1px solid rgba(16,185,129,0.2)', cursor: 'default' }
    : canSave
      ? { ...btnBase, background: 'var(--accent)', color: 'var(--bg)' }
      : { ...btnBase, background: 'var(--bg-input)', color: 'var(--text-muted)', cursor: 'not-allowed' }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Password" subtitle="Keep your account secure with a strong, unique password.">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* CURRENT */}
        <div style={{ paddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={sectionLabel}>Current</p>
          <div style={disabledInputWrap}>
            <input
              type={showCurrent ? 'text' : 'password'}
              value="••••••"
              readOnly
              disabled
              aria-label="Current password"
              style={disabledPasswordStyle}
            />
            <button type="button" style={toggleBtn} onClick={() => setShowCurrent(v => !v)} aria-label={showCurrent ? 'Hide password' : 'Show password'}>
              <EyeIcon muted />
            </button>
          </div>
        </div>

        {/* UPDATE */}
        <div style={{ paddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={sectionLabel}>Update</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={inputWrap as CSSProperties}>
              <input
                ref={newRef}
                type={showNew ? 'text' : 'password'}
                value={newPw}
                onChange={e => setNewPw(e.target.value)}
                placeholder="New password"
                style={inputStyle(newPw.length > 0)}
              />
              <button type="button" style={toggleBtn} onClick={() => setShowNew(v => !v)} aria-label={showNew ? 'Hide password' : 'Show password'}>
                <EyeIcon />
              </button>
            </div>

            {newPw.length > 0 && (
              <span style={hintStyle(meetsLength)}>
                <HintCircle met={meetsLength} />
                {PASSWORD_HINT}
              </span>
            )}

            <div style={inputWrap as CSSProperties}>
              <input
                type="password"
                value={confirmPw}
                onChange={e => setConfirmPw(e.target.value)}
                placeholder="Confirm new password"
                style={{
                  ...inputStyle(confirmPw.length > 0),
                  paddingRight: confirmHasInput ? '44px' : '44px',
                }}
              />
              {confirmShowError && <span style={{ ...toggleBtn, cursor: 'default' } as CSSProperties}><ErrorCircle /></span>}
              {confirmShowSuccess && <span style={{ ...toggleBtn, cursor: 'default' } as CSSProperties}><CheckCircle /></span>}
            </div>
          </div>
        </div>

        {error && <p style={errorTextStyle}>{error}</p>}
        {forgotMessage && (
          <p style={forgotMessageStyle}>{forgotMessage}</p>
        )}

        <div style={{ paddingTop: '28px', paddingBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <button type="button" style={saveBtnStyle} disabled={!canSave && !saved} onClick={handleSave}>
            {saved && <SaveCheckmark />}
            {saving ? 'Saving…' : saved ? 'Saved' : 'Save'}
          </button>
          <button type="button" style={ghostLink} onClick={handleForgotPassword}>
            Forgot password?
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

const forgotMessageStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  margin: 0,
}
