# UX Copy Audit — Grain

**Scope:** All user-facing copy across the app.  
**Focus:** Clarity, consistency, tone, trust, actionability, brevity, and UX quality.  
**No code changes** — audit and recommendations only.

---

## 1. Overall observations

### Current voice/tone

- **Strengths:** Much of the app already feels calm and direct. Welcome (“Your time tells the truth.”), onboarding (“Be honest — not ambitious.”), and empty states (“Start something worth investing in.”) align with Grain’s intentional, non-judgmental stance. Second person is used consistently. Questions appear where appropriate (“What are you working toward?”).
- **Gaps:** Some screens (Review, Journey) are bare; a few strings lean generic (“Something went wrong”) or technical (raw Supabase messages). Terminology mixes “journey,” “entry,” “log,” “action,” and “commitment” in ways that could be tightened.

### Major consistency issues

- **Sign in / Sign In:** Inconsistent casing (e.g. “Sign in” vs “Sign In” on buttons).
- **Log vs entry:** “Log,” “entry,” “log entry,” and “Add Log” used in overlapping contexts (Log page, Log Details, First Log, empty states).
- **Home vs This week:** AppShell/PageHeader use “Home”; HomePage content uses “This week.” SuccessScreen says “Go to Home” while the destination is “This week.”
- **Saved / Sent / Success:** Button states use “Saved,” “Sent,” “Saving…,” “Sending…” without a single pattern for success feedback (e.g. some use checkmark + label, others just label).

### Biggest trust/confusion risks

1. **Raw provider errors:** AuthContext and Supabase flows surface `error.message` directly. Users can see technical or vague messages (e.g. “Invalid login credentials,” “Email rate limit exceeded”).
2. **Invalid/expired links:** Reset-password and auth-callback errors can be cryptic without a clear “what to do next.”
3. **Delete account:** Fallback “Something went wrong. Try again.” plus possible backend messages can feel abrupt for a destructive action.
4. **OAuth:** “Google sign-in failed.” is used for all OAuth failures (including Apple if added), and doesn’t distinguish user cancellation from real errors.

---

## 2. Terminology audit

| Term | Where it appears | Problem | Recommendation |
|------|------------------|---------|----------------|
| **Journey** | Onboarding, Home (JourneyCard “YOUR JOURNEY”), Journey page, nav “Journey,” “Save your journey,” “Set up your journey to start logging,” “Begin My Journey” (Log + JourneyCard) | Overloaded: both the plan (destination + actions + commitment) and the nav/screen name. “Begin My Journey” can feel like marketing. | Keep “journey” for the plan. Consider “Plan” or “Direction” for nav/screen if you want to separate. Standardize one CTA: e.g. “Set up your plan” or “Start your journey” (no “My”). |
| **Destination** | Onboarding Destination screen, Summary “DESTINATION,” JourneyCard shows destination text | Clear. | No change. |
| **Why** | Onboarding Why screen, Summary (not shown), data model `why` | “Why” is used only in onboarding; not visible in Summary. | Optional: add “Why” to Summary or leave as internal; ensure “why” isn’t exposed in UI unless intended. |
| **Actions** | Onboarding Actions, Log “ACTION,” JourneyCard “Actions Logged,” DayCard “X actions logged,” Log Details “Actions Logged” | “Actions” = things you do; “Actions Logged” = count of distinct actions used in logs. Slightly different meanings. | Keep “Actions” for the list. Prefer “Actions logged” (or “Actions used”) when it’s a count to avoid “logged” sounding like “recorded.” |
| **Time invested** | JourneyCard “Time Invested,” DayCard “Xh invested,” LogDetails “Time Invested” | Consistent and on-brand. | No change. |
| **Actions logged** | JourneyCard, DayCard “X actions logged,” Log Details “Actions Logged” | “Logged” can mean “recorded” or “count of actions you logged.” | Use “Actions logged” (two words) consistently; consider “Actions used this week” for Home to clarify it’s a count. |
| **Log** | Nav “Log,” Log page “Log your time,” “Add Log,” “Add log” (inconsistent), “Make your first entry,” Log Details “Activity Log,” “No log entries” | “Log” is both verb and noun. “Add Log” vs “Add log” casing. “Log” vs “entry” vs “log entry” mixed. | Use “Log” (noun) for the screen and “log” (verb) in CTAs. Unify: “Add log” or “Log time.” Prefer “entry” or “log entry” in one way (e.g. “No entries yet” vs “No log entries”). |
| **Entry** | FirstLog “Make your first entry,” “Save Entry,” LogDetails “No log entries exist yet,” createLogEntry | “Entry” and “log entry” both used. | Standardize on “entry” for one logged session (one action + duration + optional note). Use “log entry” only where you need to distinguish from other “entries.” |
| **Review** | Nav “Review,” Review page “Review,” “This week” | Clear. | No change. |
| **Commitment** | Onboarding Commitment screen, Summary “WEEKLY COMMITMENT,” JourneyCard “Commitment: Xh,” Review “Commitment: Xh” | Clear. | No change. |
| **Bonus** | JourneyCard “+Xh bonus,” “Weekly commitment crushed!,” “You've logged X bonus hours” | “Crushed” and “bonus” can feel gamified. Core rules say no gamification. | Softer language: e.g. “Over your commitment” instead of “bonus,” “You met your commitment” or “You went past your commitment” instead of “crushed.” |
| **Saved / Sent** | NameDrawer, EmailDrawer, PasswordDrawer, ForgotPassword, Log page, Summary: “Saved,” “Sent,” “Saving…,” “Sending…” | All reasonable. | Ensure loading states use ellipsis consistently (“Saving…” not “Saving”). |
| **Sign in / Sign out** | Login “Sign In” (button), Welcome “Sign in” (link), SignOutDrawer “Sign out?”, “Sign out”; Settings “Sign Out” (button) | Inconsistent casing. | Use “Sign in” and “Sign out” for buttons (sentence case) everywhere. |

