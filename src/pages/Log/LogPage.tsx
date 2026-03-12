import type { CSSProperties } from 'react'
import { useState, useCallback, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Calendar, ChevronDown } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useJourneys, useActionsForJourney } from '@/hooks'
import { createLogEntry } from '@/lib/logging/createLogEntry'
import { errors } from '@/lib/errorMessages'
import { transitionMessages } from '@/lib/transitionMessages'
import { supabase } from '@/lib/supabaseClient'
import type { ActionInsert } from '@/types/database.types'
import type { JourneyActionInsert } from '@/types/database.types'
import type { JourneyRow } from '@/types/database.types'
import { Chip } from '@/components/onboarding/Chip'
import { Drawer } from '@/components/onboarding/Drawer'
import { PrimaryButton } from '@/components/onboarding/PrimaryButton'
import { TextArea, TextInput } from '@/components/onboarding/TextInput'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const formatDateShort = (date: Date): string => {
  const day = DAYS[date.getDay()]
  return `${day} ${date.getMonth() + 1}/${date.getDate()}`
}

/** Local date as YYYY-MM-DD for log_date. */
const getLocalDateString = (date: Date): string => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const isValidDateParam = (s: string | null): s is string =>
  !!s && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s + 'T00:00:00'))

const DURATION_OPTIONS: { label: string; value: number }[] = [
  { label: '30m', value: 0.5 },
  { label: '1h', value: 1 },
  { label: '2h', value: 2 },
  { label: '4h', value: 4 },
  { label: '6h', value: 6 },
  { label: '8h', value: 8 },
  { label: '10h', value: 10 },
  { label: '15h', value: 15 },
]

const PRESET_DURATION_VALUES = DURATION_OPTIONS.map((o) => o.value)

/** Format hours as "1h 15m" for custom duration chip. */
const formatDurationLabel = (hours: number): string => {
  if (hours < 1) {
    const m = Math.round(hours * 60)
    return m === 0 ? '0m' : `${m}m`
  }
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

const ArrowLeft = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="var(--text-secondary)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="16" y1="10" x2="4" y2="10" />
    <polyline points="10 4 4 10 10 16" />
  </svg>
)

