import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { ActionLogRow } from '@/types/database.types'

interface UseActionLogsResult {
  logs: ActionLogRow[]
  error: string | null
  isLoading: boolean
  refetch: () => Promise<void>
}

/**
 * Fetches action_logs for a journey on a given date.
 * Multiple rows per day are allowed (one per log entry).
 */
export const useActionLogsForDate = (
  journeyId: string | null,
  logDate: string
): UseActionLogsResult => {
  const [logs, setLogs] = useState<ActionLogRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchLogs = async () => {
    if (!journeyId || !logDate) {
      setLogs([])
      setIsLoading(false)
      return
    }
    setError(null)
    setIsLoading(true)
    try {
      const { data, error: fetchError } = await supabase
        .from('action_logs')
        .select('id, user_id, journey_id, action_id, log_date, duration, note, logged_at')
        .eq('journey_id', journeyId)
        .eq('log_date', logDate)
        .order('logged_at', { ascending: false })

      if (fetchError) {
        setError(fetchError.message)
        setLogs([])
        setIsLoading(false)
        return
      }
      setLogs((data ?? []) as ActionLogRow[])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load logs')
      setLogs([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [journeyId, logDate])

  return { logs, error, isLoading, refetch: fetchLogs }
}

/**
 * Fetches action_logs for a journey in a date range (inclusive).
 * Used for weekly summary: actual = SUM(duration), zero_days = days with no rows.
 */
export const useActionLogsForRange = (
  journeyId: string | null,
  startDate: string,
  endDate: string
): { logs: ActionLogRow[]; error: string | null; isLoading: boolean; refetch: () => Promise<void> } => {
  const [logs, setLogs] = useState<ActionLogRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchLogs = async () => {
    if (!journeyId || !startDate || !endDate) {
      setLogs([])
      setIsLoading(false)
      return
    }
    setError(null)
    setIsLoading(true)
    try {
      const { data, error: fetchError } = await supabase
        .from('action_logs')
        .select('id, user_id, journey_id, action_id, log_date, duration, note, logged_at')
        .eq('journey_id', journeyId)
        .gte('log_date', startDate)
        .lte('log_date', endDate)
        .order('log_date')
        .order('logged_at', { ascending: false })

      if (fetchError) {
        setError(fetchError.message)
        setLogs([])
        setIsLoading(false)
        return
      }
      setLogs((data ?? []) as ActionLogRow[])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load logs')
      setLogs([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [journeyId, startDate, endDate])

  return { logs, error, isLoading, refetch: fetchLogs }
}
