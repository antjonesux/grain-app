import { useJourneys, useWeeklySummary, getWeekStart } from '@/hooks'

export const ReviewPage = () => {
  const { primaryJourney, isLoading: journeysLoading } = useJourneys()
  const weekStart = getWeekStart(new Date().toISOString().slice(0, 10))
  const { actual, zeroDays, isLoading: summaryLoading, error } = useWeeklySummary(
    primaryJourney?.id ?? null,
    weekStart
  )

  if (journeysLoading || !primaryJourney) {
    return (
      <div className="px-4 py-6">
        <p className="text-stone-500 text-sm">
          {journeysLoading ? 'Loading…' : 'Set up your journey to start logging.'}
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 py-6">
        <p className="text-[var(--status-misaligned)] text-sm" role="alert">{error}</p>
      </div>
    )
  }

  const commitment = Number(primaryJourney.weekly_hours)
  const delta = actual - commitment

  return (
    <div className="px-4 py-6 max-w-[480px] mx-auto">
      <h2 className="text-xl font-medium text-stone-800 mb-4">Review</h2>
      {summaryLoading ? (
        <p className="text-stone-500 text-sm">Loading week…</p>
      ) : (
        <section aria-labelledby="week-summary-heading">
          <h3 id="week-summary-heading" className="text-sm font-medium text-stone-700 mb-2">
            This week
          </h3>
          <p className="text-stone-600 text-sm">
            Commitment: {commitment}h · Actual: {actual}h · Delta: {delta >= 0 ? '+' : ''}{delta}h
          </p>
          <p className="text-stone-600 text-sm">Days without a log: {zeroDays}</p>
        </section>
      )}
    </div>
  )
}
