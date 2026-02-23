import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import {
  useJourneyCategories,
  useCreateJourneyWithActions,
} from '@/hooks'
import {
  DEFAULT_WEEKLY_HOURS,
  ONBOARDING_STEPS,
  TITLE_MAX,
  WHY_MAX,
  ACTION_TITLE_MAX,
  type OnboardingState,
} from './Onboarding.types'

const initialState: OnboardingState = {
  step: 0,
  title: '',
  why: '',
  categoryId: '',
  actionTitles: [''],
  weeklyHours: DEFAULT_WEEKLY_HOURS,
}

export const OnboardingPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { categories, error: categoriesError, isLoading: categoriesLoading } = useJourneyCategories()
  const { createJourneyWithActions, isSubmitting } = useCreateJourneyWithActions(user?.id)
  const [state, setState] = useState<OnboardingState>(initialState)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const update = (patch: Partial<OnboardingState>) => setState((s) => ({ ...s, ...patch }))

  const addAction = () => setState((s) => ({ ...s, actionTitles: [...s.actionTitles, ''] }))
  const removeAction = (index: number) =>
    setState((s) => ({
      ...s,
      actionTitles: s.actionTitles.filter((_, i) => i !== index),
    }))
  const setActionTitle = (index: number, value: string) =>
    setState((s) => {
      const next = [...s.actionTitles]
      next[index] = value.slice(0, ACTION_TITLE_MAX)
      return { ...s, actionTitles: next }
    })

  const canNext =
    (state.step === 0) ||
    (state.step === 1 && state.title.trim().length > 0) ||
    (state.step === 2 && state.why.trim().length > 0) ||
    (state.step === 3 && state.categoryId && state.actionTitles.some((t) => t.trim().length > 0)) ||
    (state.step === 4 && true) ||
    (state.step === 5 && true)

  const handleNext = () => {
    if (state.step < ONBOARDING_STEPS - 1 && canNext) {
      update({ step: state.step + 1 })
      setSubmitError(null)
    } else if (state.step === ONBOARDING_STEPS - 1) {
      setSubmitError(null)
      createJourneyWithActions({
        title: state.title.trim(),
        why: state.why.trim(),
        categoryId: state.categoryId,
        weeklyHours: state.weeklyHours,
        actionTitles: state.actionTitles.map((t) => t.trim()).filter(Boolean),
      }).then(({ error }) => {
        if (error) setSubmitError(error)
        else navigate('/', { replace: true })
      })
    }
  }

  const handleBack = () => {
    if (state.step > 0) update({ step: state.step - 1 })
  }

  if (categoriesLoading) {
    return (
      <div className="px-4 py-6">
        <p className="text-stone-500 text-sm">Loading…</p>
      </div>
    )
  }

  if (categoriesError) {
    return (
      <div className="px-4 py-6">
        <p className="text-red-600 text-sm" role="alert">{categoriesError}</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 max-w-[480px] mx-auto">
      <div className="mb-6">
        <p className="text-stone-500 text-sm">
          Step {state.step + 1} of {ONBOARDING_STEPS}
        </p>
      </div>

      {state.step === 0 && (
        <section aria-labelledby="welcome-heading">
          <h2 id="welcome-heading" className="text-xl font-medium text-stone-800 mb-2">
            Welcome
          </h2>
          <p className="text-stone-600 text-sm mb-6">
            Set your first direction. You’ll choose a destination, why it matters, and how you’ll support it with time.
          </p>
        </section>
      )}

      {state.step === 1 && (
        <section aria-labelledby="destination-heading">
          <h2 id="destination-heading" className="text-xl font-medium text-stone-800 mb-2">
            Destination
          </h2>
          <label htmlFor="onboarding-title" className="block text-stone-600 text-sm mb-1">
            In one phrase, where are you heading?
          </label>
          <input
            id="onboarding-title"
            type="text"
            maxLength={TITLE_MAX}
            value={state.title}
            onChange={(e) => update({ title: e.target.value })}
            className="w-full border border-stone-300 rounded-lg px-3 py-2 text-stone-800"
            aria-describedby="title-count"
          />
          <p id="title-count" className="text-stone-400 text-xs mt-1">
            {state.title.length}/{TITLE_MAX}
          </p>
        </section>
      )}

      {state.step === 2 && (
        <section aria-labelledby="why-heading">
          <h2 id="why-heading" className="text-xl font-medium text-stone-800 mb-2">
            Why it matters
          </h2>
          <label htmlFor="onboarding-why" className="block text-stone-600 text-sm mb-1">
            Briefly, why is this important to you?
          </label>
          <textarea
            id="onboarding-why"
            rows={3}
            maxLength={WHY_MAX}
            value={state.why}
            onChange={(e) => update({ why: e.target.value })}
            className="w-full border border-stone-300 rounded-lg px-3 py-2 text-stone-800 resize-none"
            aria-describedby="why-count"
          />
          <p id="why-count" className="text-stone-400 text-xs mt-1">
            {state.why.length}/{WHY_MAX}
          </p>
        </section>
      )}

      {state.step === 3 && (
        <section aria-labelledby="support-heading">
          <h2 id="support-heading" className="text-xl font-medium text-stone-800 mb-2">
            Category and actions
          </h2>
          <label htmlFor="onboarding-category" className="block text-stone-600 text-sm mb-1">
            Category
          </label>
          <select
            id="onboarding-category"
            value={state.categoryId}
            onChange={(e) => update({ categoryId: e.target.value })}
            className="w-full border border-stone-300 rounded-lg px-3 py-2 text-stone-800 mb-4"
          >
            <option value="">Choose one</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <label className="block text-stone-600 text-sm mb-1">
            What specific actions support this? (e.g. Reading, Practice)
          </label>
          {state.actionTitles.map((title, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                maxLength={ACTION_TITLE_MAX}
                value={title}
                onChange={(e) => setActionTitle(i, e.target.value)}
                placeholder="Action name"
                className="flex-1 border border-stone-300 rounded-lg px-3 py-2 text-stone-800"
                aria-label={`Action ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => removeAction(i)}
                disabled={state.actionTitles.length <= 1}
                className="min-h-[44px] min-w-[44px] rounded-lg border border-stone-300 text-stone-600 text-sm"
                aria-label={`Remove action ${i + 1}`}
              >
                −
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addAction}
            className="text-stone-600 text-sm underline min-h-[44px]"
          >
            Add another action
          </button>
        </section>
      )}

      {state.step === 4 && (
        <section aria-labelledby="hours-heading">
          <h2 id="hours-heading" className="text-xl font-medium text-stone-800 mb-2">
            Weekly hours
          </h2>
          <p className="text-stone-600 text-sm mb-4">
            How many hours per week do you want to invest in this direction?
          </p>
          <input
            type="number"
            min={0.5}
            max={20}
            step={0.5}
            value={state.weeklyHours}
            onChange={(e) => update({ weeklyHours: Math.max(0.5, Math.min(20, Number(e.target.value) || 0.5)) })}
            className="w-full border border-stone-300 rounded-lg px-3 py-2 text-stone-800"
            aria-label="Weekly hours"
          />
        </section>
      )}

      {state.step === 5 && (
        <section aria-labelledby="confirm-heading">
          <h2 id="confirm-heading" className="text-xl font-medium text-stone-800 mb-2">
            Confirm
          </h2>
          <p className="text-stone-600 text-sm mb-2">{state.title}</p>
          <p className="text-stone-500 text-sm mb-2">{state.why}</p>
          <p className="text-stone-500 text-sm mb-4">
            {state.weeklyHours} hrs/week · {state.actionTitles.filter(Boolean).length} action(s)
          </p>
        </section>
      )}

      {submitError && (
        <p className="text-red-600 text-sm mb-4" role="alert">
          {submitError}
        </p>
      )}

      <div className="flex gap-3 mt-8">
        {state.step > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="min-h-[44px] px-4 rounded-lg border border-stone-300 text-stone-700"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          disabled={!canNext || isSubmitting}
          className="min-h-[44px] px-4 rounded-lg bg-stone-800 text-white disabled:opacity-50"
        >
          {state.step === ONBOARDING_STEPS - 1
            ? isSubmitting
              ? 'Creating…'
              : 'Create journey'
            : 'Next'}
        </button>
      </div>
    </div>
  )
}
