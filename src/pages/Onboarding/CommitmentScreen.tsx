import { type CSSProperties, useState } from 'react'
import { OnboardingHeader } from '@/components/onboarding/OnboardingHeader'
import { ProgressBar } from '@/components/onboarding/ProgressBar'
import { HourBlock } from '@/components/onboarding/HourBlock'
import { Slider } from '@/components/onboarding/Slider'
import { PrimaryButton } from '@/components/onboarding/PrimaryButton'

interface CommitmentScreenProps {
  onNext: (hours: number) => void
  onBack: () => void
  initialValue?: number
}

const PRESETS = [2, 4, 6, 8, 10, 15]

const screen: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '100dvh',
  padding: '0 24px',
  background: 'var(--bg)',
}

const topSection: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}

const headingStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '22px',
  fontWeight: 700,
  lineHeight: '28.6px',
  color: 'var(--text-primary)',
  paddingTop: '32px',
  paddingBottom: '8px',
  margin: 0,
}

const subheadStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  paddingBottom: '32px',
  margin: 0,
}

const hourDisplayStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  paddingBottom: '32px',
}

const hourValueStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '64px',
  fontWeight: 700,
  lineHeight: '64px',
  color: 'var(--text-primary)',
  textAlign: 'center',
}

const hourLabelStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  textAlign: 'center',
  paddingTop: '4px',
}

const presetsRow: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  paddingBottom: '20px',
}

const warningContainer: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'var(--status-drift-soft)',
  borderRadius: '14px',
  border: '1px solid var(--border)',
  padding: '10px 14px',
  marginBottom: '12px',
}

const warningIconBox: CSSProperties = {
  width: '16px',
  height: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

const warningTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  fontWeight: 400,
  lineHeight: '16.5px',
  color: 'var(--status-drift)',
}

const ctaZone: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '28px',
  paddingBottom: '56px',
  gap: '12px',
}

export const CommitmentScreen = ({
  onNext,
  onBack,
  initialValue = 0,
}: CommitmentScreenProps) => {
  const [hours, setHours] = useState(initialValue)

  return (
    <div style={screen}>
      <div style={topSection}>
        <OnboardingHeader onBack={onBack} />
        <ProgressBar step={4} total={5} />

        <h1 style={headingStyle}>How many hours a week feels honest?</h1>
        <p style={subheadStyle}>
          Be honest — not ambitious. You can always adjust later.
        </p>

        <div style={hourDisplayStyle}>
          <span style={hourValueStyle}>{hours || '0'}</span>
          <span style={hourLabelStyle}>hours / week</span>
        </div>

        <div style={presetsRow}>
          {PRESETS.map((h) => (
            <HourBlock
              key={h}
              label={`${h}h`}
              selected={hours === h}
              onClick={() => setHours(h)}
            />
          ))}
        </div>

        <Slider
          value={hours || 1}
          min={1}
          max={20}
          onChange={setHours}
        />

        {hours >= 15 && (
          <div style={warningContainer}>
            <div style={warningIconBox}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="6"
                  cy="6"
                  r="5.4"
                  stroke="var(--status-drift)"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
            <span style={warningTextStyle}>
              That's ambitious. Most people overestimate by 40%.
            </span>
          </div>
        )}
        <p style={{ ...subheadStyle, paddingTop: 0 }}>You can adjust this any time. Start where you are.</p>
      </div>

      <div style={ctaZone}>
        <PrimaryButton
          disabled={hours === 0}
          onClick={() => onNext(hours)}
        >
          Next
        </PrimaryButton>
      </div>
    </div>
  )
}
