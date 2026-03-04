/*
 * Theme utilities. Applied via <html data-theme="dark|light">.
 *
 * QA:
 * - With empty localStorage: html[data-theme] becomes "dark"
 * - Switching chips in Settings updates theme instantly
 * - System mode tracks OS prefers-color-scheme changes
 * - Refresh persists selection (localStorage grain.themeMode)
 */
export type ThemeMode = 'dark' | 'light' | 'system'

export const THEME_STORAGE_KEY = 'grain.themeMode'

const THEME_MODES: ThemeMode[] = ['dark', 'light', 'system']

export function isThemeMode(value: unknown): value is ThemeMode {
  return typeof value === 'string' && THEME_MODES.includes(value as ThemeMode)
}

export function getSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function resolveTheme(mode: ThemeMode): 'dark' | 'light' {
  if (mode === 'system') return getSystemTheme()
  return mode
}

export function applyTheme(theme: 'dark' | 'light'): void {
  document.documentElement.setAttribute('data-theme', theme)
}
