import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { JourneyRow } from '@/types/database.types'

interface UseJourneysResult {
  journeys: JourneyRow[]
  primaryJourney: JourneyRow | null
  error: string | null
  isLoading: boolean
  refetch: () => Promise<void>
}

export const useJourneys = (): UseJourneysResult => {
  const [journeys, setJourneys] = useState<JourneyRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchJourneys = async () => {
    setError(null)
    try {
      const { data, error: fetchError } = await supabase
        .from('journeys')
        .select('id, user_id, title, why, category_id, weekly_hours, status, role, created_at, paused_at, archived_at')
        .eq('status', 'active')
        .order('role', { ascending: true })
        .order('created_at', { ascending: true })

      if (fetchError) {
        setError(fetchError.message)
        setJourneys([])
        return
      }
      setJourneys((data ?? []) as JourneyRow[])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load journeys')
      setJourneys([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    fetchJourneys()
  }, [])

  const primaryJourney = journeys.find((j) => j.role === 'primary') ?? null

  return {
    journeys,
    primaryJourney,
    error,
    isLoading,
    refetch: fetchJourneys,
  }
}
