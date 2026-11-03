// Small helpers for the "completion" date of projects and qualifications

// Date from MongoDB -> "YYYY-MM-DD" for an <input type="date">
export const toInputDate = (value) => (value ? String(value).slice(0, 10) : '')

// Date from MongoDB -> "Oct 2023" (UTC, so the month never shifts because of the time zone)
export const formatMonthYear = (value) =>
  value
    ? new Date(value).toLocaleDateString('en-CA', { month: 'short', year: 'numeric', timeZone: 'UTC' })
    : ''

// Records without a completion date (in progress) first, then the newest first
export const sortByCompletion = (records) =>
  [...records].sort((a, b) => {
    if (!a.completion && !b.completion) return 0
    if (!a.completion) return -1
    if (!b.completion) return 1
    return new Date(b.completion) - new Date(a.completion)
  })
