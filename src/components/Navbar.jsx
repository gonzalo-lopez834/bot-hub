import { NavLink } from 'react-router-dom'

const linkBase =
  'px-2 py-1 rounded-md hover:bg-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'

export default function Navbar() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="font-semibold">
          Bot Hub
        </NavLink>

        <nav className="flex items-center gap-4 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${linkBase} ${isActive ? 'font-medium' : ''}`}
          >
            Inicio
          </NavLink>
          {/* futuras secciones */}
        </nav>
      </div>
    </header>
  )
}
