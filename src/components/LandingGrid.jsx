// src/components/LandingGrid.jsx
import { Link } from 'react-router-dom'
import { useServices } from '../hooks/useServices'
import Icon from './Icon'

export default function LandingGrid() {
  const { services, loading, error } = useServices()

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-10">Cargando…</div>
  if (error) return <div className="mx-auto max-w-6xl px-4 py-10 text-red-600">Error: {error}</div>

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Servicios</h1>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const to = `/services/${s.slug ?? s.id}`
          return (
            <li key={s.id} className="rounded-lg border bg-[var(--card)] text-[var(--card-foreground)]">
              <Link to={to} className="block p-4 hover:bg-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[var(--primary)]">
                    <Icon name={s.iconName} className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium truncate">{s.title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1 truncate">
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
  )
}
