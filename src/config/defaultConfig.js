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
export function getDefaultConfig() {
  return {
    basePath: '/',                       // si publicás en GitHub Pages: '/bot-hub/'
    linkStrategy: 'internal',            // navegación SPA por defecto
    contact: { mode: 'route', url: '' }, // Lo define Fran después
    theme: {}                            // override opcional de tokens
  }
}

/** Valida y normaliza una configuración parcial */
export function normalizeConfig(partial) {
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

/** Export por si querés importar una base en main.jsx */
export const DEFAULT_CONFIG = getDefaultConfig()