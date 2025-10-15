import { useParams, Link } from 'react-router-dom'
import Icon from './Icon'
import FormsDetail from './FormsDetail'
import { useServices } from '../hooks/useServices'

export default function ServiceDetailView() {
  const { id } = useParams()
  const { getById, getBySlug, loading, error } = useServices()

  if (loading) {
    return (
      <Wrapper>
        <StatusMessage>Cargando...</StatusMessage>
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper>
        <StatusMessage variant="error">Error: {error}</StatusMessage>
      </Wrapper>
    )
  }

  const service = getById(id) || getBySlug(id)
  if (!service) {
    return (
      <Wrapper>
        <StatusMessage>Servicio no encontrado.</StatusMessage>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] hover:underline"
        >
          <span aria-hidden="true">&larr;</span>
          Volver
        </Link>
      </Wrapper>
    )
  }

  const advantages =
    Array.isArray(service.advantages) && service.advantages.length > 0
      ? service.advantages
      : null

  return (
    <Wrapper>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
        <article className="relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-white via-slate-50 to-white shadow-sm">
          <header className="flex items-start gap-4 border-b border-slate-100 px-7 py-6">
            <div className="rounded-2xl bg-sky-100 p-3 text-sky-600">
              <Icon name={service.iconName} className="h-9 w-9" />
            </div>
            <div className="min-w-[220px] flex-1">
              <h1 className="font-semibold text-3xl tracking-tight text-sky-700">
                {service.title}
              </h1>
            </div>
          </header>

          <div className="space-y-8 px-7 py-6 text-slate-600">
            <p className="text-base leading-relaxed">
              {service.longDescription ?? service.description}
            </p>

            {advantages && (
              <section className="space-y-4">
                <h2 className="text-lg font-semibold text-sky-600">Ventajas</h2>
                <ul className="space-y-3">
                  {advantages.map((adv, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                    >
                      <CheckBadge />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </article>

        <aside className="lg:sticky lg:top-24">
          <FormsDetail service={service} className="mt-6 lg:mt-0" />
        </aside>
      </div>
    </Wrapper>
  )
}

function Wrapper({ children }) {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8">
      {children}
    </section>
  )
}

function StatusMessage({ variant = 'info', children }) {
  const palettes = {
    info: 'border-slate-200 bg-white text-gray-700',
    error: 'border-red-200 bg-red-50 text-red-700',
  }
  const palette = palettes[variant] ?? palettes.info

  return (
    <div
      className={`rounded-xl border px-4 py-3 text-sm shadow-sm ${palette}`}
      role={variant === 'error' ? 'alert' : undefined}
    >
      {children}
    </div>
  )
}

function CheckBadge() {
  return (
    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        className="h-3.5 w-3.5"
      >
        <path
          d="M5 10.5 8.5 14l6-8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
