import { NavLink, useLocation } from 'react-router-dom';
import SearchBox from './SearchBox.jsx';
import { useScrollDetection } from '../hooks/useScrollDetection.js';

const menuItems = [
  { label: 'Inicio', ariaLabel: 'Ir a la página principal', link: '/' },
  { label: 'Categorías', ariaLabel: 'Ver categorías de servicios', link: '/' },
  { label: 'Contacto', ariaLabel: 'Contactar con nosotros', link: '/' },
];

export default function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isScrolled = useScrollDetection(50);

  // Solo animar en la home, pero mantener diseño en ambas
  const shouldAnimate = isHomePage;

  return (
    <header className={`
      ${isHomePage ? 'fixed z-50' : 'relative z-30'} w-full flex justify-center
      ${shouldAnimate ? 'transition-all duration-500 ease-out' : ''}
      ${shouldAnimate ? (isScrolled ? 'top-2' : 'top-4') : (isHomePage ? 'top-4' : '')}
    `}>
      <div className={`
        flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 lg:gap-6
        border border-white/20 backdrop-blur-xl hover:border-white/30 hover:shadow-2xl hover:shadow-black/8
        ${shouldAnimate ? 'transition-all duration-500 ease-out' : ''}
        ${shouldAnimate && isScrolled 
          ? 'w-[98%] max-w-6xl rounded-2xl bg-white/95 shadow-xl shadow-black/10 py-3 px-4 md:px-6' 
          : 'w-[95%] max-w-7xl rounded-3xl bg-white/80 shadow-2xl shadow-black/5 py-4 px-6 md:px-8'
        }
        ${isHomePage ? '' : 'mx-4 mt-4'}
      `}>
        
        {/* Logo Dinámico */}
        <div className="flex-shrink-0">
          <NavLink to="/" className="group">
            <div className={`
              bg-gradient-to-r from-[#40ffaa]/10 to-[#4079ff]/10 backdrop-blur-md 
              border border-white/20 group-hover:border-[#4079ff]/30 
              group-hover:shadow-lg group-hover:scale-105 group-hover:-translate-y-1
              ${shouldAnimate ? 'transition-all duration-300 ease-out' : ''}
              ${shouldAnimate && isScrolled ? 'rounded-xl px-4 py-2' : 'rounded-2xl px-6 py-3'}
            `}>
              <span className={`
                font-bold bg-gradient-to-r from-[#40ffaa] to-[#4079ff] 
                bg-clip-text text-transparent
                ${shouldAnimate ? 'transition-all duration-300 ease-out' : ''}
                ${shouldAnimate && isScrolled ? 'text-lg sm:text-xl md:text-2xl' : 'text-2xl sm:text-3xl md:text-4xl'}
              `} style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>
                Agent Service Hub
              </span>
            </div>
          </NavLink>
        </div>

        {/* Buscador Adaptativo - Desktop & Tablet */}
        <div className={`
          hidden md:block mx-4 lg:mx-6
          ${shouldAnimate ? 'transition-all duration-300 ease-out' : ''}
          ${shouldAnimate && isScrolled ? 'max-w-lg mx-2 md:mx-4' : 'max-w-md mx-4 lg:mx-6'}
        `}>
          <div className={`
            backdrop-blur-md border border-white/30 hover:border-white/50 
            hover:bg-white/75
            ${shouldAnimate ? 'transition-all duration-300 ease-out' : ''}
            ${shouldAnimate && isScrolled ? 'bg-white/70 rounded-2xl p-2' : 'bg-white/60 rounded-full p-2'}
          `}>
            <SearchBox />
          </div>
        </div>

        {/* Navegación Pills */}
        <nav className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.link}
              aria-label={item.ariaLabel}
              className={`
                font-medium whitespace-nowrap text-gray-700 hover:text-[#4079ff]
                bg-white/40 hover:bg-white/60 border border-white/20 hover:border-[#4079ff]/30
                hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#4079ff]/10
                ${shouldAnimate ? 'transition-all duration-300 ease-out' : ''}
                ${shouldAnimate && isScrolled ? 'text-sm px-4 py-2 rounded-xl' : 'text-sm sm:text-base px-5 py-2.5 rounded-2xl'}
              `}
              style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile: Buscador debajo */}
        <div className="w-full max-w-md md:hidden">
          <div className={`
            bg-white/60 backdrop-blur-md rounded-2xl p-2 border border-white/30 hover:bg-white/70 hover:border-white/40
            ${shouldAnimate ? 'transition-all duration-300' : ''}
          `}>
            <SearchBox />
          </div>
        </div>
      </div>
    </header>
  )
}
