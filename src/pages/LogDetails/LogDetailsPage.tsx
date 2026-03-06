import type { CSSProperties } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MetricStatRow } from '@/components/shared/MetricStatRow'
import { useActiveJourney } from '@/hooks'
import { useLogDetailsForDate, type LogDetailEntry } from '@/hooks/useActionLogs'
import { errors } from '@/lib/errorMessages'
import { SkeletonBlock } from '@/components/skeleton/SkeletonBlock'
import { LogEntrySkeleton } from '@/components/skeleton/LogEntrySkeleton'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const formatDateLabel = (dateStr: string): string => {
  const d = new Date(dateStr + 'T00:00:00')
  const day = DAYS[d.getDay()]
  return `${day} ${d.getMonth() + 1}/${d.getDate()}`
}

const formatTime = (iso: string): string => {
  const d = new Date(iso)
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}

const formatDuration = (hours: number): string => {
  if (hours < 1) {
    const m = Math.round(hours * 60)
    return m === 0 ? '0m' : `${m}m`
  }
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

const ArrowLeft = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="var(--text-secondary)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="16" y1="10" x2="4" y2="10" />
    <polyline points="10 4 4 10 10 16" />
  </svg>
)

const ClockIcon14 = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="5.5" stroke="var(--text-secondary)" strokeWidth="1.2" />
    <path d="M7 4v3l2 2" stroke="var(--text-secondary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ActionsIcon14 = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 4h10M2 7h10M2 10h6" stroke="var(--text-secondary)" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

// ——— Subcomponents ———

function HeaderBackTitle ({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header style={headerStyle}>
      <button
        type="button"
        style={backBtnStyle}
        onClick={onBack}
        aria-label="Go back"
      >
        <ArrowLeft />
      </button>
      <h1 style={titleStyle}>{title}</h1>
    </header>
  )
}

function AddLogChipButton ({ selectedDate, onNavigate }: { selectedDate: string; onNavigate: (path: string) => void }) {
  return (
    <button
      type="button"
      style={addLogPillStyle}
      onClick={() => onNavigate(`/log?date=${selectedDate}`)}
    >
      + Add entry
    </button>
  )
}

function LogEntryCard ({ entry }: { entry: LogDetailEntry }) {
  return (
    <li style={entryCardStyle}>
      <div style={entryTopRowStyle}>
        <span style={timeStyle}>{formatTime(entry.logged_at)}</span>
        <span style={durationPillStyle}>{formatDuration(entry.duration)}</span>
      </div>
      <span style={actionNameStyle}>{entry.actionTitle}</span>
      {entry.note && (
        <div style={noteBlockStyle}>
          <p style={noteTextStyle}>{entry.note}</p>
        </div>
      )}
    </li>
  )
}

// ——— Page ———

