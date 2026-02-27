import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useCreateJourneyWithActions } from '@/hooks'
import { DEFAULT_WEEKLY_HOURS, type OnboardingState } from './Onboarding.types'
import { DestinationScreen } from './DestinationScreen'
import { WhyScreen } from './WhyScreen'
import { ActionsScreen } from './ActionsScreen'
import { CommitmentScreen } from './CommitmentScreen'
import { SummaryScreen } from './SummaryScreen'
import { FirstLogScreen } from './FirstLogScreen'
import { SuccessScreen } from './SuccessScreen'

export const DRAFT_KEY = 'grain.onboarding.draft.v1'

const initialState: OnboardingState = {
  step: 1,
  title: '',
  why: '',
  categoryId: '',
  actionTitles: [],
  weeklyHours: DEFAULT_WEEKLY_HOURS,
}

function loadDraft(): OnboardingState {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (raw) {
      const saved = { ...initialState, ...JSON.parse(raw) }
      if (saved.step < 1) saved.step = 1
      return saved
    }
  } catch {
    /* corrupted draft — start fresh */
  }
  return initialState
}

export const OnboardingPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, signUp } = useAuth()
  const { createJourneyWithActions } = useCreateJourneyWithActions(user?.id)
  const [state, setState] = useState<OnboardingState>(loadDraft)
  const resumeApplied = useRef(false)

  useEffect(() => {
    const resume = (location.state as { resume?: string } | null)?.resume
    if (resume === 'summary' && !resumeApplied.current) {
      resumeApplied.current = true
      setState((s) => ({ ...s, step: 5 }))
      navigate('/onboarding', { replace: true })
    }
  }, [location.state])

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(state))
  }, [state])

  const update = (patch: Partial<OnboardingState>) =>
    setState((s) => ({ ...s, ...patch }))

  const goTo = (step: number) => update({ step })

  const handleBack = () => {
    if (state.step > 1) update({ step: state.step - 1 })
    else navigate('/welcome')
  }

  const handleCreateAccount = async (
    _name: string,
    email: string,
    password: string,
  ) => {
    await signUp(email, password)
  }

  const handleSaveJourney = async () => {
    const { error } = await createJourneyWithActions({
      title: state.title.trim(),
      why: state.why.trim(),
      categoryId: state.categoryId,
      weeklyHours: state.weeklyHours,
      actionTitles: state.actionTitles.filter(Boolean),
    })
    if (error) {
      console.error('[Grain] saveJourney failed:', error)
      throw new Error(typeof error === 'string' ? error : (error as { message?: string }).message ?? 'Failed to save journey')
    }
  }

  switch (state.step) {
    case 1:
      return (
        <DestinationScreen
          onNext={(title) => update({ title, step: 2 })}
          onBack={handleBack}
          initialValue={state.title}
        />
      )
    case 2:
      return (
        <WhyScreen
          onNext={(why) => update({ why, step: 3 })}
          onBack={handleBack}
          initialValue={state.why}
        />
      )
    case 3:
      return (
        <ActionsScreen
          onNext={(category, actions) =>
            update({ categoryId: category ?? '', actionTitles: actions, step: 4 })
          }
          onBack={handleBack}
          initialCategory={state.categoryId || undefined}
          initialActions={state.actionTitles}
        />
      )
    case 4:
      return (
        <CommitmentScreen
          onNext={(hours) => update({ weeklyHours: hours, step: 5 })}
          onBack={handleBack}
          initialValue={state.weeklyHours}
        />
      )
    case 5:
      return (
        <SummaryScreen
          destination={state.title}
          why={state.why}
          category={state.categoryId}
          actions={state.actionTitles.filter(Boolean)}
          hours={state.weeklyHours}
          onEdit={goTo}
          onBack={handleBack}
          onSaveJourney={handleSaveJourney}
          onCreateAccount={handleCreateAccount}
          onContinue={() => goTo(6)}
        />
      )
    case 6:
      return (
        <FirstLogScreen
          actions={state.actionTitles.filter(Boolean)}
          onNext={() => goTo(7)}
        />
      )
    case 7:
      return (
        <SuccessScreen
          onFinish={() => {
            localStorage.removeItem(DRAFT_KEY)
            navigate('/', { replace: true })
          }}
        />
      )
    default:
      return null
  }
}
