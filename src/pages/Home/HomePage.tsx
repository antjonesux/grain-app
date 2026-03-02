import { useNavigate } from 'react-router-dom'
import { useJourneys, useHomeWeekData } from '@/hooks'
import type { DayRollup } from '@/hooks'
import { OnboardingPage } from '@/pages/Onboarding/OnboardingPage'
import { cn } from '@/utils'

const formatHours = (h: number): string => {
  if (h === 0) return '0'
  if (Number.isInteger(h)) return String(h)
  return h.toFixed(1)
}

const ProgressRing = ({
  percent,
  size = 120,
  stroke = 6,
}: {
  percent: number
  size?: number
  stroke?: number
}) => {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(percent, 100)
  const offset = circumference - (clamped / 100) * circumference

  return (
    <svg width={size} height={size} className="mx-auto">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="text-stone-200"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className={percent >= 100 ? 'text-emerald-500' : 'text-stone-700'}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  )
}

const DayCard = ({ day, onLog }: { day: DayRollup; onLog: () => void }) => (
  <div
    className={cn(
      'flex items-center justify-between rounded-xl border px-4 py-3',
      day.isToday
        ? 'border-stone-400 bg-white'
        : 'border-stone-200 bg-white/60'
    )}
  >
    <div className="flex items-center gap-3">
      <span
        className={cn(
          'text-sm font-medium',
          day.isToday ? 'text-stone-800' : 'text-stone-500'
        )}
      >
        {day.label}
      </span>
      {day.isToday && (
        <span className="rounded-full bg-stone-800 px-2 py-0.5 text-[10px] font-medium text-white">
          today
        </span>
      )}
    </div>

    {day.logged ? (
      <span className="text-sm text-stone-600">{formatHours(day.hours)}h</span>
    ) : (
      <button
        type="button"
        onClick={onLog}
        className="min-h-[32px] rounded-lg border border-stone-300 px-3 text-xs font-medium text-stone-600 active:bg-stone-100"
      >
        + Log
      </button>
    )}
  </div>
)

export const HomePage = () => {
  const navigate = useNavigate()
  const { journeys, primaryJourney, isLoading: journeysLoading } = useJourneys()

  const activeJourney = primaryJourney ?? journeys[0] ?? null
  const commitment = activeJourney?.weekly_hours ?? 0

  const {
    investedHours,
    distinctActions,
    homeState,
    bonusHours,
    days,
    isLoading: weekLoading,
  } = useHomeWeekData(activeJourney?.id ?? null, commitment)

  if (journeysLoading) {
    return (
      <div className="px-6 py-8">
        <p className="text-sm text-stone-500">Loading…</p>
      </div>
    )
  }

  if (journeys.length === 0) {
    return <OnboardingPage />
  }

  if (weekLoading) {
    return (
      <div className="px-6 py-8">
        <p className="text-sm text-stone-500">Loading week…</p>
      </div>
    )
  }

  const percent = commitment > 0 ? (investedHours / commitment) * 100 : 0
  const todayFirst = [...days].sort((a, b) => {
    if (a.isToday) return -1
    if (b.isToday) return 1
    return 0
  })

  return (
    <div className="px-6 py-6">
      {/* Summary card */}
      <div className="mb-6 rounded-2xl border border-stone-200 bg-white p-6">
        <div className="relative mb-4 flex flex-col items-center">
          <ProgressRing percent={percent} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-stone-800">
              {formatHours(investedHours)}h
            </span>
            <span className="text-xs text-stone-500">
              of {formatHours(commitment)}h
            </span>
          </div>
        </div>

        {homeState === 'zero' && (
          <p className="text-center text-sm text-stone-500">
            Nothing logged this week yet
          </p>
        )}

        {homeState === 'progress' && (
          <p className="text-center text-sm text-stone-500">
            {formatHours(commitment - investedHours)}h remaining
          </p>
        )}

        {homeState === 'complete' && (
          <p className="text-center text-sm text-stone-600">
            Commitment met this week
          </p>
        )}

        {homeState === 'bonus' && (
          <p className="text-center text-sm text-stone-600">
            +{formatHours(bonusHours)}h beyond commitment
          </p>
        )}

        <div className="mt-4 flex justify-center gap-8">
          <div className="text-center">
            <p className="text-lg font-semibold text-stone-800">
              {formatHours(investedHours)}h
            </p>
            <p className="text-xs text-stone-500">invested this week</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-stone-800">
              {distinctActions}
            </p>
            <p className="text-xs text-stone-500">actions logged</p>
          </div>
        </div>
      </div>

      {/* This Week list */}
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-400">
        This week
      </h3>
      <div className="flex flex-col gap-2">
        {todayFirst.map((day) => (
          <DayCard
            key={day.date}
            day={day}
            onLog={() => navigate('/log')}
          />
        ))}
      </div>
    </div>
  )
}
