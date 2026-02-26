import { type CSSProperties, useRef, useCallback } from 'react'

interface SliderProps {
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
}

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  paddingBottom: '16px',
}

const trackContainerStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '6px',
}

const trackStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '6px',
  background: 'var(--bg-input)',
  borderRadius: '2px',
}

const labelsStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
}

const labelTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  lineHeight: '16.5px',
  fontWeight: 400,
  color: 'var(--text-muted)',
}

const inputStyle: CSSProperties = {
  position: 'absolute',
  top: '-8px',
  left: 0,
  width: '100%',
  height: '22px',
  margin: 0,
  opacity: 0,
  cursor: 'pointer',
  zIndex: 2,
}

export const Slider = ({
  value,
  min = 1,
  max = 20,
  onChange,
}: SliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const fillPercent = ((value - min) / (max - min)) * 100

  const fillStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${fillPercent}%`,
    height: '6px',
    background: 'var(--accent)',
    borderRadius: '2px',
  }

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value))
    },
    [onChange],
  )

  return (
    <div style={containerStyle}>
      <div style={trackContainerStyle} ref={trackRef}>
        <div style={trackStyle} />
        <div style={fillStyle} />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          style={inputStyle}
          aria-label="Hours per week"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
      </div>
      <div style={labelsStyle}>
        <span style={labelTextStyle}>{min}h</span>
        <span style={labelTextStyle}>{max}h</span>
      </div>
    </div>
  )
}
