import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'

/**
 * Componente que muestra los resultados de búsqueda
 */
export default function SearchResults({ 
  results, 
  isOpen, 
  onSelect, 
  onClose,
  loading,
  activeIndex = -1
}) {
  const activeElementRef = useRef(null)

  // Scroll automático al elemento activo
  useEffect(() => {
    if (activeIndex >= 0 && activeElementRef.current) {
      activeElementRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }, [activeIndex])

  if (!isOpen) return null

  const handleResultClick = (service) => {
    onSelect(service)
  }

  const handleKeyDown = (e, service) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleResultClick(service)
    }
  }

  // Función para resaltar coincidencias
  const highlightMatches = (text, matches) => {
    if (!matches || matches.length === 0) return text

    let highlightedText = text
    const matchRanges = []
    
    // Recopilar todos los rangos de coincidencias
    matches.forEach(match => {
      if (match.indices) {
        match.indices.forEach(([start, end]) => {
          matchRanges.push({ start, end })
        })
      }
    })

    // Ordenar rangos por posición
    matchRanges.sort((a, b) => a.start - b.start)
    
    // Aplicar highlights (de atrás hacia adelante para no afectar índices)
    for (let i = matchRanges.length - 1; i >= 0; i--) {
      const { start, end } = matchRanges[i]
      const before = highlightedText.slice(0, start)
      const highlighted = highlightedText.slice(start, end + 1)
      const after = highlightedText.slice(end + 1)
      
      highlightedText = before + `<mark class="bg-yellow-200">${highlighted}</mark>` + after
    }
    
    return highlightedText
  }

  return (
    <>
      {/* Backdrop para cerrar al hacer click fuera */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Dropdown de resultados */}
      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
        {loading && (
          <div className="p-4 text-center text-gray-500">
            <Icon name="default" className="w-4 h-4 animate-spin mx-auto mb-2" />
            Buscando...
          </div>
        )}
        
        {!loading && results.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            <Icon name="search" className="w-5 h-5 mx-auto mb-2 text-gray-400" />
            No se encontraron servicios
          </div>
        )}

        {!loading && results.length > 0 && (
          <>
            <div className="p-2 border-b border-gray-100 text-xs text-gray-500 bg-gray-50">
              {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
            </div>
            
            {results.map((result, index) => {
              const { item: service, matches } = result
              const titleMatches = matches?.filter(m => m.key === 'title') || []
              const descMatches = matches?.filter(m => m.key === 'description') || []
              const isActive = index === activeIndex
              
              return (
                <div
                  key={service.id}
                  ref={isActive ? activeElementRef : null}
                  onClick={() => handleResultClick(service)}
                  onKeyDown={(e) => handleKeyDown(e, service)}
                  tabIndex={0}
                  className={`p-3 cursor-pointer border-b border-gray-100 last:border-b-0 focus:outline-none transition-colors ${
                    isActive 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Ícono del servicio */}
                    <div className="flex-shrink-0 mt-1">
                      <Icon 
                        name={service.iconName || 'default'} 
                        className="w-5 h-5 text-gray-600" 
                      />
                    </div>
                    
                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <h4 
                        className="font-medium text-gray-900 text-sm mb-1"
                        dangerouslySetInnerHTML={{
                          __html: highlightMatches(service.title, titleMatches)
                        }}
                      />
                      <p 
                        className="text-xs text-gray-600 line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: highlightMatches(service.description, descMatches)
                        }}
                      />
                    </div>
                    
                    {/* Indicador de navegación */}
                    <div className="flex-shrink-0">
                      <Icon name="link" className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        )}
        
        {/* Footer con ayuda */}
        {!loading && results.length > 0 && (
          <div className="p-2 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              <kbd className="px-1 py-0.5 text-xs bg-gray-200 rounded">↑</kbd>
              <kbd className="px-1 py-0.5 text-xs bg-gray-200 rounded ml-1">↓</kbd>
              <span className="mx-1">navegar</span>
              <kbd className="px-1 py-0.5 text-xs bg-gray-200 rounded">Enter</kbd>
              <span className="ml-1">seleccionar</span>
              <kbd className="px-1 py-0.5 text-xs bg-gray-200 rounded ml-2">Esc</kbd>
              <span className="ml-1">cerrar</span>
            </p>
          </div>
        )}
      </div>
    </>
  )
}
