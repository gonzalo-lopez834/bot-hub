import { useParams, Link } from 'react-router-dom'
import { useServices } from '../hooks/useServices'

export default function ServiceDetailView() {
  const { id } = useParams()
  const { getById, getBySlug, loading, error } = useServices()

  if (loading) return <Wrapper><p>Cargando…</p></Wrapper>
  if (error) return <Wrapper><p className="text-red-600">Error: {error}</p></Wrapper>

  // admitir tanto id como slug
  const service = getById(id) || getBySlug(id)
  if (!service) {
    return (
      <Wrapper>
        <p className="mb-4">Servicio no encontrado.</p>
        <Link to="/" className="text-blue-600 underline">Volver</Link>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <nav className="mb-4">
        <Link to="/" className="text-blue-600 underline">← Volver</Link>
      </nav>

      <h1 className="text-2xl font-semibold">{service.title}</h1>
      <p className="text-[var(--muted-foreground)] mt-2">{service.longDescription ?? service.description}</p>

      {Array.isArray(service.advantages) && service.advantages.length > 0 && (
        <>
          <h2 className="text-lg font-medium mt-6">Ventajas</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            {service.advantages.map((adv, i) => <li key={i}>{adv}</li>)}
          </ul>
        </>
      )}

      {/* Placeholder del Form: en el paso 3 lo completamos */}
      <div className="mt-8 rounded-lg border p-4">
        <p className="font-medium mb-2">Contacto</p>
        <p className="text-sm text-[var(--muted-foreground)]">
          Pronto agregamos el formulario (UI-only) para {service.title}.
        </p>
      </div>
    </Wrapper>
  )
}

/** Contenedor simple para centrar contenido */
function Wrapper({ children }) {
  return <section className="mx-auto max-w-3xl px-4 py-10">{children}</section>
}
