# UX Copy Audit — Post-Update

> Fresh extraction from codebase on 2026-02-27, after copy-update pass.
> Every user-facing string extracted verbatim from source files.

---

# Verification — Banned Strings Check

Searched all files in `src/**/*.tsx` for the following retired strings.
Each row shows match status and, if found, file path + line number.

| Banned String | Status | Matches |
|---|---|---|
| "Begin My Journey" | CLEAR | No matches found |
| "Log your first entry" | CLEAR | No matches found |
| "What did you invest time in today?" | CLEAR | No matches found |
| "First log saved." | CLEAR | No matches found |
| "Your journey has begun." | CLEAR | No matches found |
| "Skip for now" | CLEAR | No matches found |
| "Save Journey" | CLEAR | No matches found |
| "Create a journey first." | CLEAR | No matches found |
| "Zero-log days" | CLEAR | No matches found |
| "Home" (as page heading / body copy) | CLEAR | No matches in page headings or body copy |

### "Home" — Contextual Matches (not banned)

The word "Home" still appears in the following locations, all of which are **expected and legitimate**:

| File | Line | Context | Verdict |
|---|---|---|---|
| `src/components/Layout/BottomNav.tsx` | 5 | `label: 'Home'` — navigation tab label | OK — nav label, not page heading |
| `src/components/Layout/AppShell.tsx` | 7 | `'/': 'Home'` — PATH_TITLES mapping for PageHeader | **Needs manual review** — PageHeader renders this as `<h1>`. HomePage heading is now "This week" but the shell header still says "Home". Deferred for separate pass. |
| `src/components/Layout/AppShell.tsx` | 20 | `?? 'Home'` — fallback title | **Needs manual review** — same as above. |
| `src/pages/Onboarding/SuccessScreen.tsx` | 109 | `"Go to Home"` — CTA button | **Needs manual review** — user-facing button text. Destination page heading is now "This week"; consider updating to "Go to dashboard" or similar. |
| `src/App.tsx` | 10 | `import { HomePage }` — import statement | OK — code-only, not user-facing |
| `src/pages/Home/HomePage.tsx` | 4 | `export const HomePage` — export declaration | OK — code-only, not user-facing |

---

# Full Copy Inventory

---

## Screen: Welcome (File: `src/pages/Onboarding/WelcomeScreen.tsx`)

### Headings
- "Grain" *(wordmark)*
- "Your time tells the truth."

### Body / Helper Text
- "See if your week reflects what you say matters most."

### Buttons / CTAs
- "Get started"

### Inline Links
- "Already have an account? Sign in"

### Accessibility / Alt Text
- alt: "Grain" *(app icon)*

---

## Screen: Destination (File: `src/pages/Onboarding/DestinationScreen.tsx`)

### Headings
- "What are you working toward?"

### Body / Helper Text
- "This is your north star. One clear destination."

### Form Labels / Placeholders
- Placeholder: "Ex: Participate in 2026 Iron Man event"

### Buttons / CTAs
- "Next"

---

## Screen: Why (File: `src/pages/Onboarding/WhyScreen.tsx`)

### Headings
- "Why does this matter to you?"

### Body / Helper Text
- "This stays private. It anchors your direction when things get noisy."
- "Never shown in summaries or reviews."

### Form Labels / Placeholders
- Placeholder: "Ex: I want to get in shape and push myself"

### Buttons / CTAs
- "Next"

---

## Screen: Actions (File: `src/pages/Onboarding/ActionsScreen.tsx`)

### Headings
- "What moves the needle?"

### Body / Helper Text
- "Choose a focus area to get tailored suggestions, or add your own."
- "Suggested actions for {categoryLabel}:" *(dynamic — `categoryLabel` is the selected category name, or "general" if "Skip" was chosen)*

### Category Chips
- "📐 Learning"
- "🎨 Creative"
- "📈 Career"
- "💪 Health"
- "🔨 Building"
- "Skip"

### Suggestion Chips — 📐 Learning
- "Online course"
- "Practice/build"
- "Read docs"
- "Watch tutorials"
- "Exercises/drills"

