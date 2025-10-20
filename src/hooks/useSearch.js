import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { useServices } from './useServices.js'

/**
 * Hook para búsqueda fuzzy con Fuse.js
 * Busca en título, descripción y ventajas de los servicios
 */
export function useSearch() {
  const { services, loading } = useServices()
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1) // -1 = ninguno seleccionado

  // Configuración de Fuse.js
  const fuse = useMemo(() => {
    if (!services.length) return null

    const options = {
      keys: [
        {
          name: 'title',
          weight: 0.7 // Mayor peso para el título
        },
        {
          name: 'description', 
          weight: 0.2
        },
        {
          name: 'advantages',
          weight: 0.1
        }
      ],
      threshold: 0.3, // Tolerancia (0 = exacto, 1 = cualquier cosa)
      distance: 100,   // Distancia máxima de caracteres
      minMatchCharLength: 2, // Mínimo 2 caracteres para buscar
      includeScore: true,
      includeMatches: true, // Para poder hacer highlights
      useExtendedSearch: false
    }

    return new Fuse(services, options)
  }, [services])

  // Realizar búsqueda
  const results = useMemo(() => {
    if (!fuse || !query.trim() || query.length < 2) {
      return []
    }

    const searchResults = fuse.search(query)
    
    // Limitar a 8 resultados máximo y formatear
    return searchResults.slice(0, 8).map(result => ({
      item: result.item,
      score: result.score,
      matches: result.matches || []
    }))
  }, [fuse, query])

  // Funciones helper
  const search = (searchQuery) => {
    setQuery(searchQuery)
    setIsOpen(searchQuery.length >= 2 && !loading)
    setActiveIndex(-1) // Reset del índice activo
  }

  const clear = () => {
    setQuery('')
    setIsOpen(false)
    setActiveIndex(-1)
  }

  const selectResult = (service) => {
    setQuery(service.title)
    setIsOpen(false)
    setActiveIndex(-1)
    // Retornar el servicio seleccionado para navegación
    return service
  }

  const navigateResults = (direction) => {
    if (!results.length) return

    let newIndex
    if (direction === 'down') {
      newIndex = activeIndex < results.length - 1 ? activeIndex + 1 : 0
    } else if (direction === 'up') {
      newIndex = activeIndex > 0 ? activeIndex - 1 : results.length - 1
    }
    
    setActiveIndex(newIndex)
  }

  const selectActiveResult = () => {
    if (activeIndex >= 0 && activeIndex < results.length) {
      return selectResult(results[activeIndex].item)
    }
    return null
  }

  return {
    query,
    results,
    isOpen,
    loading,
    hasResults: results.length > 0,
    activeIndex,
    search,
    clear,
    selectResult,
    navigateResults,
    selectActiveResult,
    setIsOpen,
    setActiveIndex
  }
}