---

## 3. Screen-by-screen audit

### Welcome

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Grain" | Wordmark | — | — |
| "Your time tells the truth." | Headline | Strong. | — |
| "See if your week reflects what you say matters most." | Tagline | Clear. | — |
| "Get started" | CTA | Clear. | — |
| "Already have an account? Sign in" | Link | “Sign in” lowercase; link only. | Match casing to rest of app (e.g. “Sign in”). |

**File:** `src/pages/Onboarding/WelcomeScreen.tsx`

---

### Login

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Sign in" | Heading | — | — |
| "Email address" / "Password" | Placeholders | — | — |
| "Sign In" | Button | Inconsistent with “Sign in” elsewhere. | Use “Sign in.” |
| "Signing In…" | Loading | — | — |
| "Forgot Password?" | Link | Question mark can feel urgent. | Consider “Forgot password?” (sentence case) or “Reset password.” |
| "Don't have an account? Sign Up" | Link | “Sign Up” title case. | Use “Sign up.” |
| "or" | Divider | — | — |
| "Continue with Google" | OAuth | — | — |
| `{error}` | Banner | Raw AuthContext/Supabase message. | Add error translation layer (see Error audit). |

**File:** `src/pages/Auth/LoginPage.tsx`

---

### Signup

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Create an account" | Heading | — | — |
| "Enter your email and choose a password." | Subhead | — | — |
| "Email" / "Password" / "Confirm password" | Labels | — | — |
| "you@example.com", "At least 6 characters", "Confirm password" | Placeholders | PASSWORD_HINT is good. | — |
| "Sign up" / "Creating account…" | Button | — | — |
| "Email is required" / "Please enter a valid email" | Validation | Clear. | — |
| "Passwords do not match" | Validation | Clear. | — |
| "Already have an account? Sign in" | Link | — | — |
| `{error}` | Banner | Raw Supabase/auth message. | Translate (see Error audit). |

**File:** `src/pages/Auth/SignupPage.tsx`

---

