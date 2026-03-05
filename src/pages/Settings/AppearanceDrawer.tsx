import type { CSSProperties } from 'react'
import { Drawer } from '@/components/onboarding/Drawer'
import type { ThemeMode } from '@/lib/theme/theme'

interface AppearanceDrawerProps {
  isOpen: boolean
  onClose: () => void
  mode: ThemeMode
  onSelect: (mode: ThemeMode) => void
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

const optionBase: CSSProperties = {
  width: '100%',
  padding: '16px',
  background: 'var(--bg-input)',
  borderRadius: '14px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  fontWeight: 400,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  boxSizing: 'border-box',
  textAlign: 'left',
}

const CheckmarkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3.5 8.5L6 11L12.5 4.5"
      stroke="var(--accent)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const options: { value: ThemeMode; label: string }[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' },
]

export const AppearanceDrawer = ({ isOpen, onClose, mode, onSelect }: AppearanceDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Appearance" subtitle="Choose how the app looks on this device.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '48px' }}>
        <p style={sectionLabel}>Theme</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {options.map(({ value, label }) => {
            const selected = mode === value
            return (
              <button
                key={value}
                type="button"
                style={{
                  ...optionBase,
                  border: selected ? '1px solid var(--accent)' : '1px solid var(--border)',
                  color: selected ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
                onClick={() => onSelect(value)}
              >
                {label}
                {selected && <CheckmarkIcon />}
              </button>
            )
          })}
        </div>
      </div>
    </Drawer>
  )
}
