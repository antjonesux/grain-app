import { useNavigate } from 'react-router-dom'

export const JourneyPage = () => {
  const navigate = useNavigate()
  return (
  <div className="px-4 py-6">
    <h2 className="text-xl font-medium text-stone-800 mb-2">Journey</h2>
    <p className="text-stone-600 text-sm mb-4">Your plan and actions live here.</p>
    <p className="text-stone-600 text-sm">You haven't set up a journey yet.</p>
    <button type="button" className="mt-4 text-[var(--accent)] font-medium" onClick={() => navigate('/onboarding')}>Start your journey</button>
  </div>
  )
}