### Forgot password drawer

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Forgot password?" | Title | — | — |
| "Enter your email and we'll send you a link to reset your password." | Subtitle | Clear. | — |
| "Email address" | Placeholder | — | — |
| "Send reset link" / "Sending…" / "Sent" | Button | — | — |
| "We sent a reset link to {email}" | Confirmation title | Clear. | — |
| "Check your email to reset your password. Then sign in with your new password." | Subtitle | Clear, actionable. | — |
| "Resend reset link" / "Sending…" / "Sent" | Resend | — | — |
| `{error}` | Message | Raw Supabase message. | Translate. |

**File:** `src/pages/Auth/ForgotPasswordDrawer.tsx`

---

### Reset password page

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Set a new password" | Heading | — | — |
| "Loading…" | Loading | — | — |
| "Choose a strong password you'll remember." | Subtext | Good. | — |
| "New password" / "Confirm password" | Placeholders | — | — |
| "Save password" / "Saving…" | Button | — | — |
| "Invalid or expired link." | Code (establishRecoverySession) | Shown as errorMessage. Technical. | User-facing: “This link is invalid or has expired. Request a new one from the sign in page.” |
| "This link may be invalid or expired. Request a new one from the sign in page." | Error state subtext | Good, actionable. | — |
| "Back to Login" | Button | “Login” as noun. | Prefer “Back to sign in.” |
| `{errorMessage}` / `{submitError}` | Display | Can be raw Supabase. | Translate. |

**File:** `src/pages/ResetPassword/ResetPasswordPage.tsx`

---

### Auth callback

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Loading…" | Only visible copy | — | — |
| Redirect state `error`: `hashParams.error_description \|\| 'Google sign-in failed.'` | Login redirect | Shown on Login page. Generic; also used for non-Google if Apple added. | Use “Sign-in failed. Try again or use email and password.” Or map provider. |
| "Google sign-in failed." | Fallback in code | Same for all OAuth failures. | As above. |

**File:** `src/pages/AuthCallback/AuthCallbackPage.tsx`

---

### Onboarding — Destination, Why, Actions, Commitment, Summary

(See existing `docs/ux-copy-audit.md` for full inventory.)

**Summary-specific:**

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Here's your plan." / "Here's what you're about to commit to." | Summary | — | — |
| "Save my progress" | CTA | — | — |
| "Save your journey." / "Create an account so your setup is waiting each week." | Drawer | — | — |
| "Please fill out all fields." | Validation | Clear. | — |
| "Something went wrong" | Auth fallback | Vague. | Replace with “We couldn’t create your account. Try again.” |
| "Failed to save journey" | Save fallback | Clear but technical. | “We couldn’t save your plan. Try again.” |
| "Creating..." | Button | Inconsistent ellipsis (three dots). | Use “Creating…” (single ellipsis character). |
| "Confirm email" | Button (pending) | — | — |
| "We sent a confirmation link to {email}" | Drawer title | — | — |
| "Check your email to confirm your account. Then sign in to finish saving your journey." | Subtitle | “journey” in Settings flow might be confusing; this is onboarding-only. | OK here. |
| "Confirmation email sent. Check your inbox and spam." | Resend success | — | — |
| "Didn't get it? Resend" / "Resend in {n}s" | Resend | — | — |

**File:** `src/pages/Onboarding/SummaryScreen.tsx`

---

### Onboarding — First Log, Success

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Welcome, {name}." / "Welcome." | First Log heading | — | — |
| "Your journey is set. Let's see where your time goes." | Subtext | — | — |
| "Make your first entry" / "What did you work on today?" | Card | — | — |
| "Save Entry" / "I'll log later" | Buttons | — | — |
| "You're in." | Success heading | — | — |
| "Week one starts now. Come back tomorrow and keep it going." | Success subtext | — | — |
| "Go to Home" | Success CTA | Home content is “This week”; nav says “Home.” | Use “Go to This week” or “See your week” so it matches destination. |

**Files:** `src/pages/Onboarding/FirstLogScreen.tsx`, `SuccessScreen.tsx`

---

