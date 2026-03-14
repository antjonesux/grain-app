import type { CSSProperties } from 'react'
import { useEffect } from 'react'
import { usePostHog } from '@posthog/react'
import { useActiveJourney, useHomeWeekData } from '@/hooks'
import { HomeHeader } from '@/components/home/HomeHeader'
import { JourneyCard } from '@/components/home/JourneyCard'
import { WeekSection } from '@/components/home/WeekSection'
import { JourneyCardSkeleton } from '@/components/skeleton/JourneyCardSkeleton'
import { DayCardSkeleton } from '@/components/skeleton/DayCardSkeleton'

export const HomePage = () => {
  const posthog = usePostHog()

  useEffect(() => {
    posthog?.capture('home_viewed')
  }, [posthog])

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
        <HomeHeader weekStart={weekStart} weekEnd={weekEnd} />
        <div style={cardWrapStyle}>
          <JourneyCardSkeleton />
        </div>
        <div style={weekSkeletonSectionStyle}>
          <h3 style={weekSkeletonTitleStyle}>This week</h3>
          <div style={weekSkeletonListStyle}>
            {Array.from({ length: 7 }, (_, i) => (
              <DayCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={pageStyle}>
      <HomeHeader weekStart={weekStart} weekEnd={weekEnd} />

      {!hasJourney ? (
        <div style={cardWrapStyle}>
          <JourneyCard
            state="no-journey"
            destination=""
            invested={0}
            commitment={0}
            distinctActions={0}
            bonusHours={0}
          />
        </div>
      ) : weekLoading ? (
        <>
          <div style={cardWrapStyle}>
            <JourneyCardSkeleton />
          </div>
          <div style={weekSkeletonSectionStyle}>
            <h3 style={weekSkeletonTitleStyle}>This week</h3>
            <div style={weekSkeletonListStyle}>
              {Array.from({ length: 7 }, (_, i) => (
                <DayCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={cardWrapStyle}>
            <JourneyCard
              state={homeState}
              destination={activeJourney!.destination}
              invested={investedHours}
              commitment={activeJourney!.weeklyCommitment}
              distinctActions={distinctActions}
              bonusHours={bonusHours}
              createdAt={activeJourney!.createdAt}
            />
          </div>
          <WeekSection days={days} />
        </>
      )}
    </div>
  )
}

const cardWrapStyle: CSSProperties = {
  paddingLeft: 24,
  paddingRight: 24,
}

const pageStyle: CSSProperties = {
  minHeight: '100%',
  backgroundColor: 'var(--grain-bg)',
}

const weekSkeletonSectionStyle: CSSProperties = {
  padding: '24px 24px 32px',
}

const weekSkeletonTitleStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: 'var(--grain-h2)',
  fontWeight: 600,
  lineHeight: '12px',
  color: 'var(--text-primary)',
  margin: 0,
  marginBottom: 16,
}

const weekSkeletonListStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}
