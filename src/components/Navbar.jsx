import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import GradientText from './GradientText.jsx';
import SearchBox from './SearchBox.jsx';

const menuItems = [
  { label: 'Inicio', ariaLabel: 'Ir a la página principal', link: '/' },
  { label: 'Categorías', ariaLabel: 'Ver categorías de servicios', link: '/' },
  { label: 'Contacto', ariaLabel: 'Contactar con nosotros', link: '/' },
];

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white relative z-30 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 py-2 sm:py-4 px-[5%] sm:px-[15%] lg:px-[22%]">
        {/* Título alineado a la izquierda */}
        <div className="flex-shrink-0">
          <NavLink to="/" className="group">
            <div className="bg-gradient-to-r from-[#40ffaa]/10 to-[#4079ff]/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-gray-200 group-hover:border-[#4079ff]/30 group-hover:shadow-lg transition-all duration-300">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#40ffaa] to-[#4079ff] bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>
                Agent Service Hub
              </span>
            </div>
          </NavLink>
        </div>

        {/* Centro: Buscador */}
        <div className="w-full max-w-sm mx-4 hidden sm:block">
          <SearchBox />
        </div>

        {/* Derecha: Navegación */}
        <nav className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.link}
              aria-label={item.ariaLabel}
              className="text-xs sm:text-sm md:text-base text-gray-700 hover:text-[#4079ff] font-medium transition-colors duration-200 px-2 py-1 hover:bg-gray-50 rounded whitespace-nowrap"
              style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile: Buscador debajo en mobile */}
        <div className="w-full max-w-md sm:hidden">
          <SearchBox />
        </div>
      </div>
    </header>
  )
}
