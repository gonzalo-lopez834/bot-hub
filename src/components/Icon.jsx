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
    default: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
        <path strokeWidth="1.5" d="M12 8v4l3 2" />
      </svg>
    ),
  }

  return icons[name] || icons.default
}
