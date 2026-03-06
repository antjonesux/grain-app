import { type CSSProperties, useState, useEffect, useRef } from 'react'
import { Drawer } from '@/components/onboarding/Drawer'
import { errors } from '@/lib/errorMessages'
import { supabase } from '@/lib/supabaseClient'

interface NameDrawerProps {
  isOpen: boolean
  onClose: () => void
  currentName: string
  onSaved: (name: string) => void
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

const Checkmark = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M2.5 7.5L5.5 10.5L11.5 4.5"
      stroke="var(--accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const NameDrawer = ({ isOpen, onClose, currentName, onSaved }: NameDrawerProps) => {
  const [value, setValue] = useState(currentName)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setValue(currentName)
      setSaving(false)
      setSaved(false)
      setError(null)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen, currentName])

  const trimmed = value.trim()
  const canSave = trimmed.length > 0 && trimmed !== currentName && !saving && !saved

  const handleSave = async () => {
    if (!canSave) return
    setSaving(true)
    setError(null)

    const { error: updateError } = await supabase.auth.updateUser({
      data: { first_name: trimmed, name: trimmed },
    })

    if (updateError) {
      setError(errors.saveName)
      setSaving(false)
      return
    }

    setSaving(false)
    setSaved(true)
    onSaved(trimmed)
    setTimeout(() => onClose(), 1200)
  }

  const btnStyle: CSSProperties = saved
    ? { ...btnBase, background: '#1A2421', color: 'var(--accent)', border: '1px solid rgba(16,185,129,0.2)', cursor: 'default' }
    : canSave
      ? { ...btnBase, background: 'var(--accent)', color: 'var(--bg)' }
      : { ...btnBase, background: 'var(--bg-input)', color: 'var(--text-muted)', cursor: 'not-allowed' }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Your name"
      subtitle="This is how you'll appear in the app."
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ paddingBottom: '20px' }}>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={currentName}
            style={inputStyle(value.length > 0)}
          />
        </div>

        {error && <p style={errorText}>{error}</p>}

        <div style={{ paddingTop: '28px', paddingBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            style={btnStyle}
            disabled={!canSave && !saved}
            onClick={handleSave}
          >
            {saved && <Checkmark />}
            {saving ? 'Saving…' : saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </Drawer>
  )
}

const errorText: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--status-misaligned)',
  margin: 0,
}