### Home

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Welcome, {firstName}!" | HomeHeader | — | — |
| "This Week" | WeekSection title | Matches “This week” concept. | — |
| "+ Add Log" | WeekSection button | — | — |
| "No active journey" | JourneyCard (empty) | — | — |
| "Start something worth investing in." | JourneyCard sub | Good. | — |
| "Begin My Journey" | JourneyCard CTA | “My” + “Journey” can feel marketing. | Consider “Set up your plan” or “Start your journey.” |
| "YOUR JOURNEY" | JourneyCard label | — | — |
| "🔥 X days active" | Pill | Emoji + “active” could imply streaks. | Softer: “Day X” or “X days” without “active” if you want to avoid streak tone. |
| "Time Invested" / "Actions Logged" | Metrics | — | — |
| "Progress" / "Commitment: Xh" | Progress | — | — |
| "+Xh bonus" | Bonus label | “Bonus” can feel gamified. | See Terminology table. |
| "Weekly commitment crushed!" / "Weekly commitment complete!" | Trophy | “Crushed” is gamified. | Softer: “You met your commitment” / “You passed your commitment.” |
| "You've logged X bonus hours beyond your commitment." | Trophy body | Same. | “You logged X more hours than your commitment.” |
| "You hit your Xh goal." | Trophy body | “Goal” used once; rest is “commitment.” | Prefer “commitment” for consistency. |
| "Nothing invested yet" | DayCard empty | Good. | — |
| "Xh invested" / "X actions logged" | DayCard pills | — | — |

**Files:** `src/pages/Home/HomePage.tsx`, `src/components/home/HomeHeader.tsx`, `JourneyCard.tsx`, `WeekSection.tsx`, `DayCard.tsx`

---

### Log (Log your time)

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Log your time" | Page title | — | — |
| "No active journey" | No-journey state | — | — |
| "Start something worth investing in so you can log your progress along the way." | Body | Slightly long. | Shorten to “Set up your plan to start logging.” |
| "Begin My Journey" | CTA | Same as Home. | Align with one CTA. |
| "ACTION" / "DURATION" / "NOTE (OPTIONAL)" | Section labels | — | — |
| "Custom" | Chips | — | — |
| "Custom actions can be removed. Past entries are kept." | Helper | Clear. | — |
| "Add a reflective note" | Note placeholder | Differs from onboarding “Reflect on it.” | Choose one: “Reflect on it” or “Add a reflective note.” |
| "Add an action" / "Actions help you get closer to your north star." | Drawer | — | — |
| "Ex: Run 2 miles" | Placeholder | — | — |
| "Custom duration" / "Enter hours (e.g. 1.5)." | Drawer | — | — |
| "Set duration" | Button | — | — |
| "Save" / "Saving…" / "Saved" | Submit | — | — |
| "Failed to create action." / "Failed to add action." / "Failed to save entry." | Errors | Technical. | “We couldn’t add that action.” / “We couldn’t save this entry. Try again.” |

**File:** `src/pages/Log/LogPage.tsx`

---

### Log Details

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| Title = date label (e.g. "Sun 3/2") | Header | — | — |
| "Time Invested" / "Actions Logged" | Metric row | — | — |
| "Activity Log" | Section heading | “Log” as noun. | OK; consider “Entries” if you want to avoid “log” overload. |
| "+ Add Log" | Button | — | — |
| "No log entries exist yet." | Empty | Slightly formal. | “No entries yet.” or “Nothing logged for this day.” |
| `{error}` | Message | From useLogDetailsForDate (Supabase or “Failed to load log details”). | Translate. |

**File:** `src/pages/LogDetails/LogDetailsPage.tsx`

---

### Review

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Review" | Heading | — | — |
| "This week" | Subheading | — | — |
| "Commitment: Xh · Actual: Xh · Delta: +Xh" | Summary | “Delta” is technical. | “Commitment: Xh · Logged: Xh · Difference: +Xh” or “Commitment: Xh · Actual: Xh · Difference: +Xh.” |
| "Days without a log: X" | Summary | Clear. | Optional: “Days with no entries: X.” |
| "Loading…" / "Loading week…" | Loading | — | — |
| "Set up your journey to start logging." | Empty | Matches Log. | — |
| `{error}` | Display | From useWeeklySummary. | Translate. |

**File:** `src/pages/Review/ReviewPage.tsx`

---

