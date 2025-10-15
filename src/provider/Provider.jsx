import React, { createContext, useContext, useMemo } from 'react'
import { BrowserRouter } from 'react-router-dom'

/**
 * @typedef {Object} ContactConfig
 * @property {'route'|'webhook'} mode
 * @property {string} url
 */

/**
 * @typedef {Object} AppConfig
 * @property {string=} basePath
 * @property {'internal'|'external'|'callback'} linkStrategy
 * @property {ContactConfig} contact
 * @property {Record<string, any>=} theme
 */

/** @returns {AppConfig} */
function getDefaultConfig() {
  return {
    basePath: '/',                       // si publicás en GitHub Pages: '/bot-hub/'
    linkStrategy: 'internal',            // navegación SPA por defecto
    contact: { mode: 'route', url: '' }, // Lo define Fran después
    theme: {}                            // override opcional de tokens
  }
}

/** Valida y normaliza una configuración parcial */
function normalizeConfig(partial) {
  const allowedLink = new Set(['internal', 'external', 'callback'])
  const allowedMode = new Set(['route', 'webhook'])

  const cfg = { ...getDefaultConfig(), ...(partial || {}) }

  if (!allowedLink.has(cfg.linkStrategy)) cfg.linkStrategy = 'internal'
  if (!cfg.contact || typeof cfg.contact !== 'object') {
    cfg.contact = { mode: 'route', url: '' }
  } else {
    if (!allowedMode.has(cfg.contact.mode)) cfg.contact.mode = 'route'
    if (typeof cfg.contact.url !== 'string') cfg.contact.url = ''
  }

  // basePath debe empezar con "/"
  if (typeof cfg.basePath !== 'string' || !cfg.basePath.startsWith('/')) {
    cfg.basePath = '/'
  }

  // opcional: congelar para evitar mutaciones accidentales
  return Object.freeze(cfg)
}

const AppConfigContext = createContext(getDefaultConfig())

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

/** Hook de consumo seguro */
export function useAppConfig() {
  return useContext(AppConfigContext)
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

/**
 * Helper opcional para resolver navegaciones según linkStrategy.
 * Ej.: en una Card, llamás a handleCardClick(service).
 */
export function useLinkHandler() {
  const { linkStrategy } = useAppConfig()

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

/** Export por si querés importar una base en main.jsx */
export const DEFAULT_CONFIG = getDefaultConfig()
