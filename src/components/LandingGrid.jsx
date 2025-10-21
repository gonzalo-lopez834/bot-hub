import { Link } from 'react-router-dom'
import { useServices } from '../hooks/useServices'
import { getColorSchemeForService } from '../utils/colorSchemes'
import Icon from './Icon'
import Hero from './Hero'

export default function LandingGrid() {
  const { services, loading, error } = useServices()

  if (loading) return <div className="py-10">Cargando...</div>
  if (error) return <div className="py-10 text-red-600">Error: {error}</div>

  return (
    <div className="-mx-4 sm:-mx-6">
      <Hero />
      
      <section id="servicios" className="px-4 sm:px-6 py-12">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const to = `/services/${s.slug ?? s.id}`
            const colorScheme = getColorSchemeForService(s.id)
            
            return (
              <li key={s.id} className="group h-full">
                <Link
                  to={to}
                  className={`flex flex-col h-full relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md border border-white/20 hover:border-white/30 p-6 transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 shadow-lg ${colorScheme.shadow} focus:outline-none focus:ring-2 focus:ring-[#4079ff]/50 focus:ring-offset-2`}
                >
                  <div className="relative flex-1 flex flex-col">
                    {/* Header con efecto glassmorphism tintado */}
                    <div className="flex items-center gap-4 p-4 mb-4 rounded-xl backdrop-blur-lg shadow-sm transition-all duration-300 ease-out relative overflow-hidden" 
                         style={{
                           backgroundColor: colorScheme.bg,
                           backdropFilter: 'blur(16px)'
                         }}>
                      <div className="relative flex items-center gap-4 w-full">
                        <div className="flex-shrink-0">
                          <Icon name={s.iconName} className={`w-7 h-7 ${colorScheme.iconText} transition-all duration-300`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-bold text-lg ${colorScheme.title} leading-tight`}>
                            {s.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 leading-relaxed mb-4 font-medium flex-1">
                      {s.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-semibold text-[#4079ff] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      Más detalles
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