### Suggestion Chips — 🎨 Creative
- "Practice"
- "Create"
- "Study craft"
- "Share work"
- "Get feedback"

### Suggestion Chips — 📈 Career
- "Networking"
- "Skill building"
- "Side projects"
- "Resume/portfolio"
- "Industry research"

### Suggestion Chips — 💪 Health
- "Workout"
- "Meal prep"
- "Stretching/yoga"
- "Walk/run"
- "Track nutrition"

### Suggestion Chips — 🔨 Building
- "Design/plan"
- "Write code"
- "Create content"
- "Research"
- "Ship/publish"

### Suggestion Chips — Skip (generic)
- "Practice"
- "Study"
- "Build"
- "Research"
- "Plan"
- "Create"
- "Review"
- "Ship"

### Buttons / CTAs
- "Custom" *(chip-button to open drawer)*
- "Next"
- "Add action" *(inside Add Action drawer)*

### Drawer: Add Action
- Title: "Add an action"
- Subtitle: "Actions help you get closer to your north star."
- Placeholder: "Ex: Run 2 miles"

---

## Screen: Commitment (File: `src/pages/Onboarding/CommitmentScreen.tsx`)

### Headings
- "How many hours per week?"

### Body / Helper Text
- "Be honest — not ambitious. You can always adjust later."
- "hours / week"

### Preset Hour Blocks
- "2h"
- "4h"
- "6h"
- "8h"
- "10h"
- "15h"

### Warnings
- "That's ambitious. Most people overestimate by 40%." *(shown when hours >= 15)*

### Buttons / CTAs
- "Next"

### Slider Labels
- "{min}h" *(default: "1h")*
- "{max}h" *(default: "20h")*

### Accessibility
- aria-label: "Hours per week" *(slider)*

---

## Screen: Summary (File: `src/pages/Onboarding/SummaryScreen.tsx`)

### Headings
- "Here's your plan."

### Body / Helper Text
- "Here's what you're about to commit to."
- "That's about {dailyHours} hours per day" *(dynamic)*

### Card Labels
- "DESTINATION"
- "ACTIONS"
- "WEEKLY COMMITMENT"

### Card Content (dynamic)
- "{destination}" *(user-supplied)*
- "{hours}h / week" *(commitment display)*

### Buttons / CTAs
- "Edit" *(on each SummaryCard)*
- "Continue" *(when user is authenticated)*
- "Saving…" *(while save in progress)*
- "Save my progress" *(when user is not authenticated)*
- "Confirm email" *(when signup pending confirmation and drawer is closed)*

### Errors / Validation
- "Please fill out all fields."
- "Something went wrong" *(fallback auth error)*
- "Failed to save journey" *(fallback save error)*
- "{saveError}" *(dynamic error from save)*
- "{authError}" *(dynamic error from auth)*

### Drawer: Create Account (idle state)
- Title: "Save your journey."
- Subtitle: "Create an account so your setup is waiting each week."
- Placeholder: "First name"
- Placeholder: "Email address"
- Placeholder: "Password"
- "Creating..." *(button while submitting)*
- "Create Account" *(button)*
- "or" *(divider text)*
- "Continue with Google" *(OAuth button)*
- "Continue with Apple" *(OAuth button)*

### Drawer: Pending Confirmation state
- Title: "We sent a confirmation link to {pendingEmail}" *(dynamic)*
- "Check your email to confirm your account. Then sign in to finish saving your journey."
- "Confirmation email sent. Check your inbox and spam." *(resend success)*
- "{authCtxError}" *(dynamic resend error)*
- "Sign In" *(button)*
- "Sending…" *(resend loading)*
- "Resend in {resendCooldown}s" *(dynamic cooldown)*
- "Didn't get it? Resend" *(resend link)*

---

## Screen: First Log (File: `src/pages/Onboarding/FirstLogScreen.tsx`)

### Headings
- "Welcome, {name}." *(dynamic — `name` from signup; falls back to "Welcome.")*
- "Welcome." *(fallback when no name)*

### Body / Helper Text
- "Your journey is set. Let's see where your time goes."

