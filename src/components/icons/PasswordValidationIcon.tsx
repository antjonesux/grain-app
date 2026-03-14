/** Circle with check: password meets requirements. Circle with X: does not. */

export const PasswordCheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="var(--status-aligned)" strokeWidth="1.2" fill="none" />
    <path d="M5 8l2.5 2.5L11 6" stroke="var(--status-aligned)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const PasswordErrorCircle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="var(--status-misaligned)" strokeWidth="1.2" fill="none" />
    <path d="M5 5l6 6M11 5l-6 6" stroke="var(--status-misaligned)" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

/** For hint text: shows check when requirement met, X when not. */
export function PasswordHintCircle({ met }: { met: boolean }) {
  return met ? <PasswordCheckCircle /> : <PasswordErrorCircle />
}
