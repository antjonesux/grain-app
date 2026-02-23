import { useMemo } from 'react'
import { useActionLogsForRange } from './useActionLogs'
import type { ActionLogRow } from '@/types/database.types'

/**
 * Week start is Monday (ISO). Returns list of dates in the week (Mon–Sun) as YYYY-MM-DD.
 */
const getWeekDates = (weekStart: string): string[] => {
  const dates: string[] = []
  const start = new Date(weekStart + 'T00:00:00')
  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    dates.push(d.toISOString().slice(0, 10))
  }
  return dates
}

export interface WeeklySummaryComputed {
  actual: number
  zeroDays: number
  weekStart: string
}

/**
 * Computes weekly summary from action_logs: actual = SUM(duration), zero_days = count of days in week with no logs for this journey.
 */
export const computeWeeklySummaryFromLogs = (
  logs: ActionLogRow[],
  journeyId: string,
  weekStart: string
): WeeklySummaryComputed => {
  const weekDates = getWeekDates(weekStart)
  const actual = logs
    .filter((l) => l.journey_id === journeyId)
    .reduce((sum, l) => sum + Number(l.duration), 0)
  const datesWithLogs = new Set(
    logs.filter((l) => l.journey_id === journeyId).map((l) => l.log_date)
  )
  const zeroDays = weekDates.filter((d) => !datesWithLogs.has(d)).length
  return { actual, zeroDays, weekStart }
}

/**
 * Returns ISO week start (Monday) for a given date string YYYY-MM-DD.
 */
export const getWeekStart = (date: string): string => {
  const d = new Date(date + 'T00:00:00')
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(d)
  monday.setDate(diff)
  return monday.toISOString().slice(0, 10)
}

/**
 * Returns the Sunday of the week (end date inclusive) for a given week start (Monday).
 */
export const getWeekEnd = (weekStart: string): string => {
  const start = new Date(weekStart + 'T00:00:00')
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  return end.toISOString().slice(0, 10)
}

/**
 * Hook: fetches action_logs for the given journey and week, returns computed actual and zero_days.
 * Replaces any logic that previously read from daily_logs for weekly summary.
 */
export const useWeeklySummary = (
  journeyId: string | null,
  weekStart: string | null
): WeeklySummaryComputed & { isLoading: boolean; error: string | null } => {
  const endDate = weekStart ? getWeekEnd(weekStart) : ''
  const { logs, isLoading, error } = useActionLogsForRange(
    journeyId,
    weekStart ?? '',
    endDate
  )
  const computed = useMemo(() => {
    if (!journeyId || !weekStart) return { actual: 0, zeroDays: 7, weekStart: weekStart ?? '' }
    return computeWeeklySummaryFromLogs(logs, journeyId, weekStart)
  }, [logs, journeyId, weekStart])

  return { ...computed, isLoading, error }
}