### Card Content
- "Make your first entry"
- "What did you work on today?"

### Section Labels
- "ACTION"
- "DURATION"
- "NOTE (OPTIONAL)"

### Duration Chips
- "30m"
- "1h"
- "1.5h"
- "2h"
- "2.5h"
- "3h"
- "Custom"

### Form Labels / Placeholders
- Placeholder: "Reflect on it"

### Buttons / CTAs
- "Save Entry"
- "I'll log later"

---

## Screen: Success (File: `src/pages/Onboarding/SuccessScreen.tsx`)

### Headings
- "You're in."

### Body / Helper Text
- "Week one starts now. Come back tomorrow and keep it going."

### Buttons / CTAs
- "Go to Home"

---

## Screen: Login (File: `src/pages/Auth/LoginPage.tsx`)

### Headings
- "Sign in"

### Form Labels / Placeholders
- Placeholder: "Email address"
- Placeholder: "Password"

### Buttons / CTAs
- "Sign In"
- "Signing In…" *(while submitting)*
- "Continue with Google" *(OAuth button)*
- "Continue with Apple" *(OAuth button)*

### Inline Links
- "Don't have an account? Sign Up"

### Divider Text
- "or"

### Errors / Validation
- "{error}" *(dynamic error from AuthContext — surfaced via Supabase)*

### Accessibility
- aria-label: "Hide password"
- aria-label: "Show password"

---

## Screen: Signup (File: `src/pages/Auth/SignupPage.tsx`)

### Headings
- "Create an account"

### Body / Helper Text
- "Enter your email and choose a password."

### Form Labels / Placeholders
- Label: "Email"
- Placeholder: "you@example.com"
- Label: "Password"
- Placeholder: "At least 6 characters"

### Buttons / CTAs
- "Sign up"
- "Creating account…" *(while submitting)*

### Inline Links
- "Already have an account? Sign in"

### Errors / Validation
- "Email is required"
- "Please enter a valid email"
- "Password is required"
- "Password must be at least {MIN_PASSWORD_LENGTH} characters" *(MIN_PASSWORD_LENGTH = 6)*
- "{error}" *(dynamic banner error from AuthContext)*

---

## Screen: Home (File: `src/pages/Home/HomePage.tsx`)

### Headings
- "This week"

### Loading States
- "Loading…"

---

## Screen: Log (File: `src/pages/Log/LogPage.tsx`)

### Headings
- "Today"

### Form Labels / Placeholders
- Label: "Date"
- Label: "Action"
- Label: "Duration (hours)"
- Label: "Note (optional)"
- Placeholder: "Reflect on it"

### Body / Helper Text
- "{note.length}/{NOTE_MAX}" *(character counter, NOTE_MAX = 140)*
- "{actionTitle}: {duration}h" *(log entry display)*
- "{actionTitle}: {duration}h — {note}" *(log entry display with note)*

### Buttons / CTAs
- "Add log"
- "Saving…" *(while submitting)*

### Empty / Loading States
- "Loading…"
- "Set up your journey to start logging."
- "Loading…"
- "No actions yet. Add some in Journey settings."

### Errors / Validation
- "{actionsError}" *(dynamic error)*
- "{lastError}" *(dynamic error)*

### Fallback Text
- "Action" *(used when action title lookup fails for a log entry)*

### Accessibility
- aria-label: "Log date"
- aria-label: "Log time for {a.title}" *(dynamic)*
- aria-label: "{d} hours" *(dynamic duration)*

---

## Screen: Review (File: `src/pages/Review/ReviewPage.tsx`)

### Headings
- "Review"
- "This week"

### Body / Helper Text
- "Commitment: {commitment}h · Actual: {actual}h · Delta: {delta}h" *(dynamic, delta prefixed with "+" when >= 0)*
- "Days without a log: {zeroDays}" *(dynamic)*

### Empty / Loading States
- "Loading…"
- "Set up your journey to start logging."
- "Loading week…"

### Errors / Validation
- "{error}" *(dynamic error)*

---

## Screen: Journey (File: `src/pages/Journey/JourneyPage.tsx`)

