import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import { PostHogProvider } from '@posthog/react'
import './index.css'
import { App } from './App.tsx'

const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY
if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
  })
}

createRoot(document.getElementById('root')!).render(
  <PostHogProvider client={posthog}>
    <StrictMode>
      <App />
    </StrictMode>
  </PostHogProvider>,
)
