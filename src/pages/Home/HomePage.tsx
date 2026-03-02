import type { CSSProperties } from 'react'
import { useActiveJourney, useHomeWeekData } from '@/hooks'
import { HomeHeader } from '@/components/home/HomeHeader'
import { JourneyCard } from '@/components/home/JourneyCard'
import { WeekSection } from '@/components/home/WeekSection'

export const HomePage = () => {
  const {
    activeJourney,
    hasJourney,
    isLoading: journeyLoading,
  } = useActiveJourney()

  const {
    investedHours,
    distinctActions,
    homeState,
    bonusHours,
    days,
    weekStart,
    weekEnd,
    isLoading: weekLoading,
  } = useHomeWeekData(
    activeJourney?.id ?? null,
    activeJourney?.weeklyCommitment ?? 0,
  )

  if (journeyLoading) {
    return (
      <div style={pageStyle}>
        <div style={loadingWrapStyle}>
          <p style={loadingTextStyle}>Loading…</p>
        </div>
      </div>
    )
  }

  return (
    <div style={pageStyle}>
      <HomeHeader weekStart={weekStart} weekEnd={weekEnd} />

      {!hasJourney ? (
        <JourneyCard
          state="no-journey"
          destination=""
          invested={0}
          commitment={0}
          distinctActions={0}
          bonusHours={0}
        />
      ) : weekLoading ? (
        <div style={loadingWrapStyle}>
          <p style={loadingTextStyle}>Loading week…</p>
        </div>
      ) : (
        <>
          <JourneyCard
            state={homeState}
            destination={activeJourney!.destination}
            invested={investedHours}
            commitment={activeJourney!.weeklyCommitment}
            distinctActions={distinctActions}
            bonusHours={bonusHours}
            createdAt={activeJourney!.createdAt}
          />
          <WeekSection days={days} />
        </>
      )}
    </div>
  )
}

const pageStyle: CSSProperties = {
  minHeight: '100%',
  backgroundColor: 'var(--grain-bg)',
}

const loadingWrapStyle: CSSProperties = {
  padding: '32px 24px',
}

const loadingTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-muted)',
  margin: 0,
}
