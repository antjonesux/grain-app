import { useJourneys } from '@/hooks'
import { OnboardingPage } from '@/pages/Onboarding/OnboardingPage'

export const HomePage = () => {
  const { journeys, isLoading } = useJourneys()

  if (isLoading) {
    return (
      <div className="px-4 py-6">
        <p className="text-stone-500 text-sm">Loading…</p>
      </div>
    )
  }

  if (journeys.length === 0) {
    return <OnboardingPage />
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-medium text-stone-800">Home</h2>
    </div>
  )
}
