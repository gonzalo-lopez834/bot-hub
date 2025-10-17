import { useContext } from 'react'
import { AppConfigContext } from '../config/AppConfigContext.js'

/**
 * Hook de consumo seguro del contexto de configuración
 */
export function useAppConfig() {
  return useContext(AppConfigContext)
}

/**
 * Helper opcional para resolver navegaciones según linkStrategy.
 * Ej.: en una Card, llamás a handleCardClick(service).
 */
function createUseLinkHandler(linkStrategy) {
  /** @param {{ href?: string, onClick?: (service:any)=>void }} opts */
  function resolveLinkBehavior(opts = {}) {
    const { href, onClick } = opts
    if (linkStrategy === 'external' && href) {
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }
    if (linkStrategy === 'callback' && typeof onClick === 'function') {
      onClick(opts.service)
      return
    }
    // 'internal' por defecto: deja que React Router maneje el <Link to=...>
  }

  return { resolveLinkBehavior }
}

/**
 * Hook para resolver navegaciones según linkStrategy del contexto de la app.
 */
export function useLinkHandler() {
  const { linkStrategy } = useAppConfig()
  return createUseLinkHandler(linkStrategy)
}