import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/utils'

export const SettingsPage = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignOut = async () => {
    setError(null)
    setIsSigningOut(true)
    try {
      await signOut()
      navigate('/login', { replace: true })
    } catch (err) {
      setError('Something went wrong while signing out. Please try again.')
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center px-4 py-6 bg-[#faf9f7]">
      <div className="w-full max-w-[480px]">
        <div className="rounded-2xl border border-stone-200 bg-white px-4 py-5 shadow-sm">
          <h1 className="text-lg font-medium text-stone-900 mb-3">Settings</h1>
          <p className="text-sm text-stone-600 mb-4">
            Signed in as{' '}
            <span className="font-medium text-stone-800">
              {user?.email ?? 'Unknown'}
            </span>
          </p>

          {error && (
            <div
              className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className={cn(
              'w-full min-h-[44px] rounded-lg text-sm font-medium text-white',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500',
              isSigningOut ? 'bg-stone-400 cursor-not-allowed' : 'bg-stone-800 hover:bg-stone-900'
            )}
          >
            {isSigningOut ? 'Logging out…' : 'Log out'}
          </button>
        </div>
      </div>
    </div>
  )
}

