import { type CSSProperties, useState, useEffect } from 'react'
import { Drawer } from '@/components/onboarding/Drawer'
import { supabase } from '@/lib/supabaseClient'

interface DeleteAccountDrawerProps {
  isOpen: boolean
  onClose: () => void
  onDeleted: () => void
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

const destructiveBtn: CSSProperties = {
  ...btnBase,
  background: 'var(--status-misaligned)',
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

const errorStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--status-misaligned)',
  margin: 0,
}

export const DeleteAccountDrawer = ({ isOpen, onClose, onDeleted }: DeleteAccountDrawerProps) => {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setDeleting(false)
      setError(null)
    }
  }, [isOpen])

  const handleClose = () => {
    if (deleting) return
    onClose()
  }

  const handleDelete = async () => {
    if (deleting) return
    setDeleting(true)
    setError(null)

    const { error: fnError, response } = await supabase.functions.invoke(
      'delete-account',
      { method: 'POST' },
    )

    if (fnError) {
      let msg = 'Something went wrong. Try again.'
      const res = response ?? (fnError as unknown as { context?: Response }).context
      if (res && typeof (res as Response).json === 'function') {
        try {
          const body = await (res as Response).clone().json()
          msg = body?.error ?? body?.message ?? msg
        } catch {
          try {
            msg = await (res as Response).clone().text()
          } catch { /* exhausted */ }
        }
      } else if (fnError.message) {
        msg = fnError.message
      }
      console.error('delete-account error', { status: (res as Response | undefined)?.status, msg, error: fnError })
      setError(msg)
      setDeleting(false)
      return
    }

    onDeleted()
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      title="Delete your account?"
      subtitle="This action cannot be undone. All your progress will be permanently removed."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '8px' }}>
        {error && <p style={errorStyle}>{error}</p>}
        <div style={{ paddingTop: '28px', paddingBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <button type="button" style={destructiveBtn} disabled={deleting} onClick={handleDelete}>
            {deleting ? 'Deleting…' : 'Delete account'}
          </button>
          <button type="button" style={ghostBtn} disabled={deleting} onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </Drawer>
  )
}
