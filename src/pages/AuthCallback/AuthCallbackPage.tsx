import { useEffect, useRef, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'
import { getOAuthError } from '@/lib/errorMessages'

const FROM_KEY = 'grain.auth.from'
const RESUME_KEY = 'grain.auth.resume'
const OAUTH_ERROR_MESSAGE = 'Google sign-in failed.'

function parseHashParams(hash: string): Record<string, string> {
  const params: Record<string, string> = {}
  if (!hash || hash.charAt(0) !== '#') return params
  const rest = hash.slice(1)
  rest.split('&').forEach((pair) => {
    const [key, value] = pair.split('=')
    if (key && value) params[key] = decodeURIComponent(value.replace(/\+/g, ' '))
  })
  return params
}

const loadingWrapStyle: CSSProperties = {
  minHeight: '100dvh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--bg)',
}

const loadingTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  color: 'var(--text-muted)',
  margin: 0,
}

export const AuthCallbackPage = () => {
  const navigate = useNavigate()
  const hasRunRef = useRef(false)

  useEffect(() => {
    if (hasRunRef.current) return
    hasRunRef.current = true

    const run = async () => {
      const { search, hash } = window.location
      const hashParams = parseHashParams(hash)
      if (hashParams.error) {
        navigate('/login', {
          replace: true,
          state: { error: getOAuthError(hashParams.error_description) ?? OAUTH_ERROR_MESSAGE },
        })
        return
      }

      const searchParams = new URLSearchParams(search)
      const code = searchParams.get('code')

      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          navigate('/login', { replace: true, state: { error: OAUTH_ERROR_MESSAGE } })
          return
        }
        if (data.session) {
          window.history.replaceState({}, document.title, '/auth/callback')
          const from = sessionStorage.getItem(FROM_KEY)
          const resumeRaw = sessionStorage.getItem(RESUME_KEY)
          sessionStorage.removeItem(FROM_KEY)
          sessionStorage.removeItem(RESUME_KEY)
          let resumeState
          try {
            resumeState = resumeRaw ? { resume: JSON.parse(resumeRaw) } : undefined
          } catch {
            resumeState = undefined
          }
          navigate(from ?? '/', { replace: true, state: resumeState })
          return
        }
      }

      const accessToken = hashParams.access_token
      const refreshToken = hashParams.refresh_token
      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        if (error) {
          navigate('/login', { replace: true, state: { error: OAUTH_ERROR_MESSAGE } })
          return
        }
        window.history.replaceState({}, document.title, '/auth/callback')
        const from = sessionStorage.getItem(FROM_KEY)
        const resumeRaw = sessionStorage.getItem(RESUME_KEY)
        sessionStorage.removeItem(FROM_KEY)
        sessionStorage.removeItem(RESUME_KEY)
        let resumeState
        try {
          resumeState = resumeRaw ? { resume: JSON.parse(resumeRaw) } : undefined
        } catch {
          resumeState = undefined
        }
        navigate(from ?? '/', { replace: true, state: resumeState })
        return
      }

      navigate('/login', { replace: true, state: { error: OAUTH_ERROR_MESSAGE } })
    }

    run()
  }, [navigate])

  return (
    <div style={loadingWrapStyle} aria-live="polite" aria-busy="true">
      <p style={loadingTextStyle}>Loading…</p>
    </div>
  )
}
