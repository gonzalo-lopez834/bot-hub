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

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const to = `/services/${s.slug ?? s.id}`
          return (
            <li key={s.id}>
              <Link
                to={to}
                className="block rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[var(--primary)]">
                    <Icon name={s.iconName} className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-900">{s.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {s.description}
                    </p>
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

