/**
 * Custom hooks for data fetching.
 * All database queries go through hooks in this directory.
 */

export { useJourneyCategories } from './useJourneyCategories'
export { useJourneys } from './useJourneys'
export { useActionsForJourney, type ActionForJourney } from './useActionsForJourney'
export {
  useActionLogsForDate,
  useActionLogsForRange,
} from './useActionLogs'
export { useInsertActionLog } from './useInsertActionLog'
export {
  computeWeeklySummaryFromLogs,
  getWeekStart,
  getWeekEnd,
  useWeeklySummary,
  type WeeklySummaryComputed,
} from './useWeeklySummaryFromActionLogs'
export { useCreateJourneyWithActions } from './useCreateJourneyWithActions'
export {
  useHomeWeekData,
  type HomeState,
  type DayRollup,
  type HomeWeekData,
} from './useHomeWeekData'