export const LogPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const dateParam = searchParams.get('date')
  const initialLogDate = isValidDateParam(dateParam)
    ? dateParam
    : getLocalDateString(new Date())
  const [logDate, setLogDate] = useState(initialLogDate)
  useEffect(() => {
    if (isValidDateParam(dateParam)) setLogDate(dateParam)
  }, [dateParam])
  const { user } = useAuth()
  const { primaryJourney, journeys, isLoading: journeysLoading } = useJourneys()
  const defaultJourney = primaryJourney ?? journeys[0] ?? null
  const [selectedJourney, setSelectedJourney] = useState<JourneyRow | null>(defaultJourney)
  useEffect(() => {
    if (!defaultJourney) return
    const ids = journeys.map((j) => j.id)
    if (!selectedJourney || !ids.includes(selectedJourney.id)) {
      setSelectedJourney(defaultJourney)
    }
  }, [defaultJourney, journeys, selectedJourney])
  const journeyId = selectedJourney?.id ?? null
  const { actions, refetch: refetchActions } = useActionsForJourney(journeyId)

  const [selectedActionId, setSelectedActionId] = useState<string | null>(null)
  const [selectedDurationHours, setSelectedDurationHours] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [saveError, setSaveError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [customActionDrawerOpen, setCustomActionDrawerOpen] = useState(false)
  const [customActionTitle, setCustomActionTitle] = useState('')
  const [customDurationDrawerOpen, setCustomDurationDrawerOpen] = useState(false)
  const [customDurationInput, setCustomDurationInput] = useState('')
  const [journeyPickerOpen, setJourneyPickerOpen] = useState(false)

  const singleJourney = journeys.length <= 1
  const displayJourney = selectedJourney ?? defaultJourney

  const canSave = Boolean(selectedActionId && selectedDurationHours != null && selectedDurationHours > 0)

  const handleAttachCustomAction = useCallback(async () => {
    const title = customActionTitle.trim()
    if (!title || !user?.id || !journeyId) return
    setSaveError(null)
    try {
      const { data: existing } = await supabase
        .from('actions')
        .select('id')
        .eq('user_id', user.id)
        .eq('title', title)
        .eq('is_active', true)
        .limit(1)
      let actionId: string
      if (existing && existing.length > 0) {
        actionId = (existing[0] as { id: string }).id
      } else {
        const insert: ActionInsert = {
          user_id: user.id,
          category_id: null,
          title,
          is_active: true,
        }
        const { data: created, error: createErr } = await (supabase as any)
          .from('actions')
          .insert(insert)
          .select('id')
          .single()
        if (createErr || !created) {
          setSaveError(createErr?.message ?? errors.saveAction)
          return
        }
        actionId = (created as { id: string }).id
      }
      const nextOrder = actions.length
      const jaInsert: JourneyActionInsert = {
        user_id: user.id,
        journey_id: journeyId,
        action_id: actionId,
        source: 'custom',
        sort_order: nextOrder,
      }
      const { error: jaErr } = await (supabase as any).from('journey_actions').insert(jaInsert)
      if (jaErr) {
        setSaveError(jaErr.message)
        return
      }
      await refetchActions()
      setSelectedActionId(actionId)
      setCustomActionTitle('')
      setCustomActionDrawerOpen(false)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : errors.saveAction)
    }
  }, [user?.id, journeyId, customActionTitle, actions.length, refetchActions])

  const handleSaveEntry = useCallback(async () => {
    if (!canSave || !user?.id || !journeyId) return
    setSaveError(null)
    setIsSaving(true)
    try {
      const result = await createLogEntry({
        userId: user.id,
        journeyId,
        logDate,
        loggedAt: new Date().toISOString(),
        note: note.trim() || null,
        items: [{ actionId: selectedActionId!, duration: selectedDurationHours! }],
      })
      if (result.error) {
        setSaveError(result.error)
        setIsSaving(false)
        return
      }
      setIsSaving(false)
      setSaved(true)
      setTimeout(() => navigate('/'), 1200)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : errors.saveEntry)
    } finally {
      setIsSaving(false)
    }
  }, [canSave, user?.id, journeyId, logDate, note, selectedActionId, selectedDurationHours, navigate])

  const removeActionFromJourney = useCallback(
    async (actionId: string) => {
      if (!user?.id || !journeyId) return
      const { error } = await (supabase as any)
        .from('journey_actions')
        .delete()
        .eq('user_id', user.id)
        .eq('journey_id', journeyId)
        .eq('action_id', actionId)
      if (!error) {
        if (selectedActionId === actionId) setSelectedActionId(null)
        await refetchActions()
      }
    },
    [user?.id, journeyId, selectedActionId, refetchActions],
  )

  if (journeysLoading) {
    return (
      <div style={outerStyle}>
        <div style={mainWrapper}>
          <div style={innerContainer}>
            <p style={loadingTextStyle}>Loading…</p>
          </div>
        </div>
      </div>
    )
  }

  if (!defaultJourney) {
    return (
      <div style={outerStyle}>
        <div style={mainWrapper}>
          <div style={innerContainer}>
            <div>
              <div style={headerStyle}>
                <button type="button" style={backBtnStyle} onClick={() => navigate(-1)} aria-label="Go back">
                  <ArrowLeft />
                </button>
                <h1 style={titleStyle}>Log your time</h1>
              </div>
              <div style={dateRowStyle}>
                <Calendar size={20} style={{ color: 'var(--text-primary)', flexShrink: 0 }} />
                <span style={dateTextStyle}>{formatDateShort(new Date())}</span>
              </div>
              <div style={cardStyle}>
                <div style={cardInnerStyle}>
                  <h2 style={cardHeadingStyle}>No active journey</h2>
                  <p style={cardBodyStyle}>
                    Set up your journey to start logging.
                  </p>
                  <div style={ctaContainerStyle}>
                    <PrimaryButton variant="primary" onClick={() => navigate('/onboarding')}>
                      Start your journey
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div style={outerStyle}>
        <header style={stickyHeaderStyle}>
          <div style={headerBackRowStyle}>
            <button type="button" style={backBtnStyle} onClick={() => navigate(-1)} aria-label="Go back">
              <ArrowLeft />
            </button>
          </div>
          <h1 style={titleStyle}>Log your time</h1>
          <div style={headerSecondRowStyle}>
            <div style={dateRowStyle}>
              <Calendar size={14} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
              <span style={dateTextStyle}>
                {formatDateShort(new Date(logDate + 'T12:00:00'))}
              </span>
            </div>
            <button
              type="button"
              style={
                saved
                  ? { ...saveBtnHeaderStyle, background: 'var(--bg-elevated)', color: 'var(--accent)', border: '1px solid var(--accent-soft)', cursor: 'default' }
                  : canSave && !isSaving
                    ? { ...saveBtnHeaderStyle, background: 'var(--accent)', color: 'var(--bg)' }
                    : { ...saveBtnHeaderStyle, background: 'var(--bg-input)', color: 'var(--text-muted)', cursor: 'not-allowed' }
              }
              disabled={(!canSave && !saved) || isSaving}
              onClick={handleSaveEntry}
            >
              {saved && <SaveCheckmark />}
              {isSaving ? 'Saving…' : saved ? transitionMessages.firstLogSaved : 'Save Entry'}
            </button>
          </div>
        </header>

        <div style={scrollContentStyle}>
          {saveError && (
            <p style={errorStyle} role="alert">
              {saveError}
            </p>
          )}
          <div style={sectionsStackStyle}>
            <div style={journeySelectInStack}>
                <p style={sectionLabelStyle}>JOURNEY</p>
                {singleJourney ? (
                  <div style={journeySelectCardStatic} aria-disabled="true">
                    <span style={journeyTitleStyle}>{displayJourney?.title ?? ''}</span>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      style={journeySelectCard}
                      onClick={() => setJourneyPickerOpen(true)}
                      aria-expanded={journeyPickerOpen}
                    >
                      <span style={journeyTitleStyle}>{displayJourney?.title ?? ''}</span>
                      <ChevronDown size={20} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                    </button>
                    {journeyPickerOpen && (
                      <>
                        <div style={pickerOverlay} onClick={() => setJourneyPickerOpen(false)} aria-hidden="true" />
                        <div style={pickerDropdown}>
                          {journeys.map((j) => (
                            <button
                              key={j.id}
                              type="button"
                              style={pickerItemStyle}
                              onClick={() => {
                                setSelectedJourney(j)
                                setJourneyPickerOpen(false)
                                setSelectedActionId(null)
                              }}
                            >
                              {j.title}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              <div style={sectionInStack}>
                <p style={sectionLabelStyle}>ACTION</p>
                <div style={chipWrap}>
                  {actions.map((action) => (
                    <Chip
                      key={action.id}
                      label={action.title}
                      variant={selectedActionId === action.id ? 'selected' : 'unselected'}
                      onClick={() =>
                        setSelectedActionId((prev) =>
                          prev === action.id ? null : action.id,
                        )
                      }
                      onRemove={action.source === 'custom' ? () => removeActionFromJourney(action.id) : undefined}
                    />
                  ))}
                  <Chip
                    label="Custom"
                    variant="chip-button"
                    onClick={() => setCustomActionDrawerOpen(true)}
                  />
                </div>
                {actions.some((a) => a.source === 'custom') && (
                  <p style={helperTextStyle}>Custom actions can be removed. Past entries are kept.</p>
                )}
              </div>

              <div style={sectionInStack}>
                <p style={sectionLabelStyle}>DURATION</p>
                <div style={chipWrap}>
                  {DURATION_OPTIONS.map((opt) => (
                    <Chip
                      key={opt.label}
                      label={opt.label}
                      variant={selectedDurationHours === opt.value ? 'selected' : 'unselected'}
                      onClick={() =>
                        setSelectedDurationHours((prev) =>
                          prev === opt.value ? null : opt.value,
                        )
                      }
                    />
                  ))}
                  {selectedDurationHours != null &&
                    !PRESET_DURATION_VALUES.includes(selectedDurationHours) && (
                      <Chip
                        label={formatDurationLabel(selectedDurationHours)}
                        variant="selected"
                        onClick={() => setSelectedDurationHours(null)}
                      />
                    )}
                  <Chip
                    label="Custom"
                    variant="chip-button"
                    onClick={() => setCustomDurationDrawerOpen(true)}
                  />
                </div>
              </div>

              <div style={sectionInStack}>
                <p style={sectionLabelStyle}>NOTE (OPTIONAL)</p>
                <div style={noteInputWrap}>
                  <TextArea
                    value={note}
                    onChange={setNote}
                    placeholder="Reflect on it."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      <Drawer
        isOpen={customActionDrawerOpen}
        onClose={() => setCustomActionDrawerOpen(false)}
        title="Add an action"
        subtitle="Actions help you get closer to your north star."
      >
        <TextInput
          value={customActionTitle}
          onChange={setCustomActionTitle}
          placeholder="Ex: Run 2 miles"
        />
        <div style={drawerActionsStyle}>
          <PrimaryButton
            disabled={customActionTitle.trim().length === 0}
            onClick={handleAttachCustomAction}
          >
            Add action
          </PrimaryButton>
        </div>
      </Drawer>

      <Drawer
        isOpen={customDurationDrawerOpen}
        onClose={() => {
          setCustomDurationDrawerOpen(false)
          setCustomDurationInput('')
        }}
        title="Custom duration"
        subtitle="Enter hours (e.g. 1.5)."
      >
        <TextInput
          value={customDurationInput}
          onChange={setCustomDurationInput}
          placeholder="Hours"
          type="number"
        />
        <div style={drawerActionsStyle}>
          <PrimaryButton
            disabled={
              customDurationInput.trim() === '' ||
              Number(customDurationInput) <= 0 ||
              Number.isNaN(Number(customDurationInput))
            }
            onClick={() => {
              const val = Number(customDurationInput)
              if (val > 0) {
                setSelectedDurationHours(val)
                setCustomDurationDrawerOpen(false)
                setCustomDurationInput('')
              }
            }}
          >
            Set duration
          </PrimaryButton>
        </div>
      </Drawer>
    </>
  )
}

const outerStyle: CSSProperties = {
  minHeight: '100vh',
  background: 'var(--bg)',
  display: 'flex',
  flexDirection: 'column',
}

const mainWrapper: CSSProperties = {
  flex: 1,
  paddingLeft: 24,
  paddingRight: 24,
  display: 'flex',
  flexDirection: 'column',
}

const stickyHeaderStyle: CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 10,
  flexShrink: 0,
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 20,
  paddingBottom: 16,
  background: 'var(--bg)',
  borderBottom: '1px solid var(--border)',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}

const headerBackRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
}

const headerSecondRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
}

const scrollContentStyle: CSSProperties = {
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 24,
  paddingBottom: 56,
}

const sectionsStackStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}

const innerContainer: CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}

const headerStyle: CSSProperties = {
  paddingTop: 20,
  paddingBottom: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}

const backBtnStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
}

const titleStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '22px',
  fontWeight: 700,
  lineHeight: '28.6px',
  color: 'var(--text-primary)',
  margin: 0,
}

const dateRowStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
}

const dateTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
}

const journeySelectWrap: CSSProperties = {
  paddingBottom: 20,
  position: 'relative',
}

const journeySelectInStack: CSSProperties = {
  ...journeySelectWrap,
  paddingBottom: 0,
}

const journeySelectCard: CSSProperties = {
  width: '100%',
  background: 'var(--bg-card)',
  borderRadius: 14,
  border: '1px solid var(--border)',
  padding: '14px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  color: 'var(--text-primary)',
}

const journeySelectCardStatic: CSSProperties = {
  ...journeySelectCard,
  cursor: 'default',
}

const journeyTitleStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  color: 'var(--text-primary)',
}

const pickerOverlay: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 40,
}
const pickerDropdown: CSSProperties = {
  position: 'absolute',
  left: 24,
  right: 24,
  top: '100%',
  marginTop: 4,
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 14,
  zIndex: 41,
  overflow: 'hidden',
}
const pickerItemStyle: CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  background: 'none',
  border: 'none',
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  color: 'var(--text-primary)',
  textAlign: 'left',
  cursor: 'pointer',
}

const sectionLabelStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  fontWeight: 600,
  lineHeight: '14px',
  textTransform: 'uppercase',
  letterSpacing: '0.12px',
  color: 'var(--text-muted)',
  margin: 0,
  paddingBottom: 8,
}

