import { type CSSProperties, useState } from 'react'
import { OnboardingHeader } from '@/components/onboarding/OnboardingHeader'
import { Chip } from '@/components/onboarding/Chip'
import { TextArea } from '@/components/onboarding/TextInput'
import { PrimaryButton } from '@/components/onboarding/PrimaryButton'

interface FirstLogScreenProps {
  name?: string
  actions?: string[]
  onNext: () => void
  onSave?: (action: string, duration: string, note?: string) => void
}

const DURATIONS = ['30m', '1h', '1.5h', '2h', '2.5h', '3h', 'Custom']

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

const greetingStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '22px',
  fontWeight: 700,
  lineHeight: '28.6px',
  color: 'var(--text-primary)',
  paddingTop: '32px',
  paddingBottom: '8px',
  margin: 0,
}

const subGreetingStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  paddingBottom: '20px',
  margin: 0,
}

const cardStyle: CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: '14px',
  padding: '18px 16px',
}

const cardTitleStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '15px',
  fontWeight: 600,
  lineHeight: '24px',
  color: 'var(--text-primary)',
  paddingBottom: '4px',
  margin: 0,
}

const cardCaptionStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  fontWeight: 400,
  lineHeight: '16.5px',
  color: 'var(--text-secondary)',
  paddingBottom: '16px',
  margin: 0,
}

const sectionLabelStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '10px',
  fontWeight: 600,
  lineHeight: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.12px',
  color: 'var(--text-muted)',
  margin: 0,
}

const chipWrap: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  paddingTop: '12px',
}

const noteSectionStyle: CSSProperties = {
  paddingTop: '16px',
  paddingBottom: '8px',
}

const ctaZone: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '28px',
  paddingBottom: '56px',
  gap: '12px',
}

export const FirstLogScreen = ({
  name = '',
  actions = [],
  onNext,
  onSave,
}: FirstLogScreenProps) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null)
  const [note, setNote] = useState('')

  const greeting = name.trim() ? `Welcome, ${name.trim()}.` : 'Welcome.'
  const canSave = selectedAction !== null && selectedDuration !== null

  const handleSave = () => {
    if (!canSave) return
    onSave?.(selectedAction, selectedDuration, note.trim() || undefined)
    onNext()
  }

  return (
    <div style={screen}>
      <div style={topSection}>
        <OnboardingHeader onBack={null} />

        <h1 style={greetingStyle}>{greeting}</h1>
        <p style={subGreetingStyle}>
          Your journey is set. Let's see where your time goes.
        </p>

        <div style={cardStyle}>
          <p style={cardTitleStyle}>Make your first entry</p>
          <p style={cardCaptionStyle}>What did you work on today?</p>

          <div style={{ paddingBottom: '16px' }}>
            <p style={sectionLabelStyle}>ACTION</p>
            <div style={chipWrap}>
              {actions.map((action) => (
                <Chip
                  key={action}
                  label={action}
                  variant={selectedAction === action ? 'selected' : 'unselected'}
                  onClick={() => setSelectedAction(action)}
                />
              ))}
            </div>
          </div>

          <div>
            <p style={sectionLabelStyle}>DURATION</p>
            <div style={chipWrap}>
              {DURATIONS.map((d) => (
                <Chip
                  key={d}
                  label={d}
                  variant={selectedDuration === d ? 'selected' : 'unselected'}
                  onClick={() => setSelectedDuration(d)}
                />
              ))}
            </div>
          </div>
        </div>

        <div style={noteSectionStyle}>
          <p style={sectionLabelStyle}>NOTE (OPTIONAL)</p>
          <div style={{ paddingTop: '12px' }}>
            <TextArea
              value={note}
              onChange={setNote}
              placeholder="Reflect on it"
            />
          </div>
        </div>
      </div>

      <div style={ctaZone}>
        <PrimaryButton disabled={!canSave} onClick={handleSave}>
          Save Entry
        </PrimaryButton>
        <PrimaryButton variant="ghost" onClick={onNext}>
          I'll log later
        </PrimaryButton>
      </div>
    </div>
  )
}
