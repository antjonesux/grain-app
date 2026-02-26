import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useCreateJourneyWithActions } from '@/hooks'
import { DEFAULT_WEEKLY_HOURS, type OnboardingState } from './Onboarding.types'
import { WelcomeScreen } from './WelcomeScreen'
import { DestinationScreen } from './DestinationScreen'
import { WhyScreen } from './WhyScreen'
import { ActionsScreen } from './ActionsScreen'
import { CommitmentScreen } from './CommitmentScreen'
import { SummaryScreen } from './SummaryScreen'

const initialState: OnboardingState = {
  step: 0,
  title: '',
  why: '',
  categoryId: '',
  actionTitles: [],
  weeklyHours: DEFAULT_WEEKLY_HOURS,
}

export const OnboardingPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { createJourneyWithActions } = useCreateJourneyWithActions(user?.id)
  const [state, setState] = useState<OnboardingState>(initialState)

  const update = (patch: Partial<OnboardingState>) =>
    setState((s) => ({ ...s, ...patch }))

  const goTo = (step: number) => update({ step })

  const handleBack = () => {
    if (state.step > 0) update({ step: state.step - 1 })
  }

  const handleSaveJourney = () => {
    createJourneyWithActions({
      title: state.title.trim(),
      why: state.why.trim(),
      categoryId: state.categoryId,
      weeklyHours: state.weeklyHours,
      actionTitles: state.actionTitles.filter(Boolean),
    }).then(({ error }) => {
      if (!error) navigate('/', { replace: true })
    })
  }

  switch (state.step) {
    case 0:
      return (
        <WelcomeScreen
          onNext={() => goTo(1)}
          onSignIn={() => navigate('/login')}
        />
      )
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
        />
      )
    default:
      return null
  }
}
