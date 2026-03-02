import { useJourneys } from './useJourneys'

export interface ActiveJourney {
  id: string
  destination: string
  weeklyCommitment: number
  createdAt: string
}

interface UseActiveJourneyResult {
  activeJourney: ActiveJourney | null
  hasJourney: boolean
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useActiveJourney = (): UseActiveJourneyResult => {
  const { journeys, primaryJourney, isLoading, error, refetch } = useJourneys()

  const j = primaryJourney ?? journeys[0] ?? null
  const activeJourney: ActiveJourney | null = j
    ? { id: j.id, destination: j.title, weeklyCommitment: j.weekly_hours, createdAt: j.created_at }
    : null

  return {
    activeJourney,
    hasJourney: journeys.length > 0,
    isLoading,
    error,
    refetch,
  }
}
