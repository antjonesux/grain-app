import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { ActionLogRow } from '@/types/database.types'

export interface LogDetailEntry {
  id: string
  logged_at: string
  duration: number
  actionTitle: string
  note: string | null
}

export interface UseLogDetailsForDateResult {
  entries: LogDetailEntry[]
  timeInvestedHours: number
  actionsLoggedCount: number
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Fetches log items for a journey on a given date with action name and parent note.
 * Used by Log Details page.
 */
export const useLogDetailsForDate = (
  journeyId: string | null,
  logDate: string
): UseLogDetailsForDateResult => {
  const [entries, setEntries] = useState<LogDetailEntry[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchLogs = async () => {
    if (!journeyId || !logDate) {
      setEntries([])
      setIsLoading(false)
      return
    }
    setError(null)
    setIsLoading(true)
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error: fetchError } = await (supabase as any)
        .from('action_log_items')
        .select('id, duration, logged_at, actions(title), action_logs(note)')
        .eq('journey_id', journeyId)
        .eq('log_date', logDate)
        .order('logged_at', { ascending: false })

      if (fetchError) {
        setError(fetchError.message)
        setEntries([])
        setIsLoading(false)
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mapped: LogDetailEntry[] = (data ?? []).map((item: any) => ({
        id: item.id,
        logged_at: item.logged_at,
        duration: Number(item.duration),
        actionTitle: item.actions?.title ?? 'Unknown',
        note: item.action_logs?.note ?? null,
      }))

      const timeInvestedHours = mapped.reduce((sum, e) => sum + e.duration, 0)
      const actionsLoggedCount = mapped.length

      setEntries(mapped)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load log details')
      setEntries([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [journeyId, logDate])

  const timeInvestedHours = entries.reduce((sum, e) => sum + e.duration, 0)
  const actionsLoggedCount = entries.length

  return {
    entries,
    timeInvestedHours,
    actionsLoggedCount,
    isLoading,
    error,
    refetch: fetchLogs,
  }
}

interface UseActionLogsResult {
  logs: ActionLogRow[]
  error: string | null
  isLoading: boolean
  refetch: () => Promise<void>
}

/**
 * Fetches log items for a journey on a given date via action_log_items,
 * joining the parent note from action_logs.
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error: fetchError } = await (supabase as any)
        .from('action_log_items')
        .select('id, log_id, user_id, journey_id, action_id, duration, log_date, logged_at, action_logs(note)')
        .eq('journey_id', journeyId)
        .eq('log_date', logDate)
        .order('logged_at', { ascending: false })

      if (fetchError) {
        setError(fetchError.message)
        setLogs([])
        setIsLoading(false)
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mapped: ActionLogRow[] = (data ?? []).map((item: any) => ({
        id: item.id,
        user_id: item.user_id,
        journey_id: item.journey_id,
        action_id: item.action_id,
        log_date: item.log_date,
        duration: Number(item.duration),
        note: item.action_logs?.note ?? null,
        logged_at: item.logged_at,
      }))

      setLogs(mapped)
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
 * Fetches log items for a journey in a date range (inclusive) via action_log_items.
 * Used for weekly summary aggregation.
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error: fetchError } = await (supabase as any)
        .from('action_log_items')
        .select('id, log_id, user_id, journey_id, action_id, duration, log_date, logged_at, action_logs(note)')
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mapped: ActionLogRow[] = (data ?? []).map((item: any) => ({
        id: item.id,
        user_id: item.user_id,
        journey_id: item.journey_id,
        action_id: item.action_id,
        log_date: item.log_date,
        duration: Number(item.duration),
        note: item.action_logs?.note ?? null,
        logged_at: item.logged_at,
      }))

      setLogs(mapped)
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