### Journey

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Journey" | Only heading | Screen is placeholder. | When building: add subtext or empty state that explains “Your plan and actions live here.” |

**File:** `src/pages/Journey/JourneyPage.tsx`

---

### Settings

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Settings" | Title | — | — |
| "Account" | Section label | — | — |
| "Name" / "Email address" / "Password" | Row labels | — | — |
| "Theme" / "Dark" / "Light" / "System" | Appearance | — | — |
| "Sign Out" | Button | Casing. | “Sign out.” |
| "Delete Account" | Button | — | — |
| No sign-out error in UI | — | signOut() in AuthContext doesn’t set error; Settings doesn’t show one. | If you add sign-out error handling, use friendly message: “We couldn’t sign you out. Try again.” |

**File:** `src/pages/Settings/SettingsPage.tsx`

---

### Name drawer

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Your name" | Title | — | — |
| "This is how you'll appear across your goals and activity." | Subtitle | “goals” used once; app uses “commitment/destination.” | “This is how you’ll appear in the app.” or keep and standardize “goals” elsewhere if intended. |
| "Save" / "Saving…" / "Saved" | Button | — | — |
| `{error}` | Message | Raw Supabase updateUser. | Translate. |

**File:** `src/pages/Settings/NameDrawer.tsx`

---

### Email drawer

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Email address" | Title | — | — |
| "A confirmation link will be sent before your email changes." | Subtitle | — | — |
| "Current" / "Update" | Section labels | — | — |
| "New email address" / "Confirm new email" | Placeholders | — | — |
| "We sent a confirmation link to {email}" | Confirmation | Same as onboarding. | In Settings context, subtitle says “Then sign in to finish saving your journey.” — “journey” is odd here. | Use “Check your email to confirm. Then sign in again.” |
| "Resend email confirmation" | Button | — | — |
| `{error}` | Message | Raw Supabase. | Translate. |

**File:** `src/pages/Settings/EmailDrawer.tsx`

---

### Password drawer

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Password" | Title | — | — |
| "Keep your account secure with a strong, unique password." | Subtitle | — | — |
| "Current" / "Update" | Section labels | — | — |
| "New password" / "Confirm new password" | Placeholders | — | — |
| "Forgot password?" | Link | — | — |
| "Could not find your email. Sign out and use Forgot password on the sign in page." | Forgot flow message | Clear but long. | “We don’t have your email. Sign out, then use “Forgot password?” on the sign in page.” |
| "Check your email for a link to reset your password." | Success | — | — |
| `{error}` | Message | Raw Supabase. | Translate. |

**File:** `src/pages/Settings/PasswordDrawer.tsx`

---

### Appearance drawer

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Appearance" | Title | — | — |
| "Choose how the app looks on this device." | Subtitle | — | — |
| "Theme" / "Dark" / "Light" / "System" | Options | — | — |

**File:** `src/pages/Settings/AppearanceDrawer.tsx`

---

### Sign out drawer

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Sign out?" | Title | — | — |
| "You'll need to sign in again to access your progress." | Subtitle | Clear. | — |
| "Sign out" / "Cancel" | Buttons | — | — |

**File:** `src/pages/Settings/SignOutDrawer.tsx`

---

### Delete account drawer

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Delete your account?" | Title | — | — |
| "This action cannot be undone. All your progress will be permanently removed." | Subtitle | Clear, serious. | — |
| "Delete account" / "Deleting…" / "Cancel" | Buttons | — | — |
| "Something went wrong. Try again." | Fallback error | Vague. | “We couldn’t complete this. Try again in a few minutes.” |
| `{error}` from backend | Display | Can be raw API/function message. | Prefer user-facing message; only show backend message if safe and helpful. |

**File:** `src/pages/Settings/DeleteAccountDrawer.tsx`

---

### Bottom nav & AppShell

| Copy | Location | Issues | Recommendations |
|------|----------|--------|-----------------|
| "Home" / "Log" / "Review" / "Journey" | BottomNav labels | “Home” vs in-app “This week.” | Consider “This week” for first tab or keep “Home” and align Success CTA to “Go to Home.” |
| PATH_TITLES: "/" → "Home", "/log" → "Log", etc. | AppShell | Header shows “Home” when content says “This week.” | Either use “This week” for "/" in PATH_TITLES or accept “Home” and make Success “Go to Home.” |

