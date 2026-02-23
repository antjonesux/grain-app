import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import {
  useJourneys,
  useActionsForJourney,
  useActionLogsForDate,
  useInsertActionLog,
} from '@/hooks'
import type { ActionLogDuration } from '@/types/database.types'

const DURATION_OPTIONS: ActionLogDuration[] = [0.5, 1.0, 1.5, 2.0, 3.0]
const NOTE_MAX = 140

const today = () => new Date().toISOString().slice(0, 10)

export const LogPage = () => {
  const { user } = useAuth()
  const { primaryJourney, isLoading: journeysLoading } = useJourneys()
  const [logDate, setLogDate] = useState(today())
  const { actions, error: actionsError, isLoading: actionsLoading } = useActionsForJourney(
    primaryJourney?.id ?? null
  )
  const { logs, refetch: refetchLogs } = useActionLogsForDate(
    primaryJourney?.id ?? null,
    logDate
  )
  const { insertActionLog, isSubmitting } = useInsertActionLog(user?.id)

  const [selectedActionId, setSelectedActionId] = useState<string | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<ActionLogDuration | null>(null)
  const [note, setNote] = useState('')
  const [lastError, setLastError] = useState<string | null>(null)

  const handleSubmitLog = async () => {
    if (!primaryJourney || !selectedActionId || selectedDuration === null) return
    setLastError(null)
    const { error } = await insertActionLog({
      journeyId: primaryJourney.id,
      actionId: selectedActionId,
      logDate,
      duration: selectedDuration,
      note: note.trim() || null,
    })
    if (error) {
      setLastError(error)
      return
    }
    setSelectedActionId(null)
    setSelectedDuration(null)
    setNote('')
    refetchLogs()
  }

  if (journeysLoading || !primaryJourney) {
    return (
      <div className="px-4 py-6">
        <p className="text-stone-500 text-sm">
          {journeysLoading ? 'Loading…' : 'Create a journey first.'}
        </p>
      </div>
    )
  }

  if (actionsError) {
    return (
      <div className="px-4 py-6">
        <p className="text-red-600 text-sm" role="alert">{actionsError}</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 max-w-[480px] mx-auto">
      <h2 className="text-xl font-medium text-stone-800 mb-4">Log</h2>

      <label htmlFor="log-date" className="block text-stone-600 text-sm mb-1">
        Date
      </label>
      <input
        id="log-date"
        type="date"
        value={logDate}
        onChange={(e) => setLogDate(e.target.value)}
        className="w-full border border-stone-300 rounded-lg px-3 py-2 text-stone-800 mb-4"
        aria-label="Log date"
      />

      {actionsLoading ? (
        <p className="text-stone-500 text-sm">Loading actions…</p>
      ) : actions.length === 0 ? (
        <p className="text-stone-500 text-sm">No actions for this journey. Add some in Journey settings.</p>
      ) : (
        <>
          <p className="text-stone-600 text-sm mb-2">Action</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {actions.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => {
                  setSelectedActionId(a.id)
                  setSelectedDuration(null)
                }}
                className={`min-h-[44px] px-3 rounded-lg border text-sm ${
                  selectedActionId === a.id
                    ? 'border-stone-800 bg-stone-100 text-stone-800'
                    : 'border-stone-300 text-stone-700'
                }`}
                aria-pressed={selectedActionId === a.id}
                aria-label={`Log time for ${a.title}`}
              >
                {a.title}
              </button>
            ))}
          </div>

          {selectedActionId && (
            <>
              <p className="text-stone-600 text-sm mb-2">Duration (hours)</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {DURATION_OPTIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDuration(d)}
                    className={`min-h-[44px] min-w-[44px] rounded-lg border text-sm ${
                      selectedDuration === d
                        ? 'border-stone-800 bg-stone-100 text-stone-800'
                        : 'border-stone-300 text-stone-700'
                    }`}
                    aria-pressed={selectedDuration === d}
                    aria-label={`${d} hours`}
                  >
                    {d}h
                  </button>
                ))}
              </div>

              <label htmlFor="log-note" className="block text-stone-600 text-sm mb-1">
                Note (optional)
              </label>
              <input
                id="log-note"
                type="text"
                maxLength={NOTE_MAX}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Brief note"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-stone-800 mb-4"
                aria-describedby="note-count"
              />
              <p id="note-count" className="text-stone-400 text-xs mb-4">
                {note.length}/{NOTE_MAX}
              </p>

              {lastError && (
                <p className="text-red-600 text-sm mb-2" role="alert">
                  {lastError}
                </p>
              )}

              <button
                type="button"
                onClick={handleSubmitLog}
                disabled={selectedDuration === null || isSubmitting}
                className="min-h-[44px] px-4 rounded-lg bg-stone-800 text-white disabled:opacity-50"
              >
                {isSubmitting ? 'Saving…' : 'Add log'}
              </button>
            </>
          )}

          {logs.length > 0 && (
            <section className="mt-8" aria-labelledby="today-logs-heading">
              <h3 id="today-logs-heading" className="text-sm font-medium text-stone-700 mb-2">
                Logs for this day
              </h3>
              <ul className="list-none space-y-2">
                {logs.map((log) => {
                  const actionTitle = actions.find((a) => a.id === log.action_id)?.title ?? 'Action'
                  return (
                    <li
                      key={log.id}
                      className="text-stone-600 text-sm"
                    >
                      {actionTitle}: {log.duration}h
                      {log.note ? ` — ${log.note}` : ''}
                    </li>
                  )
                })}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  )
}
