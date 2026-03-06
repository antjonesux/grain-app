import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { errors } from '@/lib/errorMessages'
import type { JourneyInsert } from '@/types/database.types'
import type { ActionInsert } from '@/types/database.types'
import type { JourneyActionInsert } from '@/types/database.types'

interface CreateJourneyWithActionsParams {
  title: string
  why: string
  categoryId: string
  weeklyHours: number
  actionTitles: string[]
}

interface UseCreateJourneyWithActionsResult {
  createJourneyWithActions: (
    params: CreateJourneyWithActionsParams
  ) => Promise<{ journeyId: string | null; error: string | null }>
  isSubmitting: boolean
}

/**
 * Creates a journey with category_id, then ensures actions exist (reuse by user+title+category)
 * and attaches them via journey_actions. All inserts use user_id from auth.
 */
export const useCreateJourneyWithActions = (
  userId: string | undefined
): UseCreateJourneyWithActionsResult => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createJourneyWithActions = useCallback(
    async (
      params: CreateJourneyWithActionsParams
    ): Promise<{ journeyId: string | null; error: string | null }> => {
      if (!userId) {
        return { journeyId: null, error: 'Sign in to save your journey.' }
      }
      setIsSubmitting(true)
      try {
        const journeyInsert: JourneyInsert = {
          user_id: userId,
          title: params.title.trim(),
          why: params.why.trim(),
          category_id: null,
          weekly_hours: params.weeklyHours,
          status: 'active',
          role: 'primary',
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase client inferrence with custom Database type
        const { data: journeyRow, error: journeyError } = await (supabase as any)
          .from('journeys')
          .insert(journeyInsert)
          .select('id')
          .single()

        if (journeyError || !journeyRow) {
          return { journeyId: null, error: journeyError?.message ?? errors.saveJourney }
        }
        const journeyId = (journeyRow as { id: string }).id

        for (let i = 0; i < params.actionTitles.length; i++) {
          const title = params.actionTitles[i].trim()
          if (!title) continue

          const { data: existingActions } = await supabase
            .from('actions')
            .select('id')
            .eq('user_id', userId)
            .eq('title', title)
            .eq('is_active', true)
            .limit(1)

          let actionId: string
          if (existingActions && existingActions.length > 0) {
            actionId = (existingActions[0] as { id: string }).id
          } else {
            const actionInsert: ActionInsert = {
              user_id: userId,
              category_id: null,
              title,
              is_active: true,
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase client inferrence with custom Database type
            const { data: newAction, error: actionError } = await (supabase as any)
              .from('actions')
              .insert(actionInsert)
              .select('id')
              .single()
            if (actionError || !newAction) {
              return {
                journeyId,
                error: actionError?.message ?? errors.saveAction,
              }
            }
            actionId = (newAction as { id: string }).id
          }

          const jaInsert: JourneyActionInsert = {
            user_id: userId,
            journey_id: journeyId,
            action_id: actionId,
            source: i === 0 && params.actionTitles.length === 1 ? 'suggested' : 'custom',
            sort_order: i,
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase client inferrence with custom Database type
          const { error: jaError } = await (supabase as any).from('journey_actions').insert(jaInsert)
          if (jaError) {
            return { journeyId, error: errors.saveJourney }
          }
        }

        return { journeyId, error: null }
      } catch (err) {
        return {
          journeyId: null,
          error: err instanceof Error ? err.message : errors.saveJourney,
        }
      } finally {
        setIsSubmitting(false)
      }
    },
    [userId]
  )

  return { createJourneyWithActions, isSubmitting }
}
