import { useCallback, useState } from 'react'
import { createLogEntry } from '@/lib/logging/createLogEntry'
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
        const { error } = await createLogEntry({
          userId,
          journeyId: params.journeyId,
          logDate: params.logDate,
          loggedAt: new Date().toISOString(),
          note: params.note ?? null,
          items: [{ actionId: params.actionId, duration: params.duration }],
        })
        return { error }
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
