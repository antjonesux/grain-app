import { supabase } from '@/lib/supabaseClient'

export interface LogEntryItem {
  actionId: string
  duration: number
}

export interface CreateLogEntryParams {
  userId: string
  journeyId: string
  logDate: string
  loggedAt: string
  note?: string | null
  items: LogEntryItem[]
}

export interface CreateLogEntryResult {
  logId: string | null
  error: string | null
}

/**
 * Inserts a parent action_logs row and N child action_log_items rows.
 *
 * Dedupes items by actionId (keeps first occurrence).
 * Best-effort two-step insert — if the children insert fails the parent
 * row will still exist but the caller receives an error.
 */
export async function createLogEntry(
  params: CreateLogEntryParams,
): Promise<CreateLogEntryResult> {
  const { userId, journeyId, logDate, loggedAt, note, items } = params

  if (items.length === 0) {
    return { logId: null, error: 'At least one action item is required.' }
  }

  const seen = new Set<string>()
  const uniqueItems = items.filter((item) => {
    if (seen.has(item.actionId)) return false
    seen.add(item.actionId)
    return true
  })

  // Step 1: parent row
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: parent, error: parentErr } = await (supabase as any)
    .from('action_logs')
    .insert({
      user_id: userId,
      journey_id: journeyId,
      log_date: logDate,
      logged_at: loggedAt,
      note: note ?? null,
    })
    .select('id')
    .single()

  if (parentErr || !parent?.id) {
    return {
      logId: null,
      error: parentErr?.message ?? 'Failed to create log entry.',
    }
  }

  const logId: string = parent.id

  // Step 2: child rows
  const childRows = uniqueItems.map((item) => ({
    log_id: logId,
    user_id: userId,
    journey_id: journeyId,
    action_id: item.actionId,
    duration: item.duration,
    log_date: logDate,
    logged_at: loggedAt,
  }))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: childErr } = await (supabase as any)
    .from('action_log_items')
    .insert(childRows)

  if (childErr) {
    return { logId, error: childErr.message }
  }

  return { logId, error: null }
}
