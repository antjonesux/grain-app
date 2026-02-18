import { useAuth } from '@/context/AuthContext'

export const HomePage = () => {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-[#faf9f7] px-4 py-8">
      <div className="mx-auto max-w-[480px]">
        <h1 className="text-xl font-medium text-stone-800 mb-2">Home</h1>
        <p className="text-stone-600 text-sm mb-4">
          You’re signed in as {user?.email ?? 'unknown'}.
        </p>
        <button
          type="button"
          onClick={() => signOut()}
          className="min-h-[44px] min-w-[44px] rounded-lg border border-stone-300 bg-white px-4 text-sm font-medium text-stone-700 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
