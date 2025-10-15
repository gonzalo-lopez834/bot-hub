import { useParams, Link } from 'react-router-dom'
import Icon from './Icon'
import FormsDetail from './FormsDetail'
import { useServices } from '../hooks/useServices'

export default function ServiceDetailView() {
  const { id } = useParams()
  const { getById, getBySlug, loading, error } = useServices()

  if (loading) return <Wrapper><p>Cargando...</p></Wrapper>
  if (error) return <Wrapper><p className="text-red-600">Error: {error}</p></Wrapper>

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
        <Link to="/" className="text-blue-600 underline">&larr; Volver</Link>
      </nav>

      <div className="mb-3 text-[var(--primary)]">
        <Icon name={service.iconName} className="w-7 h-7" />
      </div>

      <h1 className="text-3xl font-semibold tracking-tight">{service.title}</h1>
      <p className="text-gray-700 mt-3">{service.longDescription ?? service.description}</p>

      {Array.isArray(service.advantages) && service.advantages.length > 0 && (
        <>
          <h2 className="text-xl font-medium mt-8">Ventajas</h2>
          <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-800">
            {service.advantages.map((adv, i) => (
              <li key={i}>{adv}</li>
            ))}
          </ul>
        </>
      )}

      <FormsDetail service={service} />
    </Wrapper>
  )
}

function Wrapper({ children }) {
  return <section className="max-w-3xl">{children}</section>
}

