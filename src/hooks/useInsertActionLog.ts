import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { ActionLogInsert } from '@/types/database.types'
import type { ActionLogDuration } from '@/types/database.types'

interface InsertActionLogParams {
  journeyId: string
  actionId: string
  logDate: string
  duration: ActionLogDuration
  note?: string | null
}

interface UseInsertActionLogResult {
  insertActionLog: (params: InsertActionLogParams) => Promise<{ error: string | null }>
  isSubmitting: boolean
}

export const useInsertActionLog = (userId: string | undefined): UseInsertActionLogResult => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const insertActionLog = useCallback(
    async (params: InsertActionLogParams): Promise<{ error: string | null }> => {
      if (!userId) {
        return { error: 'You must be signed in to log time.' }
      }
      setIsSubmitting(true)
      try {
        const row: ActionLogInsert = {
          user_id: userId,
          journey_id: params.journeyId,
          action_id: params.actionId,
          log_date: params.logDate,
          duration: params.duration,
          note: params.note ?? null,
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase client inferrence with custom Database type
        const { error: insertError } = await (supabase as any).from('action_logs').insert(row)
        if (insertError) {
          return { error: insertError.message }
        }
        return { error: null }
      } catch (err) {
        return {
          error: err instanceof Error ? err.message : 'Failed to save log',
        }
      } finally {
        setIsSubmitting(false)
      }
    },
    [userId]
  )

  return { insertActionLog, isSubmitting }
}
