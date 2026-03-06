import { type CSSProperties, useState } from 'react'
import { OnboardingHeader } from '@/components/onboarding/OnboardingHeader'
import { ProgressBar } from '@/components/onboarding/ProgressBar'
import { TextInput } from '@/components/onboarding/TextInput'
import { PrimaryButton } from '@/components/onboarding/PrimaryButton'

interface DestinationScreenProps {
  onNext: (destination: string) => void
  onBack: () => void
  initialValue?: string
}

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
  margin: 0,
}

const inputWrapper: CSSProperties = {
  paddingTop: '20px',
}

const ctaZone: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '28px',
  paddingBottom: '56px',
  gap: '12px',
}

export const DestinationScreen = ({
  onNext,
  onBack,
  initialValue = '',
}: DestinationScreenProps) => {
  const [value, setValue] = useState(initialValue)

  return (
    <div style={screen}>
      <div style={topSection}>
        <OnboardingHeader onBack={onBack} />
        <ProgressBar step={1} total={5} />

        <h1 style={headingStyle}>What are you working toward?</h1>
        <p style={subheadStyle}>
          This becomes your anchor. Be specific.
        </p>

        <div style={inputWrapper}>
          <TextInput
            value={value}
            onChange={setValue}
            placeholder="Ex: Participate in 2026 Iron Man event"
          />
        </div>
      </div>

      <div style={ctaZone}>
        <PrimaryButton
          disabled={value.trim().length === 0}
          onClick={() => onNext(value.trim())}
        >
          Next
        </PrimaryButton>
      </div>
    </div>
  )
}