**Files:** `src/components/Layout/BottomNav.tsx`, `AppShell.tsx`

---

## 4. Error message audit

### Source of errors

- **AuthContext:** `setError(signInError.message)` etc. — Supabase auth errors shown as-is.
- **Supabase:** `error.message` from signIn, signUp, updateUser, resetPasswordForEmail, resend, exchangeCodeForSession, setSession, and from table/function errors.
- **Hooks:** useJourneys, useActionsForJourney, useActionLogs, useLogDetailsForDate, useHomeWeekData, useCreateJourneyWithActions, useJourneyCategories — all surface `fetchError.message` or a fallback string.
- **createLogEntry:** Returns `parentErr?.message ?? 'Failed to create log entry.'` and `childErr.message`.
- **AuthCallbackPage:** `hashParams.error_description || 'Google sign-in failed.'` and hardcoded `'Google sign-in failed.'`.

### Recommended translation layer

Introduce a small **error map** (e.g. `src/lib/errorMessages.ts` or in AuthContext):

- Map known Supabase/auth codes or substrings to short, actionable user messages.
- Default for unknown: “Something went wrong. Please try again.” (or per flow: “We couldn’t sign you in. Try again.” etc.)
- Never expose raw RLS/database messages or stack traces.

### Error-by-error table

| Current text / source | Where shown | Issue | Recommended replacement | Action clear? |
|-----------------------|-------------|--------|-------------------------|----------------|
| Supabase `signInError.message` (e.g. "Invalid login credentials") | LoginPage | Technical. | “Email or password is incorrect. Try again.” | Yes |
| Supabase `signUpError.message` | SignupPage, SummaryScreen drawer | Can be technical or rate limit. | Map: invalid → “Please check your email and password.”; rate limit → “Too many attempts. Try again in a few minutes.”; default → “We couldn’t create your account. Try again.” | Yes |
| Supabase `updateError.message` (name) | NameDrawer | Technical. | “We couldn’t update your name. Try again.” | Yes |
| Supabase `updateError.message` (email) | EmailDrawer | Technical. | “We couldn’t update your email. Try again.” | Yes |
| Supabase `updateError.message` (password) | PasswordDrawer, ResetPasswordPage | Can be “same as current” etc. | “Choose a different password.” or “We couldn’t update your password. Try again.” | Yes |
| Supabase `resetError.message` (forgot password) | ForgotPasswordDrawer | Technical. | “We couldn’t send a reset link. Check your email or try again later.” | Yes |
| Supabase `resendError.message` | ForgotPasswordDrawer (resend), EmailDrawer (resend), SummaryScreen (resend) | Technical. | “We couldn’t send the email. Try again in a few minutes.” | Yes |
| "Invalid or expired link." | ResetPasswordPage (establishRecoverySession) | Technical. | “This link is invalid or has expired. Request a new one from the sign in page.” | Yes |
| "This link may be invalid or expired. Request a new one from the sign in page." | ResetPasswordPage error state | Good. | Keep. | Yes |
| "Google sign-in failed." | AuthCallbackPage → Login state | Generic; used for all OAuth. | “Sign-in failed. Try again or use email and password.” | Yes |
| hashParams.error_description | AuthCallbackPage → Login | Can be provider-specific. | Run through same map; fallback as above. | Yes |
| "Please fill out all fields." | SummaryScreen | Clear. | Keep. | Yes |
| "Something went wrong" | SummaryScreen (auth catch) | Vague. | “We couldn’t create your account. Try again.” | Yes |
| "Failed to save journey" | SummaryScreen (save catch) | Slightly technical. | “We couldn’t save your plan. Try again.” | Yes |
| "You must be signed in to create a journey." | useCreateJourneyWithActions | Shown as saveError. | “Sign in to save your plan.” | Yes |
| "Failed to create journey." / journeyError.message | Same hook | Technical. | “We couldn’t save your plan. Try again.” | Yes |
| "Failed to create action." / actionError.message | Same hook | Technical. | “We couldn’t add that action. Try again.” | Yes |
| jaError.message | Same hook | Technical. | “We couldn’t save your plan. Try again.” | Yes |
| "Failed to create log entry." / parentErr.message | createLogEntry → LogPage | Technical. | “We couldn’t save this entry. Try again.” | Yes |
| childErr.message | createLogEntry | Often RLS/DB. | “We couldn’t save this entry. Try again.” | Yes |
| "At least one action item is required." | createLogEntry | Shown rarely (validation). | Keep or “Select an action and duration.” | Yes |
| "Failed to create action." / createErr.message | LogPage (custom action) | Technical. | “We couldn’t add that action. Try again.” | Yes |
| jaErr.message | LogPage | Technical. | Same as above. | Yes |
| "Failed to add action." | LogPage catch | — | “We couldn’t add that action. Try again.” | Yes |
| "Failed to save entry." | LogPage catch | — | “We couldn’t save this entry. Try again.” | Yes |
| fetchError.message (journeys) | useJourneys | Technical. | “We couldn’t load your plan. Pull to refresh.” | Yes |
| "Failed to load journeys" | useJourneys catch | — | Same. | Yes |
| fetchError.message (actions) | useActionsForJourney | Technical. | “We couldn’t load actions. Try again.” | Yes |
| "Failed to load actions" | useActionsForJourney catch | — | Same. | Yes |
| fetchError.message (log details) | useLogDetailsForDate | Technical. | “We couldn’t load this day. Try again.” | Yes |
| "Failed to load log details" | useLogDetailsForDate catch | — | Same. | Yes |
| fetchError.message (home week) | useHomeWeekData | Technical. | “We couldn’t load your week. Pull to refresh.” | Yes |
| "Failed to load week data" | useHomeWeekData catch | — | Same. | Yes |
| fetchError.message (categories) | useJourneyCategories | Onboarding. | “We couldn’t load options. Try again.” | Yes |
| "Failed to load categories" | useJourneyCategories catch | — | Same. | Yes |
| "Something went wrong. Try again." | DeleteAccountDrawer | Vague. | “We couldn’t complete this. Try again in a few minutes.” | Yes |
| body?.error / body?.message / fnError.message | DeleteAccountDrawer | May be backend message. | Prefer fixed user message unless backend message is safe and translated. | Yes |
| "Could not find your email. Sign out and use Forgot password on the sign in page." | PasswordDrawer | Clear, a bit long. | “We don’t have your email. Sign out, then use “Forgot password?” on the sign in page.” | Yes |

