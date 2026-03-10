import { type CSSProperties, useState, useCallback } from 'react'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}

interface TextAreaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const sharedStyle: CSSProperties = {
  width: '100%',
  padding: '16px',
  background: 'var(--bg-input)',
  borderRadius: '14px',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 400,
  color: 'var(--text-primary)',
  gap: '8px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 150ms ease',
}

const defaultBorder = '1px solid var(--border)'
const focusBorder = '1px solid var(--accent-glow)'

export const TextInput = ({
  value,
  onChange,
  placeholder,
  type = 'text',
}: TextInputProps) => {
  const [focused, setFocused] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange],
  )

  const style: CSSProperties = {
    ...sharedStyle,
    alignItems: 'center',
    border: focused ? focusBorder : defaultBorder,
  }

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      style={style}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}

export const TextArea = ({
  value,
  onChange,
  placeholder,
}: TextAreaProps) => {
  const [focused, setFocused] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
    [onChange],
  )

  const style: CSSProperties = {
    ...sharedStyle,
    alignItems: 'flex-start',
    minHeight: '120px',
    border: focused ? focusBorder : defaultBorder,
    resize: 'vertical',
  }

  return (
    <textarea
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      style={style}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}
