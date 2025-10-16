import { NavLink } from 'react-router-dom'
import Container from './Container.jsx'
import GradientText from './GradientText.jsx'
import StaggeredMenu from './StaggeredMenu.jsx'

const menuItems = [
  { label: 'Inicio', ariaLabel: 'Ir a la página principal', link: '/' },
  { label: 'Categorias', ariaLabel: 'Ver categorías de servicios', link: '/' },
  { label: 'Contacto', ariaLabel: 'Contactar con nosotros', link: '/' }
]

export default function Navbar() {
  return (
    <>
      <header className="border-b bg-white relative z-30">
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

          <nav className="flex items-center">
            {/* Placeholder para el botón del menú - el menú real está en fixed position abajo */}
          </nav>
        </Container>
      </header>

      {/* Menú en posición fixed para que cubra toda la pantalla */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        displaySocials={false}
        displayItemNumbering={false}
        menuButtonColor="#374151"
        openMenuButtonColor="#111827"
        changeMenuColorOnOpen={true}
        colors={['#40ffaa', '#4079ff']}
        accentColor="#4079ff"
        isFixed={true}
      />
    </>
  )
}
