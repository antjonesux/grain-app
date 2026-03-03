import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { ActionLogItemRow } from '@/types/database.types'
import { getWeekWindow, getWeekDays, getTodayStr } from '@/utils'

export type HomeState =
  | 'no-journey'
  | 'zero'
  | 'progress'
  | 'complete'
  | 'bonus'

export interface DayRollup {
  date: string
  label: string
  hours: number
  actionCount: number
  logged: boolean
  isToday: boolean
}

export interface HomeWeekData {
  investedHours: number
  distinctActions: number
  commitment: number
  homeState: HomeState
  bonusHours: number
  days: DayRollup[]
  weekStart: string
  weekEnd: string
  isLoading: boolean
  error: string | null
}

const COMPLETE_TOLERANCE = 0.01

export const useHomeWeekData = (
  journeyId: string | null,
  commitment: number
): HomeWeekData => {
  const [items, setItems] = useState<ActionLogItemRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { weekStart, weekEnd } = useMemo(() => getWeekWindow(), [])
  const today = useMemo(() => getTodayStr(), [])

  useEffect(() => {
    if (!journeyId) {
      setItems([])
      setIsLoading(false)
      return
    }

    let cancelled = false
    const fetch = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const { data, error: fetchErr } = await supabase
          .from('action_log_items')
          .select('id, log_id, user_id, journey_id, action_id, duration, log_date, logged_at, created_at')
          .eq('journey_id', journeyId)
          .gte('log_date', weekStart)
          .lte('log_date', weekEnd)
          .order('log_date')
          .order('logged_at', { ascending: false })

        if (cancelled) return
        if (fetchErr) {
          setError(fetchErr.message)
          setItems([])
        } else {
          setItems((data ?? []) as ActionLogItemRow[])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load week data')
          setItems([])
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetch()
    return () => { cancelled = true }
  }, [journeyId, weekStart, weekEnd])

  return useMemo(() => {
    if (!journeyId) {
      return {
        investedHours: 0,
        distinctActions: 0,
        commitment,
        homeState: 'no-journey' as HomeState,
        bonusHours: 0,
        days: [],
        weekStart,
        weekEnd,
        isLoading,
        error,
      }
    }

    const investedHours = items.reduce((sum, i) => sum + Number(i.duration), 0)
    const distinctActions = new Set(items.map((i) => i.action_id)).size

    const hoursByDate = new Map<string, number>()
    const actionsByDate = new Map<string, Set<string>>()
    for (const item of items) {
      hoursByDate.set(item.log_date, (hoursByDate.get(item.log_date) ?? 0) + Number(item.duration))
      const set = actionsByDate.get(item.log_date) ?? new Set<string>()
      set.add(item.action_id)
      actionsByDate.set(item.log_date, set)
    }

    const weekDays = getWeekDays(weekStart)
    const days: DayRollup[] = weekDays.map(({ date, label }) => ({
      date,
      label,
      hours: hoursByDate.get(date) ?? 0,
      actionCount: actionsByDate.get(date)?.size ?? 0,
      logged: hoursByDate.has(date),
      isToday: date === today,
    }))

    let homeState: HomeState
    if (investedHours === 0) {
      homeState = 'zero'
    } else if (investedHours > commitment + COMPLETE_TOLERANCE) {
      homeState = 'bonus'
    } else if (Math.abs(investedHours - commitment) <= COMPLETE_TOLERANCE) {
      homeState = 'complete'
    } else {
      homeState = 'progress'
    }

    const bonusHours = homeState === 'bonus' ? investedHours - commitment : 0

    return {
      investedHours,
      distinctActions,
      commitment,
      homeState,
      bonusHours,
      days,
      weekStart,
      weekEnd,
      isLoading,
      error,
    }
  }, [items, journeyId, commitment, weekStart, weekEnd, today, isLoading, error])
}
