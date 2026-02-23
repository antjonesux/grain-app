export interface OnboardingState {
  step: number
  title: string
  why: string
  categoryId: string
  actionTitles: string[]
  weeklyHours: number
}

export const ONBOARDING_STEPS = 6
export const DEFAULT_WEEKLY_HOURS = 5
export const WEEKLY_HOURS_MIN = 0.5
export const WEEKLY_HOURS_MAX = 20
export const TITLE_MAX = 60
export const WHY_MAX = 200
export const ACTION_TITLE_MAX = 80