---

## 5. Highest-priority improvements

| Priority | Issue | Why it matters | Recommended fix |
|----------|--------|----------------|-----------------|
| 1 | Raw Supabase/auth errors in UI | Erodes trust; confuses non-technical users. | Add a single error translation layer; map known codes to short, actionable messages; default to a generic “We couldn’t… Try again.” |
| 2 | "Something went wrong" / "Something went wrong. Try again." | No clear cause or next step. | Replace with flow-specific messages (e.g. “We couldn’t create your account. Try again.”). |
| 3 | "Go to Home" vs "This week" | User lands on “This week” but CTA says “Home.” | Change Success CTA to “See your week” or “Go to This week,” or change Home title to “Home” everywhere. |
| 4 | "Begin My Journey" (gamified tone) | Conflicts with no-gamification rule. | Use “Set up your plan” or “Start your journey” (no “My”) on Log empty and JourneyCard. |
| 5 | "Weekly commitment crushed!" / "bonus" language | Feels gamified. | Use “You met your commitment” / “You passed your commitment” and “Over your commitment” instead of “bonus”/“crushed.” |
| 6 | Sign in / Sign In / Sign out / Sign Out inconsistency | Small but visible. | Standardize sentence case: “Sign in,” “Sign out” on all buttons and links. |
| 7 | "Invalid or expired link." on reset | Technical. | “This link is invalid or has expired. Request a new one from the sign in page.” |
| 8 | OAuth "Google sign-in failed." for all cases | Doesn’t distinguish cancellation vs error. | “Sign-in failed. Try again or use email and password.” (and optionally map provider-specific messages). |
| 9 | Review "Delta" | Jargon. | “Difference” or “Logged vs commitment.” |
| 10 | Delete account fallback error | Destructive action deserves clear message. | “We couldn’t complete this. Try again in a few minutes.” and avoid showing raw API errors. |

