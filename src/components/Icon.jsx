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
    default: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
        <path strokeWidth="1.5" d="M12 8v4l3 2" />
      </svg>
    ),
  }

  return icons[name] || icons.default
}