const sectionWrap: CSSProperties = {
  paddingBottom: 20,
}

const sectionInStack: CSSProperties = {
  ...sectionWrap,
  paddingBottom: 0,
}

const helperTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: 11,
  lineHeight: '16.5px',
  color: 'var(--text-muted)',
  margin: 0,
  paddingTop: 6,
}

const chipWrap: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 6,
}

const noteInputWrap: CSSProperties = {
  paddingTop: 0,
}

const errorStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  color: 'var(--status-misaligned)',
  margin: 0,
}

const cardStyle: CSSProperties = {
  width: '100%',
  paddingTop: 18,
  paddingBottom: 18,
  paddingLeft: 16,
  paddingRight: 16,
  background: 'var(--bg-card)',
  borderRadius: 14,
  border: '1px solid var(--border)',
  display: 'flex',
  alignItems: 'center',
}

const cardInnerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  width: '100%',
}

const cardHeadingStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: 18,
  fontWeight: 700,
  lineHeight: '23.4px',
  color: 'var(--text-primary)',
  margin: 0,
  paddingBottom: 8,
}

const cardBodyStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: 13,
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  margin: 0,
  paddingBottom: 20,
}

const ctaContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  alignSelf: 'stretch',
}

const loadingTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-muted)',
  margin: 0,
}

const drawerActionsStyle: CSSProperties = {
  paddingTop: 28,
  paddingBottom: 40,
}

const saveBtnBase: CSSProperties = {
  width: '100%',
  borderRadius: 14,
  fontFamily: 'var(--grain-font-sans)',
  fontSize: 13,
  lineHeight: '19.5px',
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '8px 16px',
  border: 'none',
  cursor: 'pointer',
  transition: 'background 250ms ease, color 200ms ease, border-color 250ms ease',
}

const saveBtnHeaderStyle: CSSProperties = {
  ...saveBtnBase,
  width: 'auto',
  minWidth: 100,
}

const SaveCheckmark = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7.5L5.5 10.5L11.5 4.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
