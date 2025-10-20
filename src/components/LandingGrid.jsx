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
              <li key={s.id} className="group">
                <Link
                  to={to}
                  className={`block relative overflow-hidden rounded-2xl bg-gradient-to-br ${colorScheme.gradient} backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl ${colorScheme.shadow} focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2`}
                >
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
                  <div className="relative">
                    {/* Header con efecto vidrio tintado */}
                    <div className="flex items-center gap-4 p-4 mb-4 rounded-xl backdrop-blur-lg shadow-lg transition-all duration-500 relative overflow-hidden" 
                         style={{
                           backgroundColor: colorScheme.bg,
                           backdropFilter: 'blur(16px)'
                         }}>
                      <div className="relative flex items-center gap-4 w-full">
                        <div className="flex-shrink-0">
                          <Icon name={s.iconName} className={`w-7 h-7 ${colorScheme.iconText} transition-all duration-500`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-bold text-lg ${colorScheme.title} leading-tight`}>
                            {s.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 leading-relaxed mb-4 font-medium">
                      {s.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-semibold text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
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

