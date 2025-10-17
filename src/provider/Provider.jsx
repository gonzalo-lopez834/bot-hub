import React, { useMemo } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { normalizeConfig } from '../config/defaultConfig.js'
import { AppConfigContext } from '../config/AppConfigContext.js'
import { useAppConfig } from '../hooks/useLinkHandler.js'

/**
 * Proveedor principal de configuración global.
 * @param {{config?: Partial<AppConfig>, children: React.ReactNode}} props
 */
export function AppConfigProvider({ config, children }) {
  const value = useMemo(() => normalizeConfig(config), [config])
  return (
    <AppConfigContext.Provider value={value}>
      {children}
    </AppConfigContext.Provider>
  )
}

/**
 * Envuelve a React Router con el basename que venga de la config (basePath).
 * Útil para GitHub Pages u otros hosts que monten la app bajo un subpath.
 * @param {{children: React.ReactNode}} props
 */
export function RouterProvider({ children }) {
  const { basePath } = useAppConfig()
  return (
    <BrowserRouter basename={basePath || '/'}>
      {children}
    </BrowserRouter>
  )
}
