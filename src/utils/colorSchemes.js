/**
 * Sistema centralizado de esquemas de colores para servicios/bots
 * Asigna colores de forma determinística basada en el ID del servicio
 */

// Paleta extensa de esquemas de colores para escalabilidad (50+ bots)
const COLOR_SCHEMES = [
  // Azules
  { 
    bg: 'rgba(59, 130, 246, 0.15)', 
    gradient: 'from-blue-50 to-cyan-50 border-blue-200/50',
    shadow: 'hover:shadow-blue-500/25',
    iconBg: 'bg-blue-100', 
    iconText: 'text-blue-600',
    title: 'text-blue-700',
    subtitle: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-600',
    stepBg: 'bg-blue-100 text-blue-600'
  },
  // Púrpuras
  { 
    bg: 'rgba(147, 51, 234, 0.15)', 
    gradient: 'from-purple-50 to-pink-50 border-purple-200/50',
    shadow: 'hover:shadow-purple-500/25',
    iconBg: 'bg-purple-100', 
    iconText: 'text-purple-600',
    title: 'text-purple-700',
    subtitle: 'text-purple-600',
    badge: 'bg-purple-100 text-purple-600',
    stepBg: 'bg-purple-100 text-purple-600'
  },
  // Esmeraldas
  { 
    bg: 'rgba(16, 185, 129, 0.15)', 
    gradient: 'from-emerald-50 to-teal-50 border-emerald-200/50',
    shadow: 'hover:shadow-emerald-500/25',
    iconBg: 'bg-emerald-100', 
    iconText: 'text-emerald-600',
    title: 'text-emerald-700',
    subtitle: 'text-emerald-600',
    badge: 'bg-emerald-100 text-emerald-600',
    stepBg: 'bg-emerald-100 text-emerald-600'
  },
  // Naranjas
  { 
    bg: 'rgba(249, 115, 22, 0.15)', 
    gradient: 'from-orange-50 to-amber-50 border-orange-200/50',
    shadow: 'hover:shadow-orange-500/25',
    iconBg: 'bg-orange-100', 
    iconText: 'text-orange-600',
    title: 'text-orange-700',
    subtitle: 'text-orange-600',
    badge: 'bg-orange-100 text-orange-600',
    stepBg: 'bg-orange-100 text-orange-600'
  },
  // Rosas
  { 
    bg: 'rgba(244, 63, 94, 0.15)', 
    gradient: 'from-rose-50 to-pink-50 border-rose-200/50',
    shadow: 'hover:shadow-rose-500/25',
    iconBg: 'bg-rose-100', 
    iconText: 'text-rose-600',
    title: 'text-rose-700',
    subtitle: 'text-rose-600',
    badge: 'bg-rose-100 text-rose-600',
    stepBg: 'bg-rose-100 text-rose-600'
  },
  // Índigos
  { 
    bg: 'rgba(99, 102, 241, 0.15)', 
    gradient: 'from-indigo-50 to-blue-50 border-indigo-200/50',
    shadow: 'hover:shadow-indigo-500/25',
    iconBg: 'bg-indigo-100', 
    iconText: 'text-indigo-600',
    title: 'text-indigo-700',
    subtitle: 'text-indigo-600',
    badge: 'bg-indigo-100 text-indigo-600',
    stepBg: 'bg-indigo-100 text-indigo-600'
  },
  // Verdes
  { 
    bg: 'rgba(34, 197, 94, 0.15)', 
    gradient: 'from-green-50 to-emerald-50 border-green-200/50',
    shadow: 'hover:shadow-green-500/25',
    iconBg: 'bg-green-100', 
    iconText: 'text-green-600',
    title: 'text-green-700',
    subtitle: 'text-green-600',
    badge: 'bg-green-100 text-green-600',
    stepBg: 'bg-green-100 text-green-600'
  },
  // Amarillos
  { 
    bg: 'rgba(245, 158, 11, 0.15)', 
    gradient: 'from-yellow-50 to-orange-50 border-yellow-200/50',
    shadow: 'hover:shadow-yellow-500/25',
    iconBg: 'bg-yellow-100', 
    iconText: 'text-yellow-600',
    title: 'text-yellow-700',
    subtitle: 'text-yellow-600',
    badge: 'bg-yellow-100 text-yellow-600',
    stepBg: 'bg-yellow-100 text-yellow-600'
  },
  // Cianes
  { 
    bg: 'rgba(8, 145, 178, 0.15)', 
    gradient: 'from-cyan-50 to-blue-50 border-cyan-200/50',
    shadow: 'hover:shadow-cyan-500/25',
    iconBg: 'bg-cyan-100', 
    iconText: 'text-cyan-600',
    title: 'text-cyan-700',
    subtitle: 'text-cyan-600',
    badge: 'bg-cyan-100 text-cyan-600',
    stepBg: 'bg-cyan-100 text-cyan-600'
  },
  // Violetas
  { 
    bg: 'rgba(139, 92, 246, 0.15)', 
    gradient: 'from-violet-50 to-purple-50 border-violet-200/50',
    shadow: 'hover:shadow-violet-500/25',
    iconBg: 'bg-violet-100', 
    iconText: 'text-violet-600',
    title: 'text-violet-700',
    subtitle: 'text-violet-600',
    badge: 'bg-violet-100 text-violet-600',
    stepBg: 'bg-violet-100 text-violet-600'
  },
  // Fucsias
  { 
    bg: 'rgba(217, 70, 239, 0.15)', 
    gradient: 'from-fuchsia-50 to-pink-50 border-fuchsia-200/50',
    shadow: 'hover:shadow-fuchsia-500/25',
    iconBg: 'bg-fuchsia-100', 
    iconText: 'text-fuchsia-600',
    title: 'text-fuchsia-700',
    subtitle: 'text-fuchsia-600',
    badge: 'bg-fuchsia-100 text-fuchsia-600',
    stepBg: 'bg-fuchsia-100 text-fuchsia-600'
  },
  // Limas
  { 
    bg: 'rgba(132, 204, 22, 0.15)', 
    gradient: 'from-lime-50 to-green-50 border-lime-200/50',
    shadow: 'hover:shadow-lime-500/25',
    iconBg: 'bg-lime-100', 
    iconText: 'text-lime-600',
    title: 'text-lime-700',
    subtitle: 'text-lime-600',
    badge: 'bg-lime-100 text-lime-600',
    stepBg: 'bg-lime-100 text-lime-600'
  },
  // Teales
  { 
    bg: 'rgba(20, 184, 166, 0.15)', 
    gradient: 'from-teal-50 to-cyan-50 border-teal-200/50',
    shadow: 'hover:shadow-teal-500/25',
    iconBg: 'bg-teal-100', 
    iconText: 'text-teal-600',
    title: 'text-teal-700',
    subtitle: 'text-teal-600',
    badge: 'bg-teal-100 text-teal-600',
    stepBg: 'bg-teal-100 text-teal-600'
  },
  // Cielos
  { 
    bg: 'rgba(14, 165, 233, 0.15)', 
    gradient: 'from-sky-50 to-blue-50 border-sky-200/50',
    shadow: 'hover:shadow-sky-500/25',
    iconBg: 'bg-sky-100', 
    iconText: 'text-sky-600',
    title: 'text-sky-700',
    subtitle: 'text-sky-600',
    badge: 'bg-sky-100 text-sky-600',
    stepBg: 'bg-sky-100 text-sky-600'
  }
]

