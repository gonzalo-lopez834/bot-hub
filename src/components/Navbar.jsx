import { NavLink } from 'react-router-dom'
import Container from './Container.jsx'

const linkBase =
  'px-2 py-1 rounded-md transition hover:bg-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <Container className="py-3 flex items-center justify-between">
        <NavLink to="/" className="font-semibold text-gray-900">
          Bot Hub
        </NavLink>

        <nav className="flex items-center gap-4 text-sm text-gray-600">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'font-medium text-gray-900' : ''}`
            }
          >
            Inicio
          </NavLink>
          {/* futuras secciones */}
        </nav>
      </Container>
    </header>
  )
}
