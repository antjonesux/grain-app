// src/lib/errorMessages.ts
// All user-facing errors route through this file. Never surface raw messages.

export function getAuthError(message: string): string {
  if (message.includes('Invalid login credentials')) return 'Email or password is incorrect. Try again.'
  if (message.includes('Email not confirmed')) return 'You need to confirm your email first. Check your inbox.'
  if (message.includes('rate limit') || message.includes('too many')) return 'Too many attempts. Try again in a few minutes.'
  return "We couldn't sign you in. Try again."
}

export function getSignUpError(message: string): string {
  if (message.includes('rate limit') || message.includes('too many')) return 'Too many attempts. Try again in a few minutes.'
  return "We couldn't create your account. Try again."
}

export function getOAuthError(description?: string): string {
  if (!description) return 'Sign-in failed. Try again or use email and password.'
  if (description.toLowerCase().includes('cancel')) return "Looks like you cancelled. Try again whenever you're ready."
  if (description.toLowerCase().includes('expired')) return 'This link has expired. Request a new one from the sign in page.'
  return 'Sign-in failed. Try again or use email and password.'
}

export const errors = {
  generic:            "Something went wrong. Try again.",
  saveName:           "We couldn't update your name. Try again.",
  saveEmail:          "We couldn't update your email. Try again.",
  savePassword:       "We couldn't update your password. Try again.",
  samePassword:       "Choose a different password from your current one.",
  resetLink:          "We couldn't send that link. Check your email or try again later.",
  resend:             "We couldn't send the email. Try again in a few minutes.",
  expiredLink:        "This link has expired. Request a new one from the sign in page.",
  loadJourney:        "We couldn't load your journey. Pull to refresh.",
  loadActions:        "We couldn't load your actions. Try again.",
  loadDay:            "We couldn't load this day. Try again.",
  loadWeek:           "We couldn't load your week. Pull to refresh.",
  loadCategories:     "We couldn't load options. Try again.",
  saveJourney:        "We couldn't save your journey. Try again.",
  saveAction:         "We couldn't add that action. Try again.",
  saveEntry:          "That didn't save. Give it another go.",
  deleteAccount:      "We couldn't complete that. Try again in a few minutes.",
  signOut:            "We couldn't sign you out. Try again.",
  noEmail:            `We don't have your email on file. Sign out, then use "Forgot password?" on the sign in page.`,
}
