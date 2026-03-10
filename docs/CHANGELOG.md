# Changelog

All notable changes to Grain are documented here.

---

## 2025-03-09

### Added

- **Production QA checklist** — `docs/qa-checklist-prod.md`: full app experience checklist for production (environment, unauthenticated flows, onboarding, logging, review, journey, settings, PWA).
- **ScrollToTop** — `src/components/Layout/ScrollToTop.tsx`: scrolls window to top on route change (used in `App.tsx`).

### Changed

- **Auth flows** — Updates to Login, Signup, Forgot Password, Reset Password, and Auth Callback pages and copy/UX.
- **Settings drawers** — Email, Name, and Password drawers updated for consistency and UX.
- **Onboarding** — `TextInput` component and `App.tsx` adjustments.

### Removed

- **UX copy audit docs** — `docs/ux-copy-audit.md` and `docs/ux-copy-audit-report.md` removed (superseded or obsolete).
