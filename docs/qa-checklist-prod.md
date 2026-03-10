# QA Checklist — Full App Experience (Production)

Use this checklist to verify the end-to-end experience on the **production** deployment. Run in a real browser (and optionally real device) against the live prod URL.

**Scope:** Grain v6 — action-based reflection, weekly alignment. Declare → Log → Review → Recalibrate.

---

## 1. Environment & Setup

- [ ] **Prod URL** loads (HTTPS, correct domain).
- [ ] **Auth config** points to prod Supabase (no localhost redirect URLs).
- [ ] Test on **Chrome** and **Safari** (mobile-first PWA).
- [ ] Test **portrait** and **landscape**; check safe area (notch/home indicator).
- [ ] **Clear site data** or use incognito for a clean “new user” run.

---

## 2. Unauthenticated Flows

### Welcome & Entry

- [ ] **`/`** (unauthenticated) redirects to **`/welcome`**.
- [ ] **`/welcome`** shows welcome screen (no header, no progress bar).
- [ ] **“Get started”** (or primary CTA) goes to **`/onboarding`**.
- [ ] **“Sign in”** goes to **`/login`** (with optional `from`/`resume` in state if applicable).

### Login

- [ ] **`/login`** shows email/password (and any OAuth options if configured).
- [ ] **Invalid credentials** show a clear, non-technical error.
- [ ] **Valid login** redirects to **`/`** or to `state.from` when present.
- [ ] **“Forgot password”** (if shown) goes to reset flow; link in email uses **prod** reset URL.
- [ ] **“Sign up”** link goes to **`/signup`**.

### Signup

- [ ] **`/signup`** allows new account creation.
- [ ] **Validation** (email format, password strength if enforced) works.
- [ ] **After signup** user is signed in and redirected to **`/`** (or onboarding if no journey).

### Reset Password

- [ ] **`/reset-password`** loads (e.g. from email link with token in hash/query).
- [ ] **New password** can be set; success redirects to login or home as designed.
- [ ] **Invalid/expired token** shows clear message and does not crash.

### Auth Callback

- [ ] **`/auth/callback`** with valid OAuth `code` exchanges and redirects to **`/`** or stored `from`.
- [ ] **`/auth/callback`** with hash tokens (e.g. magic link) sets session and redirects correctly.
- [ ] **OAuth error** in callback redirects to **`/login`** with error state.
- [ ] **Resume state** (e.g. `resume: 'summary'`) is restored when returning from auth (onboarding resume).

### 404 / Unknown Routes

- [ ] **Unknown path** (e.g. `/foo`) redirects to **`/welcome`** (unauthenticated) or appropriate default.

---

## 3. Onboarding (New User, No Journey)

- [ ] **`/onboarding`** is reachable from welcome (“Get started”) or from Journey “Start your journey”.
- [ ] **Authenticated user with no journey** can access onboarding; **authenticated user with journey** (no draft, no resume) is redirected to **`/`**.
- [ ] **Draft** is persisted in `localStorage`; back/refresh keeps progress.

### Steps 1–5 (Destination → Why → Actions → Commitment → Summary)

- [ ] **Step 1 — Destination:** Title input, back button, progress (e.g. 1/5), next.
- [ ] **Step 2 — Why:** Why input, back, progress 2/5, next.
- [ ] **Step 3 — Category + Actions:** Category selection, action chips, “Add action” drawer; custom action can be added; back, progress 3/5, next.
- [ ] **Step 4 — Commitment:** Weekly hours selection, back, progress 4/5, next.
- [ ] **Step 5 — Summary:** Summary of journey + actions + commitment; Edit links work; “Create account” or “Sign in” opens auth drawer if not yet signed in.

### Auth During Onboarding

- [ ] **No DB write** before user is authenticated (journey created only after auth).
- [ ] **Auth drawer** (sign up / sign in) works; after auth, user returns to summary (resume state) and can complete.

### Post-Setup (First Log + Success)

- [ ] **After “Create journey”** user sees **First Log** screen (e.g. “Log your first hour”).
- [ ] **First log** can be submitted; success state shows (e.g. checkmark, “Saved”).
- [ ] **Auto-redirect** to **`/`** (Home) after short delay.
- [ ] **Home** shows the new journey card and week section (empty or with first log).

### Draft & Resume

- [ ] **Refresh** on any step preserves draft; **back** preserves draft.
- [ ] **Return from login/signup** with `resume: 'summary'` lands on Summary step (step 5).

---

## 4. Authenticated Shell & Navigation

- [ ] **Bottom nav** shows **Home** and **Log** on relevant pages (hidden on Log page per design).
- [ ] **Home** tab goes to **`/`**; **Log** tab goes to **`/log`**.
- [ ] **Header** (when shown) has correct title per route; back button goes to previous page or home.
- [ ] **Review**, **Journey**, **Settings** are reachable (from header/menu if present); no broken links.
- [ ] **Max width** (~480px) centering on large screens; no horizontal scroll on mobile.

---

## 5. Home

