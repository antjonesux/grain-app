import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))

/**
 * Week starts Monday (ISO). Given a local date, returns the Monday–Sunday
 * window as YYYY-MM-DD strings.
 */
export const getWeekWindow = (
  today: Date = new Date()
): { weekStart: string; weekEnd: string } => {
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const day = d.getDay()
  const diffToMonday = day === 0 ? -6 : 1 - day
  const monday = new Date(d)
  monday.setDate(d.getDate() + diffToMonday)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const fmt = (dt: Date) => dt.toISOString().slice(0, 10)
  return { weekStart: fmt(monday), weekEnd: fmt(sunday) }
}

export const getTodayStr = (): string => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

export const getWeekDays = (weekStart: string): { date: string; label: string }[] => {
  const start = new Date(weekStart + 'T00:00:00')
  return DAY_LABELS.map((label, i) => {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const formatted = `${label} ${d.getMonth() + 1}/${d.getDate()}`
    return { date: d.toISOString().slice(0, 10), label: formatted }
  })
}
