import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useCreateJourneyWithActions, useInsertActionLog } from '@/hooks'
import { supabase } from '@/lib/supabaseClient'
import type { ActionLogDuration } from '@/types/database.types'

import { DestinationScreen } from './DestinationScreen'
import { WhyScreen } from './WhyScreen'
import { ActionsScreen } from './ActionsScreen'
import { CommitmentScreen } from './CommitmentScreen'
import { SummaryScreen } from './SummaryScreen'
import { FirstLogScreen } from './FirstLogScreen'
import { SuccessScreen } from './SuccessScreen'

interface FlowState {
  step: number
  destination: string
  why: string
  category: string | null
  actions: string[]
  hours: number
  userName: string
  authDone: boolean
}

const initialState: FlowState = {
  step: 1,
  destination: '',
  why: '',
  category: null,
  actions: [],
  hours: 0,
  userName: '',
  authDone: false,
}

const DURATION_MAP: Record<string, ActionLogDuration> = {
  '30m': 0.5,
  '1h': 1.0,
  '1.5h': 1.5,
  '2h': 2.0,
  '3h': 3.0,
}

export const OnboardingFlow = () => {
  const navigate = useNavigate()
  const { user, signUp } = useAuth()
  const { createJourneyWithActions } = useCreateJourneyWithActions(user?.id)
  const { insertActionLog } = useInsertActionLog(user?.id)

  const [state, setState] = useState<FlowState>(initialState)
  const returnToSummaryRef = useRef(false)
  const journeyIdRef = useRef<string | null>(null)
  const savingRef = useRef(false)

  const update = (patch: Partial<FlowState>) =>
    setState((s) => ({ ...s, ...patch }))

  const goTo = (step: number) => update({ step })

  const advanceOrReturn = (nextStep: number) => {
    if (returnToSummaryRef.current) {
      returnToSummaryRef.current = false
      goTo(5)
    } else {
      goTo(nextStep)
    }
  }

  const backOrReturn = (defaultStep: number) => {
    if (returnToSummaryRef.current) {
      returnToSummaryRef.current = false
      goTo(5)
    } else {
      goTo(defaultStep)
    }
  }

  const handleEdit = (targetStep: number) => {
    returnToSummaryRef.current = true
    goTo(targetStep)
  }

  // After auth confirmed + user available → persist journey to Supabase
  useEffect(() => {
    if (
      !state.authDone ||
      !user ||
      journeyIdRef.current ||
      savingRef.current
    )
      return

    savingRef.current = true

    createJourneyWithActions({
      title: state.destination.trim(),
      why: state.why.trim(),
      categoryId: state.category ?? '',
      weeklyHours: state.hours,
      actionTitles: state.actions.filter(Boolean),
    }).then(({ journeyId, error }) => {
      savingRef.current = false
      if (!error && journeyId) {
        journeyIdRef.current = journeyId
        goTo(6)
      }
    })
    // Intentionally scoped: fires once when authDone + user align
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.authDone, user, createJourneyWithActions])

  const handleCreateAccount = async (
    name: string,
    email: string,
    password: string,
  ) => {
    await signUp(email, password)
    update({ userName: name, authDone: true })
  }

  const handleFirstLogSave = async (
    actionTitle: string,
    duration: string,
    note?: string,
  ) => {
    if (!user || !journeyIdRef.current) return

    const { data: actionRows } = await supabase
      .from('actions')
      .select('id')
      .eq('user_id', user.id)
      .eq('title', actionTitle)
      .limit(1)

    const actionId = (actionRows?.[0] as { id: string } | undefined)?.id
    if (!actionId) return

    const today = new Date().toISOString().slice(0, 10)
    await insertActionLog({
      journeyId: journeyIdRef.current,
      actionId,
      logDate: today,
      duration: DURATION_MAP[duration] ?? 1.0,
      note: note ?? null,
    })

    goTo(7)
  }

  const handleSuccess = useCallback(() => {
    navigate('/', { replace: true })
  }, [navigate])

  switch (state.step) {
    case 1:
      return (
        <DestinationScreen
          initialValue={state.destination}
          onNext={(val) => {
            update({ destination: val })
            advanceOrReturn(2)
          }}
          onBack={() => {
            if (returnToSummaryRef.current) {
              returnToSummaryRef.current = false
              goTo(5)
            } else {
              navigate('/welcome')
            }
          }}
        />
      )

    case 2:
      return (
        <WhyScreen
          initialValue={state.why}
          onNext={(val) => {
            update({ why: val })
            advanceOrReturn(3)
          }}
          onBack={() => backOrReturn(1)}
        />
      )

    case 3:
      return (
        <ActionsScreen
          initialCategory={state.category ?? undefined}
          initialActions={state.actions}
          onNext={(cat, acts) => {
            update({ category: cat, actions: acts })
            advanceOrReturn(4)
          }}
          onBack={() => backOrReturn(2)}
        />
      )

    case 4:
      return (
        <CommitmentScreen
          initialValue={state.hours}
          onNext={(hrs) => {
            update({ hours: hrs })
            advanceOrReturn(5)
          }}
          onBack={() => backOrReturn(3)}
        />
      )

    case 5:
      return (
        <SummaryScreen
          destination={state.destination}
          why={state.why}
          category={state.category ?? ''}
          actions={state.actions.filter(Boolean)}
          hours={state.hours}
          onEdit={handleEdit}
          onBack={() => goTo(4)}
          onCreateAccount={handleCreateAccount}
        />
      )

    case 6:
      return (
        <FirstLogScreen
          name={state.userName}
          actions={state.actions.filter(Boolean)}
          onSave={handleFirstLogSave}
          onSkip={() => navigate('/', { replace: true })}
        />
      )

    case 7:
      return <SuccessScreen onFinish={handleSuccess} />

    default:
      return null
  }
}
