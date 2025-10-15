import { NavLink, useMatch } from 'react-router-dom'
import Container from './Container.jsx'
import GradientText from './GradientText.jsx'

const linkBase =
  'px-2 py-1 rounded-md transition hover:bg-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'

export default function Navbar() {
  const inServiceDetail = Boolean(useMatch('/services/:id'))
  const homeLabel = inServiceDetail ? 'Volver a Servicios' : 'Inicio'

  return (
    <header className="border-b bg-white">
      <Container className="flex items-center justify-between gap-6 py-3">
        <div className="flex-1 text-center">
          <NavLink to="/" className="inline-block">
            <GradientText
              colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
              animationSpeed={10}
              showBorder={false}
              className="px-4 py-1 text-5xl font-semibold"
            >
              Bot Service Hub
            </GradientText>
          </NavLink>
        </div>

        <nav className="flex items-center gap-4 text-sm text-gray-600">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'font-medium text-gray-900' : ''}`
            }
          >
            {homeLabel}
          </NavLink>
          {/* futuras secciones */}
        </nav>
      </Container>
    </header>
  )
}
