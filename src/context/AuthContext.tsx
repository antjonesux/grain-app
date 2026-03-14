import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { usePostHog } from '@posthog/react'
import { supabase } from '@/lib/supabaseClient'

interface AuthContextValue {
  session: Session | null
  user: User | null
  isLoading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, metadata?: Record<string, unknown>) => Promise<void>
  signOut: () => Promise<void>
  resendConfirmationEmail: (email: string) => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const posthog = usePostHog()
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const user = session?.user ?? null

  useEffect(() => {
    if (!posthog || !user) return
    posthog.identify(user.id, {
      email: user.email ?? undefined,
      first_name: (user.user_metadata?.first_name as string | undefined) ?? undefined,
    })
  }, [posthog, user])

  const clearError = useCallback(() => setError(null), [])

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (signInError) {
      setError(signInError.message)
      throw signInError
    }
  }, [])

  const signUp = useCallback(async (email: string, password: string, metadata?: Record<string, unknown>) => {
    setError(null)
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: metadata ? { data: metadata } : undefined,
    })
    if (signUpError) {
      setError(signUpError.message)
      throw signUpError
    }
  }, [])

  const signOut = useCallback(async () => {
    setError(null)
    await supabase.auth.signOut()
    posthog?.reset()
  }, [posthog])

  const resendConfirmationEmail = useCallback(async (email: string) => {
    setError(null)
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email,
    })
    if (resendError) {
      setError(resendError.message)
      throw resendError
    }
  }, [])

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession()
        setSession(initialSession)
      } catch {
        setSession(null)
      } finally {
        setIsLoading(false)
      }
    }
    getInitialSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      if (!isLoading) setError(null)
    })

    return () => subscription.unsubscribe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- isLoading intentionally omitted to avoid resubscribing

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      isLoading,
      error,
      signIn,
      signUp,
      signOut,
      resendConfirmationEmail,
      clearError,
    }),
    [session, user, isLoading, error, signIn, signUp, signOut, resendConfirmationEmail, clearError]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
