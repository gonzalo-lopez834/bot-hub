import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import SearchResults from './SearchResults.jsx'
import { useSearch } from '../hooks/useSearch.js'

/**
 * Componente de búsqueda con estilo Tailwind UI y funcionalidad Fuzzy Search
 */
export default function SearchBox({ 
  placeholder = 'Buscar servicios...'
}) {
  const navigate = useNavigate()
  
  const { 
    query, 
    results, 
    isOpen, 
    loading, 
    hasResults, 
    activeIndex,
    search, 
    clear, 
    selectResult,
    navigateResults,
    selectActiveResult,
    setIsOpen 
  } = useSearch()

  const handleInputChange = (e) => {
    search(e.target.value)
  }

  const handleInputFocus = () => {
    if (query.length >= 2) {
      setIsOpen(true)
    }
  }

  const handleInputBlur = (e) => {
    // Delay para permitir clicks en resultados
    setTimeout(() => {
      if (!e.currentTarget.contains(document.activeElement)) {
        setIsOpen(false)
      }
    }, 150)
  }

  const handleKeyDown = (e) => {
    if (!isOpen && e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
      return
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        break
      
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen && query.length >= 2) {
          setIsOpen(true)
        } else {
          navigateResults('down')
        }
        break
      
      case 'ArrowUp':
        e.preventDefault()
        navigateResults('up')
        break
      
      case 'Enter':
        e.preventDefault()
        const selectedService = selectActiveResult()
        if (selectedService) {
          navigate(`/services/${selectedService.slug}`)
        }
        break
      
      default:
        break
    }
  }

  const handleClear = () => {
    clear()
  }

  const handleSelectResult = (service) => {
    const selectedService = selectResult(service)
    // Navegar al servicio seleccionado
    if (selectedService) {
      navigate(`/services/${selectedService.slug}`)
    }
    return selectedService
  }

  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false)
    
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 text-sm border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm hover:border-gray-400 transition-all"
          autoComplete="off"
        />
        
        <Icon 
          name="search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
        />
        
        {/* Botón de limpiar */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            type="button"
            aria-label="Limpiar búsqueda"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Indicador de carga */}
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Icon name="default" className="w-4 h-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>

      {/* Resultados de búsqueda */}
      <SearchResults
        results={results}
        isOpen={isOpen}
        loading={loading}
        activeIndex={activeIndex}
        onSelect={handleSelectResult}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}