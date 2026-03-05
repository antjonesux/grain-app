import { type CSSProperties, useState, useEffect, useRef } from 'react'
import { Drawer } from '@/components/onboarding/Drawer'
import { supabase } from '@/lib/supabaseClient'

interface ForgotPasswordDrawerProps {
  isOpen: boolean
  onClose: () => void
  initialEmail?: string
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

const SaveCheckmark = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7.5L5.5 10.5L11.5 4.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

type DrawerPhase = 'form' | 'confirmation'

export const ForgotPasswordDrawer = ({ isOpen, onClose, initialEmail = '' }: ForgotPasswordDrawerProps) => {
  const [emailValue, setEmailValue] = useState(initialEmail)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [phase, setPhase] = useState<DrawerPhase>('form')
  const [sentTo, setSentTo] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setEmailValue(initialEmail)
      setSending(false)
      setSent(false)
      setError(null)
      setPhase('form')
      setSentTo('')
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen, initialEmail])

  const emailValid = isValidEmail(emailValue.trim())
  const canSend = emailValid && !sending && !sent

  const handleSend = async () => {
    if (!canSend) return
    const trimmed = emailValue.trim()
    setSending(true)
    setError(null)

    const redirectTo = `${window.location.origin}/reset-password`
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(trimmed, { redirectTo })

    if (resetError) {
      setError(resetError.message)
      setSending(false)
      return
    }

    setSending(false)
    setSent(true)
    setSentTo(trimmed)
    setTimeout(() => {
      setPhase('confirmation')
      setSent(false)
    }, 1200)
  }

  const handleResend = async () => {
    setError(null)
    const redirectTo = `${window.location.origin}/reset-password`
    const { error: resendError } = await supabase.auth.resetPasswordForEmail(sentTo, { redirectTo })
    if (resendError) setError(resendError.message)
  }

  if (phase === 'confirmation') {
    return (
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        title={`We sent a reset link to ${sentTo}`}
        subtitle="Check your email to reset your password. Then sign in with your new password."
      >
        <div style={{ paddingTop: '28px', paddingBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          {error && <p style={errorTextStyle}>{error}</p>}
          <button
            type="button"
            style={{ ...btnBase, background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            onClick={handleResend}
          >
            Resend reset link
          </button>
        </div>
      </Drawer>
    )
  }

  const sendBtnStyle: CSSProperties = sent
    ? { ...btnBase, background: '#1A2421', color: 'var(--accent)', border: '1px solid rgba(16,185,129,0.2)', cursor: 'default' }
    : canSend
      ? { ...btnBase, background: 'var(--accent)', color: 'var(--bg)' }
      : { ...btnBase, background: 'var(--bg-input)', color: 'var(--text-muted)', cursor: 'not-allowed' }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a link to reset your password."
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ paddingBottom: '20px' }}>
          <input
            ref={inputRef}
            type="email"
            value={emailValue}
            onChange={e => setEmailValue(e.target.value)}
            placeholder="Email address"
            style={inputStyle(emailValue.length > 0)}
          />
        </div>

        {error && <p style={errorTextStyle}>{error}</p>}

        <div style={{ paddingTop: '28px', paddingBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            style={sendBtnStyle}
            disabled={!canSend && !sent}
            onClick={handleSend}
          >
            {sent && <SaveCheckmark />}
            {sending ? 'Sending…' : sent ? 'Sent' : 'Send reset link'}
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
