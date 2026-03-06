import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { errors } from '@/lib/errorMessages'
import type { ActionRow } from '@/types/database.types'

export interface ActionForJourney extends ActionRow {
  sort_order: number
  source: 'suggested' | 'custom'
}

interface UseActionsForJourneyResult {
  actions: ActionForJourney[]
  error: string | null
  isLoading: boolean
  refetch: () => Promise<void>
}

export const useActionsForJourney = (journeyId: string | null): UseActionsForJourneyResult => {
  const [actions, setActions] = useState<ActionForJourney[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchActions = async () => {
    if (!journeyId) {
      setActions([])
      setIsLoading(false)
      return
    }
    setError(null)
    setIsLoading(true)
    try {
      const { data, error: fetchError } = await supabase
        .from('journey_actions')
        .select(
          `
          sort_order,
          source,
          actions (
            id,
            user_id,
            category_id,
            title,
            is_active,
            created_at
          )
        `
        )
        .eq('journey_id', journeyId)
        .order('sort_order', { ascending: true })

      if (fetchError) {
        setError(errors.loadActions)
        setActions([])
        setIsLoading(false)
        return
      }

      type JaRow = { sort_order: number; source: string; actions: ActionRow | null }
      const flattened: ActionForJourney[] = ((data ?? []) as JaRow[])
        .filter((row) => row.actions != null)
        .map((row) => ({
          ...(row.actions as ActionRow),
          sort_order: row.sort_order,
          source: row.source as 'suggested' | 'custom',
        }))
      setActions(flattened)
    } catch (err) {
      setError(err instanceof Error ? err.message : errors.loadActions)
      setActions([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchActions()
  }, [journeyId])

  return { actions, error, isLoading, refetch: fetchActions }
}
