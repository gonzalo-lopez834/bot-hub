import { Link } from 'react-router-dom'
import { useServices } from '../hooks/useServices'
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
          {services.map((s, index) => {
            const to = `/services/${s.slug ?? s.id}`
            
            // Gradientes de fondo suaves (glassmorphism)
            const backgroundGradients = [
              'from-blue-50 to-cyan-50 border-blue-200/50',
              'from-purple-50 to-pink-50 border-purple-200/50', 
              'from-emerald-50 to-teal-50 border-emerald-200/50',
              'from-orange-50 to-amber-50 border-orange-200/50',
              'from-rose-50 to-pink-50 border-rose-200/50'
            ]
            
            // Sombras de colores
            const shadowColors = [
              'hover:shadow-blue-500/25',
              'hover:shadow-purple-500/25', 
              'hover:shadow-emerald-500/25',
              'hover:shadow-orange-500/25',
              'hover:shadow-rose-500/25'
            ]
            
            // Gradientes para headers de vidrio tintado
            const headerGradients = [
              'from-blue-500 to-cyan-500',
              'from-purple-500 to-pink-500', 
              'from-emerald-500 to-teal-500',
              'from-orange-500 to-amber-500',
              'from-rose-500 to-pink-500'
            ]
            
            const backgroundGradient = backgroundGradients[index % backgroundGradients.length]
            const shadowColor = shadowColors[index % shadowColors.length]
            const headerGradient = headerGradients[index % headerGradients.length]
            
            return (
              <li key={s.id} className="group">
                <Link
                  to={to}
                  className={`block relative overflow-hidden rounded-2xl bg-gradient-to-br ${backgroundGradient} backdrop-blur-sm border-2 border-white/40 p-6 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl ${shadowColor} focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2`}
                >
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
                  <div className="relative">
                    {/* Header con efecto vidrio tintado */}
                    <div className="flex items-center gap-4 p-4 mb-4 rounded-xl backdrop-blur-lg border-2 border-white/40 shadow-lg transition-all duration-500 relative overflow-hidden" 
                         style={{
                           backgroundColor: headerGradient.includes('blue') ? 'rgba(59, 130, 246, 0.25)' : 
                                           headerGradient.includes('purple') ? 'rgba(147, 51, 234, 0.25)' :
                                           headerGradient.includes('emerald') ? 'rgba(16, 185, 129, 0.25)' :
                                           headerGradient.includes('orange') ? 'rgba(249, 115, 22, 0.25)' :
                                           'rgba(244, 63, 94, 0.25)',
                           backdropFilter: 'blur(16px)'
                         }}>
                      <div className="relative flex items-center gap-4 w-full">
                        <div className="flex-shrink-0">
                          <Icon name={s.iconName} className="w-7 h-7 text-gray-800 transition-all duration-500" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-gray-900 leading-tight">
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

