/** Canonical password rule: matches Settings password drawer. */
export const PASSWORD_MIN_LENGTH = 6

export function meetsMinLength(password: string): boolean {
  return password.length >= PASSWORD_MIN_LENGTH
}

export const PASSWORD_HINT = 'At least 6 characters'