- [ ] **No journey:** “No journey” card and clear CTA to start journey (e.g. “Start your journey” → `/onboarding`).
- [ ] **Loading:** Skeleton for journey card and week section; no flash of wrong state.
- [ ] **With journey:** Journey card shows destination, invested hours, commitment, status (aligned / drift / misaligned) and distinct actions/bonus if applicable.
- [ ] **Week section** shows “This week” and per-day cards (Mon–Sun); days with logs show correct data.
- [ ] **Tap a day** (if supported) goes to **`/log-details/:date`** for that date.
- [ ] **Status colors** only in data context (no streaks, no gamification language).

---

## 6. Log

- [ ] **No active journey:** Message “Set up your journey to start logging” and CTA to **`/onboarding`**.
- [ ] **With journey:** Log form shows **date** (today by default); **`?date=YYYY-MM-DD`** sets log date.
- [ ] **Journey picker:** If multiple journeys, dropdown shows and selects journey; selection persists for action list.
- [ ] **Action:** Chips for journey actions; one selectable; “Custom” opens “Add an action” drawer.
- [ ] **Custom action:** Can add new action; it appears in list and can be removed (with note that past entries are kept).
- [ ] **Duration:** Preset chips (e.g. 30m, 1h, …) and “Custom” drawer; custom hours (e.g. 1.5) apply correctly.
- [ ] **Note:** Optional text area; value is saved with log.
- [ ] **Save:** Disabled until action + duration selected; “Saving…” then success state; redirect to **`/`** after save.
- [ ] **Errors:** Network or validation errors show inline (e.g. below button), no uncaught crash.
- [ ] **Back** from Log returns to previous route (e.g. Home).

---

## 7. Log Details

- [ ] **`/log-details/:date`** loads for valid `YYYY-MM-DD`; invalid date handled (e.g. 404 or redirect).
- [ ] **Header** shows date and back; back goes to Home or referrer.
- [ ] **Entries** for that date listed (action, duration, note if any); empty state if no logs.
- [ ] **No edit/delete** in MVP (per “never overwrite”); UI matches (no edit controls if not implemented).

---

## 8. Review

- [ ] **No primary journey:** Message “Set up your journey to start logging” (or equivalent).
- [ ] **With journey:** “Review” headline and “How did this week go?”; **This week** section shows commitment hours, logged hours, difference, days without a log.
- [ ] **Data** matches current week (Mon–Sun) and primary journey; no stale or wrong week.
- [ ] **Loading** and **error** states shown (e.g. “Loading week…”, error alert).

---

## 9. Journey

- [ ] **No journey:** “You haven’t set up a journey yet” and “Start your journey” → **`/onboarding`**.
- [ ] **With journey:** (If edit/recalibration exists) plan and actions are visible; reduce commitment, reallocate, update actions, pause, etc. work as designed.
- [ ] **Copy:** No “support_definition”; no gamification or streak language.

---

## 10. Settings

- [ ] **Account:** Name, Email, Password rows open respective drawers.
- [ ] **Name drawer:** Current name shown; save updates and closes; value reflected in header/settings.
- [ ] **Email drawer:** Current email shown; change email flow (if implemented) works with prod.
- [ ] **Password drawer:** Change password flow works; success/error feedback.
- [ ] **Appearance:** Theme (Light / Dark / System) toggles; selection persists across reload.
- [ ] **Sign out:** Confirmation drawer; confirm signs out and redirects to **`/welcome`**.
- [ ] **Delete account:** Confirmation drawer; confirm deletes account (and optionally data), signs out, redirects to **`/welcome`**.

---

## 11. Session & Protection

- [ ] **Expired or invalid session:** Protected routes redirect to **`/welcome`** or **`/login`** (no infinite loop).
- [ ] **Sign out** clears session; **`/`** then redirects to **`/welcome`**.
- [ ] **Auth callback** with `from` (e.g. `/review`) lands user on **`/review`** after login, not always **`/`**.

---

## 12. Cross-Cutting

- [ ] **Theme:** Light/Dark/System applied everywhere (onboarding, app shell, modals); no mixed themes.
- [ ] **Loading:** Initial auth “Loading…” then correct route; no prolonged blank screen.
- [ ] **Errors:** API/network errors show user-friendly messages (no raw stack traces in UI).
- [ ] **Tone:** Short lines, second person, questions over commands; no exclamation marks or motivational/gamification copy.
- [ ] **Accessibility:** Focus order, aria-labels where needed; no keyboard traps.

---

## 13. Production-Only

- [ ] **Supabase** project is production (not staging); RLS and policies apply.
- [ ] **Email** (confirmation, password reset) uses prod templates and sender; links use prod domain.
- [ ] **OAuth** (if used) redirect URI is prod; no localhost in prod config.
- [ ] **CORS / security headers** allow prod origin only where required.
- [ ] **No console.log** or debug UI in production build (or acceptable per policy).

---

## Sign-Off

| Area              | Pass | Notes |
|-------------------|------|--------|
| Unauthenticated   |      |        |
| Onboarding        |      |        |
| Home              |      |        |
| Log               |      |        |
| Log Details       |      |        |
| Review            |      |        |
| Journey           |      |        |
| Settings          |      |        |
| Session / Auth    |      |        |
| Cross-cutting     |      |        |
| Production config |      |        |

**Date:** ___________  
**Tester:** ___________  
**Build / Version:** ___________
