import { Link } from 'react-router-dom'
import { useServices } from '../hooks/useServices'

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
              <Link to={to} className="block p-4 hover:bg-[var(--accent)]">
                <h3 className="font-medium">{s.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] mt-1 line-clamp-3">{s.description}</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