---

## 6. Suggested voice and tone guardrails

- **Modern:** Plain language, no corporate or legacy jargon.
- **Calm:** No exclamation marks in body copy; no hype or “crushed”/“bonus” style.
- **Intentional:** Every line supports the next step or the user’s sense of direction.
- **Supportive:** Errors explain what went wrong in human terms and what to do next.
- **Clear:** One idea per sentence; consistent terms (e.g. “commitment,” “entry,” “log”).
- **Not overly cheerful:** Avoid “Amazing!”, “You’re crushing it!”, excessive positivity.
- **Not robotic:** Avoid “Operation failed,” “Invalid input”; use “We couldn’t…” or “Please…”
- **Not corporate:** Avoid “Leverage,” “Sync,” “Reach out”; use “Use,” “Save,” “Sign in.”

**Copy principles:**

1. **Errors:** User-facing message in second person where it helps (“Please try again”); otherwise “We couldn’t [action]. Try again.”
2. **Empty states:** One line of explanation + one clear CTA.
3. **Buttons:** Sentence case; verb or verb phrase (“Sign in,” “Save,” “Add log”).
4. **Success:** Short confirmation (“Saved,” “Sent”) and optional one-line follow-up; no exclamation marks.
5. **Terminology:** One term per concept app-wide (see Terminology audit).

---

## 7. Optional rewrite candidates

Screens or components that would benefit from a full copy pass once the above fixes are in:

1. **Review page** — Add subtext or empty state; replace “Delta” and tighten “Days without a log”; consider microcopy for “Commitment vs actual.”
2. **Journey page** — Currently only a title; add purpose copy and empty state when built out.
3. **Onboarding Summary + Auth drawer** — Unify “journey” vs “plan”; standardize “Creating…” and error fallbacks; confirm OAuth button copy if Apple is added.
4. **Email drawer confirmation** — Different subtitle for Settings vs onboarding (“finish saving your journey” vs “confirm your email”).
5. **Home JourneyCard** — Replace “Begin My Journey,” “days active,” “crushed,” “bonus” with non-gamified alternatives in one pass.
6. **Log page** — Align “Add log” vs “Add Log”; one placeholder for note; consistent error copy for create/save.

---

## File reference — where copy lives

| Area | Files |
|------|--------|
| Auth | `AuthContext.tsx`, `LoginPage.tsx`, `SignupPage.tsx`, `ForgotPasswordDrawer.tsx`, `ResetPasswordPage.tsx`, `AuthCallbackPage.tsx` |
| Onboarding | `WelcomeScreen.tsx`, `DestinationScreen.tsx`, `WhyScreen.tsx`, `ActionsScreen.tsx`, `CommitmentScreen.tsx`, `SummaryScreen.tsx`, `FirstLogScreen.tsx`, `SuccessScreen.tsx` |
| Home | `HomePage.tsx`, `HomeHeader.tsx`, `JourneyCard.tsx`, `WeekSection.tsx`, `DayCard.tsx` |
| Log | `LogPage.tsx`, `createLogEntry.ts` |
| Log Details | `LogDetailsPage.tsx` |
| Review | `ReviewPage.tsx` |
| Journey | `JourneyPage.tsx` |
| Settings | `SettingsPage.tsx`, `NameDrawer.tsx`, `EmailDrawer.tsx`, `PasswordDrawer.tsx`, `AppearanceDrawer.tsx`, `SignOutDrawer.tsx`, `DeleteAccountDrawer.tsx` |
| Layout | `BottomNav.tsx`, `AppShell.tsx`, `PageHeader.tsx` |
| Shared | `passwordValidation.ts` (PASSWORD_HINT) |

---

*End of audit. No code was changed. Implement fixes in a separate pass.*
