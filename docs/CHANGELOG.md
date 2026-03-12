# Changelog

Notable changes to Grain.

---

## [Unreleased]

(No unreleased changes.)

---

## 2025-03-12

### Changed

- **Log page**
  - Sticky header with back button, title, date, and Save Entry button so save is always visible while scrolling.
  - Layout and scroll structure updated (header vs scroll content) for clearer hierarchy.
- **Home**
  - HomeHeader: settings icon size 18→20; week row and settings button use `--text-secondary` instead of `--text-muted` for better contrast.
  - JourneyCard: Progress label and bonus/commitment typography 11px→13px; spacing tweaks (paddingBottom on progress section and commitment caption).
  - ProgressBar: aligned with updated spacing/typography.
- **Settings / Onboarding**
  - Minor style and copy consistency (text-secondary, typography).

---

## 2025-03-10

### Fixed

- **Reset password**
  - Handle OAuth hash `error` and `error_description` and show expired-link message instead of failing silently.
  - Use `window.location.origin` in `replaceState` when clearing URL after recovery so redirects work from any origin (e.g. custom domains).
  - If URL has no `code` and no tokens, check existing session so users who already recovered can still see the form.
  - Run auth state listener effect once (via ref) to avoid duplicate handlers and repeated session work.
  - Call `signOut()` before navigating to login after a successful reset so the next login is clean.

### Removed

- `docs/qa-checklist-prod.md` (replaced by this changelog and current process).