export const LogDetailsPage = () => {
  const { date } = useParams<{ date: string }>()
  const navigate = useNavigate()
  const { activeJourney, isLoading: journeyLoading } = useActiveJourney()
  const selectedDate = date ?? ''
  const {
    entries,
    timeInvestedHours,
    actionsLoggedCount,
    isLoading: detailsLoading,
    error,
  } = useLogDetailsForDate(activeJourney?.id ?? null, selectedDate)

  const isLoading = journeyLoading || (selectedDate && detailsLoading)
  const isEmpty = !isLoading && selectedDate && entries.length === 0 && !error

  if (!selectedDate) {
    navigate('/', { replace: true })
    return null
  }

  return (
    <div style={outerStyle}>
      <div style={mainWrapper}>
        <div style={innerContainer}>
          <div>
            <HeaderBackTitle title={formatDateLabel(selectedDate)} onBack={() => navigate(-1)} />

            {isLoading && (
              <>
                <div style={metricSkeletonRowStyle}>
                  <SkeletonBlock height={64} borderRadius={14} style={{ flex: 1 }} />
                  <SkeletonBlock height={64} borderRadius={14} style={{ flex: 1 }} />
                </div>
                <section style={activitySectionStyle}>
                  <div style={activityHeaderRowStyle}>
                    <h2 style={activityTitleStyle}>Entries</h2>
                  </div>
                  <ul style={listStyle}>
                    <LogEntrySkeleton />
                    <LogEntrySkeleton />
                    <LogEntrySkeleton />
                  </ul>
                </section>
              </>
            )}
            {error && (
              <p style={errorStyle} role="alert">
                {errors.loadDay}
              </p>
            )}

            {!isLoading && !error && (
              <>
                <MetricStatRow
                  variant="card"
                  items={[
                    { icon: <ClockIcon14 />, label: 'Time Invested', value: formatDuration(timeInvestedHours) },
                    { icon: <ActionsIcon14 />, label: 'Actions Logged', value: actionsLoggedCount },
                  ]}
                />

                <section style={activitySectionStyle}>
                  <div style={activityHeaderRowStyle}>
                    <h2 style={activityTitleStyle}>Entries</h2>
                    <AddLogChipButton selectedDate={selectedDate} onNavigate={navigate} />
                  </div>

                  {isEmpty && (
                    <p style={emptyTextStyle}>Nothing logged for this day.</p>
                  )}

                  {!isEmpty && entries.length > 0 && (
                    <ul style={listStyle}>
                      {entries.map((entry) => (
                        <LogEntryCard key={entry.id} entry={entry} />
                      ))}
                    </ul>
                  )}
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ——— Styles ———

const outerStyle: CSSProperties = {
  minHeight: '100vh',
  background: 'var(--bg)',
  display: 'flex',
  flexDirection: 'column',
}

const mainWrapper: CSSProperties = {
  flex: 1,
  paddingLeft: 24,
  paddingRight: 24,
  display: 'flex',
  flexDirection: 'column',
}

const metricSkeletonRowStyle: CSSProperties = {
  display: 'flex',
  gap: 8,
}

const innerContainer: CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}

const headerStyle: CSSProperties = {
  paddingTop: 20,
  paddingBottom: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}

const backBtnStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
}

const titleStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '22px',
  fontWeight: 700,
  lineHeight: '28.6px',
  color: 'var(--text-primary)',
  margin: 0,
}

const errorStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  lineHeight: '19.5px',
  color: 'var(--status-misaligned)',
  margin: 0,
}

const activitySectionStyle: CSSProperties = {
  paddingTop: 24,
  paddingBottom: 8,
}

const activityHeaderRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
}

const activityTitleStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '15px',
  fontWeight: 600,
  lineHeight: '24px',
  color: 'var(--text-primary)',
  margin: 0,
}

const addLogPillStyle: CSSProperties = {
  background: 'var(--accent-soft)',
  borderRadius: 22,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 4,
  paddingBottom: 4,
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '19.5px',
  color: 'var(--accent)',
  border: 'none',
  cursor: 'pointer',
}

const emptyTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '22.5px',
  color: 'var(--text-secondary)',
  margin: 0,
}

const listStyle: CSSProperties = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const entryCardStyle: CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 14,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}

const entryTopRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const timeStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  fontWeight: 400,
  lineHeight: '16.5px',
  color: 'var(--text-secondary)',
}

const durationPillStyle: CSSProperties = {
  background: 'var(--accent-blue-glow)',
  color: 'var(--accent-blue-emphasis)',
  borderRadius: 22,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 4,
  paddingBottom: 4,
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '19.5px',
}

const actionNameStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '24px',
  color: 'var(--text-primary)',
}

const noteBlockStyle: CSSProperties = {
  marginTop: 12,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 8,
  paddingBottom: 8,
  background: 'var(--bg-elevated)',
  borderRadius: 12,
}

const noteTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '19.5px',
  color: 'var(--text-secondary)',
  margin: 0,
}
