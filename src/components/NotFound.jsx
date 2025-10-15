import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Página no encontrada</h1>
      <p className="mt-2 text-[var(--muted-foreground)]">La ruta que visitaste no existe.</p>
      <Link to="/" className="mt-4 inline-block text-blue-600 underline">Volver al inicio</Link>
    </section>
  )
}
