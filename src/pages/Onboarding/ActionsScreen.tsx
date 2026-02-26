import { type CSSProperties, useState, useRef, useEffect } from 'react'
import { OnboardingHeader } from '@/components/onboarding/OnboardingHeader'
import { ProgressBar } from '@/components/onboarding/ProgressBar'
import { Chip } from '@/components/onboarding/Chip'
import { Drawer } from '@/components/onboarding/Drawer'
import { TextInput } from '@/components/onboarding/TextInput'
import { PrimaryButton } from '@/components/onboarding/PrimaryButton'

interface ActionsScreenProps {
  onNext: (category: string | null, actions: string[]) => void
  onBack: () => void
  initialCategory?: string
  initialActions?: string[]
}

const CATEGORIES = [
  '📐 Learning',
  '🎨 Creative',
  '📈 Career',
  '💪 Health',
  '🔨 Building',
  'Skip',
] as const

const SUGGESTIONS: Record<string, string[]> = {
  '📐 Learning': ['Online course', 'Practice/build', 'Read docs', 'Watch tutorials', 'Exercises/drills'],
  '🎨 Creative': ['Practice', 'Create', 'Study craft', 'Share work', 'Get feedback'],
  '📈 Career': ['Networking', 'Skill building', 'Side projects', 'Resume/portfolio', 'Industry research'],
  '💪 Health': ['Workout', 'Meal prep', 'Stretching/yoga', 'Walk/run', 'Track nutrition'],
  '🔨 Building': ['Design/plan', 'Write code', 'Create content', 'Research', 'Ship/publish'],
  'Skip': ['Practice', 'Study', 'Build', 'Research', 'Plan', 'Create', 'Review', 'Ship'],
}

const screen: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100dvh',
  padding: '0 24px',
  background: 'var(--bg)',
}

const scrollArea: CSSProperties = {
  flex: 1,
  overflowY: 'auto',
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
  paddingBottom: '20px',
}

const chipWrap: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  paddingBottom: '20px',
}

const suggestionsLabel: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  fontWeight: 500,
  lineHeight: '16.5px',
  color: 'var(--text-muted)',
  paddingBottom: '8px',
  margin: 0,
}

const suggestionsWrap: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  paddingBottom: '14px',
}

const ctaZone: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '28px',
  paddingBottom: '56px',
  gap: '12px',
}

const drawerActions: CSSProperties = {
  paddingTop: '28px',
  paddingBottom: '40px',
}

export const ActionsScreen = ({
  onNext,
  onBack,
  initialCategory,
  initialActions = [],
}: ActionsScreenProps) => {
  const [category, setCategory] = useState<string | null>(initialCategory ?? null)
  const [selected, setSelected] = useState<string[]>(initialActions)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [customAction, setCustomAction] = useState('')
  const [suggestionsVisible, setSuggestionsVisible] = useState(!!initialCategory)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (category) {
      setSuggestionsVisible(false)
      const id = requestAnimationFrame(() => setSuggestionsVisible(true))
      return () => cancelAnimationFrame(id)
    }
    setSuggestionsVisible(false)
  }, [category])

  const handleCategorySelect = (cat: string) => {
    if (cat === category) return
    setCategory(cat)
    setSelected([])
  }

  const toggleAction = (action: string) => {
    setSelected((prev) =>
      prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action],
    )
  }

  const handleSaveCustom = () => {
    const trimmed = customAction.trim()
    if (!trimmed) return
    if (!selected.includes(trimmed)) {
      setSelected((prev) => [...prev, trimmed])
    }
    setCustomAction('')
    setDrawerOpen(false)
  }

  const categoryLabel = category === 'Skip' ? 'general' : category

  return (
    <div style={screen}>
      <div style={scrollArea}>
        <OnboardingHeader onBack={onBack} />
        <ProgressBar step={3} total={5} />

        <h1 style={headingStyle}>What does progress look like?</h1>
        <p style={subheadStyle}>
          Choose a focus area to get tailored suggestions, or add your own.
        </p>

        <div style={chipWrap}>
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              variant={category === cat ? 'selected' : 'unselected'}
              onClick={() => handleCategorySelect(cat)}
            />
          ))}
        </div>

        {category && (
          <div
            ref={suggestionsRef}
            style={{
              opacity: suggestionsVisible ? 1 : 0,
              transform: suggestionsVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 250ms ease, transform 250ms ease',
            }}
          >
            <p style={suggestionsLabel}>
              Suggested actions for {categoryLabel}:
            </p>
            <div style={suggestionsWrap}>
              {(SUGGESTIONS[category] ?? []).map((action) => (
                <Chip
                  key={action}
                  label={action}
                  variant={selected.includes(action) ? 'selected' : 'unselected'}
                  onClick={() => toggleAction(action)}
                />
              ))}
              <Chip
                label="Add my own"
                variant="chip-button"
                onClick={() => setDrawerOpen(true)}
              />
            </div>
          </div>
        )}
      </div>

      <div style={ctaZone}>
        <PrimaryButton
          disabled={selected.length === 0}
          onClick={() => onNext(category === 'Skip' ? null : category, selected)}
        >
          Next
        </PrimaryButton>
      </div>

      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Add an action"
        subtitle="Actions help you get closer to your north star."
      >
        <TextInput
          value={customAction}
          onChange={setCustomAction}
          placeholder="Ex: Run 2 miles"
        />
        <div style={drawerActions}>
          <PrimaryButton
            disabled={customAction.trim().length === 0}
            onClick={handleSaveCustom}
          >
            Save
          </PrimaryButton>
        </div>
      </Drawer>
    </div>
  )
}
