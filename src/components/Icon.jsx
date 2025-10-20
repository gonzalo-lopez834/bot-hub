// src/components/Icon.jsx
export default function Icon({ name = 'default', className = 'w-6 h-6' }) {
  const icons = {
    scale: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeWidth="1.5" d="M12 3v3m0 12v3m9-9h-3M6 12H3m12.5-6.5 2.121 2.121M7.379 16.621 5.257 18.743m11.364 0-2.122-2.122M7.379 7.379 5.257 5.257" />
        <path strokeWidth="1.5" d="M7 10c0 1.657 2.239 3 5 3s5-1.343 5-3" />
      </svg>
    ),
    ledger: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="2" strokeWidth="1.5" />
        <path strokeWidth="1.5" d="M8 7h8M8 11h8M8 15h5" />
      </svg>
    ),
    download: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeWidth="1.5" d="M12 3v10m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      </svg>
    ),
    table: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.5" />
        <path strokeWidth="1.5" d="M9 5v14M15 5v14M3 11h18" />
      </svg>
    ),
    bank: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeWidth="1.5" d="M3 9l9-6 9 6M4 10h16M5 10v8M9 10v8M15 10v8M19 10v8M3 18h18" />
      </svg>
    ),
    chef: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeWidth="1.5" d="M7 10a5 5 0 1 1 10 0M6 14h12M8 14v5M16 14v5M10 19h4" />
      </svg>
    ),
    play: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
    ),
    info: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
        <path strokeWidth="1.5" d="M12 16v-4M12 8h.01" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeWidth="1.5" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    share: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <circle cx="18" cy="5" r="3" strokeWidth="1.5" />
        <circle cx="6" cy="12" r="3" strokeWidth="1.5" />
        <circle cx="18" cy="19" r="3" strokeWidth="1.5" />
        <path strokeWidth="1.5" d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <polyline points="20,6 9,17 4,12" strokeWidth="1.5" />
      </svg>
    ),
    settings: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
        <path strokeWidth="1.5" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    link: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeWidth="1.5" d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path strokeWidth="1.5" d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    cpu: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="1.5" />
        <rect x="9" y="9" width="6" height="6" strokeWidth="1.5" />
        <path strokeWidth="1.5" d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      </svg>
    ),
    document: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeWidth="1.5" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" strokeWidth="1.5" />
        <line x1="16" y1="13" x2="8" y2="13" strokeWidth="1.5" />
        <line x1="16" y1="17" x2="8" y2="17" strokeWidth="1.5" />
        <polyline points="10,9 9,9 8,9" strokeWidth="1.5" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <circle cx="11" cy="11" r="8" strokeWidth="1.5" />
        <path strokeWidth="1.5" d="m21 21-4.35-4.35" />
      </svg>
    ),
    database: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth="1.5" />
        <path strokeWidth="1.5" d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path strokeWidth="1.5" d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.5" />
        <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.5" />
        <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.5" />
        <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" strokeWidth="1.5" />
        <line x1="12" y1="20" x2="12" y2="4" strokeWidth="1.5" />
        <line x1="6" y1="20" x2="6" y2="14" strokeWidth="1.5" />
      </svg>
    ),
    scan: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeWidth="1.5" d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
        <line x1="12" y1="8" x2="12" y2="16" strokeWidth="1.5" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeWidth="1.5" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" strokeWidth="1.5" />
        <path strokeWidth="1.5" d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    target: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="6" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" strokeWidth="1.5" />
      </svg>
    ),
    box: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeWidth="1.5" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27,6.96 12,12.01 20.73,6.96" strokeWidth="1.5" />
        <line x1="12" y1="22.08" x2="12" y2="12" strokeWidth="1.5" />
      </svg>
    ),
    presentation: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth="1.5" />
        <line x1="8" y1="21" x2="16" y2="21" strokeWidth="1.5" />
        <line x1="12" y1="17" x2="12" y2="21" strokeWidth="1.5" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeWidth="1.5" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    dollar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" strokeWidth="1.5" />
        <path strokeWidth="1.5" d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    folder: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeWidth="1.5" d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    default: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
        <path strokeWidth="1.5" d="M12 8v4l3 2" />
      </svg>
    ),
  }

  return icons[name] || icons.default
}