/**
 * Hash simple para convertir string a número
 * @param {string} str - String a hashear
 * @returns {number} - Número hash
 */
function simpleHash(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convertir a 32bit integer
  }
  return Math.abs(hash)
}

/**
 * Obtiene el esquema de colores para un servicio específico
 * Usa el ID del servicio para asignar colores de forma determinística
 * @param {string} serviceId - ID único del servicio
 * @returns {Object} - Esquema de colores completo
 */
export function getColorSchemeForService(serviceId) {
  if (!serviceId) {
    // Fallback al primer esquema si no hay ID
    return COLOR_SCHEMES[0]
  }
  
  const hash = simpleHash(serviceId)
  const index = hash % COLOR_SCHEMES.length
  
  return COLOR_SCHEMES[index]
}

/**
 * Obtiene solo el gradiente de fondo para el grid
 * @param {string} serviceId - ID único del servicio
 * @returns {string} - Clases CSS del gradiente
 */
export function getBackgroundGradient(serviceId) {
  return getColorSchemeForService(serviceId).gradient
}

/**
 * Obtiene solo la sombra para hover effects
 * @param {string} serviceId - ID único del servicio  
 * @returns {string} - Clases CSS de la sombra
 */
export function getShadowColor(serviceId) {
  return getColorSchemeForService(serviceId).shadow
}

/**
 * Exporta la lista completa de esquemas (para debugging o estadísticas)
 */
export const ALL_COLOR_SCHEMES = COLOR_SCHEMES