### Headings
- "Journey"

---

## Screen: Settings (File: `src/pages/Settings/SettingsPage.tsx`)

### Headings
- "Settings"

### Body / Helper Text
- "Signed in as {user?.email}" *(dynamic — falls back to "Unknown")*

### Buttons / CTAs
- "Log out"
- "Logging out…" *(while signing out)*

### Errors / Validation
- "Something went wrong while signing out. Please try again."

---

## Component: OnboardingHeader (File: `src/components/onboarding/OnboardingHeader.tsx`)

### Branding
- "Grain" *(logo text — appears on every onboarding screen)*

### Accessibility
- aria-label: "Go back" *(back button)*

---

## Component: Drawer (File: `src/components/onboarding/Drawer.tsx`)

### Accessibility
- aria-label: "Close" *(close button)*

---

## Component: SummaryCard (File: `src/components/onboarding/SummaryCard.tsx`)

### Buttons / CTAs
- "Edit"

---

## Component: Chip (File: `src/components/onboarding/Chip.tsx`)

### Accessibility
- aria-label: "Remove {label}" *(dynamic — removable chip close button)*

---

## Component: Slider (File: `src/components/onboarding/Slider.tsx`)

### Accessibility
- aria-label: "Hours per week"

---

## Component: BottomNav (File: `src/components/Layout/BottomNav.tsx`)

### Navigation Labels
- "Home"
- "Log"
- "Review"
- "Journey"

### Accessibility
- aria-label: "Primary" *(nav element)*

---

## Component: AppShell (File: `src/components/Layout/AppShell.tsx`)

### Page Titles (mapped from path)
- "/" → "Home"
- "/log" → "Log"
- "/review" → "Review"
- "/journey" → "Journey"
- "/settings" → "Settings"

---

## Component: PageHeader (File: `src/components/Layout/PageHeader.tsx`)

### Accessibility
- aria-label: "Settings" *(gear icon button)*

---

## Component: ProtectedRoute (File: `src/components/Layout/ProtectedRoute.tsx`)

### Loading States
- "Loading…"

---

## Component: AuthLoadingScreen (File: `src/App.tsx`)

### Loading States
- "Loading…"

---

# Cross-Screen Duplicates

| Copy | Appears In |
|---|---|
| "Loading…" | HomePage, LogPage (x2), ReviewPage, ProtectedRoute, App.tsx (AuthLoadingScreen) |
| "Set up your journey to start logging." | LogPage, ReviewPage |
| "Next" | DestinationScreen, WhyScreen, ActionsScreen, CommitmentScreen |
| "Edit" | SummaryCard (used in SummaryScreen) |
| "Grain" | WelcomeScreen (wordmark), OnboardingHeader (logo text on every onboarding screen) |
| "Email address" | LoginPage (placeholder), SummaryScreen drawer (placeholder) |
| "Password" | LoginPage (placeholder), SummaryScreen drawer (placeholder) |
| "or" | LoginPage (divider), SummaryScreen drawer (divider) |
| "Continue with Google" | LoginPage, SummaryScreen drawer |
| "Continue with Apple" | LoginPage, SummaryScreen drawer |
| "Sign in" / "Sign In" | WelcomeScreen (link), LoginPage (heading + button), SummaryScreen drawer (button + link), SignupPage (link) |
| "Already have an account?" | WelcomeScreen, SignupPage |
| "Reflect on it" | FirstLogScreen (placeholder), LogPage (placeholder) |
| "Custom" | ActionsScreen (chip-button), FirstLogScreen (duration chip) |

---

# Deferred Items

| Item | File | Reason |
|---|---|---|
| Split "Signed in as {email}" into label "Account" + value | `SettingsPage.tsx` | Requires JSX restructure |
| Update AppShell `PATH_TITLES` to match new screen headings (e.g. "/" → "This week") | `AppShell.tsx` | Deferred until screen headings stabilize |
| Update "Go to Home" CTA to align with new page heading | `SuccessScreen.tsx` | "Home" in CTA may not match "This week" heading; needs manual review |
