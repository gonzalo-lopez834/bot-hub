import { useEffect, useMemo, useState } from 'react'
import servicesData from '../data/services.json'

/**
 * Hook para consumir services.json con estados de loading/error.
 * Retorna helpers getById / getBySlug.
 */
export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      // Datos locales: import estático (vite) → sin llamadas de red
      setServices(Array.isArray(servicesData) ? servicesData : [])
      setLoading(false)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
      setLoading(false)
    }
  }, [])

  const indexById = useMemo(() => {
    const map = new Map()
    for (const s of services) map.set(s.id, s)
    return map
  }, [services])

  const indexBySlug = useMemo(() => {
    const map = new Map()
    for (const s of services) map.set(s.slug ?? s.id, s)
    return map
  }, [services])

  function getById(id) {
    return indexById.get(id) || null
  }

  function getBySlug(slug) {
    return indexBySlug.get(slug) || null
  }

  return { services, loading, error, getById, getBySlug }
}
